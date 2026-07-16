import Link from "next/link";
import infoData from "@public/data/info.json";
import { getPayerTime } from "../utils/prayer";
import { getNextPrayerIndex } from "../utils/nextPrayer";
import styles from "./PrayerTime.module.css";

type PrayerCardProps = {
  name: string;
  athan: string;
  iqama: string;
  isNext: boolean;
};

const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

const PrayerCard = ({ name, athan, iqama, isNext }: PrayerCardProps) => {
  return (
    <div className={`${styles.card} ${isNext ? styles.cardNext : ""}`}>
      <div className={styles.name}>{name}</div>
      <div className={styles.times}>
        <div className={styles.timeBlock}>
          <span className={styles.timeLabel}>Athan</span>
          <span className={styles.timeValue}>{athan}</span>
        </div>
        <div className={styles.timeBlock}>
          <span className={styles.timeLabel}>Iqama</span>
          <span className={`${styles.timeValue} ${styles.iqamaValue}`}>
            {iqama}
          </span>
        </div>
      </div>
    </div>
  );
};

export const PrayerTimes = async () => {
  const prayerTimes = await getPayerTime();
  if (prayerTimes.day <= 0) {
    return null;
  }

  const prayers = PRAYER_NAMES.map((name) => {
    const key = name.toLowerCase() as keyof typeof prayerTimes.azan;
    return {
      name,
      athan: prayerTimes.azan?.[key] ?? "",
      iqama: prayerTimes.iqama?.[key] ?? "",
    };
  });

  const nextIndex = getNextPrayerIndex(
    prayers.map((p) => p.athan),
    prayerTimes.day
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Prayer Times</h2>
      <p className={styles.juma}>
        Juma Prayer{" "}
        <span className={styles.jumaTime}>
          {infoData.prayerTime.jumaPrayerTime}
        </span>
      </p>
      <div className={styles.daily}>
        {prayers.map((prayer, i) => (
          <PrayerCard
            key={prayer.name}
            name={prayer.name}
            athan={prayer.athan}
            iqama={prayer.iqama}
            isNext={i === nextIndex}
          />
        ))}
      </div>
      <Link href="/weekly_prayer_times" className={styles.weeklyLink}>
        View Weekly Prayer Times →
      </Link>
    </section>
  );
};

export default PrayerTimes;
