import { ImageResponse } from "next/og";
import { profile } from "../data";
import { blogPosts } from "./posts";

export const alt = `Blog — ${profile.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#141210";
const INK = "#EDE6D6";
const MUTED = "#A79F8E";
const AMBER = "#CE8724";

export default function BlogOpengraphImage() {
  const darrers = blogPosts.slice(0, 3);

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
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, color: MUTED, letterSpacing: 3 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: AMBER, display: "flex" }} />
          <div style={{ display: "flex" }}>SERVERSCEL.COM / BLOG</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, color: INK, lineHeight: 1, letterSpacing: -3 }}>
            Notes del taller
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: MUTED, maxWidth: 900 }}>
            IA aplicada, integració empresarial i projectes propis en producció.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid #4A4234", paddingTop: 28 }}>
          {darrers.map((p) => (
            <div key={p.slug} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, color: MUTED }}>
              <div style={{ display: "flex", color: AMBER }}>§</div>
              <div style={{ display: "flex" }}>{p.content.ca.title.slice(0, 74)}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
