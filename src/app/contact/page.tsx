import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/ui/PlaceholderPage";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Contact",
  "Contact page placeholder for collaborations and inquiries."
);

export default function ContactPage() {
  return (
    <PlaceholderPage
      eyebrow="Get In Touch"
      title="Contact & Collaboration"
      description="Inquiries, technical consulting, project proposals, or professional connections."
    />
  );
}
