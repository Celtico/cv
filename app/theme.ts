"use client";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system", // primera visita = tema del sistema
  useSystemColorMode: false, // després respecta i recorda la tria del botó
};

// «La bitàcola del taller» — dualitat tinta (nit) ↔ paper (dia).
const theme = extendTheme({
  config,
  fonts: {
    heading: "ui-serif, 'New York', Georgia, 'Times New Roman', serif",
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  },
  radii: {
    // «làmina de paper»: tot el sistema comparteix un sol radi
    plate: "2px",
    control: "2px",
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
      fontSize: "0.7rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
    },
    micro: {
      fontFamily: "mono",
      fontSize: "0.7rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
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
  // en canvies un, canvia'l als dos llocs. Els accent.* d'aquí són exactament el que retorna
  // deriveAll("#CE8724", mode) — l'ambre de la bitàcola.
  semanticTokens: {
    colors: {
      bg: { default: "#ECE5D5", _dark: "#141210" },
      "bg.subtle": { default: "#E4DBC8", _dark: "#1B1813" },
      "bg.panel": { default: "#F4EFE4", _dark: "#221E18" },
      "bg.muted": { default: "blackAlpha.50", _dark: "whiteAlpha.100" },
      "bg.inverted": { default: "#141210", _dark: "#E9E2D3" }, // bloc invertit: el contrari del bg
      "bg.nav": { default: "rgba(236,229,213,0.8)", _dark: "rgba(20,18,16,0.78)" },
      fg: { default: "#1A1712", _dark: "#EDE6D6" },
      "fg.muted": { default: "#5C5546", _dark: "#A79F8E" },
      // pujat de #847C6A: no arribava a 4,5:1 en cap mode i pinta capçaleres
      // de columna reals a la taula d'hores (el fons exigent és bg.subtle)
      "fg.subtle": { default: "#635C4E", _dark: "#9A917F" },
      "fg.inverted": { default: "#EDE6D6", _dark: "#1A1712" },
      "fg.inverted.muted": { default: "#A79F8E", _dark: "#6B6353" },
      border: { default: "blackAlpha.200", _dark: "whiteAlpha.200" },
      "border.emphasized": { default: "blackAlpha.300", _dark: "whiteAlpha.300" },
      "border.inverted": { default: "whiteAlpha.300", _dark: "blackAlpha.300" },
      "gray.emphasized": { default: "#C9BFA8", _dark: "#4A4234" }, // vel de les fotos
      "gray.contrast": { default: "#F7F3E9", _dark: "#0D0B09" }, // panell de màxim contrast (seccions Perfil i Contacte)
      "accent.fg": { default: "#805416", _dark: "#CE8724" }, // ambre segur com a text
      "accent.dot": { default: "#b4761f", _dark: "#CE8724" }, // marca decorativa
      "accent.solid": { default: "#CE8724", _dark: "#CE8724" }, // fons de botó ple
      "accent.emphasized": { default: "#dc9839", _dark: "#dc9839" }, // hover del sòlid
      "accent.contrast": { default: "#141210", _dark: "#141210" }, // text sobre accent.solid
      "accent.muted": { default: "rgba(206,135,36,0.20)", _dark: "rgba(206,135,36,0.20)" }, // pista dels anells
      "accent.inverted": { default: "#CE8724", _dark: "#895918" },
      // Tinta de les il·lustracions (làmines fosques dels SVG inline): igual
      // en tots dos modes.
      "ink.bg": { default: "#14110c", _dark: "#14110c" },
      "ink.subtle": { default: "#1d1913", _dark: "#1d1913" },
      "ink.border": { default: "#4a4234", _dark: "#4a4234" },
      "ink.border.subtle": { default: "#2e2a22", _dark: "#2e2a22" },
      "ink.fg": { default: "#EDE6D6", _dark: "#EDE6D6" },
      "ink.fg.muted": { default: "#A79F8E", _dark: "#A79F8E" },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "bg",
        color: "fg",
        scrollBehavior: "smooth",
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
