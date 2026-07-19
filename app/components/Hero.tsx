"use client";

import { Box, Button, Container, Flex, HStack, Heading, Link, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
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
          bg="#E8A23D"
          opacity={0.1}
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
          color="fgMuted"
          flexWrap="wrap"
          mb={{ base: 10, md: 14 }}
        >
          <HStack spacing={2}>
            <Box w="7px" h="7px" borderRadius="full" bg="accentDot" />
            <Text>{t.hero.expedient}</Text>
          </HStack>
          <Box w="1px" h="12px" bg="lineStrong" />
          <Text>{t.hero.location}</Text>
          <Box w="1px" h="12px" bg="lineStrong" />
          <Text>{t.hero.registre}</Text>
          <Box w="1px" h="12px" bg="lineStrong" display={{ base: "none", sm: "block" }} />
          <Text color="accent" display={{ base: "none", sm: "block" }}>
            {t.hero.disponible}
          </Text>
        </Flex>

        {/* nameplate */}
        <Heading
          as="h1"
          fontWeight="400"
          fontSize={{ base: "3.5rem", md: "7rem" }}
          lineHeight="0.94"
          letterSpacing="-0.03em"
          color="fg"
        >
          Celestí{" "}
          <Box as="span" fontStyle="italic" fontWeight="500">
            Ticó Petit
          </Box>
        </Heading>

        <Flex mt={8} gap={{ base: 6, md: 12 }} direction={{ base: "column", md: "row" }} align={{ md: "end" }}>
          <Box flex="1">
            <Text
              className="tnum"
              fontSize="xs"
              letterSpacing="0.22em"
              textTransform="uppercase"
              color="accent"
              mb={3}
            >
              {t.hero.role}
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} color="fgMuted" maxW="34rem" lineHeight="1.6">
              {t.hero.tagline}
            </Text>
          </Box>

          <HStack spacing={3} flexShrink={0}>
            <Button
              as={Link}
              href="#contacto"
              bg="#E8A23D"
              color="#141210"
              borderRadius="2px"
              px={6}
              h="52px"
              fontWeight="600"
              _hover={{ bg: "#F0B662", textDecoration: "none" }}
            >
              {t.hero.contactar}
            </Button>
            <Button
              as={Link}
              href="#destacados"
              variant="outline"
              borderColor="lineStrong"
              color="fg"
              borderRadius="2px"
              px={6}
              h="52px"
              fontWeight="500"
              _hover={{ bg: "surfaceTint", borderColor: "accent", textDecoration: "none" }}
            >
              {t.hero.veure}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
