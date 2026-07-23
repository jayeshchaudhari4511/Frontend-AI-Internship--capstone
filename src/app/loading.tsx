import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function Loading() {
  return (
    <Section ariaLabel="Page loading">
      <Container className="space-y-lg">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-muted/80" />
        <div className="h-5 w-96 animate-pulse rounded-md bg-muted/60" />

        <div className="rounded-xl border border-border/80 bg-card/60 p-xl shadow-xl backdrop-blur-md">
          <div className="flex flex-col space-y-md">
            <div className="h-6 w-32 animate-pulse rounded bg-primary/20" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted/70" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted/50" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
