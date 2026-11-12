"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "../app/theme";

/**
 * Embolcall obligatori. Sense ell, cap primitiva pinta amb l'aspecte del lloc:
 * `ChakraProvider` és qui publica les variables `--chakra-colors-*`, els
 * `textStyles` (`display`, `sectionTitle`, `cardTitle`, `kicker`, `micro`), els
 * `layerStyles` (`plate`, `chip`) i els radis (`plate` 14 px, `control` 999 px).
 *
 * El color d'accent NO arriba per aquí, sinó per CSS: `styles.css` porta les
 * regles `[data-accent="…"]` que genera `accentStylesheet()`, i `Section` només
 * hi posa l'atribut. Per això el tema i el full d'estil s'han de carregar tots
 * dos.
 */
export function DsProvider({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
