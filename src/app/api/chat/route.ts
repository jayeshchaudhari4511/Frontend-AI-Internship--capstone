import { streamText } from "ai";
import { aiConfig } from "@/lib/ai/model";
import { SYSTEM_PROMPT } from "@/lib/ai/systemPrompt";

// Set maximum duration for streaming response execution (30 seconds)
export const maxDuration = 30;

/**
 * Next.js 15 App Router API Route Handler for streaming Claude AI responses.
 * 
 * - Uses Vercel AI SDK streamText() with Anthropic Claude 3.5 Sonnet.
 * - Enforces system prompt guardrails server-side.
 * - Keeps API keys strictly on the server (never exposed to client).
 * - Returns a standard Data Stream Response suitable for useChat().
 */
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request payload: 'messages' array is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check for API Key presence to provide clear developer error feedback if unconfigured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("Missing ANTHROPIC_API_KEY environment variable.");
      return new Response(
        JSON.stringify({
          error: "ANTHROPIC_API_KEY is not configured in server environment variables.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = streamText({
      model: aiConfig.model,
      system: SYSTEM_PROMPT,
      messages,
      temperature: aiConfig.temperature,
      maxTokens: aiConfig.maxTokens,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in AI streaming route handler:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred while streaming response." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
