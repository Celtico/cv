import type { Metadata } from "next";
import { ColorModeScript } from "@chakra-ui/react";
import { Providers } from "./providers";
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
    <html lang="ca" style={{ colorScheme: "light dark" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ColorModeScript initialColorMode="system" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
