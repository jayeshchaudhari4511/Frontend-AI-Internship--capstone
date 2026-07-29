import { anthropic } from "@ai-sdk/anthropic";

/**
 * Model configuration for Anthropic Claude 3.5 Sonnet.
 * 
 * - model: Anthropic Claude 3.5 Sonnet model instance via Vercel AI SDK.
 * - temperature: Controls output randomness (0.7 balances creativity with precision).
 * - maxTokens: Cap on total output generation tokens per response (1024).
 */
export const aiConfig = {
  model: anthropic("claude-3-5-sonnet-20241022"),
  temperature: 0.7,
  maxTokens: 1024,
} as const;
