"use client";

import { Box, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Section } from "./Section";
import { clientHours, clientHoursSummary } from "../data";

// Formato español (miles con punto, decimales con coma), determinista sin depender de ICU.
function fmtHours(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (dec === "00") return grouped;
  return `${grouped},${dec.replace(/0$/, "")}`;
}

export function ClientHours() {
  const max = Math.max(...clientHours.map((c) => c.hours));

  return (
    <Section
      id="trayectoria"
      kicker="Trayectoria por clientes"
      title="Horas dedicadas por cliente"
      subtitle="Datos reales de dedicación imputada a proyectos en el gestor, ordenados por horas."
    >
      {/* summary */}
      <SimpleGrid columns={{ base: 3 }} spacing={6} mb={{ base: 10, md: 12 }} maxW="lg">
        <Stat value={clientHoursSummary.totalHours} label="Horas en proyectos" />
        <Stat value={clientHoursSummary.totalProjects} label="Proyectos" />
        <Stat value="11" label="Clientes top" />
      </SimpleGrid>

      {/* bars */}
      <VStack align="stretch" spacing={{ base: 4, md: 3 }}>
        {clientHours.map((c, i) => (
          <Box key={c.name}>
            <Flex
              justify="space-between"
              align={{ base: "start", sm: "center" }}
              mb={2}
              direction={{ base: "column", sm: "row" }}
              gap={1}
            >
              <HStack spacing={3}>
                <Text color="gray.400" fontWeight="bold" fontSize="sm" w="6" textAlign="right">
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Text fontWeight="bold">{c.name}</Text>
                <Text color="gray.400" fontSize="sm" display={{ base: "none", md: "block" }}>
                  · {c.projects} proyectos · {c.period}
                </Text>
              </HStack>
              <Text
                fontWeight="extrabold"
                fontSize={{ base: "md", md: "lg" }}
                bgGradient="linear(to-r, brand.300, purple.300)"
                bgClip="text"
                flexShrink={0}
              >
                {fmtHours(c.hours)} h
              </Text>
            </Flex>
            <Box h="10px" bg="whiteAlpha.100" borderRadius="full" overflow="hidden">
              <Box
                h="full"
                w={`${Math.max((c.hours / max) * 100, 2)}%`}
                borderRadius="full"
                bgGradient="linear(to-r, brand.500, brand.300)"
                transition="width .6s ease"
              />
            </Box>
            <Text color="gray.400" fontSize="xs" mt={1.5} display={{ base: "block", md: "none" }}>
              {c.projects} proyectos · {c.period}
            </Text>
          </Box>
        ))}
      </VStack>

      <Text color="gray.400" fontSize="sm" mt={8} maxW="3xl">
        {clientHoursSummary.note}
      </Text>
    </Section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Box>
      <Text
        fontSize={{ base: "2xl", md: "3xl" }}
        fontWeight="black"
        bgGradient="linear(to-r, brand.300, purple.300)"
        bgClip="text"
        lineHeight="1"
      >
        {value}
      </Text>
      <Text color="gray.400" fontSize="xs" mt={1}>
        {label}
      </Text>
    </Box>
  );
}
