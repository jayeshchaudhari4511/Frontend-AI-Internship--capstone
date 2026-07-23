import Link from "next/link";

import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export default function NotFoundPage() {
  return (
    <Section ariaLabel="Not found">
      <Container className="space-y-xl">
        <PageHeader
          eyebrow="404 Error"
          title="Page Not Found"
          description="The requested page could not be located within the App Router route tree."
        />
        <div className="rounded-xl border border-border/80 bg-card/60 p-xl shadow-xl backdrop-blur-md">
          <p className="font-display text-7xl font-extrabold text-muted-foreground/30">404</p>
          <p className="mt-xs text-sm text-muted-foreground">
            Please check the web address or navigate back to the home page.
          </p>
          <div className="mt-lg">
            <Link href="/" className={buttonStyles({ variant: "primary", size: "md" })}>
              Return Home →
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
