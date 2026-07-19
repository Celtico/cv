"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Section } from "./Section";
import { experience } from "../data";

export function Experience() {
  return (
    <Section id="experiencia" kicker="Trayectoria" title="Experiencia profesional">
      <VStack align="stretch" spacing={0} position="relative">
        {experience.map((e, i) => (
          <HStack
            key={e.company}
            align="start"
            spacing={6}
            pb={i === experience.length - 1 ? 0 : 10}
            position="relative"
          >
            {/* timeline line + dot */}
            <Box position="relative" flexShrink={0} pt={1.5}>
              <Box w="14px" h="14px" borderRadius="full" bg="brand.400" boxShadow="0 0 0 4px rgba(25,179,230,.2)" />
              {i !== experience.length - 1 && (
                <Box
                  position="absolute"
                  left="6px"
                  top="20px"
                  bottom="-40px"
                  w="2px"
                  bg="whiteAlpha.200"
                />
              )}
            </Box>
            <Box flex={1}>
              <Text color="brand.300" fontWeight="semibold" fontSize="sm">
                {e.period}
              </Text>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" mt={1}>
                {e.company}
              </Text>
              <Text color="gray.400">{e.role}</Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Section>
  );
}
