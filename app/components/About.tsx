"use client";

import { Box, HStack, SimpleGrid, Tag, Text, VStack } from "@chakra-ui/react";
import { Section } from "./Section";
import { about, languages } from "../data";

export function About() {
  return (
    <Section id="sobre-mi" kicker="Sobre mí" title="Producto digital, de principio a fin">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <VStack align="start" spacing={5} gridColumn={{ md: "span 2" }}>
          {about.map((p, i) => (
            <Text key={i} color="gray.300" fontSize={{ base: "md", md: "lg" }} lineHeight="1.8">
              {p}
            </Text>
          ))}
        </VStack>

        <Box
          bg="ink.700"
          border="1px solid"
          borderColor="whiteAlpha.100"
          borderRadius="2xl"
          p={6}
          h="fit-content"
        >
          <Text fontWeight="bold" mb={4} color="brand.300" fontSize="sm" letterSpacing="wide" textTransform="uppercase">
            Idiomas
          </Text>
          <VStack align="stretch" spacing={4}>
            {languages.map((l) => (
              <HStack key={l.name} justify="space-between">
                <Text fontWeight="semibold">{l.name}</Text>
                <Tag size="sm" bg="whiteAlpha.100" color="gray.300">
                  {l.level}
                </Tag>
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>
    </Section>
  );
}
