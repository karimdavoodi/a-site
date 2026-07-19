import React from "react";
import { render, screen } from "@testing-library/react";
import { PrayerTimes } from "../PrayerTime";

// Mock info.json
jest.mock(
  "@public/data/info.json",
  () => ({
    prayerTime: {
      jumaPrayerTime: "1:30 PM",
    },
  }),
  { virtual: true },
);

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

// Mock nextPrayer utility
jest.mock("../../utils/nextPrayer", () => ({
  getNextPrayerIndex: jest.fn().mockReturnValue(0), // highlight Fajr as next
  parsePrayerTimeToMinutes: jest.fn().mockReturnValue(330), // 5:30 AM
}));

const mockData = {
  day: 15,
  prayers: [
    { name: "Fajr", athan: "5:30 AM", iqamah: "6:00 AM" },
    { name: "Dhuhr", athan: "1:15 PM", iqamah: "1:30 PM" },
    { name: "Asr", athan: "5:45 PM", iqamah: "6:00 PM" },
    { name: "Maghrib", athan: "8:30 PM", iqamah: "8:35 PM" },
    { name: "Isha", athan: "10:00 PM", iqamah: "10:15 PM" },
  ],
};

describe("PrayerTimes", () => {
  it("renders all 5 prayer cards", () => {
    render(<PrayerTimes data={mockData} />);

    expect(screen.getByText("Fajr")).toBeInTheDocument();
    expect(screen.getByText("Dhuhr")).toBeInTheDocument();
    expect(screen.getByText("Asr")).toBeInTheDocument();
    expect(screen.getByText("Maghrib")).toBeInTheDocument();
    expect(screen.getByText("Isha")).toBeInTheDocument();
  });

  it("renders athan and iqamah times", () => {
    render(<PrayerTimes data={mockData} />);

    expect(screen.getByText("5:30 AM")).toBeInTheDocument();
    expect(screen.getByText("6:00 AM")).toBeInTheDocument();
  });

  it("renders Juma prayer time", () => {
    render(<PrayerTimes data={mockData} />);

    expect(screen.getByText("Juma Prayer")).toBeInTheDocument();
    expect(screen.getByText("1:30 PM")).toBeInTheDocument();
  });

  it("renders weekly prayer times link", () => {
    render(<PrayerTimes data={mockData} />);

    const link = screen.getByText("View Weekly Prayer Times →");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/weekly_prayer_times");
  });

  it("returns null when data day is invalid", () => {
    const { container } = render(
      <PrayerTimes data={{ day: -1, prayers: [] }} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
