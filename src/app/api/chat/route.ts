import { streamText, convertToCoreMessages } from "ai";
import { aiConfig } from "@/lib/ai/model";
import { SYSTEM_PROMPT } from "@/lib/ai/systemPrompt";

// Set maximum duration for streaming response execution (30 seconds)
export const maxDuration = 30;

/**
 * Next.js 15 App Router API Route Handler for streaming Claude AI responses.
 * 
 * - Uses Vercel AI SDK streamText() with Anthropic Claude 3.5 Sonnet.
 * - Converts UI messages to CoreMessages format via convertToCoreMessages().
 * - Handles API credit/quota and key configuration errors gracefully.
 * - Returns a Data Stream Response with custom error formatting.
 */
export async function POST(req: Request) {
  try {
    // Debug: log presence of Google API env vars (do NOT log the key values themselves)
    console.log(
      "[api/chat] GOOGLE_API_KEY set?",
      Boolean(process.env.GOOGLE_API_KEY),
      "GOOGLE_GENERATIVE_AI_API_KEY set?",
      Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY)
    );

    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request payload: 'messages' array is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (apiKey) {
      // Non-sensitive debug: log key length to help verify correct key format is present
      try {
        console.log("[api/chat] GOOGLE key length:", apiKey.length);
      } catch {
        /* ignore */
      }
    }

    // Check for API Key presence and placeholder validation (accept either env var)
    if (!apiKey || apiKey.includes("your_google_api_key_here")) {
      return new Response(
        JSON.stringify({
          error:
            "GOOGLE_API_KEY is not configured. Please add your Google Gemini API key to .env.local (or set GOOGLE_GENERATIVE_AI_API_KEY) and restart your dev server (npm run dev).",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model: aiConfig.model,
      system: SYSTEM_PROMPT,
      messages: convertToCoreMessages(messages),
      temperature: aiConfig.temperature,
      maxTokens: aiConfig.maxTokens,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("credit balance")) {
          return "Anthropic API Error: Your credit balance is too low to access the Anthropic API. Please add credits at console.anthropic.com.";
        }
        return msg;
      },
    });
  } catch (error: unknown) {
    console.error("Error in AI streaming route handler:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred while streaming response.";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
