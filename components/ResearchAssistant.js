"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { generateResponse } from "@/lib/assistantEngine";

export default function ResearchAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your AI research assistant at Ira's Library. Ask me to find books, articles, or help with your research. What are you looking for?",
      records: [],
      action: null,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate brief thinking delay
    setTimeout(() => {
      const response = generateResponse(userMsg.text, messages);
      setMessages((prev) => [...prev, { role: "assistant", ...response }]);
      setIsTyping(false);
    }, 500 + Math.random() * 800);
  }

  return (
    <>
      {/* Floating button */}
      <button
        className="assistant-fab"
        onClick={() => setIsOpen(!isOpen)}
        title="Research Assistant"
      >
        {isOpen ? "\u2715" : "\u2728"}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="assistant-panel">
          <div className="assistant-header">
            <div>
              <div className="assistant-title">Research Assistant</div>
              <div className="assistant-subtitle">AI-powered help for Ira&apos;s Library</div>
            </div>
            <button className="assistant-close" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </div>

          <div className="assistant-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`assistant-msg ${msg.role}`}>
                {msg.role === "assistant" && (
                  <div className="assistant-avatar">AI</div>
                )}
                <div className="assistant-msg-content">
                  <div
                    className="assistant-msg-text"
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdown(msg.text),
                    }}
                  />
                  {msg.action && (
                    <Link href={msg.action.href} className="assistant-action-btn">
                      {msg.action.label} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="assistant-msg assistant">
                <div className="assistant-avatar">AI</div>
                <div className="assistant-msg-content">
                  <div className="assistant-typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="assistant-input-area" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything about our collection..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="assistant-input"
            />
            <button type="submit" className="assistant-send" disabled={!input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, "<br />");
}
