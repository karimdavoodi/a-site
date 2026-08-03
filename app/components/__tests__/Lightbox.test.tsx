import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Lightbox } from "../Lightbox";

const mockImages = [
  { url: "/img/1.jpg", name: "Image 1" },
  { url: "/img/2.jpg", name: "Image 2" },
  { url: "/img/3.jpg", name: "Image 3" },
];

describe("Lightbox", () => {
  it("renders the current image", () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />,
    );
    expect(screen.getByAltText("Image 1")).toBeInTheDocument();
  });

  it("shows image counter", () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={1}
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />,
    );
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        onClose={onClose}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />,
    );
    fireEvent.click(screen.getByLabelText("Close lightbox"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape key", () => {
    const onClose = jest.fn();
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        onClose={onClose}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onNext when next button is clicked", () => {
    const onNext = jest.fn();
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={onNext}
      />,
    );
    fireEvent.click(screen.getByLabelText("Next image"));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("calls onPrev when prev button is clicked", () => {
    const onPrev = jest.fn();
    render(
      <Lightbox
        images={mockImages}
        currentIndex={2}
        onClose={jest.fn()}
        onPrev={onPrev}
        onNext={jest.fn()}
      />,
    );
    fireEvent.click(screen.getByLabelText("Previous image"));
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it("does not show prev button on first image", () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={0}
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />,
    );
    expect(screen.queryByLabelText("Previous image")).toBeNull();
  });

  it("does not show next button on last image", () => {
    render(
      <Lightbox
        images={mockImages}
        currentIndex={2}
        onClose={jest.fn()}
        onPrev={jest.fn()}
        onNext={jest.fn()}
      />,
    );
    expect(screen.queryByLabelText("Next image")).toBeNull();
  });
});
