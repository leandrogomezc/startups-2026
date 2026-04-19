import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.99] motion-safe:transition-transform",
  secondary:
    "border border-border bg-background text-foreground hover:bg-muted hover:text-foreground",
  ghost: "text-foreground hover:bg-muted",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

/** Enlaces con estilo de botón (CTAs con hash o externos). */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external,
  ariaLabel,
}: ButtonLinkProps) {
  const v = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={v} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={v} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
