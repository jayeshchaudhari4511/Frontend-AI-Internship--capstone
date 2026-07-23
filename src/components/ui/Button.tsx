import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-indigo-500 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-95 hover:shadow-primary/40 focus-visible:outline-primary hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-muted/80 text-foreground border border-border/80 hover:bg-muted hover:border-border focus-visible:outline-foreground",
  outline:
    "border border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/70 focus-visible:outline-primary",
  ghost:
    "bg-transparent text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:outline-foreground"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base"
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}
