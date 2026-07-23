"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { JCLockup } from "@/components/ui/Logo";
import { navigationItems } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md transition-colors"
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group transition-opacity hover:opacity-90">
          <JCLockup markSize={34} />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-xs sm:flex">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-md py-xs text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary shadow-inner"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-primary shadow-sm shadow-primary/50" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border/80 bg-card p-xs text-muted-foreground hover:bg-muted hover:text-foreground sm:hidden"
        >
          <svg
            className="h-5 w-5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-card/95 px-md py-sm backdrop-blur-lg sm:hidden">
          <ul className="flex flex-col space-y-xs">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md px-md py-sm text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-primary shadow-sm shadow-primary" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
