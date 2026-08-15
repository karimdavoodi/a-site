import { getPrayerTime } from "../utils/prayer";
import { PrayerTimesClient } from "./PrayerTimeClient";
import type { PrayerTimesData } from "../types";

const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

/**
 * Fetch and return prayer times data. Use this at the page level
 * to pass data to multiple consumers (Hero countdown, PrayerTimes section).
 */
export async function getPrayerTimesData(): Promise<PrayerTimesData | null> {
  const prayerTimes = await getPrayerTime();
  if (prayerTimes.day <= 0) {
    return null;
  }

  const prayers = PRAYER_NAMES.map((name) => {
    const key = name.toLowerCase() as keyof typeof prayerTimes.azan;
    return {
      name,
      athan: prayerTimes.azan?.[key] ?? "",
      iqamah: prayerTimes.iqamah?.[key] ?? "",
    };
  });

  return { prayers, day: prayerTimes.day };
}

type PrayerTimesProps = {
  data: PrayerTimesData;
};

export const PrayerTimes = ({ data }: PrayerTimesProps) => {
  return <PrayerTimesClient prayers={data.prayers} day={data.day} />;
};

export default PrayerTimes;
