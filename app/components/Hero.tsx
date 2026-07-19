"use client";

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiArrowRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data";

const MotionBox = motion(Box);

export function Hero() {
  // Parallax muy suave: los halos se desplazan con el scroll.
  const { scrollY } = useScroll();
  const yA = useTransform(scrollY, [0, 900], [0, 120]);
  const yB = useTransform(scrollY, [0, 900], [0, -90]);
  const yContent = useTransform(scrollY, [0, 600], [0, 40]);

  return (
    <Box
      as="section"
      id="top"
      position="relative"
      overflow="hidden"
      pt={{ base: 20, md: 28 }}
      pb={{ base: 20, md: 32 }}
    >
      {/* Glows con parallax */}
      <MotionBox
        position="absolute"
        top="-20%"
        left="-10%"
        w="60vw"
        h="60vw"
        pointerEvents="none"
        style={{ y: yA }}
        willChange="transform"
      >
        <Box
          w="full"
          h="full"
          bg="brand.500"
          opacity={0.18}
          filter="blur(120px)"
          borderRadius="full"
          animation="floatGlowA 16s ease-in-out infinite"
          willChange="transform"
        />
      </MotionBox>
      <MotionBox
        position="absolute"
        bottom="-30%"
        right="-15%"
        w="55vw"
        h="55vw"
        pointerEvents="none"
        style={{ y: yB }}
        willChange="transform"
      >
        <Box
          w="full"
          h="full"
          bg="purple.500"
          opacity={0.14}
          filter="blur(130px)"
          borderRadius="full"
          animation="floatGlowB 20s ease-in-out infinite"
          willChange="transform"
        />
      </MotionBox>

      <MotionBox style={{ y: yContent }}>
      <Container maxW="6xl" position="relative">
        <VStack align="start" spacing={7}>
          <Badge
            px={3}
            py={1.5}
            borderRadius="full"
            bg="whiteAlpha.100"
            color="brand.300"
            border="1px solid"
            borderColor="whiteAlpha.200"
            fontWeight="semibold"
            textTransform="none"
          >
            <Box as="span" display="inline-block" w="8px" h="8px" bg="green.400" borderRadius="full" mr={2} />
            {profile.status}
          </Badge>

          <Heading
            as="h1"
            fontSize={{ base: "5xl", md: "7xl" }}
            fontWeight="black"
            lineHeight="0.95"
            letterSpacing="tight"
          >
            {profile.name.split(" ").slice(0, 1)}{" "}
            <Box
              as="span"
              bgGradient="linear(to-r, brand.300, purple.300)"
              bgClip="text"
            >
              {profile.name.split(" ").slice(1).join(" ")}
            </Box>
          </Heading>

          <VStack align="start" spacing={1}>
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
              {profile.role}
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color="brand.300">
              {profile.subrole}
            </Text>
          </VStack>

          <Text fontSize={{ base: "md", md: "lg" }} color="gray.400" maxW="2xl" lineHeight="1.7">
            {profile.tagline}
          </Text>

          <HStack spacing={4} flexWrap="wrap" gap={3}>
            <Button
              as={Link}
              href="#contacto"
              size="lg"
              bg="brand.400"
              color="ink.900"
              _hover={{ bg: "brand.300", textDecoration: "none" }}
              rightIcon={<FiArrowRight />}
              fontWeight="bold"
            >
              Contactar
            </Button>
            <Button
              as={Link}
              href="#destacados"
              size="lg"
              variant="outline"
              borderColor="whiteAlpha.300"
              _hover={{ bg: "whiteAlpha.100", textDecoration: "none" }}
            >
              Ver proyectos
            </Button>
          </HStack>

          <Flex gap={6} flexWrap="wrap" pt={4} color="gray.400" fontSize="sm">
            <HStack>
              <Icon as={FiMapPin} color="brand.400" />
              <Text>{profile.location}</Text>
            </HStack>
            <Link href={`tel:${profile.phone.replace(/\s/g, "")}`} _hover={{ color: "brand.300" }}>
              <HStack>
                <Icon as={FiPhone} color="brand.400" />
                <Text>{profile.phone}</Text>
              </HStack>
            </Link>
            <Link href={`mailto:${profile.email}`} _hover={{ color: "brand.300" }}>
              <HStack>
                <Icon as={FiMail} color="brand.400" />
                <Text>{profile.email}</Text>
              </HStack>
            </Link>
          </Flex>
        </VStack>
      </Container>
      </MotionBox>
    </Box>
  );
}
