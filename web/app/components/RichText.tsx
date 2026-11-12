"use client";

import { Box } from "@chakra-ui/react";
import { MARKUP_SPLIT } from "../markup";

/**
 * Renderitza text del diccionari admetent **negreta** i ==ressaltat==.
 * Manté content.ts llegible i traduïble: el marcatge viu al text, no al JSX.
 *
 * El ressaltat pinta la frase amb el degradat que recorre la paleta, per dins
 * de les lletres (`accentStylesheet()`). És per a UNA frase clau dins d'un
 * paràgraf, no per a paràgrafs sencers: el que el fa funcionar és el contrast
 * amb el text apagat del voltant.
 */
export function RichText({ children }: { children: string }) {
  const trossos = children.split(MARKUP_SPLIT).filter(Boolean);
  return (
    <>
      {trossos.map((t, i) => {
        if (t.startsWith("**") && t.endsWith("**")) {
          return (
            <Box as="strong" key={i} fontWeight="600" color="inherit">
              {t.slice(2, -2)}
            </Box>
          );
        }
        if (t.startsWith("==") && t.endsWith("==")) {
          return (
            <Box as="strong" key={i} className="accent-text" fontWeight="600">
              {t.slice(2, -2)}
            </Box>
          );
        }
        return t;
      })}
    </>
  );
}
