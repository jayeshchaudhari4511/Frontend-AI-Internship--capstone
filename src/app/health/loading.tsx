import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function HealthLoading() {
  return (
    <Section ariaLabel="Loading health telemetry">
      <Container className="space-y-xl">
        <PageHeader
          eyebrow="Server-Side Diagnostics"
          title="System Health"
          description="Fetching real-time API health telemetry from JSONPlaceholder..."
        />

        {/* Metric Skeletons */}
        <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl border border-border/60 bg-card/40 p-lg backdrop-blur-md"
            >
              <div className="h-3 w-20 rounded bg-muted/80" />
              <div className="mt-md h-7 w-28 rounded bg-muted/60" />
            </div>
          ))}
        </div>

        {/* Payload Skeleton */}
        <div className="h-64 animate-pulse rounded-xl border border-border/60 bg-card/40 p-xl backdrop-blur-md">
          <div className="h-5 w-48 rounded bg-muted/80" />
          <div className="mt-md h-4 w-64 rounded bg-muted/60" />
          <div className="mt-lg h-32 w-full rounded-lg bg-muted/40" />
        </div>
      </Container>
    </Section>
  );
}
