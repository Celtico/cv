"use client";

import { Box, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { Section } from "./Section";
import { useT } from "../i18n";

const RING = "#0cce6b";

function Gauge({ value, label, delay, numColor }: { value: number; label: string; delay: number; numColor: string }) {
  return (
    <VStack spacing={4}>
      <Box position="relative" w={{ base: "104px", md: "124px" }} h={{ base: "104px", md: "124px" }}>
        <Box as="svg" viewBox="0 0 100 100" w="full" h="full" sx={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(12,206,107,0.18)" strokeWidth="5" />
          <Box
            as="circle"
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={RING}
            strokeWidth="5"
            strokeLinecap="round"
            sx={{
              strokeDasharray: 264,
              strokeDashoffset: 0,
              animation: `lhDraw 1.6s ease-out ${delay}s both`,
            }}
          />
        </Box>
        <Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center">
          <Text className="tnum" fontSize={{ base: "1.7rem", md: "2rem" }} fontWeight="600" color={numColor}>
            {value}
          </Text>
        </Box>
      </Box>
      <Text
        className="tnum"
        fontSize="0.72rem"
        letterSpacing="0.1em"
        textTransform="uppercase"
        color="fgMuted"
        textAlign="center"
      >
        {label}
      </Text>
    </VStack>
  );
}

export function Lighthouse() {
  const t = useT();
  const numColor = useColorModeValue("#0a8f49", RING);
  return (
    <Section id="calidad" kicker={t.lighthouse.kicker} title={t.lighthouse.title} subtitle={t.lighthouse.subtitle} bg="canvasAlt">
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 6 }} justifyItems="center">
        {t.lighthouse.labels.map((label, i) => (
          <Gauge key={label} value={100} label={label} delay={i * 0.15} numColor={numColor} />
        ))}
      </SimpleGrid>
    </Section>
  );
}
