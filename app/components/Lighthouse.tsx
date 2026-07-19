"use client";

import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Section } from "./Section";

const LH_GREEN = "#0cce6b";

const scores = [
  { label: "Rendimiento", value: 100 },
  { label: "Accesibilidad", value: 100 },
  { label: "Prácticas recomendadas", value: 100 },
  { label: "SEO", value: 100 },
];

function Gauge({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <VStack spacing={4}>
      <Box position="relative" w={{ base: "110px", md: "128px" }} h={{ base: "110px", md: "128px" }}>
        <Box
          as="svg"
          viewBox="0 0 100 100"
          w="full"
          h="full"
          sx={{ transform: "rotate(-90deg)" }}
        >
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(12,206,107,0.15)" strokeWidth="6" />
          <Box
            as="circle"
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={LH_GREEN}
            strokeWidth="6"
            strokeLinecap="round"
            sx={{
              strokeDasharray: 264,
              strokeDashoffset: 0,
              animation: `lhDraw 1.6s ease-out ${delay}s both`,
            }}
          />
        </Box>
        <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center">
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color={LH_GREEN}>
            {value}
          </Text>
        </Box>
      </Box>
      <Text fontSize="sm" fontWeight="semibold" color="gray.300" textAlign="center" maxW="140px">
        {label}
      </Text>
    </VStack>
  );
}

export function Lighthouse() {
  return (
    <Section
      id="calidad"
      kicker="Calidad · Google Lighthouse"
      title="100 / 100 / 100 / 100"
      subtitle="Auditoría de Lighthouse sobre esta misma web en producción (serverscel.com): rendimiento, accesibilidad, prácticas recomendadas y SEO, todo al máximo."
      bg="ink.800"
    >
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 6 }} justifyItems="center">
        {scores.map((s, i) => (
          <Gauge key={s.label} value={s.value} label={s.label} delay={i * 0.15} />
        ))}
      </SimpleGrid>
    </Section>
  );
}
