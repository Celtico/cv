"use client";

import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Section } from "./Section";
import { clients } from "../data";
import { useT } from "../i18n";

export function Clients() {
  const t = useT();
  return (
    <Section id="clientes" kicker={t.clients.kicker} title={t.clients.title} subtitle={t.clients.subtitle} bg="bg.subtle">
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={{ base: 10, md: 12 }}>
        {Object.values(clients).map((list, gi) => (
          <Box key={gi}>
            <Text
              className="tnum"
              fontSize="0.7rem"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="accent.fg"
              pb={3}
              mb={2}
              borderBottom="1px solid"
              borderColor="border.emphasized"
            >
              {String(gi + 1).padStart(2, "0")} · {t.clients.groups[gi]}
            </Text>
            <VStack align="stretch" spacing={0}>
              {list.map((c) => (
                <Text
                  key={c}
                  fontFamily="heading"
                  fontSize={{ base: "1.05rem", md: "1.15rem" }}
                  color="fg"
                  py={2}
                  borderBottom="1px solid"
                  borderColor="border"
                >
                  {c}
                </Text>
              ))}
            </VStack>
          </Box>
        ))}
      </Grid>
    </Section>
  );
}
