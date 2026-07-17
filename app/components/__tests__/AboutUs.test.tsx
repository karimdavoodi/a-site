import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AboutUsClient } from "../AboutUsClient";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
     
    return <img alt={props.alt ?? ""} src={props.src as string} {...props} />;
  },
}));

const mockItems = [
  {
    id: "1",
    title: "About Us",
    image: "/components/about_us/1/title.jpg",
    summary: "A welcoming and inclusive community.",
    descriptionHtml: "<p>Rendered markdown content</p>",
  },
];

describe("AboutUs", () => {
  it("renders the section title", () => {
    render(<AboutUsClient items={mockItems} />);
    const headings = screen.getAllByRole("heading", { name: "About Us" });
    expect(headings).toHaveLength(2); // Section h2 + Card h3
  });

  it("renders the summary text", () => {
    render(<AboutUsClient items={mockItems} />);
    expect(
      screen.getByText("A welcoming and inclusive community.")
    ).toBeInTheDocument();
  });

  it("toggles description on button click", () => {
    render(<AboutUsClient items={mockItems} />);
    const button = screen.getByText("Read More ▼");
    fireEvent.click(button);
    expect(screen.getByText("Show Less ▲")).toBeInTheDocument();
    expect(screen.getByText("Rendered markdown content")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Show Less ▲"));
    expect(screen.getByText("Read More ▼")).toBeInTheDocument();
  });
});
