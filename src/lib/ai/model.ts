import { google } from "@ai-sdk/google";

/**
 * Model configuration for Google Gemini (Gemini Pro family).
 *
 * - model: Gemini model instance via Vercel AI SDK Google provider. Passes explicit `apiKey` so the
 *   provider does not rely on a specific environment variable name at runtime.
 * - temperature: Controls output randomness (0.7 balances creativity with precision).
 * - maxTokens: Cap on total output generation tokens per response (1024).
 */
const MODEL_NAME = process.env.GOOGLE_MODEL || process.env.GOOGLE_GENERATIVE_AI_MODEL || "gemini-3.6-flash";

export const aiConfig = {
  model: google(MODEL_NAME),
  temperature: 0.7,
  maxTokens: 1024,
} as const;
