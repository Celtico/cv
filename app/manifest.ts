import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Celestí Ticó Petit — CV i portfoli",
    short_name: "Cel · CV",
    description:
      "Currículum i portfoli de Celestí Ticó Petit: 20+ anys construint producte digital de principi a fi.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#141210",
    theme_color: "#141210",
    lang: "ca",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
