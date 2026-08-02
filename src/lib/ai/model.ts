import { google } from "@ai-sdk/google";

// Accept either GOOGLE_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY to support different deployment setups
const GOOGLE_KEY = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

/**
 * Model configuration for Google Gemini (Gemini Pro family).
 *
 * - model: Gemini model instance via Vercel AI SDK Google provider. Passes explicit `apiKey` so the
 *   provider does not rely on a specific environment variable name at runtime.
 * - temperature: Controls output randomness (0.7 balances creativity with precision).
 * - maxTokens: Cap on total output generation tokens per response (1024).
 */
export const aiConfig = {
  model: google("gemini-pro", { apiKey: GOOGLE_KEY }),
  temperature: 0.7,
  maxTokens: 1024,
} as const;
