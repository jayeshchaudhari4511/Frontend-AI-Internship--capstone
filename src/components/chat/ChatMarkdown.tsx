"use client";

import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMarkdownProps {
  content: string;
}

/**
 * Safe stream-aware Markdown component.
 * 
 * - Handles incomplete streamed markdown tags gracefully (e.g. unclosed bold, italic, or code blocks).
 * - Styled for high readability with support for GFM (tables, task lists, links).
 * - Opens external links safely in a new tab with security attributes.
 */
export const ChatMarkdown = memo(function ChatMarkdown({ content }: ChatMarkdownProps) {
  return (
    <div className="prose prose-invert max-w-none text-sm leading-relaxed dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0 text-foreground/90">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
          ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 text-foreground/90">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 text-foreground/90">{children}</ol>,
          li: ({ children }) => <li className="leading-snug">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-0.5"
            >
              {children}
            </a>
          ),
          code({ className, children, ...props }) {
            const isInline = !className && !String(children).includes("\n");
            if (isInline) {
              return (
                <code
                  className="bg-muted-foreground/15 text-primary-foreground font-mono text-xs px-1.5 py-0.5 rounded border border-border/40 font-normal"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <div className="my-2 rounded-md overflow-hidden bg-slate-950 border border-border/40 text-slate-100 text-xs font-mono">
                <div className="px-3 py-1 bg-slate-900 border-b border-border/30 text-slate-400 text-[10px] uppercase font-semibold flex items-center justify-between">
                  <span>Code</span>
                </div>
                <pre className="p-3 overflow-x-auto">
                  <code>{children}</code>
                </pre>
              </div>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary/60 pl-3 my-2 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
