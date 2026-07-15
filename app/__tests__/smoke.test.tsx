import React from "react";
import { render, screen } from "@testing-library/react";

describe("Smoke test", () => {
  it("renders a simple element", () => {
    render(<div data-testid="hello">test</div>);
    expect(screen.getByTestId("hello")).toBeInTheDocument();
  });
});
