import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProgramsClient } from "../ProgramsClient";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt ?? ""} src={props.src as string} {...props} />;
  },
}));

const mockItems = [
  {
    id: "1",
    title: "Mentorship Program",
    image: "/img/1.png",
    summary: "We believe that no one should walk the path of faith alone.",
    descriptionHtml: "<p>Rendered markdown</p>",
  },
];

describe("Programs", () => {
  it("renders the section title", () => {
    render(<ProgramsClient items={mockItems} />);
    expect(
      screen.getByRole("heading", { name: "Programs" })
    ).toBeInTheDocument();
  });

  it("renders the program item", () => {
    render(<ProgramsClient items={mockItems} />);
    expect(screen.getByText("Mentorship Program")).toBeInTheDocument();
    expect(
      screen.getByText("We believe that no one should walk the path of faith alone.")
    ).toBeInTheDocument();
  });

  it("toggles description on click", () => {
    render(<ProgramsClient items={mockItems} />);
    fireEvent.click(screen.getByText("Read More ▼"));
    expect(screen.getByText("Show Less ▲")).toBeInTheDocument();
    expect(screen.getByText("Rendered markdown")).toBeInTheDocument();
  });
});
