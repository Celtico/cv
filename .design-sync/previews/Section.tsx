import type { CSSProperties } from "react";
import { Section } from "@serverscel/ds";

// Les targetes de dins es pinten amb els tokens de la secció, que arriben per
// herència des del `data-accent` que hi posa `Section`. És el que fa qualsevol
// fill: no ha de saber de quin color va la banda.
const rajolaTintada: CSSProperties = {
  background: "linear-gradient(135deg, var(--chakra-colors-bg), var(--chakra-colors-accent-surface))",
  borderRadius: 14,
  padding: "28px 26px",
};

const rajolaNeta: CSSProperties = {
  background: "var(--chakra-colors-bg)",
  border: "1px solid var(--chakra-colors-border-emphasized)",
  borderRadius: 14,
  padding: "28px 26px",
};

const graella: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
  gap: 20,
};

const titolTargeta: CSSProperties = {
  font: "700 1.35rem/1.2 system-ui, -apple-system, 'Segoe UI', sans-serif",
  letterSpacing: "-0.02em",
  margin: 0,
};

const cosTargeta: CSSProperties = {
  color: "var(--chakra-colors-fg-muted)",
  fontSize: "1.0625rem",
  lineHeight: 1.6,
  margin: "12px 0 0",
};

const pastilla: CSSProperties = {
  background: "var(--chakra-colors-accent-chip)",
  color: "var(--chakra-colors-fg)",
  borderRadius: 999,
  padding: "8px 14px",
  fontSize: "0.875rem",
  display: "inline-block",
  marginRight: 8,
};

/**
 * Banda de color: `tone="wash"` pinta la secció sencera amb el degradat
 * vertical del fons net fins a `accent.panel`, i les rajoles hi van amb el
 * degradat en diagonal.
 */
export function BandaDeColor() {
  return (
    <Section
      id="seccio-wash"
      kicker="Etiqueta de secció"
      title="Un titular de banda"
      subtitle="L'entradeta de la secció, amb una **paraula en negreta** per veure com hi entra el marcatge."
      accent="skills"
      tone="wash"
    >
      <div style={graella}>
        <div style={rajolaTintada}>
          <h3 style={titolTargeta}>Primera rajola</h3>
          <p style={cosTargeta}>Damunt d'una banda de color, la targeta va amb el degradat en diagonal i sense filet.</p>
        </div>
        <div style={rajolaTintada}>
          <h3 style={titolTargeta}>Segona rajola</h3>
          <p style={cosTargeta}>Els dos extrems del degradat són superfícies verificades: el text hi aguanta a qualsevol altura.</p>
        </div>
        <div style={rajolaTintada}>
          <h3 style={titolTargeta}>Tercera rajola</h3>
          <p style={cosTargeta}>La separació entre bandes la fa el farciment, no cap línia.</p>
        </div>
      </div>
    </Section>
  );
}

/**
 * Banda neta: `tone="flat"` deixa el fons del mode sense tocar i el color hi
 * entra només per l'etiqueta i pels accents. Les rajoles hi van amb filet prim.
 */
export function BandaNeta() {
  return (
    <Section
      id="seccio-flat"
      kicker="Etiqueta neutra"
      title="La banda següent, sense color"
      subtitle="Van saltejades: banda de color, banda neta, banda de color."
      accent="experience"
      tone="flat"
      kickerTone="neutral"
    >
      <div style={graella}>
        <div style={rajolaNeta}>
          <span style={pastilla}>Pastilla</span>
          <h3 style={{ ...titolTargeta, marginTop: 16 }}>Rajola de banda neta</h3>
          <p style={cosTargeta}>Fons igual que la secció i un filet prim: aquí el que la defineix és la vora.</p>
        </div>
        <div style={rajolaNeta}>
          <span style={pastilla}>Una altra</span>
          <h3 style={{ ...titolTargeta, marginTop: 16 }}>I no són intercanviables</h3>
          <p style={cosTargeta}>La rajola tintada damunt d'una banda neta perd el sentit, i a l'inrevés es fon amb el fons.</p>
        </div>
      </div>
    </Section>
  );
}

/**
 * Bloc invertit: `inverted` gira el fons i el text. L'accent que hi arriba és
 * `accent.inverted`, contrastat contra el negre (o el blanc) del bloc.
 *
 * Aquí NO s'hi fa servir `==ressaltat==`: el degradat de dins de les lletres
 * està contrastat contra les quatre superfícies del mode (`bg`, `bg.subtle`,
 * `bg.panel`, `gray.contrast`), i `bg.inverted` no n'és cap.
 */
export function Invertida() {
  return (
    <Section
      id="seccio-inverted"
      kicker="Bloc invertit"
      title="El fons gira, el color també"
      subtitle="Sobre el bloc invertit, l'accent que val és **accent.inverted**."
      accent="gallery"
      tone="flat"
      inverted
    >
      <p style={{ color: "var(--chakra-colors-accent-inverted)", fontSize: "1.25rem", margin: 0 }}>
        Un enllaç o una dada de contacte hi van amb aquest to.
      </p>
    </Section>
  );
}
