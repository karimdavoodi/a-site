import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ServicesClient } from "../ServicesClient";

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
    title: "Daily prayers and weekly Halaqa",
    image: "/img/1.png",
    summary: "Halaqa summary.",
    descriptionHtml: "<p>Halaqa details</p>",
  },
  {
    id: "2",
    title: "Qur'an Classes For All Ages",
    image: "/img/2.png",
    summary: "Quran classes summary.",
    descriptionHtml: "<p>Quran classes details</p>",
  },
  {
    id: "3",
    title: "Islamic Studies",
    image: "/img/3.png",
    summary: "Islamic studies summary.",
    descriptionHtml: "<p>Islamic studies details</p>",
  },
  {
    id: "4",
    title: "Family Counselling",
    image: "/img/4.png",
    summary: "Counselling summary.",
    descriptionHtml: "<p>Counselling details</p>",
  },
  {
    id: "5",
    title: "Psychoeducation Sessions",
    image: "/img/5.png",
    summary: "Psychoeducation summary.",
    descriptionHtml: "<p>Psychoeducation details</p>",
  },
  {
    id: "6",
    title: "Youth Programs",
    image: "/img/6.png",
    summary: "Youth programs summary.",
    descriptionHtml: "<p>Youth programs details</p>",
  },
];

describe("Services", () => {
  it("renders the section title", () => {
    render(<ServicesClient items={mockItems} />);
    expect(
      screen.getByRole("heading", { name: "Services" })
    ).toBeInTheDocument();
  });

  it("renders all 6 service cards", () => {
    render(<ServicesClient items={mockItems} />);
    expect(screen.getByText("Daily prayers and weekly Halaqa")).toBeInTheDocument();
    expect(screen.getByText("Qur'an Classes For All Ages")).toBeInTheDocument();
    expect(screen.getByText("Islamic Studies")).toBeInTheDocument();
    expect(screen.getByText("Family Counselling")).toBeInTheDocument();
    expect(screen.getByText("Psychoeducation Sessions")).toBeInTheDocument();
    expect(screen.getByText("Youth Programs")).toBeInTheDocument();
  });

  it("toggles description on card click", () => {
    render(<ServicesClient items={mockItems} />);
    const buttons = screen.getAllByText("Read More ▼");
    expect(buttons).toHaveLength(6);

    fireEvent.click(buttons[0]);
    expect(screen.getByText("Show Less ▲")).toBeInTheDocument();
    expect(screen.getByText("Halaqa details")).toBeInTheDocument();
  });
});
