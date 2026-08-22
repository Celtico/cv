"use client";

import { Box, Grid, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Section } from "./Section";
import type { AccentName } from "../color";
import { skills } from "../data";
import { useT } from "../i18n";

export function Skills({ accent }: { accent: AccentName }) {
  const t = useT();
  return (
    <Section id="skills" accent={accent} kicker={t.skills.kicker} title={t.skills.title} subtitle={t.skills.subtitle}>
      <Box borderTop="1px solid" borderColor="border">
        {skills.map((s, i) => (
          <Grid
            key={s.group}
            templateColumns={{ base: "1fr", md: "0.9fr 2.4fr" }}
            gap={{ base: 3, md: 8 }}
            alignItems="baseline"
            py={{ base: 6, md: 7 }}
            borderBottom="1px solid"
            borderColor="border"
          >
            <Heading as="h3" textStyle="cardTitle" color="fg">
              {t.skills.groups[i] ?? s.group}
            </Heading>
            <Wrap spacing={2}>
              {/* Combinació per índex, com la resta del projecte: el diccionari mana
                  i `data.ts` fa de reserva si algun idioma es queda curt. */}
              {(t.skills.items[i] ?? s.items).map((it) => (
                <WrapItem key={it}>
                  <Text
                    className="tnum"
                    layerStyle="chip"
                  >
                    {it}
                  </Text>
                </WrapItem>
              ))}
            </Wrap>
          </Grid>
        ))}
      </Box>
    </Section>
  );
}
