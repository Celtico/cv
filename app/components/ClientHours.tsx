"use client";

import { Box, Text, VisuallyHidden } from "@chakra-ui/react";
import { Section } from "./Section";
import { clientHours, clientHoursSummary } from "../data";
import { useT } from "../i18n";
import { stripMarkup } from "../markup";

// Format català/espanyol: milers amb punt, decimals amb coma. Determinista, sense ICU.
function fmtHours(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return dec === "00" ? grouped : `${grouped},${dec.replace(/0$/, "")}`;
}

const COLS = { base: "1.8rem 1fr 4.5rem", md: "2.2rem 1fr 5rem 8rem 7rem" };

// Aquesta secció és un conjunt de dades tabulars de cinc columnes. Abans es
// dibuixava amb Grid i Box: visualment idèntic, però per a un lector de
// pantalla arribava com a text solt, sense relació entre capçalera i cel·la.
// Ara són <table>/<th scope="col">/<td> de debò, maquetats amb grid.
const rowGrid = {
  display: "grid",
  gridTemplateColumns: COLS,
  gap: { base: 3, md: 6 },
  alignItems: "baseline",
} as const;

const hideBase = { base: "none", md: "block" };

export function ClientHours() {
  const t = useT();
  const l = t.ledger;
  const max = Math.max(...clientHours.map((c) => c.hours));

  return (
    <Section id="trayectoria" accent="clients" tone="wash" kicker={l.kicker} title={l.title} subtitle={l.subtitle}>
      <Box as="table" w="full" sx={{ display: "block", borderCollapse: "collapse" }}>
        {/* La llegenda de la taula la senten els lectors de pantalla: text pla,
            sense marcadors. */}
        <VisuallyHidden as="caption">{stripMarkup(l.subtitle)}</VisuallyHidden>

        <Box as="thead" display="block">
          <Box
            as="tr"
            sx={rowGrid}
            className="tnum"
            fontSize="xs"
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="fg.subtle"
            pb={3}
            borderBottom="1px solid"
            borderColor="border.emphasized"
          >
            <Box as="th" scope="col" textAlign="left" fontWeight="inherit">
              Nº
            </Box>
            <Box as="th" scope="col" textAlign="left" fontWeight="inherit">
              {l.colClient}
            </Box>
            <Box as="th" scope="col" textAlign="left" fontWeight="inherit" display={hideBase}>
              {l.colProj}
            </Box>
            <Box as="th" scope="col" textAlign="left" fontWeight="inherit" display={hideBase}>
              {l.colPeriod}
            </Box>
            <Box as="th" scope="col" textAlign="right" fontWeight="inherit">
              {l.colHours}
            </Box>
          </Box>
        </Box>

        <Box as="tbody" display="block">
          {clientHours.map((c, i) => {
            const pct = Math.max((c.hours / max) * 100, 1.5);
            return (
              <Box
                as="tr"
                key={c.name}
                sx={{
                  ...rowGrid,
                  // el filet-registre amb la magnitud, ara com a fons de la
                  // fila: abans era un <div> germà, que dins d'una taula no és
                  // marcatge vàlid
                  background: `linear-gradient(to right, var(--chakra-colors-accent-dot) ${pct}%, var(--chakra-colors-border) ${pct}%) bottom left / 100% 2px no-repeat`,
                }}
                py={{ base: 3.5, md: 4 }}
              >
                <Box as="td" className="tnum" fontSize="sm" color="fg.subtle">
                  {String(i + 1).padStart(2, "0")}
                </Box>
                <Box as="td" minW={0}>
                  <Text fontFamily="heading" fontSize={{ base: "1.05rem", md: "1.25rem" }} color="fg" noOfLines={1}>
                    {c.name}
                  </Text>
                  <Text className="tnum" fontSize="xs" color="fg.muted" mt={0.5} display={{ md: "none" }}>
                    {c.projects} proj · {c.period}
                  </Text>
                </Box>
                <Box as="td" className="tnum" fontSize="sm" color="fg.muted" display={hideBase}>
                  {c.projects}
                </Box>
                <Box as="td" className="tnum" fontSize="sm" color="fg.muted" display={hideBase}>
                  {c.period}
                </Box>
                <Box
                  as="td"
                  className="tnum"
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="500"
                  color="fg"
                  textAlign="right"
                  // Al mòbil la columna és estreta i «4.749,25» es partia en dues
                  // línies, amb el «5» sol a sota.
                  whiteSpace="nowrap"
                >
                  {fmtHours(c.hours)}
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box as="tfoot" display="block">
          <Box as="tr" sx={rowGrid} pt={4} mt={1} borderTop="2px solid" borderColor="fg">
            <Box as="td" className="tnum" fontSize="xs" color="accent.fg" letterSpacing="0.1em">
              Σ
            </Box>
            <Box
              as="th"
              scope="row"
              textAlign="left"
              className="tnum"
              fontSize="xs"
              fontWeight="inherit"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="fg.muted"
            >
              {l.total}
            </Box>
            <Box as="td" className="tnum" fontSize="sm" color="fg" display={hideBase}>
              {clientHoursSummary.totalProjects}
            </Box>
            <Box as="td" display={hideBase} />
            <Box as="td" className="tnum" fontSize={{ base: "sm", md: "md" }} fontWeight="600" color="fg" textAlign="right">
              {clientHoursSummary.totalHours}
            </Box>
          </Box>
        </Box>
      </Box>

      <Text color="fg.muted" fontSize="sm" mt={8} maxW="44rem" lineHeight="1.7">
        {l.note}
      </Text>
    </Section>
  );
}
