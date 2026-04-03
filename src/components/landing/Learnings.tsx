import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/landing/FadeIn";
import { learnings } from "@/lib/site";

export function Learnings() {
  return (
    <Section id="aprendizajes" className="bg-white">
      <Container>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Aprendizajes
          </p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-foreground sm:text-4xl">
            Bitácora del proceso
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Notas breves, sin postureo. Lo que importa es qué cambió el criterio.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {learnings.map((note, i) => (
            <FadeIn key={note.title} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-background p-6 transition-colors hover:border-neutral-300">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-accent-muted px-2 py-0.5 text-xs font-semibold text-accent">
                    {note.tag}
                  </span>
                  <span className="text-xs text-neutral-500">{note.tagMicrocopy}</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-foreground">{note.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{note.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
