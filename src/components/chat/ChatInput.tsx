"use client";

import React, { useRef, useEffect, KeyboardEvent, FormEvent } from "react";
import { Send, Square } from "lucide-react";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
}

/**
 * ChatInput Component.
 * 
 * Accessible chat input form supporting:
 * - Enter key to submit, Shift+Enter for line breaks.
 * - Dynamic line expansion.
 * - Active state toggling with Stop Generation button during streaming.
 * - Preserving partial responses upon stopping generation and returning focus to input.
 */
export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  stop,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height to fit content up to max 160px
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }
  }, [input]);

  // Focus input on mount or when loading completes/stops
  useEffect(() => {
    if (!isLoading) {
      textareaRef.current?.focus();
    }
  }, [isLoading]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const formElement = e.currentTarget.form;
        if (formElement) {
          formElement.requestSubmit();
        }
      }
    }
  };

  const handleStopClick = () => {
    stop();
    // Refocus textarea so the user can immediately resume typing
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-end gap-2 p-3 bg-card/90 border border-border/70 rounded-2xl shadow-md backdrop-blur-md transition-all focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40"
      aria-label="Send message to AI assistant"
    >
      <label htmlFor="chat-input" className="sr-only">
        Ask Jayesh's AI Portfolio Assistant
      </label>

      <textarea
        id="chat-input"
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={isLoading ? "AI is generating a response..." : "Ask about Jayesh's projects, skills, or stack... (Enter to send)"}
        disabled={isLoading}
        rows={1}
        className="w-full resize-none bg-transparent px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed max-h-40 overflow-y-auto leading-relaxed"
      />

      <div className="flex items-center shrink-0">
        {isLoading ? (
          <button
            type="button"
            onClick={handleStopClick}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-destructive-foreground bg-destructive rounded-xl shadow-sm hover:bg-destructive/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
            aria-label="Stop generation"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Stop</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="inline-flex items-center justify-center p-2.5 rounded-xl bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}
