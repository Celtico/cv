"use client";

import { Box, Flex, Grid, Heading, Icon, Text, Wrap, WrapItem } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
  FiActivity, FiBookOpen, FiCloud, FiCode, FiCpu, FiDatabase, FiEye, FiGitBranch, FiImage,
  FiHexagon, FiLayers, FiLayout, FiLock, FiMessageSquare, FiPenTool, FiPrinter, FiRadio, FiRefreshCw,
  FiServer, FiShare2, FiSmartphone, FiBarChart2,
} from "react-icons/fi";
import {
  SiChakraui, SiClaude, SiDocker, SiGit, SiGnubash, SiHtml5, SiJavascript, SiJsonwebtokens,
  SiLangchain, SiMysql, SiNestjs, SiNextdotjs, SiNginx, SiNodedotjs, SiOdoo, SiPhp, SiPhpstorm,
  SiRadixui, SiReact, SiSocketdotio, SiSwagger, SiTypeorm, SiTypescript, SiVite, SiWebrtc,
} from "react-icons/si";
import { skillIcon, type SkillIconId } from "../skill-icons";
import { Section } from "./Section";
import type { AccentName } from "../color";
import { skills } from "../data";
import { useT } from "../i18n";

// La clau que ve de `data.ts` es resol aquí: així les dades no han d'importar
// components i el joc d'icones es pot canviar sense tocar-les.
// Les de les pastilles. On hi ha logotip de marca s'hi posa; on no —«SQL»,
// «Responsive», «Servidors» i companyia no són marques— hi va una icona
// representativa. El mapa de quina li toca a cadascuna viu a `skill-icons.ts`,
// i un test comprova que no en queda cap sense.
const ICONES_ETIQUETA: Record<SkillIconId, IconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  php: SiPhp,
  database: FiDatabase,
  html: SiHtml5,
  layers: FiLayers,
  bash: SiGnubash,
  react: SiReact,
  nextjs: SiNextdotjs,
  chakra: SiChakraui,
  radix: SiRadixui,
  vite: SiVite,
  chart: FiBarChart2,
  smartphone: FiSmartphone,
  nestjs: SiNestjs,
  node: SiNodedotjs,
  typeorm: SiTypeorm,
  socketio: SiSocketdotio,
  swagger: SiSwagger,
  api: FiShare2,
  webrtc: SiWebrtc,
  stream: FiRadio,
  langchain: SiLangchain,
  chat: FiMessageSquare,
  neural: FiActivity,
  odoo: SiOdoo,
  docker: SiDocker,
  nginx: SiNginx,
  jwt: SiJsonwebtokens,
  mysql: SiMysql,
  server: FiServer,
  lock: FiLock,
  cicd: FiRefreshCw,
  layout: FiLayout,
  identity: FiHexagon, // la ploma ja és l'Illustrator; una marca no és el mateix que dibuixar-la
  image: FiImage,
  pen: FiPenTool,
  book: FiBookOpen,
  printer: FiPrinter,
  claude: SiClaude,
  phpstorm: SiPhpstorm,
  git: SiGit,
  review: FiEye,
};

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
              {(t.skills.items[i] ?? s.items).map((it, j) => {
                // La icona es busca per la cadena NEUTRA, no per la traduïda:
                // el text de la pastilla canvia amb l'idioma i la icona no.
                const id = skillIcon(s.items[j] ?? "");
                return (
                  <WrapItem key={it}>
                    <Flex as="span" align="center" gap={2} className="tnum" layerStyle="chip">
                      {id && <Icon as={ICONES_ETIQUETA[id]} aria-hidden boxSize="0.95em" flexShrink={0} />}
                      <Text as="span">{it}</Text>
                    </Flex>
                  </WrapItem>
                );
              })}
            </Wrap>
          </Grid>
        ))}
      </Box>
    </Section>
  );
}
