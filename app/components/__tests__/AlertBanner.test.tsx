import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the info.json BEFORE importing AlertBanner
jest.mock("@public/data/info.json", () => ({
  __esModule: true,
  default: {
    pinMessage: "Eid prayer will be at 9:00 AM",
  },
}));

import { AlertBanner } from "../AlertBanner";

describe("AlertBanner", () => {
  it("renders the message text", () => {
    render(<AlertBanner />);
    expect(
      screen.getByText("Eid prayer will be at 9:00 AM"),
    ).toBeInTheDocument();
  });

  it("renders with role alert", () => {
    render(<AlertBanner />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders a dismiss button", () => {
    render(<AlertBanner />);
    expect(
      screen.getByRole("button", { name: "Dismiss alert" }),
    ).toBeInTheDocument();
  });

  it("hides when dismiss button is clicked", () => {
    render(<AlertBanner />);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
