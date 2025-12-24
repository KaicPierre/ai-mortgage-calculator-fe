import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatInput from "../../app/components/ChatInput";

describe("ChatInput", () => {
  it("renders input field with placeholder", () => {
    render(
      <ChatInput
        input=""
        isLoading={false}
        onInputChange={() => {}}
        onSend={() => {}}
      />
    );
    
    expect(screen.getByPlaceholderText("Type your message here...")).toBeInTheDocument();
  });

  it("renders send button", () => {
    render(
      <ChatInput
        input=""
        isLoading={false}
        onInputChange={() => {}}
        onSend={() => {}}
      />
    );
    
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("displays input value", () => {
    render(
      <ChatInput
        input="Hello"
        isLoading={false}
        onInputChange={() => {}}
        onSend={() => {}}
      />
    );
    
    expect(screen.getByDisplayValue("Hello")).toBeInTheDocument();
  });

  it("calls onInputChange when typing", async () => {
    const onInputChange = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ChatInput
        input=""
        isLoading={false}
        onInputChange={onInputChange}
        onSend={() => {}}
      />
    );
    
    const input = screen.getByPlaceholderText("Type your message here...");
    await user.type(input, "a");
    
    expect(onInputChange).toHaveBeenCalledWith("a");
  });

  it("calls onSend when clicking send button", async () => {
    const onSend = vi.fn();
    const user = userEvent.setup();
    
    render(
      <ChatInput
        input="Hello"
        isLoading={false}
        onInputChange={() => {}}
        onSend={onSend}
      />
    );
    
    const button = screen.getByRole("button", { name: "Send" });
    await user.click(button);
    
    expect(onSend).toHaveBeenCalled();
  });

  it("calls onSend when pressing Enter", () => {
    const onSend = vi.fn();
    
    render(
      <ChatInput
        input="Hello"
        isLoading={false}
        onInputChange={() => {}}
        onSend={onSend}
      />
    );
    
    const input = screen.getByPlaceholderText("Type your message here...");
    fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });
    
    expect(onSend).toHaveBeenCalled();
  });

  it("does not call onSend when pressing other keys", () => {
    const onSend = vi.fn();
    
    render(
      <ChatInput
        input="Hello"
        isLoading={false}
        onInputChange={() => {}}
        onSend={onSend}
      />
    );
    
    const input = screen.getByPlaceholderText("Type your message here...");
    fireEvent.keyPress(input, { key: "a", code: "KeyA", charCode: 97 });
    
    expect(onSend).not.toHaveBeenCalled();
  });

  it("shows loading state on button", () => {
    render(
      <ChatInput
        input=""
        isLoading={true}
        onInputChange={() => {}}
        onSend={() => {}}
      />
    );
    
    expect(screen.getByRole("button", { name: "Sending..." })).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(
      <ChatInput
        input=""
        isLoading={true}
        onInputChange={() => {}}
        onSend={() => {}}
      />
    );
    
    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
  });
});
