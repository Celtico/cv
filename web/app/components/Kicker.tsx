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
 *
 * El to neutre ja no el fa servir cap secció de la portada (2026-08-22): la
 * pastilla és el primer que es llegeix de la banda i és on el color de la secció
 * s'anuncia. Repartir-les deixava quatre seccions de vuit sense color a
 * l'entrada, i la de Perfil, en gris, semblava que no en tingués.
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
        // Filetjada i no massissa: el fons es queda transparent i el color de
        // la secció el duen el filet i el text. La pastilla plena d'`accent.deep`
        // amb text blanc era el segon bloc massís de la banda, just sota la
        // barra, i pesava més que el titular que anuncia.
        bg="transparent"
        border="1px solid"
        borderColor={tone === "neutral" ? "border.emphasized" : "accent.fg"}
        // `accent.fg` és l'únic to d'accent verificat a 4,5:1 contra el fons de
        // la banda —hi entra `accent.panel`, on el degradat d'una banda `wash`
        // arriba—, i per això el duen tots dos, el filet i les lletres.
        color={tone === "neutral" ? "fg" : "accent.fg"}
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
