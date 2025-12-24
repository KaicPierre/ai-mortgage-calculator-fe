import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatHeader from "../../app/components/ChatHeader";

describe("ChatHeader", () => {
  it("renders the AI avatar", () => {
    render(<ChatHeader />);
    expect(screen.getByText("AI")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<ChatHeader />);
    expect(screen.getByText("Mortgage Assistant")).toBeInTheDocument();
  });

  it("renders the online status", () => {
    render(<ChatHeader />);
    expect(screen.getByText("Online")).toBeInTheDocument();
  });
});
