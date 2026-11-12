/** @type {import('next').NextConfig} */

import { buildCsp } from "./csp.mjs";

const csp = buildCsp(process.env.NODE_ENV !== "production");

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Els tests e2e compilen a un directori propi (NEXT_DIST_DIR=.next-e2e) per
  // no trepitjar el `.next` d'un servidor que ja estigui servint.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    // Les 26 imatges ja són WebP redimensionades (624 kB en total) i el runtime
    // és standalone: l'optimitzador hi afegiria un servei amb estat sense guany.
    unoptimized: true,
  },
  experimental: {
    // Converteix els imports de barril (@chakra-ui/react, react-icons) en
    // imports directes del mòdul concret: menys JS a analitzar i executar.
    // framer-motion NO: va trencar el `whileInView` que <Reveal> feia servir
    // abans, i el paral·laxi de Hero/Featured encara en depèn. Només paquets
    // de barril purs.
    optimizePackageImports: ["@chakra-ui/react", "react-icons"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
