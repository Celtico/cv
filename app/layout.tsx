import type { Metadata, Viewport } from "next";
import { ColorModeScript } from "@chakra-ui/react";
import { Providers } from "./providers";
import { PwaRegister } from "./components/PwaRegister";
import { profile } from "./data";


const title = `${profile.name} — Dissenyador i Desenvolupador full-stack`;
const description =
  "20+ anys construint producte digital de principi a fi: del briefing i el disseny al codi, la infraestructura i el SEO. Autodidacta, polivalent i orientat a resoldre. 422 projectes · 200+ clients.";
const siteUrl = "https://serverscel.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Celestí Ticó Petit",
    "desenvolupador web",
    "full-stack",
    "React",
    "Next.js",
    "NestJS",
    "Chakra UI",
    "Balaguer",
    "Lleida",
    "dissenyador web",
    "currículum",
    "CV",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    locale: "ca_ES",
    alternateLocale: ["es_ES", "en_US"],
    url: siteUrl,
    title,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  appleWebApp: {
    capable: true,
    title: "Cel · CV",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECE5D5" },
    { media: "(prefers-color-scheme: dark)", color: "#141210" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.nick,
  jobTitle: "Dissenyador i Desenvolupador full-stack",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Balaguer",
    addressRegion: "Lleida",
    addressCountry: "ES",
  },
  knowsAbout: ["React", "Next.js", "NestJS", "TypeScript", "Docker", "UX/UI", "LangChain"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Chakra ajusta color-scheme (i la classe del body) abans de la hidratació
    // segons el mode desat; els suppressHydrationWarning eviten els avisos
    // d'atributs desajustats en desenvolupament.
    <html lang="ca" style={{ colorScheme: "light dark" }} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* L'script de mode de color de Chakra posa la classe chakra-ui-light/dark
          al body abans de la hidratació; sense això React avisa d'un atribut
          "class" extra en mode desenvolupament. */}
      <body suppressHydrationWarning>
        <ColorModeScript initialColorMode="system" />
        <PwaRegister />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
