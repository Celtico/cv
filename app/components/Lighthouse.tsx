"use client";

import { Box, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { useT } from "../i18n";

const RADI = 42;
const CIRCUMFERENCIA = 2 * Math.PI * RADI;

type GaugeProps = {
  value: number;
  label: string;
  delay: number;
  numColor: string;
  ringColor: string;
  trackColor: string;
};

function Gauge({ value, label, delay, numColor, ringColor, trackColor }: GaugeProps) {
  return (
    <VStack spacing={4}>
      <Box position="relative" w={{ base: "104px", md: "124px" }} h={{ base: "104px", md: "124px" }}>
        <Box as="svg" viewBox="0 0 100 100" w="full" h="full" sx={{ transform: "rotate(-90deg)" }}>
          <circle cx="50" cy="50" r={RADI} fill="none" stroke={trackColor} strokeWidth="5" />
          {/* El traçat s'ha de disparar quan la secció entra al viewport, no en
              carregar la pàgina: si no, com que la secció queda molt avall,
              l'animació ja ha acabat quan hi arribes i mai la veus. */}
          <motion.circle
            cx="50"
            cy="50"
            r={RADI}
            fill="none"
            stroke={ringColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCIA}
            initial={{ strokeDashoffset: CIRCUMFERENCIA }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, ease: "easeOut", delay }}
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
  // Ambre de la paleta del lloc. L'anell és decoratiu i pot ser més clar; la
  // xifra és text i necessita contrast, per això en clar va més fosca.
  const ringColor = useColorModeValue("#CE8724", "#E8A23D");
  const trackColor = useColorModeValue("rgba(206,135,36,0.20)", "rgba(232,162,61,0.18)");
  const numColor = useColorModeValue("#8F5E10", "#E8A23D");
  return (
    <Section id="calidad" kicker={t.lighthouse.kicker} title={t.lighthouse.title} subtitle={t.lighthouse.subtitle} bg="canvasAlt">
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 8, md: 6 }} justifyItems="center">
        {t.lighthouse.labels.map((label, i) => (
          <Gauge
            key={label}
            value={100}
            label={label}
            delay={i * 0.15}
            numColor={numColor}
            ringColor={ringColor}
            trackColor={trackColor}
          />
        ))}
      </SimpleGrid>
    </Section>
  );
}
