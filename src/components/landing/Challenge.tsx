import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/landing/FadeIn";
import { challengeCopy } from "@/lib/site";

export function Challenge() {
  return (
    <Section id="reto" className="bg-white">
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {challengeCopy.eyebrow}
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl tracking-tight text-foreground sm:text-4xl">
            {challengeCopy.title}
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {challengeCopy.blocks.map((block, i) => (
            <FadeIn key={block.label} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-xl border border-neutral-200 bg-background p-6 transition-shadow hover:shadow-sm">
                <h3 className="text-sm font-semibold text-foreground">{block.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{block.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
