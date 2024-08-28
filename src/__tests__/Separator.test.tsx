import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Separator } from "@/components/ui/separator";

describe("Separator component", () => {
  it("forwards the ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Separator ref={ref} orientation="horizontal" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
