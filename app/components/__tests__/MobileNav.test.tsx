import React from "react";
import { render, screen } from "@testing-library/react";
import { MobileNav } from "../MobileNav";

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("MobileNav", () => {
  it("renders all 5 navigation items", () => {
    render(<MobileNav />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Prayer")).toBeInTheDocument();
    expect(screen.getByText("Donate")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("renders with navigation landmark", () => {
    render(<MobileNav />);
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" })
    ).toBeInTheDocument();
  });

  it("renders correct hrefs", () => {
    render(<MobileNav />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Prayer").closest("a")).toHaveAttribute(
      "href",
      "/weekly_prayer_times"
    );
  });
});
