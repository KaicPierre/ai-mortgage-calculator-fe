"use client";

import { useState } from "react";
import { chatRepository } from "./repository";
import {
  ChatHeader,
  ChatMessages,
  ChatInput,
  ApprovalModal,
  Message,
  PendingCalculations,
} from "./components";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingCalculations, setPendingCalculations] = useState<PendingCalculations | null>(null);
  const [isProcessingApproval, setIsProcessingApproval] = useState(false);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input;
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setInput("");
      setIsLoading(true);

      try {
        console.log(userMessage);
        const response = await chatRepository.sendMessage(userMessage);

        // Check if approval is required
        if (response.requiresApproval && response.pendingCalculation) {
          console.log("Opening modal...");
          setPendingCalculations(response.pendingCalculation);
          setIsModalOpen(true);
        } else {
          // Add the AI response to messages if its a real message and not an approval request
          setMessages((prev) => [
            ...prev,
            { role: "model", content: response.response },
          ]);
        }
      } catch (error) {
        console.error("Error sending message to the API:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: "Sorry, we have faced an unexpected error, try again later.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleApproval = async (approved: boolean) => {
    setIsProcessingApproval(true);

    try {
      const response = await chatRepository.sendApproval(approved);

      setMessages((prev) => [
        ...prev,
        { role: "model", content: response.response },
      ]);
    } catch (error) {
      console.error("Error sending approval:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Sorry, we have faced an unexpected error while processing your approval.",
        },
      ]);
    } finally {
      setIsProcessingApproval(false);
      setIsModalOpen(false);
      setPendingCalculations(null);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black p-4">
      <div className="flex h-150 w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-zinc-950">
        <ChatHeader />
        <ChatMessages messages={messages} />
        <ChatInput
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSend={handleSend}
        />
      </div>

      <ApprovalModal
        isOpen={isModalOpen}
        pendingCalculations={pendingCalculations}
        isProcessing={isProcessingApproval}
        onApprove={() => handleApproval(true)}
        onDeny={() => handleApproval(false)}
      />
    </div>
  );
}
