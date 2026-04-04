import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { InstagramGlyph, LinkedInGlyph } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export async function Footer() {
  const year = new Date().getFullYear();
  const tf = await getTranslations("Footer");

  return (
    <footer className="border-t border-border py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg text-foreground">{site.name}</p>
          </div>
          <div className="flex gap-4">
            <Link
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-2 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInGlyph className="h-5 w-5" />
            </Link>
            <Link
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg p-2 transition-colors"
              aria-label="Instagram"
            >
              <InstagramGlyph className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <p className="mt-10 text-xs text-muted-foreground">
          © {year} {site.name}. {tf("rights")}
        </p>
      </Container>
    </footer>
  );
}
