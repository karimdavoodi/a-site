import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Events } from "../Events";

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock Lightbox
jest.mock("../Lightbox", () => ({
  Lightbox: ({ currentIndex, onClose }: { currentIndex: number; onClose: () => void }) => (
    <div data-testid="lightbox">
      <span>Image {currentIndex + 1}</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const mockImages = [
  { url: "/api/images/Events/img1.jpg", name: "Event 1" },
  { url: "/api/images/Events/img2.jpg", name: "Event 2" },
  { url: "/api/images/Events/img3.jpg", name: "Event 3" },
];

describe("Events", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("renders the section title", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockImages),
    });
    render(<Events title="Events" />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Events" })).toBeInTheDocument();
    });
  });

  it("renders fetched event images", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockImages),
    });
    render(<Events title="Events" />);
    await waitFor(() => {
      expect(screen.getByAltText("Event 1")).toBeInTheDocument();
      expect(screen.getByAltText("Event 2")).toBeInTheDocument();
      expect(screen.getByAltText("Event 3")).toBeInTheDocument();
    });
  });

  it("opens lightbox when an image is clicked", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockImages),
    });
    render(<Events title="Events" />);
    await waitFor(() => {
      expect(screen.getByAltText("Event 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText("View Event 1"));
    expect(screen.getByTestId("lightbox")).toBeInTheDocument();
    expect(screen.getByText("Image 1")).toBeInTheDocument();
  });

  it("returns null when no images are fetched", async () => {
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });
    const { container } = render(<Events title="Events" />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
