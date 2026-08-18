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
    heading: "ui-serif, 'New York', Georgia, 'Times New Roman', serif",
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  },
  // Escala de mides pujada un punt respecte de la de Chakra (md passa de 16 a
  // 17 px). Es toca aquí i no als components perquè els creixi el text sense
  // que creixi també l'espaiat, que va en rem per la seva banda.
  fontSizes: {
    xs: "0.8125rem", // 13
    sm: "0.9375rem", // 15
    md: "1.0625rem", // 17
    lg: "1.1875rem", // 19
    xl: "1.375rem", // 22
    "2xl": "1.625rem", // 26
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
      fontWeight: 400,
      fontSize: { base: "3.5rem", md: "7rem" },
      lineHeight: "0.94",
      letterSpacing: "-0.03em",
    },
    sectionTitle: {
      fontFamily: "heading",
      fontWeight: 500,
      fontSize: { base: "2.6rem", md: "3.8rem" },
      lineHeight: "1.02",
      letterSpacing: "-0.02em",
    },
    cardTitle: {
      fontFamily: "heading",
      fontWeight: 500,
      fontSize: { base: "1.5rem", md: "1.7rem" },
      lineHeight: "1.2",
      letterSpacing: "-0.01em",
    },
    kicker: {
      fontFamily: "mono",
      fontWeight: 500,
      fontSize: "0.75rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
    },
    micro: {
      fontFamily: "mono",
      fontSize: "0.75rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
    },
  },
  // Estil de làmina compartit per totes les targetes (projectes, destacats).
  // Abans cada component es repetia el mateix `border="1px solid"`; ara la
  // contundència es toca en un sol lloc. La cinta superior pren el color de la
  // secció, de manera que la mateixa targeta canta diferent a cada apartat.
  layerStyles: {
    plate: {
      bg: "accent.surface",
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
      "accent.surface": { default: "#fdf4ea", _dark: "#332009" }, // targetes
      "accent.panel": { default: "#fefaf4", _dark: "#1c1105" }, // contenidor
      "accent.chip": { default: "#fbeddd", _dark: "#4f310e" }, // pastilles
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
      // Georgia — el fallback serif a Windows — fa xifres d'estil antic per
      // defecte. Als titulars ("100 · 100 · 100 · 100", "422 projectes")
      // les forcem de caixa alta perquè no ballin sobre la línia de base.
      "h1, h2, h3, h4": {
        fontVariantNumeric: "lining-nums",
      },
      ".tnum": {
        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: "'tnum' 1",
      },
      "@keyframes glowDrift": {
        "0%, 100%": { transform: "translate(0,0) scale(1)", opacity: 0.1 },
        "50%": { transform: "translate(2%, 3%) scale(1.06)", opacity: 0.16 },
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
