import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  it("renders children content", () => {
    render(<Card>Hello World</Card>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="my-card">content</Card>);
    const card = container.firstElementChild;
    expect(card?.className).toContain("my-card");
  });

  it("calls onClick when clicked", () => {
    const onClick = jest.fn();
    render(<Card onClick={onClick}>clickable</Card>);
    fireEvent.click(screen.getByText("clickable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick on Enter key press", () => {
    const onClick = jest.fn();
    render(<Card onClick={onClick}>clickable</Card>);
    fireEvent.keyDown(screen.getByText("clickable"), { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onClick on Space key press", () => {
    const onClick = jest.fn();
    render(<Card onClick={onClick}>clickable</Card>);
    fireEvent.keyDown(screen.getByText("clickable"), { key: " " });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has button role when clickable", () => {
    render(<Card onClick={() => {}}>clickable</Card>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("is not a button role when not clickable", () => {
    render(<Card>plain card</Card>);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders as <a> when href is provided", () => {
    const { container } = render(<Card href="/test">link card</Card>);
    expect(container.firstElementChild?.tagName).toBe("A");
    expect(container.firstElementChild).toHaveAttribute("href", "/test");
  });

  it("renders as <div> when no href", () => {
    const { container } = render(<Card>div card</Card>);
    expect(container.firstElementChild?.tagName).toBe("DIV");
  });
});
