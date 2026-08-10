import type { Metadata, Viewport } from "next";
import { ColorModeScript } from "@chakra-ui/react";
import { Providers } from "./providers";
import { PwaRegister } from "./components/PwaRegister";
import { profile } from "./data";
import { ACCENT_SUGGESTIONS, deriveAll } from "./color";
import { alternatesFor } from "./seo";

const title = `${profile.name} — Desenvolupador web full-stack i dissenyador a Lleida`;
const description =
  "Desenvolupador full-stack (React, Next.js, NestJS) i dissenyador UX/UI a Balaguer, Lleida. 20+ anys, 422 projectes i 200+ clients. En cerca activa de feina.";
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

// Taula de tokens precalculada al servidor: per a cada accent, els valors ja
// derivats en clar i en fosc. Permet que l'script del <head> pinti el color
// sortejat abans de la primera pintada sense haver de dur-hi la lògica HSL.
// Els neutres del tema no es toquen mai: només varien els accent.*.
const ACCENT_TABLE = ACCENT_SUGGESTIONS.map((hex) => ({
  h: hex,
  l: deriveAll(hex, "light"),
  d: deriveAll(hex, "dark"),
}));

const accentScript = `
(function(){
  try{
    var T=${JSON.stringify(ACCENT_TABLE)};
    var i=-1;
    var q=(location.search.match(/[?&]accent=([0-9a-fA-F]{6})/)||[])[1];
    if(q){var n="#"+q.toLowerCase();for(var k=0;k<T.length;k++){if(T[k].h.toLowerCase()===n){i=k;}}}
    if(i<0){i=Math.floor(Math.random()*T.length);}
    var e=T[i];
    var m=null;
    try{m=localStorage.getItem("chakra-ui-color-mode");}catch(_){}
    if(m!=="dark"&&m!=="light"){m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
    var t=m==="dark"?e.d:e.l;
    var els=[document.documentElement,document.body];
    for(var key in t){
      var v="--chakra-colors-"+key.replace(/\\./g,"-");
      for(var j=0;j<els.length;j++){if(els[j]){els[j].style.setProperty(v,t[key]);}}
    }
    window.__ACCENT__=e.h;
  }catch(err){}
})();
`;

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
        {/* Va aquí i no al <head> perquè necessita que document.body ja existeixi:
            la variable s'ha d'escriure també al body, que és qui duu la classe
            del mode fosc i, per tant, guanyaria sobre l'arrel. */}
        <script dangerouslySetInnerHTML={{ __html: accentScript }} />
        <a className="skip-link" href="#contingut">
          Vés al contingut
        </a>
        <PwaRegister />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
