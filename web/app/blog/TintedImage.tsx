"use client";

import { Box, Image } from "@chakra-ui/react";

// Imatge amb vel del color d'accent. El vel estava a 0.9 i només es retirava
// amb :hover, així que al mòbil — on no hi ha hover — les imatges de tots els
// posts es veien com a rectangles plans de color.
export function TintedImage({
  src,
  alt,
  width,
  height,
  cover = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  cover?: boolean;
}) {
  return (
    <Box role="group" position="relative" overflow="hidden" h={cover ? "full" : undefined}>
      <Image
        src={src}
        alt={alt}
        // amb width/height el navegador reserva la caixa i /blog deixa de saltar
        width={width}
        height={height}
        w="full"
        h={cover ? "full" : "auto"}
        sx={{
          aspectRatio: cover ? undefined : `${width} / ${height}`,
          "@media (hover: none)": { filter: "none" },
        }}
        objectFit={cover ? "cover" : undefined}
        loading="lazy"
        filter="grayscale(1)"
        transition="filter .35s ease"
        _groupHover={{ filter: "none" }}
      />
      <Box
        position="absolute"
        inset={0}
        bg="accent.solid"
        opacity={0.45}
        transition="opacity .35s ease"
        pointerEvents="none"
        _groupHover={{ opacity: 0 }}
        sx={{ "@media (hover: none)": { opacity: 0 } }}
      />
    </Box>
  );
}
