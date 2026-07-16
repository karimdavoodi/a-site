import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Services } from "../Services";

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
  renderMarkdown: (content: string) => `<p>Rendered markdown</p>`,
}));

describe("Services", () => {
  it("renders the section title", () => {
    render(<Services />);
    expect(
      screen.getByRole("heading", { name: "Services" })
    ).toBeInTheDocument();
  });

  it("renders all 6 service cards", () => {
    render(<Services />);
    expect(screen.getByText("Daily prayers and weekly Halaqa")).toBeInTheDocument();
    expect(screen.getByText("Qur'an Classes For All Ages")).toBeInTheDocument();
    expect(screen.getByText("Islamic Studies")).toBeInTheDocument();
    expect(screen.getByText("Family Counselling")).toBeInTheDocument();
    expect(screen.getByText("Psychoeducation Sessions")).toBeInTheDocument();
    expect(screen.getByText("Youth Programs")).toBeInTheDocument();
  });

  it("toggles description on card click", () => {
    render(<Services />);
    const buttons = screen.getAllByText("Read More ▼");
    expect(buttons).toHaveLength(6);

    // Click first card's toggle
    fireEvent.click(buttons[0]);
    expect(screen.getByText("Show Less ▲")).toBeInTheDocument();
    expect(screen.getByText("Rendered markdown")).toBeInTheDocument();
  });
});
