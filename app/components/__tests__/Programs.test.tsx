import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Programs } from "../Programs";

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
  renderMarkdown: () => "<p>Rendered markdown</p>",
}));

describe("Programs", () => {
  it("renders the section title", () => {
    render(<Programs />);
    expect(screen.getByRole("heading", { name: "Programs" })).toBeInTheDocument();
  });

  it("renders the program item", () => {
    render(<Programs />);
    expect(screen.getByText("Mentorship Program")).toBeInTheDocument();
    expect(
      screen.getByText(/We believe that no one should walk the path of faith alone/)
    ).toBeInTheDocument();
  });

  it("toggles description on click", () => {
    render(<Programs />);
    fireEvent.click(screen.getByText("Read More ▼"));
    expect(screen.getByText("Show Less ▲")).toBeInTheDocument();
    expect(screen.getByText("Rendered markdown")).toBeInTheDocument();
  });
});
