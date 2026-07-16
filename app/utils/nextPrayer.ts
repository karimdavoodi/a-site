/**
 * Parse a prayer time string like "5:30 AM" or "13:15" into total minutes from midnight.
 */
function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return -1;

  const trimmed = timeStr.trim();

  // Try 12-hour format: "5:30 AM" or "5:30 PM"
  const amPmMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (amPmMatch) {
    let hours = parseInt(amPmMatch[1], 10);
    const minutes = parseInt(amPmMatch[2], 10);
    const period = amPmMatch[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  // Try 24-hour format: "13:15"
  const hhMmMatch = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (hhMmMatch) {
    const hours = parseInt(hhMmMatch[1], 10);
    const minutes = parseInt(hhMmMatch[2], 10);
    return hours * 60 + minutes;
  }

  return -1;
}

/**
 * Determine which prayer is next based on current time.
 * Returns the index of the next prayer (0 = Fajr, 1 = Dhuhr, etc.).
 * If all prayers for today have passed, returns -1 (should highlight none or Fajr).
 *
 * @param athanTimes - Array of 5 athan time strings
 * @param day - Current day of the month (to verify prayers are for today)
 */
export function getNextPrayerIndex(
  athanTimes: string[],
  day: number
): number {
  const today = new Date().getDate();

  // Only compute next prayer if the loaded data is for today
  if (day !== today) {
    return -1;
  }

  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();

  for (let i = 0; i < athanTimes.length; i++) {
    const minutes = parseTimeToMinutes(athanTimes[i]);
    if (minutes >= 0 && nowMinutes < minutes) {
      return i;
    }
  }

  // All prayers have passed for today
  return -1;
}
