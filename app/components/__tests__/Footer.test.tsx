import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

// Mock info.json
jest.mock("@public/data/info.json", () => ({
  __esModule: true,
  default: {
    masjidName: "Al-Salaam Islamic Centre",
    contact: {
      address: "585 Queen St S, Kitchener, ON",
      phones: ["519-496-6585", "519-498-7985"],
      email: "alsalaam570@gmail.com",
      socialMedia: {
        x: "https://x.com/test",
        instagram: "https://instagram.com/test",
        youtube: null,
        facebook: "https://facebook.com/test",
      },
    },
    usefulLinks: [
      { title: "Donate", url: "https://example.com/donate" },
      { title: "Prayer Times", url: "https://example.com/prayer" },
    ],
    googleMapsUrl: "https://maps.google.com/embed?pb=test",
  },
}));

// Mock ContactUs
jest.mock("../ContactUs", () => ({
  ContactUs: () => <button>Contact Us</button>,
}));

// Mock SocialMedia
jest.mock("../SocialMedia", () => ({
  SocialMedia: () => <div data-testid="social-icons">Social</div>,
}));

describe("Footer", () => {
  it("renders the masjid name", () => {
    render(<Footer />);
    expect(screen.getByText("Al-Salaam Islamic Centre")).toBeInTheDocument();
  });

  it("renders address and contact info", () => {
    render(<Footer />);
    expect(screen.getByText(/585 Queen St S/)).toBeInTheDocument();
    expect(screen.getByText(/519-496-6585, 519-498-7985/)).toBeInTheDocument();
    expect(screen.getByText(/alsalaam570@gmail.com/)).toBeInTheDocument();
  });

  it("renders useful links", () => {
    render(<Footer />);
    expect(screen.getByText("Donate")).toBeInTheDocument();
    expect(screen.getByText("Prayer Times")).toBeInTheDocument();
  });

  it("renders the map iframe", () => {
    render(<Footer />);
    const iframe = screen.getByTitle("Masjid Location");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://maps.google.com/embed?pb=test",
    );
  });

  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/Copyright/)).toBeInTheDocument();
    expect(
      screen.getByText(/Al-Salaam Islamic Centre. All Rights Reserved./),
    ).toBeInTheDocument();
  });

  it("renders as a <footer> element", () => {
    const { container } = render(<Footer />);
    expect(container.firstElementChild?.tagName).toBe("FOOTER");
  });
});
