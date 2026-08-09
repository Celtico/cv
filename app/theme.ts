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
  // Semantic tokens amb la nomenclatura de Chakra
  // (https://chakra-ui.com/docs/theming/colors#semantic-tokens):
  // bg / fg / border per rols, i la paleta accent.* + gray.emphasized.
  // Extensions pròpies del disseny: accent.dot (marca decorativa),
  // accent.inverted i bg.nav (barra translúcida).
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
      "fg.subtle": { default: "#847C6A", _dark: "#847C6A" },
      "fg.inverted": { default: "#EDE6D6", _dark: "#1A1712" },
      "fg.inverted.muted": { default: "#A79F8E", _dark: "#6B6353" },
      border: { default: "blackAlpha.200", _dark: "whiteAlpha.200" },
      "border.emphasized": { default: "blackAlpha.300", _dark: "whiteAlpha.300" },
      "border.inverted": { default: "whiteAlpha.300", _dark: "blackAlpha.300" },
      "gray.emphasized": { default: "#C9BFA8", _dark: "#4A4234" }, // vel de les fotos
      "gray.contrast": { default: "#F7F3E9", _dark: "#0D0B09" }, // panell de màxim contrast (seccions Perfil i Contacte)
      "accent.fg": { default: "#8F5E10", _dark: "#E8A23D" }, // ambre segur com a text
      "accent.dot": { default: "#CE8724", _dark: "#E8A23D" }, // marca decorativa
      "accent.solid": { default: "#E8A23D", _dark: "#E8A23D" }, // fons de botó ple
      "accent.emphasized": { default: "#F0B662", _dark: "#F0B662" }, // hover del sòlid
      "accent.contrast": { default: "#141210", _dark: "#141210" }, // text sobre accent.solid
      "accent.muted": { default: "rgba(206,135,36,0.20)", _dark: "rgba(232,162,61,0.18)" }, // pista dels anells
      "accent.inverted": { default: "#F0B662", _dark: "#8F5E10" },
      // Tinta de les il·lustracions (làmines fosques dels SVG inline): igual
      // en tots dos modes, però re-tintada pel gris del selector del peu.
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
      // sense scroll-behavior smooth: els salts d'àncora són instantanis
      // (amb smooth, el parallax cancel·lava els scrolls programàtics)
      "html, body": {
        bg: "bg",
        color: "fg",
      },
      "::selection": {
        bg: "accent.solid",
        color: "accent.contrast",
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
        },
      },
    },
  },
});

export default theme;
