import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/ui/PlaceholderPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "About",
  "About page placeholder for your portfolio profile and story."
);

export default function AboutPage() {
  return (
    <PlaceholderPage
      eyebrow="Profile & Experience"
      title="About Me"
      description="Professional background, career highlights, engineering philosophy, and skill stack."
    />
  );
}
