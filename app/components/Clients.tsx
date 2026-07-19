"use client";

import { Box, Flex, Icon, SimpleGrid, Tag, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { FiHeart, FiHome, FiPackage } from "react-icons/fi";
import { IconType } from "react-icons";
import { Section } from "./Section";
import { clients } from "../data";

const meta: Record<string, { icon: IconType; color: string }> = {
  "Sector público e institucional": { icon: FiHome, color: "brand.400" },
  "Empresas y cadenas": { icon: FiPackage, color: "purple.300" },
  "Cultura, salud y tercer sector": { icon: FiHeart, color: "pink.300" },
};

export function Clients() {
  return (
    <Section
      id="clientes"
      kicker="Confianza"
      title="Clientes destacados"
      subtitle="Una muestra de los más de 200 clientes: sector público, industria, cultura y tercer sector."
      bg="ink.800"
    >
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {Object.entries(clients).map(([group, list]) => {
          const m = meta[group] ?? { icon: FiPackage, color: "brand.400" };
          return (
            <VStack
              key={group}
              align="start"
              spacing={4}
              bg="ink.700"
              border="1px solid"
              borderColor="whiteAlpha.100"
              borderRadius="2xl"
              p={6}
              transition="all .2s"
              _hover={{ borderColor: m.color, transform: "translateY(-4px)" }}
            >
              <Flex
                w={12}
                h={12}
                align="center"
                justify="center"
                borderRadius="xl"
                bg="whiteAlpha.100"
                border="1px solid"
                borderColor="whiteAlpha.200"
              >
                <Icon as={m.icon} boxSize={6} color={m.color} />
              </Flex>
              <Text fontWeight="bold" color={m.color}>
                {group}
              </Text>
              <Wrap spacing={2}>
                {list.map((c) => (
                  <WrapItem key={c}>
                    <Tag size="md" bg="whiteAlpha.100" color="gray.200" borderRadius="md">
                      {c}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>
          );
        })}
      </SimpleGrid>
    </Section>
  );
}
