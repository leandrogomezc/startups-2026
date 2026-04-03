import type { Metadata } from "next";
import { IBM_Plex_Sans, Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Leandro Gómez Cano — 12 productos en 12 meses",
    template: "%s · Leandro Gómez Cano",
  },
  description:
    "Director Regional de Operaciones en tizo. Lanzo una idea de producto por mes hasta fin de año y documento el proceso en público: startups, operaciones, growth, IA y ejecución.",
  keywords: [
    "Leandro Gómez Cano",
    "operaciones",
    "startups",
    "producto",
    "inteligencia artificial",
    "build in public",
    "Latam",
    "tizo",
  ],
  authors: [{ name: "Leandro Gómez Cano" }],
  openGraph: {
    type: "website",
    locale: "es_NI",
    url: siteUrl,
    siteName: "Leandro Gómez Cano",
    title: "Leandro Gómez Cano — 12 productos en 12 meses",
    description:
      "Un producto nuevo cada mes hasta diciembre. Documentación pública del proceso, decisiones y métricas. Operaciones, growth e IA aplicada.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leandro Gómez Cano — 12 productos en 12 meses",
    description:
      "Build in public: lanzamientos mensuales, aprendizajes y resultados. Operador de startups y producto.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("h-full", "scroll-smooth", "antialiased", instrument.variable, ibmPlex.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
