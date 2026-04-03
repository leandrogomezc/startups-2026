import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/landing/FadeIn";
import { thesisStatements } from "@/lib/site";

export function Thesis() {
  return (
    <Section id="tesis">
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Mi tesis</p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-foreground sm:text-4xl">
            Ideas en las que apuesto
          </h2>
        </FadeIn>

        <ol className="mt-14 max-w-3xl space-y-0 border-l border-neutral-200 pl-6 sm:pl-10">
          {thesisStatements.map((line, i) => (
            <FadeIn key={line} delay={i * 0.06}>
              <li className="relative pb-10 pl-2 last:pb-0 sm:pb-12">
                <span
                  className="absolute -left-[calc(0.25rem+1px)] top-1.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-neutral-200 bg-background text-xs font-semibold text-muted"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <p className="font-display text-xl leading-snug text-foreground sm:text-2xl">{line}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
