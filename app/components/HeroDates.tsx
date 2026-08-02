"use client";

import { useMemo } from "react";
import { useIsClient } from "../utils/clientClock";
import styles from "./Hero.module.css";

const TIME_ZONE = "America/Toronto";

const formatDates = () => {
  const now = new Date();
  const greg = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);
  let hijri = "";
  try {
    hijri = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
      timeZone: TIME_ZONE,
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
  } catch {
    hijri = "";
  }
  return { greg, hijri };
};

export const HeroDates = () => {
  const isClient = useIsClient();
  const dates = useMemo(() => (isClient ? formatDates() : null), [isClient]);

  if (!dates) return null;

  return (
    <div className={styles.dates}>
      <span>{dates.greg}</span>
      {dates.hijri && (
        <>
          <span className={styles.datesDot} aria-hidden="true">
            ✦
          </span>
          <span>{dates.hijri}</span>
        </>
      )}
    </div>
  );
};
