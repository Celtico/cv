"use client";

import { Box, Grid, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Section } from "./Section";
import { skills } from "../data";
import { useT } from "../i18n";

export function Skills() {
  const t = useT();
  return (
    <Section id="skills" kicker={t.skills.kicker} title={t.skills.title} subtitle={t.skills.subtitle} bg="canvas">
      <Box borderTop="1px solid" borderColor="line">
        {skills.map((s, i) => (
          <Grid
            key={s.group}
            templateColumns={{ base: "1fr", md: "0.9fr 2.4fr auto" }}
            gap={{ base: 3, md: 8 }}
            alignItems="baseline"
            py={{ base: 6, md: 7 }}
            borderBottom="1px solid"
            borderColor="line"
          >
            <Text fontFamily="heading" fontSize={{ base: "1.4rem", md: "1.7rem" }} color="fg">
              {t.skills.groups[i] ?? s.group}
            </Text>
            <Wrap spacing={2}>
              {s.items.map((it) => (
                <WrapItem key={it}>
                  <Text
                    className="tnum"
                    fontSize="0.78rem"
                    color="fgMuted"
                    px={2.5}
                    py={1}
                    border="1px solid"
                    borderColor="line"
                    borderRadius="2px"
                  >
                    {it}
                  </Text>
                </WrapItem>
              ))}
            </Wrap>
            <Text
              className="tnum"
              fontSize="xs"
              color="fgFaint"
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
