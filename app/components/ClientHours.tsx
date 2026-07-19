"use client";

import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { Section } from "./Section";
import { clientHours, clientHoursSummary } from "../data";
import { useT } from "../i18n";

// Format català/espanyol: milers amb punt, decimals amb coma. Determinista, sense ICU.
function fmtHours(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return dec === "00" ? grouped : `${grouped},${dec.replace(/0$/, "")}`;
}

const COLS = { base: "1.8rem 1fr 4.5rem", md: "2.2rem 1fr 5rem 8rem 7rem" };

function Head({ l }: { l: ReturnType<typeof useT>["ledger"] }) {
  return (
    <Grid
      templateColumns={COLS}
      gap={{ base: 3, md: 6 }}
      className="tnum"
      fontSize="0.66rem"
      letterSpacing="0.14em"
      textTransform="uppercase"
      color="fgFaint"
      pb={3}
      borderBottom="1px solid"
      borderColor="lineStrong"
    >
      <Text>Nº</Text>
      <Text>{l.colClient}</Text>
      <GridItem display={{ base: "none", md: "block" }}>
        <Text>{l.colProj}</Text>
      </GridItem>
      <GridItem display={{ base: "none", md: "block" }}>
        <Text>{l.colPeriod}</Text>
      </GridItem>
      <Text textAlign="right">{l.colHours}</Text>
    </Grid>
  );
}

export function ClientHours() {
  const t = useT();
  const l = t.ledger;
  const max = Math.max(...clientHours.map((c) => c.hours));

  return (
    <Section id="trayectoria" kicker={l.kicker} title={l.title} subtitle={l.subtitle} bg="canvas">
      <Head l={l} />
      <Box>
        {clientHours.map((c, i) => {
          const pct = Math.max((c.hours / max) * 100, 1.5);
          return (
            <Box key={c.name}>
              <Grid
                templateColumns={COLS}
                gap={{ base: 3, md: 6 }}
                alignItems="baseline"
                py={{ base: 3.5, md: 4 }}
              >
                <Text className="tnum" fontSize="sm" color="fgFaint">
                  {String(i + 1).padStart(2, "0")}
                </Text>
                <Box minW={0}>
                  <Text fontFamily="heading" fontSize={{ base: "1.05rem", md: "1.25rem" }} color="fg" noOfLines={1}>
                    {c.name}
                  </Text>
                  <Text className="tnum" fontSize="0.68rem" color="fgMuted" mt={0.5} display={{ md: "none" }}>
                    {c.projects} proj · {c.period}
                  </Text>
                </Box>
                <Text className="tnum" fontSize="sm" color="fgMuted" display={{ base: "none", md: "block" }}>
                  {c.projects}
                </Text>
                <Text className="tnum" fontSize="sm" color="fgMuted" display={{ base: "none", md: "block" }}>
                  {c.period}
                </Text>
                <Text className="tnum" fontSize={{ base: "sm", md: "md" }} fontWeight="500" color="fg" textAlign="right">
                  {fmtHours(c.hours)}
                </Text>
              </Grid>
              {/* filet-registre amb magnitud */}
              <Box h="2px" bg="line" position="relative">
                <Box h="full" w={`${pct}%`} bg="accentDot" opacity={0.55} />
              </Box>
            </Box>
          );
        })}

        {/* totals */}
        <Grid
          templateColumns={COLS}
          gap={{ base: 3, md: 6 }}
          alignItems="baseline"
          pt={4}
          mt={1}
          borderTop="2px solid"
          borderColor="fg"
        >
          <Text className="tnum" fontSize="0.66rem" color="accent" letterSpacing="0.1em">
            Σ
          </Text>
          <Text className="tnum" fontSize="0.72rem" letterSpacing="0.14em" textTransform="uppercase" color="fgMuted">
            {l.total}
          </Text>
          <Text className="tnum" fontSize="sm" color="fg" display={{ base: "none", md: "block" }}>
            {clientHoursSummary.totalProjects}
          </Text>
          <GridItem display={{ base: "none", md: "block" }} />
          <Text className="tnum" fontSize={{ base: "sm", md: "md" }} fontWeight="600" color="fg" textAlign="right">
            {clientHoursSummary.totalHours}
          </Text>
        </Grid>
      </Box>

      <Text color="fgMuted" fontSize="sm" mt={8} maxW="44rem" lineHeight="1.7">
        {l.note}
      </Text>
    </Section>
  );
}
