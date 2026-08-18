"use client";

import { Box, Button, Container, Flex, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { profile } from "../data";
import { useT } from "../i18n";
import { RichText } from "./RichText";
import { Kicker } from "./Kicker";

export function Contact() {
  const t = useT();
  return (
    <Box
      as="section"
      id="contacto"
      // La pàgina obre amb una rentada ambre a l'entradeta i tanca amb la
      // mateixa: els dos extrems es responen i el recorregut queda tancat.
      bgGradient="linear(to-b, bg, accent.panel)"
      color="fg"
      scrollMarginTop="80px"
    >
      <Container maxW="72rem" py={{ base: 20, md: 28 }}>
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
            size="pill"
            rightIcon={<Icon as={FiArrowUpRight} />}
            className="tnum"
          >
            {profile.email}
          </Button>
          <Link
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="tnum"
            color="fg"
            fontSize="lg"
            _hover={{ color: "accent.fg" }}
          >
            {profile.phone}
          </Link>
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

      </Container>
    </Box>
  );
}
