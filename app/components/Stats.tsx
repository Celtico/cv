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
            {/* Sense aire per sota: la separació amb el que ve després ja la posa la
          secció següent, i sumar-hi el d'aquí deixava un buit del doble. */}
      <Container maxW="72rem" pt={{ base: 4, md: 6 }} pb={0}>
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
                color="fg.muted"
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
