import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MobileNav } from "../components/MobileNav";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { getZonedNow, MONTH_NAMES } from "../utils/timezone";

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

type WeekDay = {
  key: string;
  dayName: string;
  monthLabel: string;
  yearLabel: string;
  date: Date;
};

function buildWeek(weekOffset: number): WeekDay[] {
  // Anchor "today" to the mosque's timezone (deployed servers run in UTC),
  // then do day arithmetic in UTC so DST can't shift a date.
  const now = getZonedNow();
  const anchor = new Date(Date.UTC(now.year, now.monthIndex, now.day));
  const days: WeekDay[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(anchor);
    d.setUTCDate(anchor.getUTCDate() + weekOffset * 7 + i);

    const year = d.getUTCFullYear().toString();
    const month = MONTH_NAMES[d.getUTCMonth()];
    const day = d.getUTCDate().toString();
    days.push({
      key: `${year}-${month}-${day}`,
      dayName: DAY_ABBR[d.getUTCDay()],
      monthLabel: `${MONTH_ABBR[d.getUTCMonth()]} ${ordinal(d.getUTCDate())}`,
      yearLabel: year,
      date: d,
    });
  }

  return days;
}

function parseWeekOffset(raw?: string): number {
  const n = Number.parseInt(raw ?? "0", 10);
  if (!Number.isFinite(n)) return 0;
  return Math.max(-104, Math.min(104, n));
}

function weekHref(weekOffset: number): string {
  return weekOffset === 0
    ? "/weekly_prayer_times"
    : `/weekly_prayer_times?week=${weekOffset}`;
}

function formatWeekRange(first: Date, last: Date): string {
  const fm = MONTH_ABBR[first.getUTCMonth()];
  const lm = MONTH_ABBR[last.getUTCMonth()];
  const fy = first.getUTCFullYear();
  const ly = last.getUTCFullYear();
  if (fy !== ly) {
    return `${fm} ${first.getUTCDate()}, ${fy} – ${lm} ${last.getUTCDate()}, ${ly}`;
  }
  if (fm !== lm) {
    return `${fm} ${first.getUTCDate()} – ${lm} ${last.getUTCDate()}, ${fy}`;
  }
  return `${fm} ${first.getUTCDate()} – ${last.getUTCDate()}, ${fy}`;
}

async function loadPrayerData(years: number[]): Promise<YearlyPrayerData | null> {
  const files = await Promise.all(
    years.map(async (year) => {
      try {
        const filePath = path.join(
          process.cwd(),
          "public",
          "data",
          `${year}_prayer_times.json`,
        );
        return JSON.parse(await fs.readFile(filePath, "utf-8")) as YearlyPrayerData;
      } catch {
        return null;
      }
    }),
  );

  const loaded = files.filter((f): f is YearlyPrayerData => f !== null);
  return loaded.length ? Object.assign({}, ...loaded) : null;
}

// ---- page ----

export default async function WeeklyPrayerTimes({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const weekOffset = parseWeekOffset((await searchParams).week);
  const week = buildWeek(weekOffset);
  const years = [...new Set(week.map((d) => d.date.getUTCFullYear()))];
  const loadedData = await loadPrayerData(years);

  // Only today's year failing to load means the site's data is broken;
  // other years may simply not have been generated yet.
  if (!loadedData && years.includes(getZonedNow().year)) {
    return (
      <div style={styles.page}>
        <Header />
        <div style={styles.content}>
          <p style={styles.error}>
            Unable to load prayer times. Please try again later.
          </p>
        </div>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  const yearlyData = loadedData ?? {};
  const hasAnyData = week.some((d) => yearlyData[d.key]);

  return (
    <div style={styles.page}>
      <Header />
      <div style={styles.content}>
        <div style={styles.titleRow}>
          <Link
            href={weekHref(weekOffset - 1)}
            style={styles.navButton}
            aria-label="Previous week"
          >
            ‹ Previous week
          </Link>
          <h2 style={styles.title}>Weekly Prayer Times</h2>
          <Link
            href={weekHref(weekOffset + 1)}
            style={styles.navButton}
            aria-label="Next week"
          >
            Next week ›
          </Link>
        </div>
        <p style={styles.rangeLabel}>
          {formatWeekRange(week[0].date, week[6].date)}
        </p>
        {!hasAnyData && (
          <p style={styles.notice}>
            Prayer times for this week are not available yet.
          </p>
        )}

        {week.map(({ key, dayName, monthLabel, yearLabel }) => {
          const p = yearlyData[key];
          const isFriday = dayName === "Fri";
          return (
            <div key={key} style={styles.dayRow}>
              {/* day label — left side, 3 lines */}
              <div style={styles.dayLabel}>
                <span style={isFriday ? styles.dayNameRed : styles.dayName}>
                  {dayName}
                </span>
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
                      <span
                        style={isSunrise ? styles.sunriseTime : styles.azan}
                      >
                        {azan}
                      </span>
                      {iqamah ? (
                        <span
                          style={fridayDhuhr ? styles.iqamahRed : styles.iqamah}
                        >
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
      <MobileNav />
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

  /* ---- title + week navigation ---- */

  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--space-xs)",
    padding: "0 0.35rem",
  },

  title: {
    flex: 1,
    margin: 0,
    textAlign: "center",
    fontSize: "clamp(1.05rem, 4vw, 1.5rem)",
    fontWeight: 700,
    color: "var(--color-accent)",
    lineHeight: 1.15,
  },

  navButton: {
    flexShrink: 0,
    padding: "0.35rem 0.6rem",
    borderRadius: "var(--radius-full)",
    backgroundColor: "var(--color-surface)",
    color: "var(--color-accent)",
    fontSize: "var(--font-size-sm)",
    fontWeight: 700,
    textDecoration: "none",
    whiteSpace: "nowrap",
    boxShadow: "var(--shadow-card)",
  },

  rangeLabel: {
    margin: 0,
    textAlign: "center",
    fontSize: "var(--font-size-sm)",
    color: "var(--color-text-secondary)",
  },

  notice: {
    margin: "0.25rem 0 0",
    textAlign: "center",
    fontSize: "var(--font-size-sm)",
    color: "var(--color-text-muted)",
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
