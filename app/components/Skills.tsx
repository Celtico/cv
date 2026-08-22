"use client";

import { Box, Flex, Grid, Heading, Icon, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { FiCloud, FiCode, FiCpu, FiGitBranch, FiLayout, FiPenTool, FiServer } from "react-icons/fi";
import { Section } from "./Section";
import type { AccentName } from "../color";
import { skills } from "../data";
import { useT } from "../i18n";

// La clau que ve de `data.ts` es resol aquí: així les dades no han d'importar
// components i el joc d'icones es pot canviar sense tocar-les.
const ICONES = {
  code: FiCode,
  layout: FiLayout,
  server: FiServer,
  cpu: FiCpu,
  cloud: FiCloud,
  pen: FiPenTool,
  flow: FiGitBranch,
} as const;

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
            <Flex align="center" gap={3}>
              {/* Amb el to de la secció i prou pes per veure's al costat d'un
                  titular de 2 rem. Decorativa: el nom del grup ja hi és al
                  costat, i repetir-lo als lectors de pantalla només fa soroll. */}
              <Icon
                as={ICONES[s.icon]}
                aria-hidden
                boxSize={{ base: "1.15rem", md: "1.35rem" }}
                color="accent.fg"
                strokeWidth={2}
                flexShrink={0}
              />
              <Heading as="h3" textStyle="cardTitle" color="fg">
                {t.skills.groups[i] ?? s.group}
              </Heading>
            </Flex>
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
