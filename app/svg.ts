// Lectura de les il·lustracions SVG en temps de build.
//
// Abans <InlineSvg> les demanava amb fetch() des del client: les cinc peces
// (33 kB) sortien en cascada després d'hidratar, no eren a l'HTML servit i,
// per tant, no existien per als cercadors ni per al primer paint. Aquí es
// llegeixen del disc mentre es prerenderitza i viatgen dins del document.
//
// NOMÉS es pot importar des de Server Components (fa servir node:fs).

import fs from "node:fs";
import path from "node:path";

const cache = new Map<string, string>();

/** Prefixa els id interns d'un SVG perquè dos SVG al mateix DOM no col·lisionin. */
function namespaceIds(markup: string, prefix: string): string {
  const ids = new Set<string>();
  for (const m of markup.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
  let out = markup;
  for (const id of ids) {
    const safe = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out
      .replace(new RegExp(`\\sid="${safe}"`, "g"), ` id="${prefix}-${id}"`)
      .replace(new RegExp(`url\\(#${safe}\\)`, "g"), `url(#${prefix}-${id})`)
      .replace(new RegExp(`(xlink:)?href="#${safe}"`, "g"), `$1href="#${prefix}-${id}"`);
  }
  return out;
}

export function readSvg(src: string): string {
  const hit = cache.get(src);
  if (hit) return hit;

  const file = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  let markup = fs.readFileSync(file, "utf8");

  // omple el marc encara que la proporció no coincideixi (com object-fit: cover)
  markup = markup.replace("<svg ", '<svg preserveAspectRatio="xMidYMid slice" focusable="false" ');
  markup = namespaceIds(markup, src.replace(/[^a-z0-9]+/gi, "").slice(-14));

  cache.set(src, markup);
  return markup;
}

/** Mapa src → marcatge per a totes les rutes .svg donades. */
export function svgMap(srcs: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const src of srcs) if (src.endsWith(".svg")) out[src] = readSvg(src);
  return out;
}
