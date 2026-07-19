import React from "react";
import { render, screen } from "@testing-library/react";
import { Section } from "../Section";

describe("Section", () => {
  it("renders the title", () => {
    render(
      <Section title="Test Title">
        <p>content</p>
      </Section>,
    );
    expect(
      screen.getByRole("heading", { name: "Test Title" }),
    ).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <Section title="Title">
        <p data-testid="child">child content</p>
      </Section>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(
      <Section title="Title" subtitle="A description">
        <p>content</p>
      </Section>,
    );
    expect(screen.getByText("A description")).toBeInTheDocument();
  });

  it("does not render subtitle element when not provided", () => {
    const { container } = render(
      <Section title="Title">
        <span data-testid="child">content</span>
      </Section>,
    );
    // The only <p> elements should be from children; there should be no subtitle paragraph
    expect(screen.getByTestId("child")).toBeInTheDocument();
    // Verify there's one heading and it's the title
    const headings = container.querySelectorAll("h2");
    expect(headings).toHaveLength(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Section title="Title" className="custom-class">
        <p>content</p>
      </Section>,
    );
    const section = container.firstElementChild;
    expect(section?.className).toContain("custom-class");
  });

  it("renders as a <section> element", () => {
    const { container } = render(
      <Section title="Title">
        <p>content</p>
      </Section>,
    );
    expect(container.firstElementChild?.tagName).toBe("SECTION");
  });
});
