import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import fs from "fs/promises";
import path from "path";

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
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Magrib", "Isha"];

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
  const today = new Date();
  const days: {
    key: string;
    dayName: string;
    monthLabel: string;
    yearLabel: string;
  }[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const year = d.getFullYear().toString();
    const month = d.toLocaleString("en-US", { month: "long" }).toLowerCase();
    const day = d.getDate().toString();
    days.push({
      key: `${year}-${month}-${day}`,
      dayName: DAY_ABBR[d.getDay()],
      monthLabel: `${MONTH_ABBR[d.getMonth()]} ${ordinal(d.getDate())}`,
      yearLabel: year,
    });
  }

  return days;
}

// ---- page ----

export default async function WeeklyPrayerTimes() {
  const currentYear = new Date().getFullYear().toString();
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
      <div style={styles.page}>
        <Header />
        <div style={styles.content}>
          <p style={styles.error}>
            Unable to load prayer times. Please try again later.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const week = buildWeek();

  return (
    <div style={styles.page}>
        <Header />
        <div style={styles.content}>
          <h2 style={styles.title}>Weekly Prayer Times</h2>

          {week.map(({ key, dayName, monthLabel, yearLabel }) => {
            const p = yearlyData[key];
            const isFriday = dayName === "Fri";
            return (
              <div key={key} style={styles.dayRow}>
                {/* day label — left side, 3 lines */}
                <div style={styles.dayLabel}>
                  <span style={isFriday ? styles.dayNameRed : styles.dayName}>{dayName}</span>
                  <span style={styles.monthLabel}>{monthLabel}</span>
                  <span style={styles.yearLabel}>{yearLabel}</span>
                </div>

                {/* prayer boxes — flex-wrap beside the label */}
                <div style={styles.prayerRow}>
                  {PRAYERS.map((prayer) => {
                    const azan = p?.[prayer]?.azan || "—";
                    const iqamah = p?.[prayer]?.iqamah || "";
                    const isSunrise = prayer === "Sunrise";
                    const fridayDhuhr = isFriday && prayer === "Dhuhr";

                    return (
                      <div key={prayer} style={styles.prayerBox}>
                        <span style={styles.prayerName}>{prayer}</span>
                        <span style={isSunrise ? styles.sunriseTime : styles.azan}>
                          {azan}
                        </span>
                        {iqamah ? (
                          <span style={fridayDhuhr ? styles.iqamahRed : styles.iqamah}>
                            {iqamah}
                          </span>
                        ) : (
                          <span style={styles.iqamahPlaceholder}>&nbsp;</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
  );
}

// ---- styles ----

const styles: Record<string, React.CSSProperties> = {
  /* ---- layout ---- */

  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    maxWidth: 1080,
    margin: "0 auto",
    backgroundColor: "var(--color-bg)",
  },

  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "0 0.35rem 0.5rem",
    gap: 2,
  },

  title: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "var(--color-text)",
    margin: "0.5rem 0 0.3rem",
    textAlign: "center",
  },

  /* ---- day row ---- */

  dayRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "rgb(22, 85, 14)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-card)",
    overflow: "hidden",
  },

  /* ---- day label (left column, 3 lines) ---- */

  dayLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
    maxWidth: 70,
    padding: "0.2rem 0.2rem",
    borderRight: "1px solid var(--color-accent)",
    flexShrink: 0,
    gap: 0,
  },

  dayName: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "var(--color-text)",
    lineHeight: 1.15,
  },

  dayNameRed: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#e53e3e",
    lineHeight: 1.15,
  },

  monthLabel: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#ffe566",
    lineHeight: 1.15,
    whiteSpace: "nowrap",
  },

  yearLabel: {
    fontSize: "0.75rem",
    color: "#d0d0d0",
    lineHeight: 1.15,
  },

  /* ---- prayer boxes container ---- */

  prayerRow: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    padding: 2,
  },

  /* ---- individual prayer box ---- */

  prayerBox: {
    flex: "1 1 auto",
    minWidth: "5.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.3rem 0.35rem",
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.16)",
    lineHeight: 1.2,
    gap: 1,
  },

  prayerName: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#ffe566",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    lineHeight: 1.15,
  },

  azan: {
    fontSize: "1.05rem",
    fontWeight: 500,
    color: "#f0f0f0",
    lineHeight: 1.15,
  },

  sunriseTime: {
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "var(--color-text)",
    lineHeight: 1.15,
  },

  iqamah: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "var(--color-text)",
    lineHeight: 1.15,
  },

  iqamahRed: {
    fontSize: "1.3rem",
    fontWeight: 700,
    color: "#e53e3e",
    lineHeight: 1.15,
  },

  iqamahPlaceholder: {
    fontSize: "1.05rem",
    lineHeight: 1.15,
  },

  /* ---- error ---- */

  error: {
    color: "var(--color-text)",
    fontSize: "0.9rem",
    marginTop: "2rem",
    textAlign: "center",
  },
};
