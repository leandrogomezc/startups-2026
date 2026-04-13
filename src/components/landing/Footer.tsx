import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { InstagramGlyph } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export async function Footer() {
  const year = new Date().getFullYear();
  const tf = await getTranslations("Footer");

  return (
    <footer className="border-t border-border bg-muted/30 py-14 dark:bg-muted/10">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-display text-lg font-bold text-foreground">{site.brandName}</p>
          <div className="flex items-center gap-3">
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
        <p className="mt-8 text-center text-xs text-muted-foreground sm:text-left">
          © {year} {site.brandName}. {tf("rights")}
        </p>
      </Container>
    </footer>
  );
}
