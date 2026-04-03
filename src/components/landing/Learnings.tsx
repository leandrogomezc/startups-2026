import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type Note = {
  tag: string;
  tagMicrocopy: string;
  title: string;
  body: string;
};

export async function Learnings() {
  const t = await getTranslations("Learnings");
  const notes = t.raw("notes") as Note[];

  return (
    <Section id="aprendizajes" className="bg-muted/30">
      <Container>
        <FadeIn>
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">{t("eyebrow")}</p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-foreground sm:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {notes.map((note, i) => (
            <FadeIn key={note.title} delay={i * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-colors hover:border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-semibold dark:bg-primary/20">
                    {note.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">{note.tagMicrocopy}</span>
                </div>
                <h3 className="font-display mt-4 text-xl text-foreground">{note.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{note.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
