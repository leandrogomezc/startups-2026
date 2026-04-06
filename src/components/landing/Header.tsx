"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

const NAV_KEYS = [
  { id: "inicio", labelKey: "home" as const, href: "/#inicio" },
  { id: "sobre-mi", labelKey: "about" as const, href: "/#sobre-mi" },
  { id: "clases", labelKey: "classes" as const, href: "/#clases" },
  { id: "reto", labelKey: "challenge" as const, href: "/#reto" },
  { id: "roadmap", labelKey: "roadmap" as const, href: "/#roadmap" },
  { id: "tesis", labelKey: "thesis" as const, href: "/#tesis" },
] as const;

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
        <Link
          href="/#inicio"
          className="font-display min-w-0 shrink text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
          onClick={close}
        >
          {site.name.split(" ")[0]}
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <nav className="flex items-center gap-0.5" aria-label={tc("navLabel")}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ml-2 flex items-center gap-2 border-l border-border pl-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link
              href="/#clases"
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              {t("classes")}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
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
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-muted"
                  onClick={close}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#clases"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={close}
              >
                {t("classes")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
