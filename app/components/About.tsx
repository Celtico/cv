"use client";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Section } from "./Section";
import { useT } from "../i18n";

export function About() {
  const t = useT();
  return (
    <Section id="sobre-mi" kicker={t.about.kicker} title={t.about.title} inverted>
      <Grid templateColumns={{ base: "1fr", md: "1.6fr 1fr" }} gap={{ base: 10, md: 16 }}>
        <Box>
          <Text
            fontFamily="heading"
            fontWeight="400"
            fontSize={{ base: "1.5rem", md: "1.9rem" }}
            lineHeight="1.4"
            color="invFg"
            mb={6}
          >
            {t.about.p1}
          </Text>
          <Text color="invMuted" fontSize={{ base: "md", md: "lg" }} lineHeight="1.8">
            {t.about.p2}
          </Text>
        </Box>

        <Box>
          <Text
            className="tnum"
            fontSize="xs"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="invMuted"
            mb={4}
          >
            {t.about.idiomes}
          </Text>
          {t.about.languages.map((l, i) => (
            <Flex
              key={l.name}
              justify="space-between"
              align="baseline"
              py={4}
              borderTop={i === 0 ? "1px solid" : undefined}
              borderBottom="1px solid"
              borderColor="invLine"
            >
              <Text fontFamily="heading" fontSize="lg" color="invFg">
                {l.name}
              </Text>
              <Text className="tnum" fontSize="xs" letterSpacing="0.1em" textTransform="uppercase" color="invMuted">
                {l.level}
              </Text>
            </Flex>
          ))}
        </Box>
      </Grid>
    </Section>
  );
}
