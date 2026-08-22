import type { CSSProperties } from "react";
import { Reveal } from "@serverscel/ds";

const targeta: CSSProperties = {
  background: "linear-gradient(135deg, var(--chakra-colors-bg), var(--chakra-colors-accent-surface))",
  borderRadius: 14,
  padding: "28px 26px",
  color: "var(--chakra-colors-fg)",
};

const titol: CSSProperties = {
  font: "700 1.35rem/1.2 system-ui, -apple-system, 'Segoe UI', sans-serif",
  letterSpacing: "-0.02em",
  margin: 0,
};

const cos: CSSProperties = {
  color: "var(--chakra-colors-fg-muted)",
  fontSize: "1.0625rem",
  lineHeight: 1.6,
  margin: "12px 0 0",
};

/**
 * Un sol bloc. Com que en carregar ja és a la vista, `Reveal` no l'amaga ni
 * l'anima: aquest és el comportament correcte, i és per això que la fitxa el
 * mostra sencer.
 */
export function UnBloc() {
  return (
    <div data-accent="fucsia">
      <Reveal>
        <div style={targeta}>
          <h3 style={titol}>Millora progressiva</h3>
          <p style={cos}>
            El marcatge surt visible del servidor. Només s'amaga, abans de pintar, allò que encara
            queda fora de pantalla.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/** Una graella on cada element apareix pel seu compte en anar baixant. */
export function UnaGraella() {
  return (
    <div
      data-accent="verdblau"
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))", gap: 20 }}
    >
      {["Primer", "Segon", "Tercer"].map((n) => (
        <Reveal key={n}>
          <div style={targeta}>
            <h3 style={titol}>{n}</h3>
            <p style={cos}>Cada element duu el seu propi observador.</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
