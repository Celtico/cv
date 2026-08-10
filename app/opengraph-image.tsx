import { ImageResponse } from "next/og";
import { profile, stats } from "./data";

// Targeta social de la portada. Abans no n'hi havia cap i el layout declarava
// `twitter:card: summary_large_image`, així que cada vegada que s'enganxava
// serverscel.com a LinkedIn en sortia una targeta buida.
//
// Aquí l'ambre va congelat: la resta de la web sorteja l'accent a cada visita,
// però la identitat compartida ha de ser sempre la mateixa.

export const alt = `${profile.name} — Desenvolupador web full-stack i dissenyador a Lleida`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#141210";
const INK = "#EDE6D6";
const MUTED = "#A79F8E";
const AMBER = "#CE8724";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        {/* línia d'expedient */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, color: MUTED, letterSpacing: 3 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: AMBER, display: "flex" }} />
          <div style={{ display: "flex" }}>SERVERSCEL.COM</div>
          <div style={{ display: "flex", color: "#4A4234" }}>/</div>
          <div style={{ display: "flex" }}>BALAGUER · LLEIDA</div>
          <div style={{ display: "flex", color: "#4A4234" }}>/</div>
          <div style={{ display: "flex", color: AMBER }}>DISPONIBLE</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, color: INK, lineHeight: 1, letterSpacing: -3 }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: MUTED, letterSpacing: -0.5 }}>
            Desenvolupador full-stack · Disseny UX/UI
          </div>
        </div>

        {/* xifres */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 64, borderTop: `1px solid #4A4234`, paddingTop: 32 }}>
          {stats.slice(0, 3).map((s) => (
            <div key={s.value} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 52, color: AMBER, lineHeight: 1 }}>{s.value}</div>
              <div style={{ display: "flex", marginTop: 10, fontSize: 20, color: MUTED, letterSpacing: 2 }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
