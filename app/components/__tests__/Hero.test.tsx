import React from "react";
import { render, screen } from "@testing-library/react";
import { Hero } from "../Hero";

// Mock the info.json import
jest.mock(
  "@public/data/info.json",
  () => ({
    masjidName: "Al-Salaam Islamic Centre",
    masjidSlogan: "Serving the Community with Faith and Compassion!",
  }),
  { virtual: true },
);

describe("Hero", () => {
  it("renders the masjid name", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: "Al-Salaam Islamic Centre" }),
    ).toBeInTheDocument();
  });

  it("renders the masjid slogan", () => {
    render(<Hero />);
    expect(
      screen.getByText("Serving the Community with Faith and Compassion!"),
    ).toBeInTheDocument();
  });

  it("renders as a <section> element", () => {
    const { container } = render(<Hero />);
    expect(container.firstElementChild?.tagName).toBe("SECTION");
  });
});
