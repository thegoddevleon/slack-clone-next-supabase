import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

describe("Card Component", () => {
  it("applies custom classNames", () => {
    render(<Card className="custom-class">Card Content</Card>);
    const cardElement = screen.getByText("Card Content");
    expect(cardElement).toHaveClass("custom-class");
  });
});

describe("CardHeader Component", () => {
  it("renders the CardHeader component", () => {
    render(<CardHeader>Card Header</CardHeader>);
    const headerElement = screen.getByText("Card Header");
    expect(headerElement).toBeInTheDocument();
  });
});

describe("CardTitle Component", () => {
  it("renders the CardTitle component", () => {
    render(<CardTitle>Card Title</CardTitle>);
    const titleElement = screen.getByText("Card Title");
    expect(titleElement).toBeInTheDocument();
  });
});

describe("CardDescription Component", () => {
  it("renders the CardDescription component", () => {
    render(<CardDescription>Card Description</CardDescription>);
    const descriptionElement = screen.getByText("Card Description");
    expect(descriptionElement).toBeInTheDocument();
  });
});

describe("CardContent Component", () => {
  it("renders the CardContent component", () => {
    render(<CardContent>Card Content</CardContent>);
    const contentElement = screen.getByText("Card Content");
    expect(contentElement).toBeInTheDocument();
  });
});

describe("CardFooter Component", () => {
  it("renders the CardFooter component", () => {
    render(<CardFooter>Card Footer</CardFooter>);
    const footerElement = screen.getByText("Card Footer");
    expect(footerElement).toBeInTheDocument();
  });
});
