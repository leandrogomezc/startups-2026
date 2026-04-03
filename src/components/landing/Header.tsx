"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

const NAV_KEYS = [
  { id: "inicio", labelKey: "home" as const, href: "#inicio" },
  { id: "sobre-mi", labelKey: "about" as const, href: "#sobre-mi" },
  { id: "reto", labelKey: "challenge" as const, href: "#reto" },
  { id: "clases", labelKey: "classes" as const, href: "#clases" },
  { id: "roadmap", labelKey: "roadmap" as const, href: "#roadmap" },
  { id: "aprendizajes", labelKey: "learnings" as const, href: "#aprendizajes" },
  { id: "tesis", labelKey: "thesis" as const, href: "#tesis" },
  { id: "cta-final", labelKey: "follow" as const, href: "#cta-final" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");

  const close = useCallback(() => setOpen(false), []);

  const links = useMemo(
    () =>
      NAV_KEYS.map((item) => ({
        ...item,
        label: t(item.labelKey),
      })),
    [t]
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-3 sm:h-16">
        <a
          href="#inicio"
          className="font-display min-w-0 shrink text-lg tracking-tight text-foreground transition-colors hover:text-primary"
          onClick={close}
        >
          {site.name.split(" ")[0]}{" "}
          <span className="text-muted-foreground font-sans text-sm font-normal">{t("brandSubtitle")}</span>
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          <nav className="flex items-center gap-0.5" aria-label={tc("navLabel")}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="ml-2 flex items-center gap-2 border-l border-border pl-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? tc("closeMenu") : tc("openMenu")}</span>
            {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border bg-background lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-muted"
                  onClick={close}
                >
                  {link.label}
                </a>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
