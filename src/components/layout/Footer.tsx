import { Container } from "@/components/ui/Container";
import { JCLockup } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/60 bg-card/60 backdrop-blur-md">
      <Container className="flex flex-col gap-md py-lg sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-xs">
          <JCLockup markSize={30} />
          <p className="text-xs text-muted-foreground pt-xs">
            © {new Date().getFullYear()} Jayesh Chaudhari. AI · ML · Modern Frontend Architecture.
          </p>
        </div>

        {/* Tech Stack & Status Badges */}
        <div className="flex flex-wrap items-center gap-xs text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-sm py-0.5 text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Operational
          </span>
          <span className="rounded-full border border-border/80 bg-muted/60 px-sm py-0.5 text-muted-foreground">
            Next.js 15
          </span>
          <span className="rounded-full border border-border/80 bg-muted/60 px-sm py-0.5 text-muted-foreground">
            React 19
          </span>
          <span className="rounded-full border border-border/80 bg-muted/60 px-sm py-0.5 text-muted-foreground">
            TypeScript
          </span>
          <span className="rounded-full border border-border/80 bg-muted/60 px-sm py-0.5 text-muted-foreground">
            Tailwind CSS
          </span>
        </div>
      </Container>
    </footer>
  );
}
