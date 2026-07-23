"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section ariaLabel="Application error">
      <Container className="space-y-xl">
        <PageHeader
          eyebrow="Runtime Exception"
          title="Something went wrong"
          description="An unexpected runtime exception was caught by the App Router error boundary."
        />
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-xl shadow-xl backdrop-blur-md">
          <p className="text-sm font-medium text-rose-300">
            {error.message || "An unhandled runtime error occurred."}
          </p>
          <div className="mt-lg">
            <Button type="button" variant="primary" onClick={reset}>
              Try Again ↻
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
