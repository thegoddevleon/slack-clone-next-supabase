import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Label } from "@/components/ui/label";

describe("Label component", () => {
  it("renders the label with the correct text", () => {
    render(<Label>Username</Label>);
    const labelElement = screen.getByText("Username");
    expect(labelElement).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Label className="custom-class">Label</Label>);
    const labelElement = screen.getByText("Label");
    expect(labelElement).toHaveClass("custom-class");
  });

  it("handles the peer-disabled state", () => {
    render(
      <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Disabled Label
      </Label>
    );
    const labelElement = screen.getByText("Disabled Label");
    expect(labelElement).toHaveClass(
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    );
  });

  it("forwards the ref correctly", () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Label with Ref</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });
});
