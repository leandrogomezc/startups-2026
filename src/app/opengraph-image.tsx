import { ImageResponse } from "next/og";

export const alt =
  "Leandro Gómez Cano — 12 meses, 12 productos. Build in public.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
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
          Build in public · 2026
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
            12 meses. 12 productos.
          </div>
          <div
            style={{
              maxWidth: 720,
              fontSize: 24,
              lineHeight: 1.45,
              color: "#525252",
            }}
          >
            Operación, producto e IA — documentado mes a mes.
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
          <span style={{ fontSize: 18, color: "#737373" }}>Director Regional de Operaciones · tizo</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
