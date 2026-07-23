import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type JCMarkProps = SVGProps<SVGSVGElement> & {
  size?: number;
  dark?: boolean;
};

export function JCMark({ size = 36, dark = false, className, ...props }: JCMarkProps) {
  const green = "#10B981";
  const sw = 7;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Jayesh Chaudhari Logo"
      className={cn("transition-transform duration-300", className)}
      {...props}
    >
      {/* C arc */}
      <path
        d="M 66,27 A 23,23 0 1,0 66,63"
        stroke={dark ? "#F9FAFB" : "currentColor"}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
      />

      {/* J path */}
      <path
        d="M 51,12 L 51,72 A 14,14 0 0,1 37,86"
        stroke={dark ? "#F9FAFB" : "currentColor"}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Network node */}
      <circle cx="37" cy="86" r="5.5" fill={green} />
    </svg>
  );
}

type JCLockupProps = {
  markSize?: number;
  dark?: boolean;
  className?: string;
  showSubtitle?: boolean;
};

export function JCLockup({
  markSize = 36,
  dark = false,
  className,
  showSubtitle = true
}: JCLockupProps) {
  return (
    <div className={cn("flex items-center gap-sm", className)}>
      <div className="flex shrink-0 items-center justify-center text-primary">
        <JCMark size={markSize} dark={dark} />
      </div>

      <div className="h-7 w-[1px] bg-border/80" />

      <div className="flex flex-col leading-tight">
        <span className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
          Jayesh Chaudhari
        </span>
        {showSubtitle && (
          <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-[11px]">
            AI · ML · Frontend
          </span>
        )}
      </div>
    </div>
  );
}
