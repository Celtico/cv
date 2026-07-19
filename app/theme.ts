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
    heading: "var(--font-display), Georgia, serif",
    body: "var(--font-body), system-ui, sans-serif",
    mono: "var(--font-mono), ui-monospace, monospace",
  },
  semanticTokens: {
    colors: {
      canvas: { default: "#ECE5D5", _dark: "#141210" },
      canvasAlt: { default: "#E4DBC8", _dark: "#1B1813" },
      surface: { default: "#F4EFE4", _dark: "#221E18" },
      fg: { default: "#1A1712", _dark: "#EDE6D6" },
      fgMuted: { default: "#5C5546", _dark: "#A79F8E" },
      fgFaint: { default: "#847C6A", _dark: "#847C6A" },
      accent: { default: "#8F5E10", _dark: "#E8A23D" }, // ambre segur com a text
      accentDot: { default: "#CE8724", _dark: "#E8A23D" }, // marca decorativa
      line: { default: "blackAlpha.200", _dark: "whiteAlpha.200" },
      lineStrong: { default: "blackAlpha.300", _dark: "whiteAlpha.300" },
      surfaceTint: { default: "blackAlpha.50", _dark: "whiteAlpha.100" },
      // bloc invertit (sempre el contrari del canvas)
      invBg: { default: "#141210", _dark: "#E9E2D3" },
      invFg: { default: "#EDE6D6", _dark: "#1A1712" },
      invMuted: { default: "#A79F8E", _dark: "#6B6353" },
      invLine: { default: "whiteAlpha.300", _dark: "blackAlpha.300" },
      invAccent: { default: "#F0B662", _dark: "#8F5E10" },
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "canvas",
        color: "fg",
        scrollBehavior: "smooth",
      },
      "::selection": {
        bg: "#E8A23D",
        color: "#141210",
      },
      ".tnum": {
        fontFamily: "var(--font-mono), ui-monospace, monospace",
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: "'tnum' 1",
      },
      "@keyframes lhDraw": {
        from: { strokeDashoffset: 264 },
        to: { strokeDashoffset: 0 },
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
