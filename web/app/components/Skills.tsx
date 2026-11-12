"use client";

import { Box, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
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
            gap={{ base: 5, md: 8 }}
            // A dalt i no a la línia de base: amb els elements en graella, la
            // fila pot fer dues altures i el titular quedava surant al mig.
            alignItems="start"
            py={{ base: 7, md: 9 }}
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
              {/* Quantes n'hi ha. És la dada que hi faltava: set files sense
                  cap xifra no diuen si el domini és ample o testimonial. */}
              <Text className="tnum" fontSize="xs" color="fg.subtle" mt="0.35em">
                {s.items.length}
              </Text>
            </Flex>
            {/* Graella i no embolcall lliure: amb `Wrap`, cada grup embolicava
                com podia i els logotips quedaven desquadrats de dalt a baix.
                Amb columnes d'amplada fixa, els set grups s'alineen i la secció
                es llegeix com un inventari i no com set llistes soltes.
                `auto-fill` i no `auto-fit`: amb `auto-fit` les columnes buides
                es col·lapsen i els grups curts —IA i dades, que en té quatre—
                s'escampaven per tota l'amplada, que és justament l'alineació
                que es volia arreglar. */}
            <Grid
              templateColumns={{
                base: "repeat(auto-fill, minmax(5rem, 1fr))",
                md: "repeat(auto-fill, minmax(6.25rem, 1fr))",
              }}
              columnGap={2}
              rowGap={5}
            >
              {/* Combinació per índex, com la resta del projecte: el diccionari mana
                  i `data.ts` fa de reserva si algun idioma es queda curt. */}
              {(t.skills.items[i] ?? s.items).map((it, j) => {
                // La icona es busca per la cadena NEUTRA, no per la traduïda:
                // el text de la pastilla canvia amb l'idioma i la icona no.
                const id = skillIcon(s.items[j] ?? "");
                return (
                  <Box key={it}>
                    {/* Apilada i sense fons: la icona a dalt i gran, el nom a
                        sota i petit. La pastilla plena feia que quaranta-quatre
                        rectangles de color competissin entre ells i amb la
                        banda; sense fons, el que es veu són les icones i el
                        conjunt respira.
                        En línia, a més, la icona competia amb el text a la
                        mateixa alçada i les etiquetes llargues quedaven
                        desequilibrades; apilada, la icona fa d'entrada i el nom
                        de peu. */}
                    <Flex
                      as="span"
                      direction="column"
                      align="center"
                      justify="flex-start"
                      gap={2}
                      className="tnum"
                      py={2}
                      px={1}
                      w="full"
                      textAlign="center"
                    >
                      {/* Icona i nom amb el color de text ple, no amb l'accent
                          ni amb el to apagat: sense fons darrere, l'inventari
                          s'ha de poder llegir d'una passada, i el verd i el gris
                          el deixaven a mitges. `fg` és blanc de nit i negre de
                          dia, o sigui el màxim contrast contra la banda. */}
                      {id && <Icon as={ICONES_ETIQUETA[id]} aria-hidden boxSize={{ base: "1.9rem", md: "2.25rem" }} color="fg" />}
                      <Text as="span" fontSize="0.6875rem" lineHeight="1.3" color="fg">
                        {it}
                      </Text>
                    </Flex>
                  </Box>
                );
              })}
            </Grid>
          </Grid>
        ))}
      </Box>
    </Section>
  );
}
