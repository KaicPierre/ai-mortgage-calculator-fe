import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatMessage from "../../app/components/ChatMessage";

describe("ChatMessage", () => {
  it("renders user message with correct styling", () => {
    render(<ChatMessage role="user" content="Hello there" />);
    
    const message = screen.getByText("Hello there");
    expect(message).toBeInTheDocument();
    expect(message.parentElement).toHaveClass("justify-end");
    expect(message).toHaveClass("bg-blue-500", "text-white");
  });

  it("renders model message with correct styling", () => {
    render(<ChatMessage role="model" content="Hi! How can I help?" />);
    
    const message = screen.getByText("Hi! How can I help?");
    expect(message).toBeInTheDocument();
    expect(message.parentElement).toHaveClass("justify-start");
    expect(message).toHaveClass("bg-zinc-100");
  });

  it("renders message content correctly", () => {
    const content = "This is a test message";
    render(<ChatMessage role="user" content={content} />);
    
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
