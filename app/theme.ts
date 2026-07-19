"use client";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  colors: {
    brand: {
      50: "#e6fbff",
      100: "#b9f1ff",
      200: "#8ce6ff",
      300: "#5fd9ff",
      400: "#33ccff",
      500: "#19b3e6",
      600: "#0d8bb4",
      700: "#036382",
      800: "#003b51",
      900: "#001521",
    },
    ink: {
      900: "#07090f",
      800: "#0b0e16",
      700: "#11151f",
      600: "#161b28",
      500: "#232a3d",
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "ink.900",
        color: "gray.100",
        scrollBehavior: "smooth",
      },
      "::selection": {
        bg: "brand.400",
        color: "ink.900",
      },
      "@keyframes floatGlowA": {
        "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: 0.16 },
        "50%": { transform: "translate(3%, 4%) scale(1.08)", opacity: 0.24 },
      },
      "@keyframes floatGlowB": {
        "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: 0.12 },
        "50%": { transform: "translate(-4%, -3%) scale(1.1)", opacity: 0.18 },
      },
      "@media (prefers-reduced-motion: reduce)": {
        "*": { animationDuration: "0.001ms !important", animationIterationCount: "1 !important" },
      },
    },
  },
});

export default theme;
