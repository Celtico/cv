"use client";

import { Box, Button, Container, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { FiArrowUpRight, FiDownload, FiPhone } from "react-icons/fi";
import { profile } from "../data";
import { useT } from "../i18n";
import { RichText } from "./RichText";
import { Kicker } from "./Kicker";
import type { AccentName } from "../color";

// El blau per defecte és per al blog, que reutilitza aquesta secció fora de la
// sèrie de la portada.
export function Contact({ accent = "blau" }: { accent?: AccentName }) {
  const t = useT();
  return (
    <Box
      as="section"
      id="contacto"
      // És la novena secció i la sèrie només en té vuit: aquí és on torna a
      // començar i li toca el blau, el mateix de l'entradeta. Els dos extrems
      // de la pàgina es responen i el recorregut queda tancat.
      //
      // El `data-accent` no és decoració: la barra hi llegeix el to per pintar
      // l'enllaç actiu, i sense ell «Contacte» seria l'únic que no s'encendria.
      data-accent={accent}
      // Aquí la bombolla no hi va: la secció tanca la pàgina i el degradat
      // vertical fins a `accent.panel` deixa el peu assentat en comptes de fer
      // un altre cantó de color.
      bgGradient="linear(to-b, bg, accent.panel)"
      color="fg"
      scrollMarginTop="80px"
      // Tanca com obre l'entradeta: una pantalla justa amb el text al mig quan
      // sobra alçada, i els marges cedint quan en falta. L'alçada real de la barra és `--barra`.
      minH="calc(100svh - var(--barra))"
      display="flex"
      alignItems="center"
    >
      <Container
        maxW="72rem"
        w="full"
        // El mateix joc que a l'entradeta: mana el valor gros mentre hi càpiga,
        // el `vh` quan la pantalla és baixa, i el terra perquè no s'enganxi.
        py={{ base: "clamp(2.5rem, 12vh, 5rem)", md: "clamp(2.5rem, 19vh, 8rem)", lg: "clamp(2.5rem, 24vh, 10rem)" }}
      >
        <Kicker>{t.contact.kicker}</Kicker>

        {/* Mateix paper que la resta de titulars de secció. La cursiva que hi
            havia era un idioma de serif: amb el pal sec només s'inclinava, i
            l'èmfasi el fa ara el degradat, com al nom de l'entradeta. */}
        <Heading as="h2" textStyle="sectionTitle" color="fg" maxW="20ch">
          {t.contact.t1}{" "}
          <Box as="span" className="accent-text">
            {t.contact.ti}
          </Box>{" "}
          {t.contact.t2}
        </Heading>

        <Text mt={6} color="fg.muted" fontSize={{ base: "md", md: "lg" }} maxW="34rem" lineHeight="1.7">
          <RichText>{t.contact.subtitle}</RichText>
        </Text>

        <Flex mt={10} gap={4} wrap="wrap" align="center">
          <Button
            as={Link}
            href={`mailto:${profile.email}`}
            variant="pillSolid"
            // A 320 px el correu sencer no cabia i desbordava la pantalla
            size={{ base: "pillSm", md: "pill" }}
            rightIcon={<Icon as={FiArrowUpRight} />}
            className="tnum"
          >
            {profile.email}
          </Button>
          {/* El telèfon també és un botó. Al mòbil, trucar és el gest més
              natural d'aquesta secció i era l'única de les tres accions que no
              tenia àrea tocable: un enllaç de text entre dues pastilles. */}
          <Button
            as={Link}
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            variant="pillOutline"
            size={{ base: "pillSm", md: "pill" }}
            leftIcon={<Icon as={FiPhone} />}
            className="tnum"
          >
            {profile.phone}
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

      </Container>
    </Box>
  );
}
