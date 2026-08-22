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
 * Una banda amb les seves rajoles. El color del fons hi arriba en bombolles, i
 * el costat del qual surten l'escull la secció sola, per l'accent que duu.
 */
export function BandaDeColor() {
  return (
    <Section
      id="seccio-primera"
      kicker="Etiqueta de secció"
      title="Un titular de banda"
      subtitle="L'entradeta de la secció, amb una **paraula en negreta** per veure com hi entra el marcatge."
      accent="skills"
    >
      <div style={graella}>
        <div style={rajolaTintada}>
          <h3 style={titolTargeta}>Primera rajola</h3>
          <p style={cosTargeta}>La rajola tintada va amb el degradat en diagonal i sense filet.</p>
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
 * La banda següent, amb un altre accent: la bombolla surt de l'altre costat.
 * Aquí les rajoles van amb filet prim en comptes de tintades.
 */
export function BandaNeta() {
  return (
    <Section
      id="seccio-segona"
      kicker="Etiqueta neutra"
      title="La banda següent, amb un altre accent"
      subtitle="El costat de la bombolla l'escull la secció sola, per l'accent que duu."
      accent="experience"
      kickerTone="neutral"
    >
      <div style={graella}>
        <div style={rajolaNeta}>
          <span style={pastilla}>Pastilla</span>
          <h3 style={{ ...titolTargeta, marginTop: 16 }}>Rajola de filet prim</h3>
          <p style={cosTargeta}>Els dos extrems del degradat són superfícies verificades.</p>
        </div>
        <div style={rajolaNeta}>
          <span style={pastilla}>Una altra</span>
          <h3 style={{ ...titolTargeta, marginTop: 16 }}>I no són intercanviables</h3>
          <p style={cosTargeta}>Fons igual que la secció i vora fina: aquí el que la defineix és el filet.</p>
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
      inverted
    >
      <p style={{ color: "var(--chakra-colors-accent-inverted)", fontSize: "1.25rem", margin: 0 }}>
        Un enllaç o una dada de contacte hi van amb aquest to.
      </p>
    </Section>
  );
}
