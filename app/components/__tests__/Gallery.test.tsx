import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Gallery } from "../Gallery";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt ?? ""} src={props.src as string} {...props} />;
  },
}));

// Mock Lightbox
jest.mock("../Lightbox", () => ({
  Lightbox: ({ currentIndex, onClose }: { currentIndex: number; onClose: () => void }) => (
    <div data-testid="lightbox">
      <span>Image {currentIndex + 1}</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

describe("Gallery", () => {
  it("renders the section title", () => {
    render(<Gallery />);
    expect(screen.getByRole("heading", { name: "Gallery" })).toBeInTheDocument();
  });

  it("renders all 14 gallery images", () => {
    render(<Gallery />);
    const buttons = screen.getAllByRole("button");
    // 14 thumbnail buttons total (Gallery images only, not Lightbox nav)
    const thumbnails = buttons.filter((b) =>
      b.getAttribute("aria-label")?.startsWith("View Gallery")
    );
    expect(thumbnails).toHaveLength(14);
  });

  it("opens lightbox when an image is clicked", () => {
    render(<Gallery />);
    const firstThumb = screen.getByLabelText("View Gallery image 1");
    fireEvent.click(firstThumb);
    expect(screen.getByTestId("lightbox")).toBeInTheDocument();
    expect(screen.getByText("Image 1")).toBeInTheDocument();
  });
});
