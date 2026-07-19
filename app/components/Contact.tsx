"use client";

import { Box, Button, Container, HStack, Heading, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { FiMail, FiPhone, FiGlobe } from "react-icons/fi";
import { profile } from "../data";

export function Contact() {
  return (
    <Box as="section" id="contacto" py={{ base: 20, md: 28 }} position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        w="70vw"
        h="70vw"
        maxW="900px"
        maxH="900px"
        bg="brand.500"
        opacity={0.12}
        filter="blur(140px)"
        borderRadius="full"
        pointerEvents="none"
      />
      <Container maxW="4xl" position="relative" textAlign="center">
        <VStack spacing={6}>
          <Text
            fontSize="sm"
            fontWeight="bold"
            letterSpacing="widest"
            textTransform="uppercase"
            color="brand.400"
          >
            Contacto
          </Text>
          <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="black" lineHeight="1.05">
            ¿Construimos algo juntos?
          </Heading>
          <Text color="gray.400" fontSize={{ base: "md", md: "lg" }} maxW="2xl">
            Disponible para proyectos y colaboraciones. Escríbeme y te respondo enseguida.
          </Text>

          <HStack spacing={4} flexWrap="wrap" justify="center" gap={3} pt={2}>
            <Button
              as={Link}
              href={`mailto:${profile.email}`}
              size="lg"
              bg="brand.400"
              color="ink.900"
              _hover={{ bg: "brand.300", textDecoration: "none" }}
              leftIcon={<FiMail />}
              fontWeight="bold"
            >
              {profile.email}
            </Button>
            <Button
              as={Link}
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              size="lg"
              variant="outline"
              borderColor="whiteAlpha.300"
              _hover={{ bg: "whiteAlpha.100", textDecoration: "none" }}
              leftIcon={<FiPhone />}
            >
              {profile.phone}
            </Button>
          </HStack>

          <HStack spacing={6} pt={6} color="gray.400" fontSize="sm" flexWrap="wrap" justify="center">
            <Link href={profile.company} isExternal _hover={{ color: "brand.300" }}>
              <HStack>
                <Icon as={FiGlobe} color="brand.400" />
                <Text>cenics.net</Text>
              </HStack>
            </Link>
          </HStack>
        </VStack>
      </Container>

      <Container maxW="6xl" mt={{ base: 16, md: 24 }}>
        <Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={8} textAlign="center">
          <Text color="gray.400" fontSize="sm">
            © {profile.name} · {profile.location}
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
