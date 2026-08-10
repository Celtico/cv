"use client";

// Incrusta un SVG dins del DOM en comptes de carregar-lo amb <img>. Així les
// il·lustracions resolen les variables CSS dels tokens d'accent
// (--chakra-colors-*) i es tenyeixen amb el color dinàmic de la web.
//
// El marcatge arriba per prop des d'un Server Component (vegeu app/svg.ts), de
// manera que ja és a l'HTML servit. El fetch només queda com a reserva per si
// algun consumidor no el pot precarregar.

import { useEffect, useState } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

const cache = new Map<string, string>();

export function InlineSvg({
  src,
  title,
  markup: preloaded,
  decorative = true,
  ...boxProps
}: {
  src: string;
  title: string;
  markup?: string;
  /** Les làmines repeteixen el nom del projecte que ja anuncia l'enllaç. */
  decorative?: boolean;
} & BoxProps) {
  const [markup, setMarkup] = useState<string>(() => preloaded ?? cache.get(src) ?? "");

  useEffect(() => {
    if (preloaded || cache.has(src)) {
      if (!preloaded) setMarkup(cache.get(src)!);
      return;
    }
    let alive = true;
    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        const svg = text.replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" focusable="false" ');
        cache.set(src, svg);
        if (alive) setMarkup(svg);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [src, preloaded]);

  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": title } as const);

  return (
    <Box
      {...a11y}
      w="full"
      h="full"
      sx={{ "& svg": { width: "100%", height: "100%", display: "block" } }}
      dangerouslySetInnerHTML={{ __html: markup }}
      {...boxProps}
    />
  );
}
