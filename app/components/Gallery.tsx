"use client";

import { AspectRatio, Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Section } from "./Section";
import { gallery } from "../data";
import { useT } from "../i18n";

export function Gallery() {
  const t = useT();
  return (
    <Section id="galeria" accent="gallery" tone="wash" kicker={t.gallery.kicker} title={t.gallery.title} subtitle={t.gallery.subtitle}>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 3, md: 4 }}>
        {gallery.map((g, i) => (
          <Box key={i} role="group" border="1px solid" borderColor="border" borderRadius="plate" overflow="hidden" bg="bg.panel">
            <AspectRatio ratio={4 / 3}>
              <Box position="relative" overflow="hidden">
                <Image
                  src={g.img}
                  alt={g.label}
                  position="absolute"
                  inset={0}
                  w="full"
                  h="full"
                  objectFit="cover"
                  objectPosition="top"
                  loading="lazy"
                  filter="grayscale(1)"
                  transition="transform .4s, filter .35s ease"
                  _groupHover={{ transform: "scale(1.05)", filter: "none" }}
                  // Sense ratolí no hi ha hover: la captura s'ha de veure tal com és.
                  sx={{ "@media (hover: none)": { filter: "none" } }}
                />
                {/* Vel del color principal. A 0.9 i lligat només al hover, al
                    mòbil la galeria es veia com dotze rectangles plans: la
                    baixem i la retirem del tot on no hi ha ratolí. */}
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
            </AspectRatio>
            <Text
              className="tnum"
              fontSize="xs"
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="fg.muted"
              px={3}
              py={2}
              borderTop="1px solid"
              borderColor="border"
              noOfLines={1}
            >
              {String(i + 1).padStart(2, "0")} · {g.label === "Proyecto web" ? t.gallery.web : g.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}
