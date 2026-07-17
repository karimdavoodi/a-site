import { render, screen } from "@testing-library/react";
import { News } from "../News";

// Mock the news utility
jest.mock("../../utils/news", () => ({
  getNews: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getNews } = require("../../utils/news");

const mockNewsItems = [
  "Eid al-Adha prayer will be at 8:00 AM",
  "Community iftar every Saturday",
  "New Quran classes starting next month",
];

describe("News", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the section title", async () => {
    getNews.mockResolvedValue(mockNewsItems);
    render(await News());
    expect(screen.getByRole("heading", { name: "News" })).toBeInTheDocument();
  });

  it("renders all news items", async () => {
    getNews.mockResolvedValue(mockNewsItems);
    render(await News());
    expect(
      screen.getByText("Eid al-Adha prayer will be at 8:00 AM")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Community iftar every Saturday")
    ).toBeInTheDocument();
    expect(
      screen.getByText("New Quran classes starting next month")
    ).toBeInTheDocument();
  });

  it("shows New badge on first item", async () => {
    getNews.mockResolvedValue(mockNewsItems);
    render(await News());
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("returns null when no news items", async () => {
    getNews.mockResolvedValue([]);
    const { container } = render(await News());
    expect(container.firstChild).toBeNull();
  });
});
