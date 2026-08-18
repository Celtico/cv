"use client";

import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import type { AccentName } from "../color";

export function Section({
  id,
  kicker,
  title,
  subtitle,
  children,
  bg = "bg",
  inverted = false,
  accent = "base",
  glow = "right",
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
  /** Costat del bafarot de color del fons, o `false` per treure'l. */
  glow?: "left" | "right" | false;
}) {
  const titleColor = inverted ? "fg.inverted" : "fg";
  const subColor = inverted ? "fg.inverted.muted" : "fg.muted";
  const kickColor = inverted ? "fg.inverted.muted" : "fg.muted";
  const rule = inverted ? "whiteAlpha.300" : "border.emphasized";
  // sobre el bloc invertit, accent.fg està calculat contra el fons contrari
  const markColor = inverted ? "accent.inverted" : "accent.fg";

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
      position="relative"
      // el bafarot vessa fora de la caixa: sense això apareix scroll horitzontal
      overflow="hidden"
      // la barra és sticky i fa 64 px: sense això el titular queda tapat en
      // arribar a l'àncora
      scrollMarginTop="80px"
    >
      {/* Bafarot del color de la secció. És decoració pura (aria-hidden) i va
          per sota del contingut; el color surt del token, així que cada secció
          en té el seu sense que aquí hi hagi cap hex. */}
      {glow && (
        <Box
          aria-hidden
          position="absolute"
          top="-30%"
          {...(glow === "left" ? { left: "-15%" } : { right: "-15%" })}
          w={{ base: "90vw", md: "52vw" }}
          h={{ base: "90vw", md: "52vw" }}
          bg="accent.solid"
          // de nit el bafarot pot pujar: el negre pur se'l menja de pressa
          opacity={0.22}
          _dark={{ opacity: 0.32 }}
          filter="blur(130px)"
          borderRadius="full"
          pointerEvents="none"
        />
      )}

      <Container maxW="72rem" position="relative">
        <Box mb={{ base: 10, md: 14 }}>
          {kicker && (
            <Flex align="center" gap={3} mb={5}>
              <Box as="span" className="tnum" fontSize="xs" color={markColor} letterSpacing="0.2em">
                §
              </Box>
              <Text as="span" className="tnum" textStyle="kicker" color={kickColor}>
                {kicker}
              </Text>
              <Box flex="1" h="1px" bg={rule} />
            </Flex>
          )}
          <Heading as="h2" textStyle="sectionTitle" color={titleColor}>
            {title}
          </Heading>
          {subtitle && (
            <Text mt={5} color={subColor} fontSize={{ base: "md", md: "lg" }} maxW="42rem" lineHeight="1.7">
              {subtitle}
            </Text>
          )}
        </Box>
        {children}
      </Container>
    </Box>
  );
}
