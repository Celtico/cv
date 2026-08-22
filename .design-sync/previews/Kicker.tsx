import type { CSSProperties } from "react";
import { Kicker } from "@serverscel/ds";

// El `data-accent` és el que fa arribar `accent.deep` a la pastilla. Al lloc el
// posa `Section`; aquí es posa a mà perquè el `Kicker` es vegi sol.
const banc = (accent: string, fons?: string): CSSProperties => ({
  background: fons ?? "var(--chakra-colors-bg)",
  padding: "28px 26px",
  borderRadius: 14,
});

const titular: CSSProperties = {
  font: "700 2.4rem/1.05 system-ui, -apple-system, 'Segoe UI', sans-serif",
  letterSpacing: "-0.03em",
  margin: "4px 0 0",
  color: "var(--chakra-colors-fg)",
};

/** Pastilla d'`accent.deep` amb text blanc: el to de la majoria de seccions. */
export function Accent() {
  return (
    <div data-accent="featured" style={banc("featured")}>
      <Kicker tone="accent">Projectes propis</Kicker>
      <h2 style={titular}>Tres aplicacions vives</h2>
    </div>
  );
}

/** Pastilla grisa. Va repartida perquè no hi hagi vuit pastilles de color seguides. */
export function Neutre() {
  return (
    <div data-accent="clients" style={banc("clients")}>
      <Kicker tone="neutral">Trajectòria</Kicker>
      <h2 style={titular}>Els clients de sempre</h2>
    </div>
  );
}

/** Sobre fons invertit, la regla ha de ser clara: `rule="whiteAlpha.300"`. */
export function SobreFonsInvertit() {
  return (
    <div data-accent="experience" style={banc("experience", "var(--chakra-colors-bg-inverted)")}>
      <Kicker tone="accent" rule="whiteAlpha.300">
        Bloc invertit
      </Kicker>
      <h2 style={{ ...titular, color: "var(--chakra-colors-fg-inverted)" }}>El filet, més clar</h2>
    </div>
  );
}
