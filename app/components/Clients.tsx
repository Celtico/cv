"use client";

import { Box, Grid, Heading, List, ListItem } from "@chakra-ui/react";
import { Section } from "./Section";
import { clients } from "../data";
import { useT } from "../i18n";

export function Clients() {
  const t = useT();
  return (
    <Section id="clientes" accent="clients" glow="left" kicker={t.clients.kicker} title={t.clients.title} subtitle={t.clients.subtitle} bg="bg.subtle">
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={{ base: 10, md: 12 }}>
        {Object.values(clients).map((list, gi) => (
          <Box key={gi}>
            <Heading
              as="h3"
              className="tnum"
              textStyle="micro"
              fontWeight="500"
              color="accent.fg"
              pb={3}
              mb={2}
              borderBottom="1px solid"
              borderColor="border.emphasized"
            >
              {String(gi + 1).padStart(2, "0")} · {t.clients.groups[gi]}
            </Heading>
            {/* llista de debò: són 25 noms de client, no prosa solta */}
            <List spacing={0}>
              {list.map((c) => (
                <ListItem
                  key={c}
                  fontFamily="heading"
                  fontSize={{ base: "1.05rem", md: "1.15rem" }}
                  color="fg"
                  py={2}
                  borderBottom="1px solid"
                  borderColor="border"
                >
                  {c}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Grid>
    </Section>
  );
}
