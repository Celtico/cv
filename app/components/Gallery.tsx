"use client";

import { AspectRatio, Box, Icon, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";
import { Section } from "./Section";
import type { AccentName } from "../color";
import { gallery } from "../data";
import { useT } from "../i18n";

export function Gallery({ accent }: { accent: AccentName }) {
  const t = useT();
  return (
    <Section id="galeria" accent={accent} kicker={t.gallery.kicker} title={t.gallery.title} subtitle={t.gallery.subtitle}>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 3, md: 4 }}>
        {gallery.map((g, i) => (
          // El color de la secció el duu el FILET, no un vel massís per damunt
          // de la captura: el vel d'`accent.solid` al 45% tenyia les dotze
          // imatges i la graella es llegia com dotze rectangles del mateix to,
          // amb les captures a sota sense poder-se distingir. Ara la peça de
          // color és la vora —fina, i més viva en passar-hi el ratolí— i la
          // captura es veu tal com és.
          <Box
            key={i}
            role="group"
            // Les que encara són vives es poden clicar; les altres es queden
            // com a captura. `isExternal` hi posa el `rel` que toca, i el
            // `display="block"` és perquè el Link de Chakra és en línia i,
            // sense, la rajola perdia l'alçada.
            {...(g.url ? { as: Link, href: g.url, isExternal: true, display: "block" } : {})}
            border="1px solid"
            // El filet és el que diu si la captura es pot clicar: encès
            // (`accent.dot`, el to decoratiu ja contrastat a 3:1) per a les
            // webs que encara són vives, apagat per a les que ja no hi són. La
            // fletxa del peu sola no es veia de lluny.
            borderColor={g.url ? "accent.dot" : "accent.muted"}
            borderRadius="plate"
            overflow="hidden"
            bg="bg.panel"
            transition="border-color .25s ease"
            // `_hover` i no `_groupHover`: el `role="group"` és d'aquest mateix
            // element, i `_groupHover` es resol com «un avantpassat amb
            // role=group està en hover», de manera que aquí no s'activava mai i
            // el filet no s'encenia.
            _hover={{ borderColor: "accent.solid", textDecoration: "none" }}
          >
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
              </Box>
            </AspectRatio>
            <Text
              className="tnum"
              fontSize="xs"
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="accent.fg"
              px={3}
              py={2}
              borderTop="1px solid"
              borderColor="accent.muted"
              // Tantes línies com calgui fins a tres: a 14 px i en graella de
              // dues columnes els noms llargs es tallaven («02 · Pàmies…»,
              // «04 · GLS…»), i el nom del client és justament el que aquesta
              // secció va a ensenyar. En pantalles de 320 px en calen tres.
              noOfLines={3}
            >
              {String(i + 1).padStart(2, "0")} · {g.label === "Proyecto web" ? t.gallery.web : g.label}
              {g.url && (
                <Icon as={FiArrowUpRight} aria-hidden boxSize="0.9em" ml={1.5} verticalAlign="-0.1em" />
              )}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}
