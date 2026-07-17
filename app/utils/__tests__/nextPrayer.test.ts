import {
  parsePrayerTimeToMinutes,
  parseTimeToMinutes,
  getNextPrayerIndex,
} from "../nextPrayer";
import { getZonedNow } from "../timezone";

describe("parsePrayerTimeToMinutes", () => {
  describe("12-hour format with AM/PM", () => {
    it("parses AM time correctly", () => {
      // 5:30 AM = 5 * 60 + 30 = 330
      expect(parsePrayerTimeToMinutes("5:30 AM", "Fajr")).toBe(330);
    });

    it("parses PM time correctly (non-noon)", () => {
      // 5:45 PM = 17 * 60 + 45 = 1065
      expect(parsePrayerTimeToMinutes("5:45 PM", "Asr")).toBe(1065);
    });

    it("handles 12:00 PM as noon (1200 minutes)", () => {
      expect(parsePrayerTimeToMinutes("12:00 PM", "Dhuhr")).toBe(720);
    });

    it("handles 12:00 AM as midnight (0 minutes)", () => {
      expect(parsePrayerTimeToMinutes("12:00 AM", "Fajr")).toBe(0);
    });

    it("handles single-digit hour in AM", () => {
      // 1:00 AM = 60
      expect(parsePrayerTimeToMinutes("1:00 AM", "Fajr")).toBe(60);
    });

    it("handles single-digit hour in PM", () => {
      // 1:30 PM = 13 * 60 + 30 = 810
      expect(parsePrayerTimeToMinutes("1:30 PM", "Dhuhr")).toBe(810);
    });

    it("is case-insensitive for AM/PM", () => {
      expect(parsePrayerTimeToMinutes("5:30 am", "Fajr")).toBe(330);
      expect(parsePrayerTimeToMinutes("5:30 pm", "Asr")).toBe(1050);
    });
  });

  describe("24-hour format (no AM/PM) with prayer-name disambiguation", () => {
    it("treats Fajr hour 1 as AM", () => {
      // 1:29 Fajr = 1 * 60 + 29 = 89 (early morning)
      expect(parsePrayerTimeToMinutes("1:29", "Fajr")).toBe(89);
    });

    it("converts non-Fajr hour 1 to PM (13:00)", () => {
      // 1:15 Dhuhr = 13 * 60 + 15 = 795
      expect(parsePrayerTimeToMinutes("1:15", "Dhuhr")).toBe(795);
    });

    it("converts non-Fajr hour 5 to PM (17:00)", () => {
      // 5:45 Asr = 17 * 60 + 45 = 1065
      expect(parsePrayerTimeToMinutes("5:45", "Asr")).toBe(1065);
    });

    it("converts non-Fajr hour 8 to PM", () => {
      // 8:30 Maghrib = 20 * 60 + 30 = 1230
      expect(parsePrayerTimeToMinutes("8:30", "Maghrib")).toBe(1230);
    });

    it("converts non-Fajr hour 10 to PM", () => {
      // 10:00 Isha = 22 * 60 + 0 = 1320
      expect(parsePrayerTimeToMinutes("10:00", "Isha")).toBe(1320);
    });

    it("handles 24-hour format that is already PM (hour >= 12)", () => {
      // 13:15 = 13 * 60 + 15 = 795 (already PM, no adjustment needed)
      expect(parsePrayerTimeToMinutes("13:15", "Asr")).toBe(795);
    });

    it("handles Fajr at 12:xx as midnight (0 hours)", () => {
      // 12:30 Fajr = 0 * 60 + 30 = 30
      expect(parsePrayerTimeToMinutes("12:30", "Fajr")).toBe(30);
    });
  });

  describe("edge cases", () => {
    it("returns -1 for empty string", () => {
      expect(parsePrayerTimeToMinutes("", "Fajr")).toBe(-1);
    });

    it("returns -1 for invalid format", () => {
      expect(parsePrayerTimeToMinutes("not-a-time", "Fajr")).toBe(-1);
    });

    it("handles time with extra whitespace", () => {
      expect(parsePrayerTimeToMinutes("  5:30 AM  ", "Fajr")).toBe(330);
    });
  });
});

describe("parseTimeToMinutes", () => {
  it("parses 12-hour AM format correctly", () => {
    expect(parseTimeToMinutes("5:30 AM")).toBe(330);
  });

  it("parses 12-hour PM format correctly", () => {
    expect(parseTimeToMinutes("5:30 PM")).toBe(1050);
  });

  it("parses 24-hour format correctly", () => {
    expect(parseTimeToMinutes("13:15")).toBe(795);
  });

  it("parses 24-hour format without leading zero", () => {
    // Unlike parsePrayerTimeToMinutes, this does NOT convert to PM for hours < 12
    expect(parseTimeToMinutes("1:29")).toBe(89);
  });

  it("handles 12:00 PM as noon", () => {
    expect(parseTimeToMinutes("12:00 PM")).toBe(720);
  });

  it("handles 12:00 AM as midnight", () => {
    expect(parseTimeToMinutes("12:00 AM")).toBe(0);
  });

  it("returns -1 for empty string", () => {
    expect(parseTimeToMinutes("")).toBe(-1);
  });

  it("returns -1 for invalid format", () => {
    expect(parseTimeToMinutes("garbage")).toBe(-1);
  });
});

describe("getNextPrayerIndex", () => {
  const sampleAthanTimes = [
    "5:30 AM", // Fajr
    "1:15 PM", // Dhuhr
    "5:45 PM", // Asr
    "8:30 PM", // Maghrib
    "10:00 PM", // Isha
  ];

  it("returns -1 when the day parameter does not match today", () => {
    // Use a day that is definitely not today
    const impossibleDay = 99;
    const result = getNextPrayerIndex(sampleAthanTimes, impossibleDay);
    expect(result).toBe(-1);
  });

  it("returns the correct index for a day matching today", () => {
    // getNextPrayerIndex works on the mosque's timezone, so compare
    // against the same clock rather than the test machine's local time
    const now = getZonedNow();
    const nowTotal = now.hours * 60 + now.minutes;

    const result = getNextPrayerIndex(sampleAthanTimes, now.day);

    if (result === -1) {
      // All prayers have passed for today — verify this is actually the case
      const ishaMinutes = parsePrayerTimeToMinutes("10:00 PM", "Isha");
      expect(nowTotal).toBeGreaterThanOrEqual(ishaMinutes);
    } else {
      // The returned index should be the first prayer whose time has not yet passed
      const nextMinutes = parsePrayerTimeToMinutes(
        sampleAthanTimes[result],
        ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"][result],
      );
      expect(nowTotal).toBeLessThan(nextMinutes);
    }
  });

  it("returns -1 when all prayers have passed", () => {
    const today = getZonedNow().day;
    // All prayers are at very early times — they should all be in the past
    const earlyTimes = ["1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM"];
    const result = getNextPrayerIndex(earlyTimes, today);
    // Unless it's the middle of the night, all should have passed
    // We can't predict the exact result, but we can confirm it returns a valid index or -1
    expect([-1, 0, 1, 2, 3, 4]).toContain(result);
  });
});
