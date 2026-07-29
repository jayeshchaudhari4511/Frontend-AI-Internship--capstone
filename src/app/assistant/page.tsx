import Metadata from "next";
import { Chat } from "@/components/chat/Chat";
import { siteConfig } from "@/constants/site";

export const metadata = {
  title: `AI Portfolio Assistant | ${siteConfig.name}`,
  description: `Interactive AI Portfolio Assistant for ${siteConfig.name}. Ask questions about portfolio projects, tech stack, and background in real time.`,
};

export default function AssistantPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent sm:text-4xl">
          AI Portfolio Assistant
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Powered by Next.js 15, React 19, Vercel AI SDK, and Anthropic Claude 3.5 Sonnet
        </p>
      </div>

      <Chat />
    </main>
  );
}
