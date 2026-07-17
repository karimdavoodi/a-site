"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import infoData from "@public/data/info.json";
import { getNextPrayerIndex, parsePrayerTimeToMinutes } from "../utils/nextPrayer";
import { getZonedNow } from "../utils/timezone";
import styles from "./PrayerTime.module.css";

type PrayerData = {
  name: string;
  athan: string;
  iqama: string;
};

type PrayerCardProps = {
  name: string;
  athan: string;
  iqama: string;
  isNext: boolean;
};

const PrayerCard = ({ name, athan, iqama, isNext }: PrayerCardProps) => (
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

export function NextPrayerCountdown({ prayers, day }: NextPrayerCountdownProps) {
  // Tick on the mosque's clock so the countdown is correct for every visitor
  const [now, setNow] = useState(() => getZonedNow());

  useEffect(() => {
    const timer = setInterval(() => setNow(getZonedNow()), 1000);
    return () => clearInterval(timer);
  }, []);

  const nextIndex = getNextPrayerIndex(
    prayers.map((p) => p.iqama),
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
  const nextIqamaMinutes = parsePrayerTimeToMinutes(nextPrayer.iqama, nextPrayer.name);
  const nowMinutes = now.hours * 60 + now.minutes;
  const nowSeconds = now.seconds;
  const remainingSeconds = (nextIqamaMinutes - nowMinutes) * 60 - nowSeconds;

  return (
    <div className={styles.countdown}>
      <span className={styles.countdownLabel}>
        Next Iqama: {nextPrayer.name} in
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
}

