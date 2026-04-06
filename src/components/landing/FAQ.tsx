"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

type Item = { q: string; a: string };

function AccordionItem({ item, open, toggle }: { item: Item; open: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-foreground transition-colors hover:text-primary sm:text-lg"
        aria-expanded={open}
      >
        {item.q}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const t = useTranslations("FAQ");
  const items = t.raw("items") as Item[];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <Section id="faq" className="border-t border-border/60">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="section-eyebrow text-center">{t("eyebrow")}</p>
          <h2 className="section-heading mx-auto mt-3 max-w-xl text-center text-3xl sm:text-4xl">
            {t("title")}
          </h2>
          <div className="mt-12 border-t border-border">
            {items.map((item, i) => (
              <AccordionItem
                key={item.q}
                item={item}
                open={openIdx === i}
                toggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
