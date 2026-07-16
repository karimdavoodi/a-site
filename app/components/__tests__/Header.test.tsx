import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
     
    return <img alt={props.alt ?? ""} src={props.src as string} {...props} />;
  },
}));

// Mock SocialMedia to simplify testing — it renders icons that need next/image
jest.mock("../SocialMedia", () => ({
  SocialMedia: () => <div data-testid="social-media-icons">Social Icons</div>,
}));

// Mock Donation
jest.mock("../Donation", () => ({
  Donation: () => <button>Donate</button>,
}));

// Mock the info.json import
jest.mock("@public/data/info.json", () => ({
  contact: {
    phones: ["519-555-1234", "519-555-5678"],
    socialMedia: {
      x: "https://x.com/test",
      instagram: "https://instagram.com/test",
      youtube: null,
      facebook: "https://facebook.com/test",
    },
  },
}), { virtual: true });

describe("Header", () => {
  it("renders the logo", async () => {
    render(await Header());
    expect(screen.getByAltText("Al-Salaam Islamic Centre")).toBeInTheDocument();
  });

  it("renders the donate button", async () => {
    render(await Header());
    expect(screen.getByText("Donate")).toBeInTheDocument();
  });

  it("renders social media icons", async () => {
    render(await Header());
    expect(screen.getByTestId("social-media-icons")).toBeInTheDocument();
  });

  it("renders phone numbers", async () => {
    render(await Header());
    // Phone numbers come from the real info.json
    expect(screen.getByText("519-496-6585")).toBeInTheDocument();
    expect(screen.getByText("519-498-7985")).toBeInTheDocument();
  });

  it("renders as a <header> element", async () => {
    const { container } = render(await Header());
    expect(container.firstElementChild?.tagName).toBe("HEADER");
  });
});
