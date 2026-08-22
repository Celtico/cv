"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { SECTION_ACCENTS, type AccentName } from "../color";
import { Kicker } from "./Kicker";
import { RichText } from "./RichText";

export function Section({
  id,
  kicker,
  title,
  subtitle,
  children,
  bg = "bg",
  inverted = false,
  accent = "base",
  kickerTone = "accent",
}: {
  id: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bg?: string;
  inverted?: boolean;
  /** Color de la secció. Els tokens accent.* els publica `accentStylesheet()`. */
  accent?: AccentName;
  /**
   * Color de la pastilla de l'etiqueta. `accent` la pinta amb `accent.deep`,
   * el color de la secció enfosquit; `neutral` la pinta de gris. Van
   * repartides perquè no hi hagi vuit pastilles de color seguides.
   */
  kickerTone?: "accent" | "neutral";
}) {
  // De quin costat surt la bombolla de dalt. Va per la posició de l'accent a
  // `SECTION_ACCENTS`, que és fixa: el resultat és estable entre càrregues i
  // dues bandes seguides no queden mai enquadrades igual.
  const esquerra = Object.keys(SECTION_ACCENTS).indexOf(accent) % 2 === 0;

  const titleColor = inverted ? "fg.inverted" : "fg";
  const subColor = inverted ? "fg.inverted.muted" : "fg.muted";
  const rule = inverted ? "whiteAlpha.300" : "border.emphasized";

  return (
    <Box
      as="section"
      id={id}
      // Els tokens accent.* d'aquesta secció arriben per CSS a partir d'aquest
      // atribut i s'hereten a tot el subarbre. Vegeu `accentStylesheet()`.
      data-accent={accent}
      // Espaiat generós entre bandes, a la manera d'apple.com: 80 px al mòbil i
      // fins a 160 a l'escriptori. Amb bandes de color, l'aire és el que fa que
      // cada una es llegeixi com una parada i no com una franja més.
      py={{ base: 20, md: 32, lg: 40 }}
      bg={inverted ? "bg.inverted" : bg}
      color={inverted ? "fg.inverted" : "fg"}
      // El color de la banda arriba en BOMBOLLES, com a l'entradeta: dos
      // degradats radials que es fonen a transparent, no una franja vertical.
      // La franja marcava dues costures horitzontals amb les bandes veïnes; la
      // bombolla no té vores i el color sembla que surti de sota de la pàgina.
      //
      // La duen TOTES les seccions. Mentre la banda era una franja sencera, les
      // vuit seguides haurien estat un mur de color i per això anaven
      // saltejades (`tone`, retirat el 2026-08-22); una bombolla és prou tènue
      // perquè cadascuna pugui dur la seva sense que se'n facin la competència.
      //
      // La doble parada és el que la fa: color ple fins al 14% i només després
      // el caient. Amb una sola parada només se'n veu la cua.
      //
      // El color és `accent.panel` i no res més saturat perquè així qualsevol
      // punt de la banda queda entre `bg` i `accent.panel`, que són superfícies
      // ja verificades a 4,5:1 contra el text neutre. Amb `accent.surface` les
      // targetes que hi van a sobre s'hi fondrien.
      backgroundImage={[
        `radial-gradient(105% 88% at ${esquerra ? "10%" : "90%"} 0%, var(--chakra-colors-accent-panel) 0, var(--chakra-colors-accent-panel) 22%, transparent 76%)`,
        `radial-gradient(95% 80% at ${esquerra ? "92%" : "8%"} 100%, var(--chakra-colors-accent-panel) 0, var(--chakra-colors-accent-panel) 18%, transparent 70%)`,
      ].join(",")}
      position="relative"
      // el bafarot vessa fora de la caixa: sense això apareix scroll horitzontal
      overflow="hidden"
      // la barra és sticky i fa 64 px: sense això el titular queda tapat en
      // arribar a l'àncora
      scrollMarginTop="80px"
    >
      <Container maxW="72rem" position="relative">
        <Box mb={{ base: 10, md: 14 }}>
          {kicker && (
            <Kicker tone={kickerTone} rule={rule}>
              {kicker}
            </Kicker>
          )}
          <Heading as="h2" textStyle="sectionTitle" color={titleColor}>
            {title}
          </Heading>
          {subtitle && (
            <Text mt={5} color={subColor} fontSize={{ base: "md", md: "lg" }} maxW="42rem" lineHeight="1.7">
              <RichText>{subtitle}</RichText>
            </Text>
          )}
        </Box>
        {children}
      </Container>
    </Box>
  );
}
