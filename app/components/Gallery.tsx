"use client";

import { AspectRatio, Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Section } from "./Section";
import { gallery } from "../data";
import { useT } from "../i18n";

export function Gallery() {
  const t = useT();
  return (
    <Section id="galeria" kicker={t.gallery.kicker} title={t.gallery.title} subtitle={t.gallery.subtitle} bg="canvas">
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 3, md: 4 }}>
        {gallery.map((g, i) => (
          <Box key={i} role="group" border="1px solid" borderColor="line" borderRadius="2px" overflow="hidden" bg="surface">
            <AspectRatio ratio={4 / 3}>
              <Image
                src={g.img}
                alt={g.label}
                objectFit="cover"
                objectPosition="top"
                loading="lazy"
                transition="transform .4s"
                _groupHover={{ transform: "scale(1.05)" }}
              />
            </AspectRatio>
            <Text
              className="tnum"
              fontSize="0.66rem"
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="fgMuted"
              px={3}
              py={2}
              borderTop="1px solid"
              borderColor="line"
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
