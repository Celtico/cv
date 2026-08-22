"use client";

import { Box, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { FiBriefcase, FiFlag, FiHeart } from "react-icons/fi";
import { Section } from "./Section";
import type { AccentName } from "../color";
import { clients } from "../data";
import { useT } from "../i18n";

// Una per sector, en l'ordre de `clients` a `data.ts`. Són tres i prou: fer-ne
// una per client seria decoració —no en tenim els logotips— i el que informa
// aquí és de quin món ve cada nom.
const ICONES = [FiFlag, FiBriefcase, FiHeart];

export function Clients({ accent }: { accent: AccentName }) {
  const t = useT();
  return (
    <Section id="clientes" accent={accent} kicker={t.clients.kicker} title={t.clients.title} subtitle={t.clients.subtitle}>
      {/* Mateix patró que Competències: el grup a l'esquerra i els noms
          alineats a la dreta. Abans eren tres columnes altes de llista, amb els
          titulars llargs partits en dues línies i cada columna acabant a una
          alçada diferent. Aquí el titular té la seva pròpia amplada i els noms
          s'alineen per columnes de dalt a baix. */}
      <Box borderTop="1px solid" borderColor="border">
        {Object.values(clients).map((list, gi) => (
          <Grid
            key={gi}
            templateColumns={{ base: "1fr", md: "0.9fr 2.4fr" }}
            gap={{ base: 5, md: 8 }}
            alignItems="start"
            py={{ base: 7, md: 9 }}
            borderBottom="1px solid"
            borderColor="border"
          >
            <Flex align="center" gap={3}>
              <Icon
                as={ICONES[gi]}
                aria-hidden
                boxSize={{ base: "1.15rem", md: "1.35rem" }}
                color="accent.fg"
                strokeWidth={2}
                flexShrink={0}
              />
              <Heading as="h3" textStyle="cardTitle" color="fg">
                {t.clients.groups[gi]}
              </Heading>
              <Text className="tnum" fontSize="xs" color="fg.subtle" mt="0.35em">
                {list.length}
              </Text>
            </Flex>

            <Grid
              templateColumns={{
                base: "repeat(auto-fill, minmax(9rem, 1fr))",
                md: "repeat(auto-fill, minmax(11rem, 1fr))",
              }}
              columnGap={6}
              rowGap={3}
            >
              {list.map((c) => (
                <Flex key={c} align="baseline" gap={2}>
                  {/* La marca fa de pic de llista: sense ella, els noms curts
                      en columnes amples no es llegeixen com una llista. */}
                  <Box
                    aria-hidden
                    w="4px"
                    h="4px"
                    borderRadius="full"
                    bg="accent.dot"
                    flexShrink={0}
                    transform="translateY(-0.35em)"
                  />
                  <Text fontFamily="heading" fontSize={{ base: "1rem", md: "1.05rem" }} color="fg" lineHeight="1.35">
                    {c}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Grid>
        ))}
      </Box>
    </Section>
  );
}
