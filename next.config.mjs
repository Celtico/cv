/** @type {import('next').NextConfig} */

// En DESENVOLUPAMENT, Fast Refresh de Next avalua codi amb eval() i la seva
// connexió d'HMR va per websocket. Sense les excepcions de sota, el runtime de
// react-refresh peta amb EvalError, la hidratació no s'acaba mai i TOTS els
// components de client queden morts (botó de tema, commutador d'idioma...).
// En producció no s'emeten.
const isDev = process.env.NODE_ENV !== "production";

// CSP compatible amb aquest projecte tal com és:
// - Emotion (Chakra v2) injecta etiquetes <style> en línia,
// - layout.tsx fa dangerouslySetInnerHTML per al JSON-LD i per a l'script
//   d'accent, i Next n'afegeix de propis (self.__next_f.push),
// així que 'unsafe-inline' és obligatori a script-src i style-src.
// 'unsafe-eval' NO cal en producció.
//
// Endurir-ho amb nonce exigiria llegir headers() a cada petició, cosa que
// converteix el layout en dinàmic i fa perdre el rendering estàtic de tot el
// lloc. En un CV sense entrades d'usuari, no compensa.
//
// HSTS no va aquí: només s'ha d'emetre sobre HTTPS i el TLS el fa el Nginx del
// host. Vegeu REVISIO-2026-08.md per a la línia d'Nginx i l'avís sobre
// includeSubDomains.
export const buildCsp = (dev = isDev) => [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'", // tipografies del sistema, cap host extern
  `connect-src 'self'${dev ? " ws: wss:" : ""}`,
  "manifest-src 'self'",
  "worker-src 'self'", // sw.js
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const csp = buildCsp();

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
