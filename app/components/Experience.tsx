"use client";

import { Box, Grid, Text } from "@chakra-ui/react";
import { Section } from "./Section";
import { experience } from "../data";
import { useT } from "../i18n";

export function Experience() {
  const t = useT();
  return (
    <Section id="experiencia" kicker={t.experience.kicker} title={t.experience.title} bg="canvasAlt">
      <Box borderTop="1px solid" borderColor="lineStrong">
        {experience.map((e, i) => (
          <Grid
            key={e.company}
            templateColumns={{ base: "1fr", md: "auto 0.7fr 2fr" }}
            gap={{ base: 2, md: 8 }}
            alignItems="baseline"
            py={{ base: 6, md: 8 }}
            borderBottom="1px solid"
            borderColor="line"
          >
            <Text className="tnum" fontSize="sm" color="fgFaint">
              {String(i + 1).padStart(2, "0")}
            </Text>
            <Text className="tnum" fontSize="0.8rem" color="accent" letterSpacing="0.06em">
              {e.period}
            </Text>
            <Box>
              <Text fontFamily="heading" fontSize={{ base: "1.4rem", md: "1.7rem" }} lineHeight="1.15" color="fg">
                {e.company}
              </Text>
              <Text color="fgMuted" mt={1}>
                {t.experience.roles[i] ?? e.role}
              </Text>
            </Box>
          </Grid>
        ))}
      </Box>
    </Section>
  );
}
