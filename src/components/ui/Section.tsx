import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Offset for sticky header (~4rem) */
  scrollMargin?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  scrollMargin = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${scrollMargin ? "scroll-mt-20" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
