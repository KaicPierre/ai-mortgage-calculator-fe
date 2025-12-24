import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChatMessages from "../../app/components/ChatMessages";

describe("ChatMessages", () => {
  it("renders empty state when no messages", () => {
    const { container } = render(<ChatMessages messages={[]} />);
    
    const messagesContainer = container.firstChild;
    expect(messagesContainer).toBeInTheDocument();
    expect(messagesContainer?.childNodes.length).toBe(0);
  });

  it("renders a single message", () => {
    const messages = [{ role: "model", content: "Hello!" }];
    render(<ChatMessages messages={messages} />);
    
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });

  it("renders multiple messages", () => {
    const messages = [
      { role: "model", content: "Hi! How can I help?" },
      { role: "user", content: "I need a mortgage calculation" },
      { role: "model", content: "Sure, I can help with that!" },
    ];
    render(<ChatMessages messages={messages} />);
    
    expect(screen.getByText("Hi! How can I help?")).toBeInTheDocument();
    expect(screen.getByText("I need a mortgage calculation")).toBeInTheDocument();
    expect(screen.getByText("Sure, I can help with that!")).toBeInTheDocument();
  });

  it("renders messages with correct roles", () => {
    const messages = [
      { role: "user", content: "User message" },
      { role: "model", content: "Model message" },
    ];
    render(<ChatMessages messages={messages} />);
    
    const userMessage = screen.getByText("User message");
    const modelMessage = screen.getByText("Model message");
    
    expect(userMessage.parentElement).toHaveClass("justify-end");
    expect(modelMessage.parentElement).toHaveClass("justify-start");
  });
});
