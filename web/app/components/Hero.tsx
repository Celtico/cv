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
    <Box
      as="section"
      id="top"
      position="relative"
      overflow="hidden"
      // L'entradeta ocupa una pantalla justa i el text hi va al mig: quan
      // sobra alçada, el bloc es queda centrat en comptes de penjar de dalt amb
      // un forat a sota. Els 64 px són la barra, que va enganxada al davant.
      // `svh` i no `dvh`: amb `dvh` la mesura canvia quan el mòbil amaga la
      // barra d'adreces i tota l'entradeta fa un salt a mig scroll.
      minH="calc(100svh - var(--barra))"
      display="flex"
      alignItems="center"
      // Sense això, anar a `#top` —el logotip de la barra— deixava l'scroll a
      // 65 i els primers 65 px de l'entradeta amagats sota la barra: no
      // tornaves a dalt de tot, tornaves a un pam per sota. Amb el marge, el
      // navegador hi resta els mateixos 65 i l'scroll acaba a zero.
      scrollMarginTop="var(--barra)"
    >
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
        w="full"
        // Els 150 px són el sostre, no una mesura fixa: en una pantalla baixa
        // el farciment cedeix abans que el contingut, que és el que fa que
        // l'entradeta hi càpiga sencera.
        // Cada marge, entre un terra i un sostre: mana el valor gros mentre
        // l'entradeta hi càpiga —el canvi comença als 667 px, que és el que fa
        // el bloc, i per sobre no es mou res—, el `vh` quan la pantalla és més
        // baixa, i el terra perquè no s'enganxi mai a la barra ni a les xifres.
        pt={{ base: "clamp(2.5rem, 12vh, 5rem)", md: "clamp(2.5rem, 19vh, 8rem)", lg: "clamp(2.5rem, 24vh, 10rem)" }}
        // Compte amb l'escala: Chakra només té 32, 36, 40… Un valor que no hi
        // sigui (34, posem-hi) no peta, es pren com a 34 PÍXELS i el farciment
        // es queda a la quarta part sense que ho digui ningú.
        pb={{ base: "clamp(2rem, 10vh, 4rem)", md: "clamp(2rem, 17vh, 7rem)", lg: "clamp(2rem, 19vh, 8rem)" }}
      >
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
        <Flex
          mt="clamp(1rem, 5vh, 2rem)"
          direction="column"
          gap="clamp(1.5rem, 7vh, 3rem)"
          align="start"
        >
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
