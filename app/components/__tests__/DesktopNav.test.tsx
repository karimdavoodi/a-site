import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DesktopNav } from "../DesktopNav";

const mockPush = jest.fn();

// Mock next/navigation router (not mounted in jsdom tests)
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("DesktopNav", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders all 5 navigation items", () => {
    render(<DesktopNav />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Prayer")).toBeInTheDocument();
    expect(screen.getByText("Donate")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("renders with navigation landmark", () => {
    render(<DesktopNav />);
    expect(
      screen.getByRole("navigation", { name: "Desktop navigation" })
    ).toBeInTheDocument();
  });

  it("renders correct hrefs for page links", () => {
    render(<DesktopNav />);
    expect(screen.getByText("Home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Prayer").closest("a")).toHaveAttribute(
      "href",
      "/#prayer"
    );
  });

  it("renders correct hrefs for hash links", () => {
    render(<DesktopNav />);
    expect(screen.getByText("Donate").closest("a")).toHaveAttribute(
      "href",
      "/#donation"
    );
    expect(screen.getByText("Events").closest("a")).toHaveAttribute(
      "href",
      "/#events"
    );
    expect(screen.getByText("Services").closest("a")).toHaveAttribute(
      "href",
      "/#services"
    );
  });

  it("does not prevent default for plain page links without hash", () => {
    render(<DesktopNav />);
    const homeLink = screen.getByText("Home").closest("a")!;
    const prevented = !fireEvent.click(homeLink);
    // Plain page links (no hash fragment) let the browser handle navigation
    expect(prevented).toBe(false);
  });
});
