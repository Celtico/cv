"use client";

import { Box, Grid, Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Section } from "./Section";
import { skills } from "../data";
import { useT } from "../i18n";

export function Skills() {
  const t = useT();
  return (
    <Section id="skills" accent="skills" kickerTone="contrast" tone="wash" kicker={t.skills.kicker} title={t.skills.title} subtitle={t.skills.subtitle}>
      <Box borderTop="1px solid" borderColor="border">
        {skills.map((s, i) => (
          <Grid
            key={s.group}
            templateColumns={{ base: "1fr", md: "0.9fr 2.4fr auto" }}
            gap={{ base: 3, md: 8 }}
            alignItems="baseline"
            py={{ base: 6, md: 7 }}
            borderBottom="1px solid"
            borderColor="border"
          >
            <Heading as="h3" textStyle="cardTitle" color="fg">
              {t.skills.groups[i] ?? s.group}
            </Heading>
            <Wrap spacing={2}>
              {s.items.map((it) => (
                <WrapItem key={it}>
                  <Text
                    className="tnum"
                    fontSize="0.78rem"
                    layerStyle="chip"
                  >
                    {it}
                  </Text>
                </WrapItem>
              ))}
            </Wrap>
            <Text
              className="tnum"
              fontSize="xs"
              color="fg.subtle"
              textAlign={{ md: "right" }}
              display={{ base: "none", md: "block" }}
            >
              {String(i + 1).padStart(2, "0")} / {String(skills.length).padStart(2, "0")}
            </Text>
          </Grid>
        ))}
      </Box>
    </Section>
  );
}
