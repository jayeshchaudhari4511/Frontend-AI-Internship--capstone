"use client";

import React, { memo } from "react";
import { ArrowDown } from "lucide-react";

interface ChatScrollButtonProps {
  onClick: () => void;
  visible: boolean;
}

/**
 * ChatScrollButton Component.
 * 
 * Floating "Jump to Latest" button displayed when the user scrolls away from the bottom of the chat container.
 * - Smooth entrance and exit transitions.
 * - Keyboard accessible with clear ARIA labels and focus rings.
 * - Respects prefers-reduced-motion settings.
 */
export const ChatScrollButton = memo(function ChatScrollButton({
  onClick,
  visible,
}: ChatScrollButtonProps) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-primary/95 text-primary-foreground text-xs font-medium rounded-full shadow-lg border border-primary-foreground/20 hover:bg-primary hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:transform-none"
      aria-label="Jump to latest messages"
    >
      <ArrowDown className="w-3.5 h-3.5 animate-bounce motion-reduce:animate-none" />
      <span>Jump to Latest</span>
    </button>
  );
});
