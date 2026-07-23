import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/ui/PlaceholderPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Projects",
  "Projects page placeholder for featured frontend work."
);

export default function ProjectsPage() {
  return (
    <PlaceholderPage
      eyebrow="Work Showcase"
      title="Featured Projects"
      description="Curated collection of web applications, component libraries, and interactive digital products."
    />
  );
}
