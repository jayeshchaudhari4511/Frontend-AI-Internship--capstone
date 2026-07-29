"use client";

import { useState, useEffect, useCallback } from "react";
import { Message } from "ai";

const STORAGE_KEY = "ai_portfolio_chat_history_v1";

/**
 * Custom reusable React hook to manage chat message persistence in localStorage.
 * 
 * - Prevents SSR hydration mismatch by loading saved messages only after client mount.
 * - Auto-persists message state changes to localStorage.
 * - Provides clearHistory helper for resetting persistent messages.
 */
export function useLocalStorageChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Restore messages from localStorage after mounting on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (error) {
      console.warn("[useLocalStorageChat] Failed to load messages from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync state changes to localStorage post-hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.warn("[useLocalStorageChat] Failed to write messages to localStorage:", error);
    }
  }, [messages, isHydrated]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("[useLocalStorageChat] Failed to clear localStorage:", error);
    }
  }, []);

  return {
    messages,
    setMessages,
    isHydrated,
    clearHistory,
  };
}
