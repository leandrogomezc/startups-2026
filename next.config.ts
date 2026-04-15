import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  /** Consolida la variante apex en www (coincide con env.example y NEXT_PUBLIC_SITE_URL). */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "foundersclub.lat" }],
        destination: "https://www.foundersclub.lat/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
