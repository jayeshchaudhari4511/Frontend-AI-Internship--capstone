import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type SectionProps = PropsWithChildren<{
  className?: string;
  ariaLabel?: string;
}>;

export function Section({ className, ariaLabel, children }: SectionProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn("py-xl sm:py-2xl", className)}
    >
      {children}
    </section>
  );
}
