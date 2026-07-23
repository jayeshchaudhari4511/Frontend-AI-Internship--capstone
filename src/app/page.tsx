import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JCMark } from "@/components/ui/Logo";
import { PlaceholderCard } from "@/components/ui/PlaceholderCard";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Home",
  "Jayesh Chaudhari — AI · ML · Modern Frontend Engineering Portfolio."
);

export default function HomePage() {
  return (
    <div className="space-y-md">
      {/* Hero Section */}
      <Section ariaLabel="Hero header">
        <Container>
          <div className="flex flex-col space-y-md">
            {/* Hero Mark & Badge */}
            <div className="flex items-center gap-md">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-card/80 text-primary shadow-xl backdrop-blur-md">
                <JCMark size={44} />
              </div>
              <div className="inline-flex w-fit items-center gap-xs rounded-full border border-primary/30 bg-primary/10 px-md py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                Jayesh Chaudhari • AI · ML · Frontend
              </div>
            </div>

            {/* Display Heading */}
            <h1 className="max-w-4xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Jayesh Chaudhari
              </span>
              <span className="block text-2xl font-semibold text-primary sm:text-4xl mt-xs">
                Frontend & AI/ML Engineering Portfolio
              </span>
            </h1>

            {/* Hero Description */}
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl">
              Production-quality Next.js 15 App Router architecture scaffold with strict TypeScript types, tailored design tokens, and modular server component design.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-sm pt-xs">
              <Link href="/projects">
                <Button size="lg" variant="primary">
                  Explore Projects
                </Button>
              </Link>
              <Link href="/health">
                <Button size="lg" variant="outline">
                  System Health Diagnostics →
                </Button>
              </Link>
            </div>
          </div>

          {/* Architectural Metrics Grid */}
          <div className="mt-2xl grid gap-md sm:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-card/60 p-lg backdrop-blur-md transition-all hover:border-primary/40">
              <p className="text-3xl font-bold font-display text-primary">100%</p>
              <p className="mt-xs text-sm font-semibold text-foreground">Server Component First</p>
              <p className="mt-xs text-xs text-muted-foreground">Zero client JS overhead by default across all routes.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/60 p-lg backdrop-blur-md transition-all hover:border-accent/40">
              <p className="text-3xl font-bold font-display text-accent">Next.js 15</p>
              <p className="mt-xs text-sm font-semibold text-foreground">App Router Convention</p>
              <p className="mt-xs text-xs text-muted-foreground">Colocated pages, layouts, error, and loading handlers.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/60 p-lg backdrop-blur-md transition-all hover:border-indigo-400/40">
              <p className="text-3xl font-bold font-display text-indigo-400">&lt; 100ms</p>
              <p className="mt-xs text-sm font-semibold text-foreground">Optimized Edge Render</p>
              <p className="mt-xs text-xs text-muted-foreground">Tailwind CSS tokens with CSS variables.</p>
            </div>
          </div>

          {/* Scaffold Status Placeholder Card */}
          <PlaceholderCard
            badge="Scaffold Core"
            subtitle="The homepage is structured with modular design tokens, server layout wrappers, and accessible landmark HTML elements."
          />
        </Container>
      </Section>
    </div>
  );
}
