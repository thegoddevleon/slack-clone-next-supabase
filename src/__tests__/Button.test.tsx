import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button component", () => {
  it("renders the default button", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("Click me");
    expect(buttonElement).toHaveClass("bg-primary text-primary-foreground");
  });

  it("renders the button with custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("renders a button as a child component", () => {
    render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>
    );
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveTextContent("Home");
  });

  it("fires the onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
