"use client";

import Link from "next/link";
import infoData from "@public/data/info.json";
import {
  getNextPrayerIndex,
  parsePrayerTimeToMinutes,
} from "../utils/nextPrayer";
import { useMosqueClock } from "../utils/clientClock";
import styles from "./PrayerTime.module.css";

type PrayerData = {
  name: string;
  athan: string;
  iqamah: string;
};

const ARABIC_NAMES: Record<string, string> = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

type PrayerCardProps = {
  name: string;
  athan: string;
  iqamah: string;
  isNext: boolean;
};

const PrayerCard = ({ name, athan, iqamah, isNext }: PrayerCardProps) => (
  <div className={`${styles.card} ${isNext ? styles.cardNext : ""}`}>
    <span className={styles.name}>{name}</span>
    <span className={styles.arabic} lang="ar" dir="rtl">
      {ARABIC_NAMES[name] ?? ""}
    </span>
    <span className={styles.timeValue}>{athan}</span>
    <span className={styles.iqamahLine}>
      Iqamah <b>{iqamah}</b>
    </span>
  </div>
);

type NextPrayerCountdownProps = {
  prayers: PrayerData[];
  day: number;
};

// After the countdown reaches zero, show "IQAMEH" for this long
const IQAMAH_DISPLAY_MINUTES = 20;

export function NextPrayerCountdown({
  prayers,
  day,
}: NextPrayerCountdownProps) {
  const now = useMosqueClock();

  if (!now) return null;

  // Within 20 minutes after a prayer's iqamah time, show "IQAMEH" instead of
  // the counter (only when the loaded prayer data is for today)
  const currentMinutes = now.hours * 60 + now.minutes;
  const iqamahPrayer =
    day === now.day
      ? prayers.find((prayer) => {
          const iqamahMinutes = parsePrayerTimeToMinutes(
            prayer.iqamah,
            prayer.name,
          );
          return (
            iqamahMinutes >= 0 &&
            currentMinutes >= iqamahMinutes &&
            currentMinutes < iqamahMinutes + IQAMAH_DISPLAY_MINUTES
          );
        })
      : undefined;

  if (iqamahPrayer) {
    return;
  }

  const nextIndex = getNextPrayerIndex(
    prayers.map((p) => p.iqamah),
    day,
  );

  if (nextIndex < 0) {
    return (
      <div className={styles.countdown}>
        <span className={styles.countdownLabel}></span>
      </div>
    );
  }

  const nextPrayer = prayers[nextIndex];
  const nextIqamaMinutes = parsePrayerTimeToMinutes(
    nextPrayer.iqamah,
    nextPrayer.name,
  );
  const remainingSeconds = Math.max(
    0,
    (nextIqamaMinutes - currentMinutes) * 60 - now.seconds,
  );
  const hh = Math.floor(remainingSeconds / 3600);
  const mm = Math.floor((remainingSeconds % 3600) / 60);
  const ss = remainingSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className={styles.countdown} role="timer">
      <p className={styles.countdownLabel}>
        <strong>{nextPrayer.name}</strong> Iqamah is in
      </p>
      <div className={styles.countDigits}>
        <div className={styles.countCell}>
          <span className={styles.countNum}>{pad(hh)}</span>
          <span className={styles.countUnit}>Hours</span>
        </div>
        <div className={styles.countSep} aria-hidden="true">
          :
        </div>
        <div className={styles.countCell}>
          <span className={styles.countNum}>{pad(mm)}</span>
          <span className={styles.countUnit}>Minutes</span>
        </div>
        <div className={styles.countSep} aria-hidden="true">
          :
        </div>
        <div className={styles.countCell}>
          <span className={styles.countNum}>{pad(ss)}</span>
          <span className={styles.countUnit}>Seconds</span>
        </div>
      </div>
      <p className={styles.countAt}>
        Athan at <b>{nextPrayer.athan}</b> · Iqamah at <b>{nextPrayer.iqamah}</b>
      </p>
    </div>
  );
}

type PrayerTimesClientProps = {
  prayers: PrayerData[];
  day: number;
};

export function PrayerTimesClient({ prayers, day }: PrayerTimesClientProps) {
  if (day <= 0) return null;

  const nextIndex = getNextPrayerIndex(
    prayers.map((p) => p.athan),
    day,
  );

  return (
    <section id="prayer" className={styles.container}>
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
            iqamah={prayer.iqamah}
            isNext={i === nextIndex}
          />
        ))}
      </div>
      <Link href="/weekly_prayer_times" className={styles.weeklyLink}>
        View Weekly Prayer Times →
      </Link>
    </section>
  );
}
