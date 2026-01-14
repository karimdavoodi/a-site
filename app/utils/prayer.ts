import { PrayerTimes } from "../types";
import path from "path";
import fs from "fs/promises";

export const getPayerTime = async () => {
  const prayerTimes: PrayerTimes = {
    day: -1,
  };

  const currentYear = new Date().getFullYear().toString();
  const dir = path.join(
    process.cwd(),
    "public",
    "data",
    `${currentYear}_prayer_times.json`,
  );

  let yearlyData: {
    [key: string]: Record<string, { azan: string; iqamah: string }>;
  } = {};

  try {
    const data = await fs.readFile(dir, "utf-8");
    yearlyData = JSON.parse(data);
  } catch (error) {
    console.error("Error loading prayer times data:", error);
    return prayerTimes;
  }

  const today = new Date();
  const monthName = today
    .toLocaleString("default", { month: "long" })
    .toLowerCase();
  const day = today.getDate().toString().padStart(2, "0");
  const key = `${currentYear}-${monthName}-${day}`;

  if (yearlyData[key]) {
    prayerTimes.day = today.getDate();
    prayerTimes.azan = {
      fajr: yearlyData[key].Fajr.azan,
      dhuhr: yearlyData[key].Dhuhr.azan,
      asr: yearlyData[key].Asr.azan,
      maghrib: yearlyData[key].Magrib.azan,
      isha: yearlyData[key].Isha.azan,
    };
    prayerTimes.iqama = {
      fajr: yearlyData[key].Fajr.iqamah,
      dhuhr: yearlyData[key].Dhuhr.iqamah,
      asr: yearlyData[key].Asr.iqamah,
      maghrib: yearlyData[key].Magrib.iqamah,
      isha: yearlyData[key].Isha.iqamah,
    };
  }

  return prayerTimes;
};
