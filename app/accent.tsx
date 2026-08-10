"use client";

// Aplica l'accent de la visita sobre els tokens semàntics de Chakra,
// sobreescrivint-ne les variables CSS.
//
// El sorteig NO es fa aquí: el fa un script bloquejant al <body> (vegeu
// `layout.tsx`) abans de la primera pintada, amb una taula de tokens
// precalculada al servidor. Aquest component només reaplica els valors quan
// l'usuari commuta entre dia i nit, que és l'únic moment en què la derivació
// canvia després de carregar.
//
// La derivació viu a `app/color.ts`, que és lògica pura i té tests.

import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";
import { ACCENT_SUGGESTIONS, deriveAll, normalizeHex } from "./color";

export { ACCENT_SUGGESTIONS, normalizeHex };

/** Nom de la variable CSS de Chakra per a un token semàntic. */
export const cssVarFor = (token: string) => `--chakra-colors-${token.replace(/\./g, "-")}`;

declare global {
  interface Window {
    /** Accent sortejat per l'script bloquejant del <body>. */
    __ACCENT__?: string;
  }
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const picked = typeof window !== "undefined" ? window.__ACCENT__ : null;
    const hex = (picked && normalizeHex(picked)) || ACCENT_SUGGESTIONS[0];
    const tokens = deriveAll(hex, colorMode === "dark" ? "dark" : "light");
    for (const [name, value] of Object.entries(tokens)) {
      const cssVar = cssVarFor(name);
      // al body (mana sobre el contingut) i a l'html (fons de l'overscroll)
      document.body.style.setProperty(cssVar, value);
      document.documentElement.style.setProperty(cssVar, value);
    }
  }, [colorMode]);

  return <>{children}</>;
}
