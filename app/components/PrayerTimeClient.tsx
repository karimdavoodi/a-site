"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import infoData from "@public/data/info.json";
import {
  getNextPrayerIndex,
  parsePrayerTimeToMinutes,
} from "../utils/nextPrayer";
import { getZonedNow } from "../utils/timezone";
import type { PrayerData } from "../types";
import styles from "./PrayerTime.module.css";

type PrayerCardProps = {
  name: string;
  athan: string;
  iqamah: string;
  isNext: boolean;
};

const PrayerCard = ({ name, athan, iqamah, isNext }: PrayerCardProps) => (
  <div className={`${styles.card} ${isNext ? styles.cardNext : ""}`}>
    <div className={styles.name}>{name}</div>
    <div className={styles.times}>
      <div className={styles.timeBlock}>
        <span className={styles.timeLabel}>Athan</span>
        <span className={styles.timeValue}>{athan}</span>
      </div>
      <div className={styles.timeBlock}>
        <span className={styles.timeLabel}>Iqamah</span>
        <span className={`${styles.timeValue} ${styles.iqamaValue}`}>
          {iqamah}
        </span>
      </div>
    </div>
  </div>
);

function formatCountdown(totalSeconds: number): string {
  if (totalSeconds <= 0) return "00:00:00";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

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
  // Tick on the mosque's clock so the countdown is correct for every visitor
  const [now, setNow] = useState(() => getZonedNow());

  useEffect(() => {
    const timer = setInterval(() => setNow(getZonedNow()), 1000);
    return () => clearInterval(timer);
  }, []);

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
  const remainingSeconds =
    (nextIqamaMinutes - currentMinutes) * 60 - now.seconds;

  return (
    <div className={styles.countdown}>
      <span className={styles.countdownLabel}>
        Next Iqamah: {nextPrayer.name} in
      </span>
      <span className={styles.countdownTimer}>
        {formatCountdown(Math.max(0, remainingSeconds))}
      </span>
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
      <h2 className="sectionTitle">Prayer Times</h2>
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
