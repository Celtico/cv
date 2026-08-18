"use client";

import { Box, Button, Container, Flex, HStack, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { useT } from "../i18n";

const MotionBox = motion(Box);

export function Hero() {
  const t = useT();
  const { scrollY } = useScroll();
  const yGlow = useTransform(scrollY, [0, 800], [0, 90]);

  return (
    <Box as="section" id="top" position="relative" overflow="hidden">
      <MotionBox
        position="absolute"
        top="-15%"
        right="-10%"
        w="48vw"
        h="48vw"
        pointerEvents="none"
        style={{ y: yGlow }}
      >
        <Box
          w="full"
          h="full"
          bg="accent.solid"
          opacity={0.4}
          _dark={{ opacity: 0.55 }}
          filter="blur(140px)"
          borderRadius="full"
          animation="glowDrift 18s ease-in-out infinite"
        />
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
          <Box as="span" fontStyle="italic" fontWeight="500">
            Ticó Petit
          </Box>
        </Heading>

        <Flex mt={8} gap={{ base: 6, md: 12 }} direction={{ base: "column", md: "row" }} align={{ md: "end" }}>
          <Box flex="1">
            {/* El rol és la dada de decisió per a qui contracta: abans era el
                text més petit de tota la pantalla. */}
            <Text
              className="tnum"
              fontSize={{ base: "0.82rem", md: "0.95rem" }}
              fontWeight="500"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="accent.fg"
              mb={4}
            >
              {t.hero.role}
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="fg.muted" maxW="34rem" lineHeight="1.6">
              {t.hero.tagline}
            </Text>
          </Box>

          <Flex gap={3} flexShrink={0} wrap="wrap">
            <Button
              as={Link}
              href="#contacto"
              bg="accent.solid"
              color="accent.contrast"
              borderRadius="control"
              px={6}
              h="52px"
              fontWeight="600"
              _hover={{ bg: "accent.emphasized", textDecoration: "none" }}
            >
              {t.hero.contactar}
            </Button>
            <Button
              as={Link}
              href="#destacados"
              variant="outline"
              borderColor="border.emphasized"
              color="fg"
              borderRadius="control"
              px={6}
              h="52px"
              fontWeight="500"
              _hover={{ bg: "bg.muted", borderColor: "accent.fg", textDecoration: "none" }}
            >
              {t.hero.veure}
            </Button>
            <Button
              as={Link}
              href="/cv-celesti-tico.pdf"
              download
              variant="outline"
              borderColor="border.emphasized"
              color="fg"
              borderRadius="control"
              px={6}
              h="52px"
              fontWeight="500"
              leftIcon={<Icon as={FiDownload} />}
              _hover={{ bg: "bg.muted", borderColor: "accent.fg", textDecoration: "none" }}
            >
              {t.hero.descarregar}
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
