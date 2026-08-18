"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import type { AccentName } from "../color";
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
  tone = "flat",
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
   * Com hi arriba el color. `wash` és la banda de degradat vertical sencera,
   * de fons net a dalt fins al to ple a baix; `flat` és negre (o blanc) del
   * tot, i el color només hi entra per l'etiqueta i els accents del text. Van
   * saltejades: banda de color, banda neta, banda de color.
   */
  tone?: "flat" | "wash";
  /**
   * Color de la pastilla de l'etiqueta. `accent` la pinta amb `accent.deep`,
   * el color de la secció enfosquit; `neutral` la pinta de gris. Van
   * repartides perquè no hi hagi vuit pastilles de color seguides.
   */
  kickerTone?: "accent" | "neutral";
}) {
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
      py={{ base: 16, md: 24 }}
      bg={inverted ? "bg.inverted" : bg}
      color={inverted ? "fg.inverted" : "fg"}
      // La banda de degradat recorre tota l'alçada de la secció, del fons net
      // a dalt al to ple a baix. Els dos extrems són superfícies ja verificades
      // a 4,5:1 contra el text neutre, així que el text hi és llegible a
      // qualsevol altura. S'atura a `accent.panel` i no arriba a
      // `accent.surface` perquè les targetes, que hi van a sobre, es puguin
      // continuar distingint del fons al capdavall de la banda.
      bgGradient={tone === "wash" ? "linear(to-b, bg, accent.panel)" : undefined}
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
