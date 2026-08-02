import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MobileNav } from "../components/MobileNav";
import fs from "fs/promises";
import path from "path";
import { getZonedNow, MONTH_NAMES } from "../utils/timezone";
import styles from "./weekly.module.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ---- types ----

interface PrayerDetail {
  azan: string;
  iqamah: string;
}

interface YearlyPrayerData {
  [dateKey: string]: Record<string, PrayerDetail>;
}

// ---- constants ----

const DAY_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Magrib", "Isha"];
const PRAYER_LABELS: Record<string, string> = { Magrib: "Maghrib" };

// ---- helpers ----

function ordinal(n: number): string {
  const s = n.toString();
  const last = s[s.length - 1];
  const last2 = s.slice(-2);
  if (last2 === "11" || last2 === "12" || last2 === "13") return s + "th";
  if (last === "1") return s + "st";
  if (last === "2") return s + "nd";
  if (last === "3") return s + "rd";
  return s + "th";
}

function buildWeek(): {
  key: string;
  dayName: string;
  monthLabel: string;
  yearLabel: string;
}[] {
  // Anchor "today" to the mosque's timezone (deployed servers run in UTC),
  // then do day arithmetic in UTC so DST can't shift a date.
  const now = getZonedNow();
  const anchor = new Date(Date.UTC(now.year, now.monthIndex, now.day));
  const days: {
    key: string;
    dayName: string;
    monthLabel: string;
    yearLabel: string;
  }[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(anchor);
    d.setUTCDate(anchor.getUTCDate() + i);

    const year = d.getUTCFullYear().toString();
    const month = MONTH_NAMES[d.getUTCMonth()];
    const day = d.getUTCDate().toString();
    days.push({
      key: `${year}-${month}-${day}`,
      dayName: DAY_ABBR[d.getUTCDay()],
      monthLabel: `${MONTH_ABBR[d.getUTCMonth()]} ${ordinal(d.getUTCDate())}`,
      yearLabel: year,
    });
  }

  return days;
}

// ---- page ----

export default async function WeeklyPrayerTimes() {
  const currentYear = getZonedNow().year.toString();
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    `${currentYear}_prayer_times.json`,
  );

  let yearlyData: YearlyPrayerData = {};
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    yearlyData = JSON.parse(raw);
  } catch {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <p className={styles.error}>
            Unable to load prayer times. Please try again later.
          </p>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  const week = buildWeek();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <p className={styles.eyebrow}>This Week</p>
        <h1 className={styles.title}>Weekly Prayer Times</h1>
        <p className={styles.note}>
          Athan and <b>iqamah</b> times for the next seven days. Friday Dhuhr is
          Jumu&lsquo;ah at the centre.
        </p>

        <div className={styles.rows}>
          {week.map(({ key, dayName, monthLabel, yearLabel }) => {
            const p = yearlyData[key];
            const isFriday = dayName === "Fri";
            return (
              <div key={key} className={styles.row}>
                {/* day label — left side, 3 lines */}
                <div className={styles.day}>
                  <span className={styles.dayName}>{dayName}</span>
                  <span className={styles.dayDate}>{monthLabel}</span>
                  <span className={styles.dayYear}>{yearLabel}</span>
                </div>

                {/* prayer boxes — flex-wrap beside the label */}
                <div className={styles.cells}>
                  {PRAYERS.map((prayer) => {
                    const azan = p?.[prayer]?.azan || "—";
                    const iqamah = p?.[prayer]?.iqamah || "";
                    const fridayDhuhr = isFriday && prayer === "Dhuhr";

                    return (
                      <div
                        key={prayer}
                        className={`${styles.cell} ${fridayDhuhr ? styles.cellJumuah : ""}`}
                      >
                        <span className={styles.cellName}>
                          {fridayDhuhr
                            ? "Jumu’ah"
                            : (PRAYER_LABELS[prayer] ?? prayer)}
                        </span>
                        <span className={styles.cellAzan}>{azan}</span>
                        {iqamah ? (
                          <span className={styles.cellIqamah}>{iqamah}</span>
                        ) : (
                          <span className={styles.cellIqamah}>&nbsp;</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
