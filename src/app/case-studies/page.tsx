import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/ui/PlaceholderPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Case Studies",
  "Case studies page placeholder for deep-dive project narratives."
);

export default function CaseStudiesPage() {
  return (
    <PlaceholderPage
      eyebrow="Architecture Narratives"
      title="Engineering Case Studies"
      description="Deep dives into technical challenges, architectural trade-offs, performance optimizations, and measured results."
    />
  );
}
