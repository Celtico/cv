"use client";

import { Box, Button, Container, Flex, HStack, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useT } from "../i18n";
import { RichText } from "./RichText";

const MotionBox = motion(Box);

export function Hero() {
  const t = useT();
  const { scrollY } = useScroll();
  const yGlow = useTransform(scrollY, [0, 800], [0, 90]);

  return (
    <Box as="section" id="top" position="relative" overflow="hidden">
      {/* Fons de tres degradats radials superposats. Vessa per fora de la
          caixa a posta —el `overflow="hidden"` de la secció el retalla— perquè
          els centres dels radials quedin fora de camp i només se'n vegi el
          caient. L'opacitat es manté baixa: el text hi va a sobre. */}
      <MotionBox
        aria-hidden
        position="absolute"
        top="-20%"
        left="-10%"
        right="-10%"
        bottom="-20%"
        pointerEvents="none"
        style={{ y: yGlow }}
      >
        <Box className="accent-cycle" w="full" h="full" opacity={0.45} />
      </MotionBox>

      {/* El bloc de l'entradeta —de la píndola de disponibilitat als botons—
          duu el mateix aire que les seccions: uns 150 px per sobre i per sota.
          El de sota el completa la barra de xifres, que hi va enganxada. */}
      <Container
        maxW="72rem"
        position="relative"
        pt={{ base: 20, md: 32, lg: 40 }}
        // Compte amb l'escala: Chakra només té 32, 36, 40… Un valor que no hi
        // sigui (34, posem-hi) no peta, es pren com a 34 PÍXELS i el farciment
        // es queda a la quarta part sense que ho digui ningú.
        pb={{ base: 16, md: 28, lg: 32 }}
      >
        {/* línia d'expedient */}
        {/* Disponibilitat: és el fet més accionable per a qui llegeix això, i
            abans vivia amagat al final de la línia d'expedient i ocult del tot
            al mòbil. Ara és una píndola visible a totes les mides. */}
        <Flex
          className="tnum"
          display="inline-flex"
          // El punt s'alinea amb la primera línia, no amb el centre de la
          // pastilla: en castellà el text és més llarg («en búsqueda activa») i
          // en pantalla estreta salta de línia. Centrat, el punt quedava sol
          // entre les dues línies i semblava un error.
          align="flex-start"
          gap={2.5}
          mb={{ base: 6, md: 8 }}
          px={{ base: 2.5, sm: 3 }}
          py={1.5}
          borderRadius="control"
          bg="accent.muted"
          border="1px solid"
          borderColor="accent.dot"
          color="accent.fg"
          fontSize="xs"
          // En un mòbil estret la píndola es partia en dues línies, i una
          // pastilla partida sembla trencada. L'interlletratge baixa amb
          // l'amplada, com a la línia de rol.
          // Calibrat perquè hi càpiga fins i tot a 320 px, que és on la
          // pastilla es partia en dues línies i semblava trencada.
          letterSpacing={{ base: "0.02em", sm: "0.12em", md: "0.16em" }}
          textTransform="uppercase"
        >
          <Box w="7px" h="7px" mt="0.45em" borderRadius="full" bg="accent.dot" flexShrink={0} />
          <Text>{t.hero.disponible}</Text>
        </Flex>

        {/* nameplate */}
        <Heading as="h1" textStyle="display" color="fg">
          Celestí{" "}
          {/* El degradat es pinta a dins de les lletres. Els dos extrems són
              `accent.fg` del mode, ja contrastats, i per tant tot el recorregut
              del degradat també ho és. */}
          <Box as="span" className="accent-text">
            Ticó Petit
          </Box>
        </Heading>

        {/* Els botons van sempre a sota, no al costat. Quan compartien fila amb
            el paràgraf, els tres ocupaven prou amplada perquè el text quedés
            espremut a dues paraules per línia en finestres mitjanes. */}
        {/* L'aire va aquí, entre el text i els botons, i no entre la línia de
            rol i el paràgraf: el rol i el text són el mateix bloc. */}
        <Flex mt={8} direction="column" gap={12} align="start">
          <Box>
            {/* El rol és la dada de decisió per a qui contracta: abans era el
                text més petit de tota la pantalla. */}
            <Text
              className="tnum"
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="500"
              // Al mòbil ocupava dues línies senceres de majúscules i competia
              // amb el nom que té a sobre: és una etiqueta, no un segon titular.
              letterSpacing={{ base: "0.06em", md: "0.16em" }}
              textTransform="uppercase"
              // En blanc (o negre) i no en color: el nom que hi ha just a sobre
              // ja porta el degradat, i dues coses de color seguides es fan la
              // competència.
              color="fg"
              mb={4}
            >
              {t.hero.role}
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="600"
              color="fg"
              maxW="42rem"
              lineHeight="1.55"
            >
              <RichText>{t.hero.tagline}</RichText>
            </Text>
          </Box>

          <Flex gap={3} wrap="wrap">
            <Button
              as={Link}
              href="#contacto"
              variant="pillSolid"
              size={{ base: "pillSm", md: "pill" }}
            >
              {t.hero.contactar}
            </Button>
            <Button
              as={Link}
              href="#destacados"
              variant="pillOutline"
              size={{ base: "pillSm", md: "pill" }}
            >
              {t.hero.veure}
            </Button>
            <Button
              as={Link}
              href="/cv-celesti-tico.pdf"
              download
              variant="pillOutline"
              size={{ base: "pillSm", md: "pill" }}
              leftIcon={<Icon as={FiDownload} />}
            >
              {t.hero.descarregar}
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
