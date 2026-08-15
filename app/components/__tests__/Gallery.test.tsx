import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Gallery } from "../Gallery";

// Mock Lightbox
jest.mock("../Lightbox", () => ({
  Lightbox: ({
    currentIndex,
    onClose,
  }: {
    currentIndex: number;
    onClose: () => void;
  }) => (
    <div data-testid="lightbox">
      <span>Image {currentIndex + 1}</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const MOCK_IMAGES = [
  { url: "https://example.com/1.jpg", name: "Gallery image 1" },
  { url: "https://example.com/2.jpg", name: "Gallery image 2" },
  { url: "https://example.com/3.jpg", name: "Gallery image 3" },
];

describe("Gallery", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCK_IMAGES),
      }),
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the section title", async () => {
    render(<Gallery />);
    expect(
      await screen.findByRole("heading", { name: "Gallery" }),
    ).toBeInTheDocument();
  });

  it("fetches images from the API and renders them", async () => {
    render(<Gallery />);
    expect(global.fetch).toHaveBeenCalledWith("/api/images/listGallery", {
      cache: "no-store",
    });

    await waitFor(() => {
      expect(screen.getByLabelText("View Gallery image 1")).toBeInTheDocument();
      expect(screen.getByLabelText("View Gallery image 2")).toBeInTheDocument();
      expect(screen.getByLabelText("View Gallery image 3")).toBeInTheDocument();
    });
  });

  it("opens lightbox when an image is clicked", async () => {
    render(<Gallery />);
    const firstThumb = await screen.findByLabelText("View Gallery image 1");
    fireEvent.click(firstThumb);
    expect(screen.getByTestId("lightbox")).toBeInTheDocument();
    expect(screen.getByText("Image 1")).toBeInTheDocument();
  });

  it("returns null when no images are available", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      }),
    ) as jest.Mock;

    const { container } = render(<Gallery />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
