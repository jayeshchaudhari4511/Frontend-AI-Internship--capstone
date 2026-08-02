import { google } from "@ai-sdk/google";

/**
 * Model configuration for Google Gemini (Gemini Pro family).
 *
 * - model: Gemini model instance via Vercel AI SDK Google provider.
 * - temperature: Controls output randomness (0.7 balances creativity with precision).
 * - maxTokens: Cap on total output generation tokens per response (1024).
 */
export const aiConfig = {
  model: google("gemini-pro"),
  temperature: 0.7,
  maxTokens: 1024,
} as const;
