import { ImageResponse } from "next/og";

export const alt = "Leandro Gómez Cano — build in public";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Image({ params }: Props) {
  const { locale } = await params;
  const isEn = locale === "en";

  const headline = isEn ? "Learn with AI. Ship real projects." : "Clases con IA. Proyectos reales.";
  const sub = isEn
    ? "Hands-on cohort courses + monthly build in public."
    : "Formación en cohortes + reto mensual build in público.";
  const badge = isEn ? "Hands-on training · AI · 2026" : "Formación práctica · IA · 2026";
  const role = isEn
    ? "Regional Director of Operations · tizo"
    : "Director Regional de Operaciones · tizo";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(165deg, #fafafa 0%, #ffffff 45%, #eef2ff 100%)",
          padding: 64,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#525252",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#4f46e5",
            }}
          />
          {badge}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 400,
              color: "#0a0a0a",
              letterSpacing: "-0.03em",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              maxWidth: 720,
              fontSize: 24,
              lineHeight: 1.45,
              color: "#525252",
            }}
          >
            {sub}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#171717",
          }}
        >
          <span style={{ fontWeight: 600 }}>Leandro Gómez Cano</span>
          <span style={{ fontSize: 18, color: "#737373" }}>{role}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
