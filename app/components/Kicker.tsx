"use client";

import { Box, Flex } from "@chakra-ui/react";

/**
 * L'etiqueta de secció: pastilla massissa i la regla que l'acompanya fins al
 * marge. El signe § que hi havia al davant venia de la identitat d'expedient
 * de paper que es va retirar; no descrivia res. Viu en un component propi perquè la fan servir `Section` i `Contact`,
 * que no comparteixen embolcall — mentre estava escrita dins de `Section`, la
 * de contacte es va quedar enrere amb l'estil vell.
 *
 * Les dues parelles de color estan verificades a 4,5:1: `accent.deep` amb blanc
 * (el color de la secció enfosquit just el que cal) i `gray.emphasized` amb el
 * text normal.
 */
export function Kicker({
  children,
  tone = "accent",
  rule = "border.emphasized",
}: {
  children: React.ReactNode;
  tone?: "accent" | "neutral";
  rule?: string;
}) {
  return (
    <Flex align="center" gap={4} mb={6}>
      <Flex
        as="span"
        align="center"
        className="tnum"
        textStyle="kicker"
        bg={tone === "neutral" ? "gray.emphasized" : "accent.deep"}
        color={tone === "neutral" ? "fg" : "accent.deep.fg"}
        borderRadius="control"
        px={4}
        py={2}
      >
        {children}
      </Flex>
      <Box flex="1" h="1px" bg={rule} />
    </Flex>
  );
}
