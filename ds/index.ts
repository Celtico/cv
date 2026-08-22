// Vista de llibreria de les primitives del lloc.
//
// El repo és una aplicació Next.js, no un paquet de components: les seccions
// (Hero, Clients, Experience…) llegeixen elles mateixes d'`app/data.ts` i del
// context d'i18n, i per tant no són reutilitzables fora d'aquest CV. El que sí
// que ho és són aquestes cinc primitives i el tema que les sosté, i és el que
// s'empaqueta aquí perquè claude.ai/design hi pugui dissenyar pàgines noves.
//
// Res d'això és codi nou: són reexportacions dels fitxers d'`app/`, que
// segueixen sent l'original. Si toques una primitiva, es toca allà.

export { Section } from "../app/components/Section";
export { Kicker } from "../app/components/Kicker";
export { RichText } from "../app/components/RichText";
export { Reveal } from "../app/components/Reveal";
export { InlineSvg } from "../app/components/InlineSvg";

export { DsProvider } from "./provider";

export { default as theme } from "../app/theme";
export {
  SECTION_ACCENTS,
  ACCENT_SERIES,
  accentStylesheet,
  type AccentName,
  type Mode,
} from "../app/color";
export { MARKUP_SPLIT, stripMarkup } from "../app/markup";
