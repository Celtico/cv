"use client";

import { Box } from "@chakra-ui/react";

/**
 * Renderitza text del diccionari admetent **negreta**.
 * Manté content.ts llegible i traduïble: el marcatge viu al text, no al JSX.
 */
export function RichText({ children }: { children: string }) {
  const trossos = children.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {trossos.map((t, i) =>
        t.startsWith("**") && t.endsWith("**") ? (
          <Box as="strong" key={i} fontWeight="600" color="inherit">
            {t.slice(2, -2)}
          </Box>
        ) : (
          t
        ),
      )}
    </>
  );
}
