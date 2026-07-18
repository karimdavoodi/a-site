import { PrayerTimes } from "../types";
import path from "path";
import fs from "fs/promises";
import { getZonedNow } from "./timezone";

export const getPayerTime = async () => {
  const prayerTimes: PrayerTimes = {
    day: -1,
  };

  // Use the mosque's timezone, not the server's (deployed servers run in UTC)
  const now = getZonedNow();
  const currentYear = now.year.toString();
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

  const key = `${currentYear}-${now.monthName}-${now.day}`;

  if (yearlyData[key]) {
    prayerTimes.day = now.day;
    prayerTimes.azan = {
      fajr: yearlyData[key].Fajr.azan,
      dhuhr: yearlyData[key].Dhuhr.azan,
      asr: yearlyData[key].Asr.azan,
      maghrib: yearlyData[key].Magrib.azan,
      isha: yearlyData[key].Isha.azan,
    };
    prayerTimes.iqamah = {
      fajr: yearlyData[key].Fajr.iqamah,
      dhuhr: yearlyData[key].Dhuhr.iqamah,
      asr: yearlyData[key].Asr.iqamah,
      maghrib: yearlyData[key].Magrib.iqamah,
      isha: yearlyData[key].Isha.iqamah,
    };
  } else {
    console.log(`No player time for ${key} in data set lenght ${dir}`);
  }

  return prayerTimes;
};
