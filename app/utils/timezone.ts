// All prayer-time logic must run on the mosque's local clock, not the
// server's (deployed servers usually run in UTC) or the visitor's browser.
export const MOSQUE_TIME_ZONE = "America/Toronto";

export const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

export type ZonedNow = {
  year: number;
  monthIndex: number; // 0-11
  monthName: string; // lowercase long name, e.g. "july"
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Current date/time in the mosque's timezone, regardless of where this
 * code runs (UTC server, visitor's browser, etc.).
 */
export function getZonedNow(): ZonedNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: MOSQUE_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const get = (type: Intl.DateTimeFormatPart["type"]) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? "0", 10);

  const monthIndex = get("month") - 1;
  return {
    year: get("year"),
    monthIndex,
    monthName: MONTH_NAMES[monthIndex],
    day: get("day"),
    hours: get("hour"),
    minutes: get("minute"),
    seconds: get("second"),
  };
}
