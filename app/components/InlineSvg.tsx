"use client";

// Incrusta un SVG del /public dins del DOM en comptes de carregar-lo amb <img>.
// Així les il·lustracions resolen les variables CSS dels tokens d'accent
// (--chakra-colors-*) i es tenyeixen amb el color dinàmic de la web.

import { useEffect, useState } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

const cache = new Map<string, string>();

export function InlineSvg({ src, title, ...boxProps }: { src: string; title: string } & BoxProps) {
  const [markup, setMarkup] = useState<string>(() => cache.get(src) ?? "");

  useEffect(() => {
    if (cache.has(src)) {
      setMarkup(cache.get(src)!);
      return;
    }
    let alive = true;
    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        // omple el marc encara que la proporció no coincideixi (com object-fit: cover)
        const svg = text.replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" ');
        cache.set(src, svg);
        if (alive) setMarkup(svg);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [src]);

  return (
    <Box
      role="img"
      aria-label={title}
      w="full"
      h="full"
      sx={{ "& svg": { width: "100%", height: "100%", display: "block" } }}
      dangerouslySetInnerHTML={{ __html: markup }}
      {...boxProps}
    />
  );
}
