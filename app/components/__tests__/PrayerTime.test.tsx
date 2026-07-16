import React from "react";
import { render, screen } from "@testing-library/react";
import { PrayerTimes } from "../PrayerTime";

// Mock the prayer data utility
jest.mock("../../utils/prayer", () => ({
  getPayerTime: jest.fn(),
}));

// Mock info.json
jest.mock("@public/data/info.json", () => ({
  prayerTime: {
    jumaPrayerTime: "1:30 PM",
  },
}), { virtual: true });

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock nextPrayer utility
jest.mock("../../utils/nextPrayer", () => ({
  getNextPrayerIndex: jest.fn().mockReturnValue(0), // highlight Fajr as next
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getPayerTime } = require("../../utils/prayer");

const mockPrayerData = {
  day: 15,
  azan: {
    fajr: "5:30 AM",
    dhuhr: "1:15 PM",
    asr: "5:45 PM",
    maghrib: "8:30 PM",
    isha: "10:00 PM",
  },
  iqama: {
    fajr: "6:00 AM",
    dhuhr: "1:30 PM",
    asr: "6:00 PM",
    maghrib: "8:35 PM",
    isha: "10:15 PM",
  },
};

describe("PrayerTimes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all 5 prayer cards", async () => {
    getPayerTime.mockResolvedValue(mockPrayerData);
    render(await PrayerTimes());

    expect(screen.getByText("Fajr")).toBeInTheDocument();
    expect(screen.getByText("Dhuhr")).toBeInTheDocument();
    expect(screen.getByText("Asr")).toBeInTheDocument();
    expect(screen.getByText("Maghrib")).toBeInTheDocument();
    expect(screen.getByText("Isha")).toBeInTheDocument();
  });

  it("renders athan and iqama times", async () => {
    getPayerTime.mockResolvedValue(mockPrayerData);
    render(await PrayerTimes());

    expect(screen.getByText("5:30 AM")).toBeInTheDocument();
    expect(screen.getByText("6:00 AM")).toBeInTheDocument();
  });

  it("renders Juma prayer time", async () => {
    getPayerTime.mockResolvedValue(mockPrayerData);
    render(await PrayerTimes());

    expect(screen.getByText("Juma Prayer")).toBeInTheDocument();
    expect(screen.getByText("1:30 PM")).toBeInTheDocument();
  });

  it("renders weekly prayer times link", async () => {
    getPayerTime.mockResolvedValue(mockPrayerData);
    render(await PrayerTimes());

    const link = screen.getByText("View Weekly Prayer Times →");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/weekly_prayer_times");
  });

  it("returns null when prayer data is not available", async () => {
    getPayerTime.mockResolvedValue({ day: -1 });
    const { container } = render(await PrayerTimes());
    expect(container.firstChild).toBeNull();
  });
});
