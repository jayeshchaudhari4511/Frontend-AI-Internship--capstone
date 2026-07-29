"use client";

import React, { memo } from "react";
import { Message } from "ai";
import { User, Sparkles } from "lucide-react";
import { ChatMarkdown } from "./ChatMarkdown";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
  isLastMessage?: boolean;
}

/**
 * ChatMessage Component.
 * 
 * Renders individual user and assistant message bubbles.
 * - Distinct visual styling for User (accent gradient bubble, right-aligned) vs Assistant (subtle dark card, left-aligned).
 * - Smooth, flicker-free Thinking Indicator displayed prior to first streamed assistant token.
 * - Fully mobile responsive layout.
 */
export const ChatMessage = memo(function ChatMessage({
  message,
  isStreaming = false,
  isLastMessage = false,
}: ChatMessageProps) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";
  const isThinking = isAssistant && isLastMessage && isStreaming && (!message.content || message.content.trim() === "");

  return (
    <div
      className={`flex items-start gap-3 w-full my-3 transition-opacity duration-200 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
      role="article"
      aria-label={`${isUser ? "User message" : "Assistant response"}`}
    >
      {/* Avatar Badge */}
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 shadow-sm border ${
          isUser
            ? "bg-primary text-primary-foreground border-primary/40"
            : "bg-slate-900 text-cyan-400 border-cyan-500/30"
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 animate-pulse" />}
      </div>

      {/* Bubble Container */}
      <div
        className={`relative max-w-[85%] sm:max-w-[78%] px-4 py-3 rounded-2xl shadow-sm text-sm break-words transition-all ${
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-xs"
            : "bg-card/95 text-card-foreground border border-border/60 rounded-tl-xs backdrop-blur-sm"
        }`}
      >
        {/* Author Label */}
        <div className="flex items-center justify-between gap-2 mb-1 text-[11px] font-medium opacity-70">
          <span>{isUser ? "You" : "Claude Assistant"}</span>
        </div>

        {/* Content or Thinking Indicator */}
        {isThinking ? (
          <div className="flex items-center gap-1.5 py-1" aria-label="Assistant is thinking">
            <span className="text-xs text-muted-foreground font-medium mr-1">Thinking</span>
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        ) : isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed text-sm">{message.content}</p>
        ) : (
          <ChatMarkdown content={message.content} />
        )}
      </div>
    </div>
  );
});
