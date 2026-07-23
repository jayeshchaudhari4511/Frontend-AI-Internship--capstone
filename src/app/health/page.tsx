import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/metadata";
import type { HealthTodoResponse } from "@/types/health";

export const metadata: Metadata = createPageMetadata(
  "Health",
  "Server-side health diagnostics route verifying JSONPlaceholder API connectivity."
);

type HealthResult =
  | { success: true; data: HealthTodoResponse; status: number; timestamp: string }
  | { success: false; error: string; status: number | null; timestamp: string };

async function getHealthStatus(): Promise<HealthResult> {
  const timestamp = new Date().toISOString();
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      cache: "no-store"
    });

    if (!res.ok) {
      return {
        success: false,
        error: `HTTP Error ${res.status}: ${res.statusText}`,
        status: res.status,
        timestamp
      };
    }

    const data = (await res.json()) as HealthTodoResponse;
    return {
      success: true,
      data,
      status: res.status,
      timestamp
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error occurred",
      status: null,
      timestamp
    };
  }
}

export default async function HealthPage() {
  const health = await getHealthStatus();

  return (
    <Section ariaLabel="Health status diagnostics">
      <Container className="space-y-xl">
        <PageHeader
          eyebrow="Server-Side Diagnostics"
          title="System Health"
          description="Live server-side telemetry verifying JSONPlaceholder API integration with cache: 'no-store'."
        />

        {/* Metric Cards */}
        <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
          {/* Health Status */}
          <div
            className={`rounded-xl border p-lg shadow-lg backdrop-blur-md ${
              health.success
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-rose-500/30 bg-rose-500/5"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                health.success ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              Health Status
            </p>
            <div className="mt-xs flex items-center gap-xs">
              <span
                className={`h-2.5 w-2.5 animate-pulse rounded-full ${
                  health.success ? "bg-emerald-400" : "bg-rose-400"
                }`}
              />
              <p
                className={`font-display text-2xl font-bold ${
                  health.success ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {health.success ? "Healthy (200)" : "Unhealthy"}
              </p>
            </div>
          </div>

          {/* API Reachable */}
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-lg shadow-lg backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              API Reachable
            </p>
            <p className="mt-xs font-display text-2xl font-bold text-foreground">
              {health.success ? "Yes" : "No"}
            </p>
          </div>

          {/* Cache Strategy */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-lg shadow-lg backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Cache Strategy
            </p>
            <p className="mt-xs font-display text-2xl font-bold text-foreground">
              no-store
            </p>
          </div>

          {/* Component Type */}
          <div className="rounded-xl border border-border/80 bg-card/60 p-lg shadow-lg backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Component Type
            </p>
            <p className="mt-xs font-display text-2xl font-bold text-foreground">
              Server Component
            </p>
          </div>
        </div>

        {/* Telemetry Detail & JSON Response Inspector */}
        <div className="rounded-xl border border-border/80 bg-card/70 p-lg shadow-xl backdrop-blur-md sm:p-xl space-y-md">
          <div className="flex flex-col gap-xs sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-md">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                JSONPlaceholder API Telemetry
              </h3>
              <p className="text-xs text-muted-foreground">
                Target: https://jsonplaceholder.typicode.com/todos/1
              </p>
            </div>
            <span className="rounded-md border border-border/80 bg-muted/60 px-xs py-1 text-xs font-mono text-muted-foreground">
              GET /todos/1
            </span>
          </div>

          {/* Timestamp */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Timestamp
            </p>
            <p className="mt-xs font-mono text-sm text-foreground/90 break-all">
              {health.timestamp}
            </p>
          </div>

          {/* Returned JSON */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-xs">
              Returned JSON
            </p>
            {health.success ? (
              <pre className="overflow-x-auto rounded-lg border border-border/80 bg-muted/90 p-md font-mono text-xs text-emerald-300 shadow-inner">
                {JSON.stringify(health.data, null, 2)}
              </pre>
            ) : (
              <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-md text-xs font-mono text-rose-300">
                Error Details: {health.error}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
