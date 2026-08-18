"use client";

import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { Section } from "./Section";
import { experience } from "../data";
import { useT } from "../i18n";

export function Experience() {
  const t = useT();
  return (
    <Section id="experiencia" accent="experience" kickerTone="contrast" kicker={t.experience.kicker} title={t.experience.title} subtitle={t.experience.subtitle}>
      <Box borderTop="1px solid" borderColor="border.emphasized">
        {experience.map((e, i) => (
          <Grid
            key={e.company}
            templateColumns={{ base: "1fr", md: "auto 0.7fr 2fr" }}
            gap={{ base: 2, md: 8 }}
            alignItems="baseline"
            py={{ base: 6, md: 8 }}
            borderBottom="1px solid"
            borderColor="border"
          >
            <Text className="tnum" fontSize="sm" color="fg.subtle">
              {String(i + 1).padStart(2, "0")}
            </Text>
            <Text className="tnum" fontSize="0.8rem" color="accent.fg" letterSpacing="0.06em">
              {e.period}
            </Text>
            <Box>
              <Heading as="h3" textStyle="cardTitle" color="fg">
                {e.company}
              </Heading>
              <Text color="fg.muted" mt={1}>
                {t.experience.roles[i] ?? e.role}
              </Text>
            </Box>
          </Grid>
        ))}
      </Box>
    </Section>
  );
}
