import { ImageResponse } from "next/og";

export const alt = "Founders Club — startup ecosystem in Central America";

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

  const headline = isEn
    ? "Founders Club — Central American startup ecosystem"
    : "Founders Club — Ecosistema de startups en Centroamérica";
  const sub = isEn
    ? "Empowering founders with the skills to build and scale their startups."
    : "Potenciando a founders con skills para construir y escalar sus startups.";
  const badge = isEn ? "Founders Club · Central America" : "Founders Club · Centroamérica";
  const footer = "Founders Club";

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
              fontSize: 52,
              lineHeight: 1.08,
              fontWeight: 600,
              color: "#0a0a0a",
              letterSpacing: "-0.03em",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              maxWidth: 900,
              fontSize: 26,
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
          <span style={{ fontWeight: 600 }}>{footer}</span>
          <span style={{ fontSize: 18, color: "#737373" }}>leandro@foundersclub.lat</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
