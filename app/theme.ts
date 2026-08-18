"use client";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system", // primera visita = tema del sistema
  useSystemColorMode: false, // després respecta i recorda la tria del botó
};

// Blanc pur de dia, negre pur de nit: la parella de màxim contrast. Els
// accents ja no els sorteja ningú — cada secció duu el seu i els publica
// `accentStylesheet()` (app/color.ts). Els accent.* d'aquí són els de l'ambre,
// que fa de color per defecte fora de les seccions.
const theme = extendTheme({
  config,
  fonts: {
    // Titulars de pal sec des del 2026-08-18. La serif («ui-serif, New York,
    // Georgia») donava un aire de diari que xoca amb la resta del llenguatge;
    // el que sosté una pàgina com aquesta és un pal sec gros i atapeït. Cap
    // font descarregada: system-ui ja és SF Pro a macOS i Segoe a Windows.
    heading: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  },
  // Escala de mides pujada un punt respecte de la de Chakra (md passa de 16 a
  // 17 px). Es toca aquí i no als components perquè els creixi el text sense
  // que creixi també l'espaiat, que va en rem per la seva banda.
  fontSizes: {
    xs: "0.875rem", // 14
    sm: "1rem", // 16
    md: "1.125rem", // 18
    lg: "1.3125rem", // 21
    xl: "1.5rem", // 24
    "2xl": "1.875rem", // 30
  },
  radii: {
    // La làmina de paper de 2 px es va retirar el 2026-08-18: les targetes són
    // blocs de color massís amb cantonada rodona i els controls, pastilles.
    plate: "14px",
    control: "999px",
  },
  // Escala tipogràfica del sistema. Abans cada component inventava la seva:
  // 16 parells de mides, 13 valors de letterSpacing i la mateixa microetiqueta
  // amb sis mides diferents. Els papers són aquests cinc i prou.
  textStyles: {
    display: {
      fontFamily: "heading",
      fontWeight: 700,
      fontSize: { base: "4rem", md: "8rem" },
      lineHeight: "0.9",
      letterSpacing: "-0.045em",
    },
    sectionTitle: {
      fontFamily: "heading",
      fontWeight: 700,
      fontSize: { base: "3rem", md: "4.6rem" },
      lineHeight: "0.98",
      letterSpacing: "-0.035em",
    },
    cardTitle: {
      fontFamily: "heading",
      fontWeight: 700,
      fontSize: { base: "1.7rem", md: "2rem" },
      lineHeight: "1.15",
      letterSpacing: "-0.025em",
    },
    kicker: {
      fontFamily: "mono",
      fontWeight: 500,
      fontSize: "0.75rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
    },
    // Encapçalament de columna: la mateixa veu monoespaiada que `micro`, però
    // amb cos de lectura. `micro` és per a etiquetes al marge; això encapçala
    // una llista i s'ha de poder llegir d'una passada.
    groupLabel: {
      fontFamily: "mono",
      fontWeight: 500,
      fontSize: "sm",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
    },
    micro: {
      fontFamily: "mono",
      fontSize: "0.75rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
    },
  },
  // Chakra dona al Heading una mida per defecte (size="xl", 36 px) que es
  // resol com a estil de component i, per tant, guanya sobre `textStyle`. El
  // resultat era que `display` i `sectionTitle` no pintaven mai la seva mida i
  // cada component s'havia acabat escrivint un `fontSize` a mà per sobre.
  // Anul·lant la mida per defecte, els textStyles tornen a manar.
  components: {
    Heading: {
      defaultProps: { size: null },
    },
    // Els botons de crida a l'acció eren els mateixos vint props copiats a
    // Hero, Featured i Contact. Ara són dues variants i una mida.
    //
    // La principal no duu el color de marca sinó el contrast màxim —blanc amb
    // text negre de nit, negre amb text blanc de dia—, que és com la resol
    // JetBrains: el color ja el posa el fons, i el botó ha de ser el punt més
    // clar de la pantalla. `bg.inverted`/`fg.inverted` són la parella que ja
    // comprova `tests/contrast.test.ts`; en passar-hi el ratolí es tomba cap a
    // `accent.solid`/`accent.contrast`, que també ho és.
    Button: {
      sizes: {
        pill: { h: "56px", px: 8, fontSize: "md", borderRadius: "control" },
      },
      variants: {
        pillSolid: {
          bg: "bg.inverted",
          color: "fg.inverted",
          fontWeight: 600,
          _hover: { bg: "accent.solid", color: "accent.contrast", textDecoration: "none" },
        },
        pillOutline: {
          bg: "transparent",
          color: "fg",
          fontWeight: 500,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "border.emphasized",
          _hover: { borderColor: "accent.solid", color: "accent.fg", textDecoration: "none" },
        },
      },
    },
  },
  // Estil de làmina compartit per totes les targetes (projectes, destacats).
  // Abans cada component es repetia el mateix `border="1px solid"`; ara la
  // contundència es toca en un sol lloc. La cinta superior pren el color de la
  // secció, de manera que la mateixa targeta canta diferent a cada apartat.
  layerStyles: {
    // Targeta de banda neta: fons igual que la secció i un filet prim. Sobre
    // negre, el que la defineix és la vora, no cap farciment.
    plate: {
      bg: "bg",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "border.emphasized",
      borderRadius: "plate",
      overflow: "hidden",
      transition: "border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease",
      _hover: {
        borderColor: "accent.solid",
        transform: "translateY(-4px)",
        boxShadow: "0 22px 45px -24px var(--chakra-colors-accent-solid)",
      },
    },
    // Rajola de banda de color: degradat en diagonal, de la cantonada neta a
    // la de color, que és com JetBrains hi aplica el color. Els dos extrems
    // són superfícies verificades, de manera que el text hi aguanta a tot
    // arreu.
    plateTinted: {
      bgGradient: "linear(to-br, bg, accent.surface)",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "accent.dot",
      borderRadius: "plate",
      overflow: "hidden",
      transition: "border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease",
      _hover: {
        borderColor: "accent.solid",
        transform: "translateY(-4px)",
        boxShadow: "0 22px 45px -24px var(--chakra-colors-accent-solid)",
      },
    },
    // Pastilla d'etiqueta: color massís i cantonada completa, sense filet.
    chip: {
      bg: "accent.chip",
      color: "fg",
      borderRadius: "control",
      px: 3,
      py: 1.5,
    },
  },
  // Semantic tokens amb la nomenclatura de Chakra
  // (https://chakra-ui.com/docs/theming/colors#semantic-tokens):
  // bg / fg / border per rols, i la paleta accent.* + gray.emphasized.
  // Extensions pròpies del disseny: accent.dot (marca decorativa),
  // accent.inverted i bg.nav (barra translúcida).
  //
  // ATENCIÓ: els neutres d'aquesta taula estan duplicats a NEUTRAL_DEFAULTS
  // (app/color.ts), que és contra qui es comprova el contrast dels accents. Si
  // en canvies un, canvia'l als dos llocs. Els accent.* d'aquí són exactament
  // el que retorna deriveAll(SECTION_ACCENTS.base, mode) — l'ambre.
  semanticTokens: {
    colors: {
      bg: { default: "#FFFFFF", _dark: "#000000" },
      "bg.subtle": { default: "#F4F4F5", _dark: "#111113" },
      "bg.panel": { default: "#FFFFFF", _dark: "#0A0A0B" },
      "bg.muted": { default: "blackAlpha.50", _dark: "whiteAlpha.100" },
      "bg.inverted": { default: "#000000", _dark: "#FFFFFF" }, // bloc invertit: el contrari del bg
      "bg.nav": { default: "rgba(255,255,255,0.82)", _dark: "rgba(0,0,0,0.8)" },
      fg: { default: "#0A0A0A", _dark: "#FFFFFF" },
      // El fons exigent per als grisos és bg.subtle, no el blanc/negre pur
      "fg.muted": { default: "#575757", _dark: "#A1A1A1" },
      "fg.subtle": { default: "#666666", _dark: "#8A8A8A" },
      "fg.inverted": { default: "#FFFFFF", _dark: "#0A0A0A" },
      "fg.inverted.muted": { default: "#A1A1A1", _dark: "#575757" },
      border: { default: "blackAlpha.300", _dark: "whiteAlpha.300" },
      "border.emphasized": { default: "blackAlpha.500", _dark: "whiteAlpha.400" },
      "border.inverted": { default: "whiteAlpha.400", _dark: "blackAlpha.400" },
      "gray.emphasized": { default: "#D4D4D8", _dark: "#3F3F46" }, // vel de les fotos
      "gray.contrast": { default: "#FAFAFA", _dark: "#0A0A0B" }, // panell separat del fons pur
      "accent.fg": { default: "#9b5c11", _dark: "#E8912A" }, // ambre segur com a text
      "accent.dot": { default: "#d27d17", _dark: "#E8912A" }, // marca decorativa
      "accent.solid": { default: "#E8912A", _dark: "#E8912A" }, // fons de botó ple
      "accent.emphasized": { default: "#eba24a", _dark: "#eba24a" }, // hover del sòlid
      "accent.contrast": { default: "#0A0A0A", _dark: "#0A0A0A" }, // text sobre accent.solid
      "accent.muted": { default: "rgba(232,145,42,0.2)", _dark: "rgba(232,145,42,0.2)" }, // pista dels anells
      "accent.inverted": { default: "#E8912A", _dark: "#a46112" },
      // Superfícies plenes: la separació la fa el farciment, no cap filet
      "accent.deep": { default: "#a46112", _dark: "#a46112" }, // pastilla d'etiqueta
      "accent.deep.fg": { default: "#FFFFFF", _dark: "#FFFFFF" }, // sempre blanc a sobre
      "accent.panel": { default: "#fdf5ec", _dark: "#2e1d08" }, // fons de secció
      "accent.surface": { default: "#fbeddd", _dark: "#4f310e" }, // targetes
      "accent.chip": { default: "#f9e2c8", _dark: "#6f4614" }, // pastilles
      // Tinta de les il·lustracions (làmines fosques dels SVG inline): igual
      // en tots dos modes.
      "ink.bg": { default: "#0A0A0A", _dark: "#0A0A0A" },
      "ink.subtle": { default: "#141416", _dark: "#141416" },
      "ink.border": { default: "#3F3F46", _dark: "#3F3F46" },
      "ink.border.subtle": { default: "#242427", _dark: "#242427" },
      "ink.fg": { default: "#FFFFFF", _dark: "#FFFFFF" },
      "ink.fg.muted": { default: "#A1A1A1", _dark: "#A1A1A1" },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "bg",
        color: "fg",
        scrollBehavior: "smooth",
      },
      body: {
        fontSize: "md",
        lineHeight: "1.65",
      },
      "::selection": {
        bg: "accent.solid",
        color: "accent.contrast",
      },
      // Indicador de focus únic per a tot el lloc: abans cada component se'l
      // pintava (o se'l menjava) pel seu compte i els swatches del selector de
      // color en quedaven sense cap.
      "*:focus-visible": {
        outline: "3px solid",
        outlineColor: "accent.dot",
        outlineOffset: "2px",
        borderRadius: "2px",
      },
      // Salt al contingut per a qui navega amb teclat: la barra té 9 enllaços
      // i 5 botons abans del primer titular.
      ".skip-link": {
        position: "absolute",
        left: "-9999px",
        top: 0,
        zIndex: 100,
        bg: "accent.solid",
        color: "accent.contrast",
        px: 4,
        py: 3,
        fontSize: "sm",
        fontWeight: 600,
        borderRadius: "0 0 2px 0",
        _focusVisible: {
          left: 0,
        },
      },
      // iOS fa zoom automàtic quan un camp té la font per sota de 16px.
      "input, select, textarea": {
        fontSize: "16px",
      },
      // Herència de quan els titulars eren serif: Georgia fa xifres d'estil
      // antic per defecte. Es queda perquè no costa res i cobreix qualsevol
      // fallback que en tingui ("422 projectes" no ha de ballar sobre la línia
      // de base).
      "h1, h2, h3, h4": {
        fontVariantNumeric: "lining-nums",
      },
      ".tnum": {
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: "'tnum' 1",
      },
      // Només mou. L'opacitat NO va aquí: mentre hi era, els fotogrames la
      // fixaven i el valor que posés l'element quedava sense efecte —pujar-lo
      // no feia res—. El color el posen `glow1`/`glow2`.
      "@keyframes glowDrift": {
        "0%, 100%": { transform: "translate(0,0) scale(1)" },
        "50%": { transform: "translate(1.5%, 2.5%) scale(1.05)" },
      },
      "@media (prefers-reduced-motion: reduce)": {
        "*": {
          animationDuration: "0.001ms !important",
          animationIterationCount: "1 !important",
          // les transicions CSS també entren aquí: abans en quedaven fora i la
          // barra i les fotos seguien movent-se
          transitionDuration: "0.001ms !important",
          scrollBehavior: "auto !important",
        },
      },
    },
  },
});

export default theme;
