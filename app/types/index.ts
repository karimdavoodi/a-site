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

/** A single prayer's display row (name + athan + iqamah). */
export type PrayerData = {
  name: string;
  athan: string;
  iqamah: string;
};

/** Resolved prayer data for today, shared by the Hero countdown and the PrayerTimes section. */
export type PrayerTimesData = {
  prayers: PrayerData[];
  day: number;
};

/** An expandable content card item (Services / About Us). `descriptionHtml` is pre-rendered markdown. */
export type ContentItem = {
  id: string;
  title: string;
  image: string;
  summary: string;
  descriptionHtml: string;
};

/** A proxied image reference as returned by the `/api/images/*` routes. */
export type ImageItem = {
  name: string;
  url: string;
};
