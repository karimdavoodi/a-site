export type PrayerTime = {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

export type PrayerTimes = {
  day: number;
  azan?: PrayerTime;
  iqamah?: PrayerTime;
};
