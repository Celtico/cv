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

      <Container maxW="72rem" position="relative" pt={{ base: 16, md: 24 }} pb={{ base: 14, md: 20 }}>
        {/* línia d'expedient */}
        <Flex
          className="tnum"
          align="center"
          gap={{ base: 3, md: 5 }}
          fontSize={{ base: "0.68rem", md: "xs" }}
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="fg.muted"
          flexWrap="wrap"
          mb={{ base: 10, md: 14 }}
        >
          <HStack spacing={2}>
            <Box w="7px" h="7px" borderRadius="full" bg="accent.dot" />
            <Text>{t.hero.expedient}</Text>
          </HStack>
          <Box w="1px" h="12px" bg="border.emphasized" />
          <Text>{t.hero.location}</Text>
          <Box w="1px" h="12px" bg="border.emphasized" display={{ base: "none", sm: "block" }} />
          <Text display={{ base: "none", sm: "block" }}>{t.hero.registre}</Text>
        </Flex>

        {/* Disponibilitat: és el fet més accionable per a qui llegeix això, i
            abans vivia amagat al final de la línia d'expedient i ocult del tot
            al mòbil. Ara és una píndola visible a totes les mides. */}
        <Flex
          className="tnum"
          display="inline-flex"
          align="center"
          gap={2.5}
          mb={{ base: 6, md: 8 }}
          px={3}
          py={1.5}
          borderRadius="control"
          bg="accent.muted"
          border="1px solid"
          borderColor="accent.dot"
          color="accent.fg"
          fontSize={{ base: "0.7rem", md: "xs" }}
          letterSpacing="0.16em"
          textTransform="uppercase"
        >
          <Box w="7px" h="7px" borderRadius="full" bg="accent.dot" flexShrink={0} />
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
        <Flex mt={8} direction="column" gap={8} align="start">
          <Box>
            {/* El rol és la dada de decisió per a qui contracta: abans era el
                text més petit de tota la pantalla. */}
            <Text
              className="tnum"
              fontSize={{ base: "0.82rem", md: "0.95rem" }}
              fontWeight="500"
              letterSpacing="0.16em"
              textTransform="uppercase"
              // En blanc (o negre) i no en color: el nom que hi ha just a sobre
              // ja porta el degradat, i dues coses de color seguides es fan la
              // competència.
              color="fg"
              // L'aire ha de superar l'interlineat del paràgraf (~34 px) o la
              // línia es llegeix com la primera del text i no com una etiqueta
              mb={9}
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
              size="pill"
            >
              {t.hero.contactar}
            </Button>
            <Button
              as={Link}
              href="#destacados"
              variant="pillOutline"
              size="pill"
            >
              {t.hero.veure}
            </Button>
            <Button
              as={Link}
              href="/cv-celesti-tico.pdf"
              download
              variant="pillOutline"
              size="pill"
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
