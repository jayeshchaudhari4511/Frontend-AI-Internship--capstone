import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderCard } from "@/components/ui/PlaceholderCard";
import { Section } from "@/components/ui/Section";

type PlaceholderPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PlaceholderPage({ title, description, eyebrow = "Portfolio Route" }: PlaceholderPageProps) {
  return (
    <Section ariaLabel={title}>
      <Container>
        <PageHeader title={title} description={description} eyebrow={eyebrow} />
        <PlaceholderCard />
      </Container>
    </Section>
  );
}
