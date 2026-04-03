import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/landing/FadeIn";
import { aboutCopy, site } from "@/lib/site";

export function About() {
  return (
    <Section id="sobre-mi">
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {aboutCopy.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-foreground sm:text-4xl">
            Operación y producto, en el mismo plano
          </h2>
          <p className="mt-4 text-lg font-medium text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-neutral-600">
            {site.role} · {site.company}
          </p>
          <div className="mt-10 max-w-2xl space-y-6 border-l-2 border-neutral-200 pl-6 sm:pl-8">
            <p className="text-lg leading-relaxed text-foreground">{aboutCopy.lead}</p>
            <p className="text-base leading-relaxed text-muted">{aboutCopy.body}</p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
