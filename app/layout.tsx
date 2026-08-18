import type { Metadata, Viewport } from "next";
import { ColorModeScript } from "@chakra-ui/react";
import { Providers } from "./providers";
import { PwaRegister } from "./components/PwaRegister";
import { profile } from "./data";
import { accentStylesheet } from "./color";
import { alternatesFor } from "./seo";

const title = `${profile.name} — Desenvolupador web full-stack i dissenyador a Lleida`;
const description =
  "Desenvolupador full-stack (React, Next.js, NestJS) i dissenyador UX/UI a Balaguer, Lleida. 25 anys, 422 projectes i 200+ clients. En cerca activa de feina.";
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
  // canonical + hreflang de les tres llengües
  alternates: alternatesFor("ca"),
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

// El @id converteix la persona en una entitat referenciable: el blog hi apunta
// en comptes de duplicar-la, i sameAs lliga el domini amb el perfil verificable.
const personId = `${siteUrl}/#person`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  alternateName: profile.nick,
  jobTitle: "Dissenyador i Desenvolupador full-stack",
  email: `mailto:${profile.email}`,
  url: siteUrl,
  image: `${siteUrl}/img/cel-tico-petit.webp`,
  // El telèfon es queda fora de les dades estructurades a posta: al bloc de
  // contacte el veu una persona, aquí se l'emportaria qualsevol recol·lector.
  sameAs: [profile.linkedin, profile.company],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Balaguer",
    addressRegion: "Lleida",
    addressCountry: "ES",
  },
  knowsAbout: ["React", "Next.js", "NestJS", "TypeScript", "Docker", "UX/UI", "LangChain", "Odoo"],
  knowsLanguage: [
    { "@type": "Language", name: "Catalan" },
    { "@type": "Language", name: "Spanish" },
    { "@type": "Language", name: "English" },
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Desenvolupador full-stack",
    occupationLocation: { "@type": "City", name: "Lleida" },
    skills: "React, Next.js, NestJS, TypeScript, Docker, UX/UI, LangChain, Odoo",
  },
  // `seeks` és la propietat correcta per a un candidat. Un JobPosting el
  // publica un ocupador: posar-ne un aquí seria spam estructurat.
  seeks: {
    "@type": "Demand",
    name: "Posició de desenvolupador full-stack",
  },
};

// Els tokens d'accent de cada secció, com a CSS estàtic. Es calcula una sola
// vegada en prerenderitzar; no hi ha res que s'executi al navegador.
const accentCss = accentStylesheet();

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
        <style dangerouslySetInnerHTML={{ __html: accentCss }} />
      </head>
      {/* L'script de mode de color de Chakra posa la classe chakra-ui-light/dark
          al body abans de la hidratació; sense això React avisa d'un atribut
          "class" extra en mode desenvolupament. */}
      <body suppressHydrationWarning>
        <ColorModeScript initialColorMode="system" />
        <a className="skip-link" href="#contingut">
          Vés al contingut
        </a>
        <PwaRegister />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
