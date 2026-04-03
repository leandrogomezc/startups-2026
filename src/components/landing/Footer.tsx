import Link from "next/link";
import { InstagramGlyph, LinkedInGlyph } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg text-foreground">{site.name}</p>
            <p className="mt-1 text-sm text-muted">
              {site.role} · {site.company}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted transition-colors hover:bg-neutral-100 hover:text-foreground"
              aria-label="LinkedIn"
            >
              <LinkedInGlyph className="h-5 w-5" />
            </Link>
            <Link
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted transition-colors hover:bg-neutral-100 hover:text-foreground"
              aria-label="Instagram"
            >
              <InstagramGlyph className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <p className="mt-10 text-xs text-neutral-500">
          © {year} {site.name}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
