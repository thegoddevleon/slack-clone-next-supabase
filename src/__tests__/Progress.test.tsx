import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Progress } from "@/components/ui/progress";

describe("Progress component", () => {
  it("renders the Progress component with the correct className", () => {
    render(<Progress value={50} />);
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toHaveClass(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary"
    );
  });

  it("renders the ProgressIndicator with the correct style based on value", () => {
    render(<Progress value={75} />);
    const indicatorElement = screen
      .getByRole("progressbar")
      .querySelector(".h-full");
    expect(indicatorElement).toHaveStyle({ transform: "translateX(-25%)" });
  });

  it("handles custom className", () => {
    render(<Progress className="custom-progress-class" value={50} />);
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toHaveClass("custom-progress-class");
  });

  it("forwards the ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
