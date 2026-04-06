import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/landing/FadeIn";
import { Container } from "@/components/ui/Container";

type Stat = { value: string; label: string };

export async function Stats() {
  const t = await getTranslations("Stats");
  const items = t.raw("items") as Stat[];

  return (
    <div className="border-y border-border bg-muted/40 py-10 dark:bg-muted/20">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {items.map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
