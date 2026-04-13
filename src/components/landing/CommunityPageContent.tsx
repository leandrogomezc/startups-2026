import { ArrowRight, MessageCircleMore, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/link-button";

const WHATSAPP_URL = "https://chat.whatsapp.com/FjApJat7XITJjge0j89pKE";

export async function CommunityPageContent() {
  const t = await getTranslations("Community");
  const pillars = t.raw("pillars") as Array<{ title: string; body: string }>;

  return (
    <Section className="border-t border-border/60 bg-muted/30 dark:bg-muted/15">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="section-eyebrow">{t("eyebrow")}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{t("title")}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("intro")}</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="inline-flex rounded-full bg-primary/10 p-3 text-primary">
                  <Users className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t("ctaEyebrow")}</p>
                <h2 className="mt-3 text-3xl font-bold text-foreground">{t("ctaTitle")}</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("ctaBody")}</p>
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-5 dark:bg-muted/15">
                <div className="flex items-center gap-3 text-foreground">
                  <MessageCircleMore className="h-5 w-5 text-primary" aria-hidden />
                  <p className="font-semibold">{t("ctaCardTitle")}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("ctaCardBody")}</p>
                <ButtonLink href={WHATSAPP_URL} external className="mt-5 min-h-[52px] w-full px-6 text-base font-semibold">
                  {t("ctaButton")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
