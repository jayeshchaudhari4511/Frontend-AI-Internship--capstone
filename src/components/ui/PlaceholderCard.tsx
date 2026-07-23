import { cn } from "@/lib/utils";

type PlaceholderCardProps = {
  className?: string;
  subtitle?: string;
  badge?: string;
};

export function PlaceholderCard({
  className,
  subtitle = "This section is intentionally scaffolded with production-grade architecture and ready for your future feature modules.",
  badge = "Scaffold Ready"
}: PlaceholderCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/80 bg-card/70 p-lg shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 sm:mt-xl sm:p-xl",
        className
      )}
    >
      {/* Decorative ambient lighting inside card */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-xs">
          <div className="inline-flex items-center gap-xs rounded-md border border-accent/30 bg-accent/10 px-sm py-0.5 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {badge}
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground">Coming Soon</h3>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-xs pt-xs sm:pt-0">
          <span className="rounded-md border border-border/60 bg-muted/40 px-xs py-1 text-xs text-muted-foreground">
            Server Component
          </span>
          <span className="rounded-md border border-border/60 bg-muted/40 px-xs py-1 text-xs text-muted-foreground">
            App Router
          </span>
          <span className="rounded-md border border-border/60 bg-muted/40 px-xs py-1 text-xs text-muted-foreground">
            Responsive Layout
          </span>
        </div>
      </div>
    </div>
  );
}
