import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
};

export function PageHeader({ title, description, eyebrow, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-sm sm:flex-row sm:items-end sm:justify-between sm:space-y-0", className)}>
      <div className="space-y-xs max-w-3xl">
        {eyebrow && (
          <div className="inline-flex items-center gap-xs rounded-full border border-primary/30 bg-primary/10 px-xs py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-display-sm font-bold tracking-tight text-foreground sm:text-display-md">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        {description ? (
          <p className="text-body text-muted-foreground sm:text-lg">{description}</p>
        ) : null}
      </div>
      {action ? <div className="pt-sm sm:pt-0">{action}</div> : null}
    </div>
  );
}
