import infoData from "@public/data/info.json";
import { PrayerTimes } from "@/types";

export const getPayerTime = async () => {
  const prayerTimes: PrayerTimes = {
    day: -1,
  };

  const date = new Date();
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const dayOfMonth = date.getDate();
  prayerTimes.day = dayOfMonth;
  const athanCsvUrl = infoData.prayerTime.prayerAthanCsvUrl.replace(
    "MONTH",
    monthName,
  );
  const iqameCsvUrl = infoData.prayerTime.prayerIqamaCsvUrl.replace(
    "MONTH",
    monthName,
  );
  try {
    const [athanRes, iqamaRes] = await Promise.all([
      fetch(athanCsvUrl),
      fetch(iqameCsvUrl),
    ]);
    if (!athanRes.ok || !iqamaRes.ok) {
      throw new Error(
        `Failed to fetch csv files: athan=${athanRes.status} iqama=${iqamaRes.status}`,
      );
    }

    const [athanText, iqamaText] = await Promise.all([
      athanRes.text(),
      iqamaRes.text(),
    ]);

    const athanLines = athanText.trim().split(/\r?\n/);
    for (let i = 0; i < athanLines.length; i++) {
      const line = athanLines[i].trim();
      const cols = line.split(",");
      if (cols.length < 7) continue;
      const day = Number(cols[0]);
      if (day === dayOfMonth) {
        prayerTimes.azan = {
          fajr: cols[1],
          dhuhr: cols[3],
          asr: cols[4],
          maghrib: cols[5],
          isha: cols[6],
        };
        break;
      }
    }

    const iqamaLines = iqamaText.trim().split(/\r?\n/);
    for (let i = 0; i < iqamaLines.length; i++) {
      const line = iqamaLines[i].trim();
      const cols = line.split(",");
      if (cols.length < 6) continue;
      const day = Number(cols[0]);
      if (!Number.isFinite(day)) continue;
      if (day === dayOfMonth) {
        prayerTimes.iqama = {
          fajr: cols[1],
          dhuhr: cols[2],
          asr: cols[3],
          maghrib: cols[4],
          isha: cols[5],
        };
        break;
      }
    }
    console.info(prayerTimes, "Read prayer times");
  } catch (err) {
    console.error(err, "Error reading prayer times csv:");
  }
  return prayerTimes;
};
