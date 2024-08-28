import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Typography } from "@/components/ui/typography";

describe("Typography component", () => {
  it("renders a paragraph with default styles", () => {
    render(<Typography>Default Typography</Typography>);
    const typographyElement = screen.getByText("Default Typography");
    expect(typographyElement).toHaveClass(
      "scroll-m-4 text-sm font-normal tracking-tight lg:text-base"
    );
    expect(typographyElement.tagName).toBe("P");
  });

  it("renders with the correct variant styles", () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    const typographyElement = screen.getByText("Heading 1");
    expect(typographyElement).toHaveClass(
      "scroll-m-20 text-4xl font-extra-bold tracking-tight lg:text-5xl"
    );
  });

  it("applies custom className", () => {
    render(<Typography className="custom-class">Custom Class</Typography>);
    const typographyElement = screen.getByText("Custom Class");
    expect(typographyElement).toHaveClass("custom-class");
  });

  it("forwards the ref correctly", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<Typography ref={ref}>Ref Typography</Typography>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});
