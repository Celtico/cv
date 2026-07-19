"use client";

import { Box, SimpleGrid, Tag, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { Section } from "./Section";
import { skills } from "../data";

export function Skills() {
  return (
    <Section
      id="skills"
      kicker="Stack técnico"
      title="Competencias"
      subtitle="Herramientas y tecnologías evidenciadas por proyectos reales."
      bg="ink.800"
    >
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
        {skills.map((s) => (
          <Box
            key={s.group}
            bg="ink.700"
            border="1px solid"
            borderColor="whiteAlpha.100"
            borderRadius="2xl"
            p={6}
            transition="all .2s"
            _hover={{ borderColor: "brand.500", transform: "translateY(-4px)" }}
          >
            <Text fontWeight="bold" mb={4} fontSize="lg">
              {s.group}
            </Text>
            <Wrap spacing={2}>
              {s.items.map((i) => (
                <WrapItem key={i}>
                  <Tag
                    size="md"
                    bg="whiteAlpha.100"
                    color="gray.200"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    borderRadius="md"
                  >
                    {i}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  );
}
