/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // Els tests e2e compilen a un directori propi (NEXT_DIST_DIR=.next-e2e) per
  // no trepitjar el `.next` d'un servidor que ja estigui servint.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    unoptimized: true,
  },
  experimental: {
    // Converteix els imports de barril (@chakra-ui/react, react-icons) en
    // imports directes del mòdul concret: menys JS a analitzar i executar.
    // framer-motion NO: trencava el `whileInView` de <Reveal> i les seccions
    // es quedaven a opacity:0. Només paquets de barril purs.
    optimizePackageImports: ["@chakra-ui/react", "react-icons"],
  },
};

export default nextConfig;
