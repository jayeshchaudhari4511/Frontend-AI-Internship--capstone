"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { Message } from "ai";
import { Sparkles, Trash2, Bot, ArrowRight } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatScrollButton } from "./ChatScrollButton";
import { useLocalStorageChat } from "@/hooks/useLocalStorageChat";

const SUGGESTED_PROMPTS = [
  "What are Jayesh's top portfolio projects?",
  "What tech stack does Jayesh specialize in?",
  "Tell me about Jayesh's frontend & AI experience.",
  "How can I contact Jayesh for opportunities?",
];

const SCROLL_BOTTOM_THRESHOLD = 60; // px threshold from bottom to consider pinned

/**
 * Chat Component.
 * 
 * Production-ready AI Portfolio Assistant component built with Next.js 15, React 19, Vercel AI SDK,
 * Anthropic Claude Sonnet, and Tailwind CSS.
 * 
 * Features:
 * - Real-time streaming response tokens with Anthropic Claude Sonnet.
 * - Multi-turn conversational support.
 * - Flicker-free thinking indicator before first streamed token.
 * - Smart auto-scroll pinning to bottom; unpins upon user scroll up and shows "Jump to Latest" button.
 * - Preserving partial responses on Stop Generation and immediate input reactivation.
 * - Message persistence with localStorage via custom hook.
 * - Accessible design (WCAG 2.1 AA) with focus rings, ARIA live region, and reduced motion support.
 */
export function Chat() {
  const { isHydrated, messages: savedMessages, clearHistory } = useLocalStorageChat();
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setMessages,
    append,
    error,
    reload,
  } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("Chat streaming error:", err);
      try {
        const parsed = JSON.parse(err.message);
        if (parsed?.error) {
          setApiErrorMessage(parsed.error);
          return;
        }
      } catch {
        // Not JSON
      }
      setApiErrorMessage(err.message || "Failed to reach AI service.");
    },
    onFinish: () => {
      setApiErrorMessage(null);
    },
  });

  // Hydrate saved messages from localStorage into useChat state once on client mount
  useEffect(() => {
    if (isHydrated && savedMessages.length > 0 && messages.length === 0) {
      setMessages(savedMessages);
    }
  }, [isHydrated, savedMessages, setMessages, messages.length]);

  // Sync messages to localStorage when updated
  useEffect(() => {
    if (isHydrated && messages.length > 0) {
      try {
        localStorage.setItem("ai_portfolio_chat_history_v1", JSON.stringify(messages));
      } catch (e) {
        console.warn("Error persisting messages to localStorage:", e);
      }
    }
  }, [messages, isHydrated]);

  // Scroll to bottom helper
  const scrollToBottom = useCallback((smooth = true) => {
    const el = scrollContainerRef.current;
    if (el) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({
        top: el.scrollHeight,
        behavior: smooth && !prefersReducedMotion ? "smooth" : "auto",
      });
      setIsAtBottom(true);
    }
  }, []);

  // Monitor scroll position to detect manual scroll upward
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsAtBottom(distanceFromBottom <= SCROLL_BOTTOM_THRESHOLD);
  }, []);

  // Auto scroll to bottom on new messages or streaming chunks ONLY IF user is at bottom
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom(false);
    }
  }, [messages, isAtBottom, scrollToBottom]);

  // Handle prompt chip clicks
  const handlePromptClick = (promptText: string) => {
    append({
      role: "user",
      content: promptText,
    });
  };

  // Handle clear chat action
  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the conversation history?")) {
      setMessages([]);
      clearHistory();
    }
  };

  return (
    <div className="relative flex flex-col h-[650px] max-h-[85vh] w-full max-w-4xl mx-auto rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden font-sans text-slate-100">
      {/* Screen Reader Live Region for Streaming Updates */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="false"
        className="sr-only"
        role="status"
      >
        {isLoading ? "AI assistant is generating response..." : "Response complete."}
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20">
            <Bot className="w-5 h-5" />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-100">Jayesh&apos;s AI Portfolio Assistant</h2>
              <span className="px-2 py-0.5 text-[10px] font-medium bg-cyan-950 text-cyan-300 border border-cyan-800/50 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Claude 3.5
              </span>
            </div>
            <p className="text-xs text-slate-400">Ask anything about Jayesh&apos;s projects, skills, and background</p>
          </div>
        </div>

        {/* Header Actions */}
        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            aria-label="Clear chat history"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </header>

      {/* Message List Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth focus-visible:outline-none"
        tabIndex={0}
        role="log"
        aria-label="Conversation message history"
      >
        {messages.length === 0 ? (
          /* Empty / Welcome State */
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Hello! How can I help you today?
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              I am an AI assistant trained on Jayesh Chaudhari&apos;s portfolio, key capstone projects, technical skills, and background. Select a prompt or type your query below!
            </p>

            {/* Quick Prompt Suggestions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 text-xs text-slate-300 hover:text-white transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Messages List */
          <div className="space-y-4">
            {messages.map((msg: Message, index: number) => (
              <ChatMessage
                key={msg.id || index}
                message={msg}
                isStreaming={isLoading}
                isLastMessage={index === messages.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll to Bottom Button */}
      <ChatScrollButton visible={!isAtBottom} onClick={() => scrollToBottom(true)} />

      {/* Error Alert Banner */}
      {(error || apiErrorMessage) && (
        <div className="mx-4 my-2 p-3 bg-rose-950/80 border border-rose-800/80 rounded-xl text-rose-200 text-xs flex items-center justify-between gap-2 shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Error:</span>
            <span>{apiErrorMessage || error?.message || "Failed to generate response. Please check your ANTHROPIC_API_KEY environment variable."}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setApiErrorMessage(null);
              reload();
            }}
            className="px-2.5 py-1 bg-rose-800 hover:bg-rose-700 text-white font-medium rounded-lg transition-colors shrink-0"
          >
            Retry ↻
          </button>
        </div>
      )}

      {/* Input Form Footer */}
      <footer className="p-4 border-t border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
        <div className="flex items-center justify-between px-2 mt-2 text-[11px] text-slate-500">
          <span>Press <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px]">Shift+Enter</kbd> for line break</span>
          <span className="hidden sm:inline">Guardrailed Portfolio Assistant</span>
        </div>
      </footer>
    </div>
  );
}
