"use client";

import { AspectRatio, Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Section } from "./Section";
import { gallery } from "../data";
import { useT } from "../i18n";

export function Gallery() {
  const t = useT();
  return (
    <Section id="galeria" kicker={t.gallery.kicker} title={t.gallery.title} subtitle={t.gallery.subtitle} bg="bg">
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 3, md: 4 }}>
        {gallery.map((g, i) => (
          <Box key={i} role="group" border="1px solid" borderColor="border" borderRadius="2px" overflow="hidden" bg="bg.panel">
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
                />
                {/* capa plana del color principal a 0.98; el hover la retira */}
                <Box
                  position="absolute"
                  inset={0}
                  bg="accent.solid"
                  opacity={0.98}
                  transition="opacity .35s ease"
                  pointerEvents="none"
                  _groupHover={{ opacity: 0 }}
                />
              </Box>
            </AspectRatio>
            <Text
              className="tnum"
              fontSize="0.66rem"
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
