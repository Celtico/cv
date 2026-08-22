"use client";

import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { stats } from "../data";
import { useT } from "../i18n";

export function Stats() {
  const t = useT();
  return (
    // Sense fons propi: les quatre xifres són la prova del que diu l'entradeta,
    // no una secció a part. El gris que hi havia era l'única superfície del lloc
    // que no era ni banda de color ni negre.
    <Box>
      {/* El mateix aire per sobre i per sota. Mentre l'entradeta acabava on
          acabava el text, la separació la posava sencera la secció següent i
          sumar-hi la d'aquí deixava un buit del doble; ara l'entradeta ocupa una
          pantalla justa i la barra de xifres és el que la tanca, de manera que
          les xifres han de respirar igual per totes dues bandes. */}
      <Container maxW="72rem" py={{ base: 10, md: 14 }}>
        <Flex direction={{ base: "column", md: "row" }} gap={{ base: 4, md: 0 }}>
          {stats.map((s, i) => (
            <Flex
              key={s.label}
              flex="1"
              align={{ base: "center", md: "start" }}
              justify={{ base: "space-between", md: "start" }}
              direction={{ md: "column" }}
              px={{ md: 8 }}
              py={{ base: 2, md: 0 }}
              pl={{ md: i === 0 ? 0 : 8 }}
              borderTop={{ base: i === 0 ? "none" : "1px solid", md: "none" }}
              borderLeft={{ md: i === 0 ? "none" : "1px solid" }}
              borderColor="border"
            >
              <Text
                className="tnum"
                fontSize={{ base: "2.4rem", md: "3rem" }}
                fontWeight="500"
                color="fg"
                lineHeight="1"
                letterSpacing="-0.02em"
              >
                {s.value}
              </Text>
              <Text
                className="tnum"
                mt={{ md: 2 }}
                // Les microetiquetes duen el color de la secció on viuen: és
                // l'única cosa d'aquestes bandes que en gris no deia res.
                color="accent.fg"
                fontSize="xs"
                letterSpacing="0.14em"
                textTransform="uppercase"
              >
                {t.statLabels[i] ?? s.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
