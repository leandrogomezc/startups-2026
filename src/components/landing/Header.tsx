"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Container } from "@/components/ui/Container";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-background/85 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="#inicio"
          className="font-display text-lg tracking-tight text-foreground transition-colors hover:text-accent"
          onClick={close}
        >
          {site.name.split(" ")[0]}{" "}
          <span className="text-muted font-sans text-sm font-normal">— ops & product</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-neutral-100 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-neutral-200 bg-background lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-neutral-100"
                  onClick={close}
                >
                  {link.label}
                </Link>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
