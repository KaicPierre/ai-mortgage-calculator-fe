"use client";

import { useState } from "react";
import { chatRepository } from "./repository";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "model", content: "Hi! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const userMessage = input;
      setMessages([...messages, { role: "user", content: userMessage }]);
      setInput("");
      setIsLoading(true);
      
      try {
        console.log(userMessage)
        const response = await chatRepository.sendMessage(userMessage);
        
        setMessages(prev => [...prev, { 
          role: "model", 
          content: response
        }]);
      } catch (error) {
        console.error("Error sending message to the API:", error);
        setMessages(prev => [...prev, { 
          role: "model", 
          content: "Sorry, we have faced an unexpected error, try again later."
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black p-4">
      <div className="flex h-[600px] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-2xl dark:bg-zinc-950">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
             Mortgage Assistant 
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Online</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message here..."
              className="flex-1 rounded-full border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
