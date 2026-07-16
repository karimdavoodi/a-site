import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AboutUs } from "../AboutUs";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt ?? ""} src={props.src as string} {...props} />;
  },
}));

// Mock markdown renderer
jest.mock("../../utils/markdown", () => ({
  renderMarkdown: (content: string) => `<p>Rendered: ${content.substring(0, 20)}...</p>`,
}));

describe("AboutUs", () => {
  it("renders the section title", () => {
    render(<AboutUs />);
    const headings = screen.getAllByRole("heading", { name: "About Us" });
    expect(headings).toHaveLength(2); // Section h2 + Card h3
  });

  it("renders the about item title", () => {
    render(<AboutUs />);
    // The card has its own h3 title (also "About Us")
    const headings = screen.getAllByText("About Us");
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the summary text", () => {
    render(<AboutUs />);
    expect(
      screen.getByText(/Al-Salaam Islamic Centre \(AIC\) is a welcoming/)
    ).toBeInTheDocument();
  });

  it("toggles description on button click", () => {
    render(<AboutUs />);
    const button = screen.getByText("Read More ▼");
    fireEvent.click(button);
    expect(screen.getByText("Show Less ▲")).toBeInTheDocument();
    // Description should now be visible
    expect(screen.getByText(/Rendered:/)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Show Less ▲"));
    expect(screen.getByText("Read More ▼")).toBeInTheDocument();
  });
});
