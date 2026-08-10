// Nucli determinista del sistema de color de la web.
//
// Un sol gris (el de la bitàcola, fix al tema) i vuit accents. El camí que
// permetia re-tintar els neutres amb un gris triat es va retirar amb el
// selector del peu: era el seu únic consumidor. Si mai torna, és a l'històric.
//
// Viu separat d'`accent.tsx` (que és el provider de React) perquè és lògica
// pura, sense JSX ni DOM: així es pot importar des de `node --test` i cobrir
// amb tests el que sosté el contrast de tot el lloc.
//
// Regla que governa aquest fitxer: cap token de text es publica sense haver
// comprovat que arriba a 4,5:1 contra el fons on es pintarà. Els topalls
// d'HSL no serveixen — l'HSL no és perceptual i un blau al 34% de claror és
// molt més fosc que un groc a la mateixa claror.

export const ACCENT_SUGGESTIONS = [
  "#CE8724", // ambre original de la bitàcola
  "#4F46E5", // indi
  "#1D6CE0", // blau
  "#0E7490", // cian fosc
  "#2F855A", // verd
  "#DD6B20", // taronja
  "#D33A2C", // vermell
  "#D53F8C", // rosa
] as const;

/** Les dues tintes de text disponibles per damunt d'un color ple. */
export const TEXT_DARK = "#141210";
export const TEXT_LIGHT = "#f5efe2";

/** Llindar AA per a text normal. */
export const AA = 4.5;
/** Llindar AA per a components i gràfics no textuals (WCAG 1.4.11). */
export const AA_NON_TEXT = 3;

export type Mode = "light" | "dark";

// ——— conversions ———

export function normalizeHex(raw: string): string | null {
  const m = raw.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(m)) return null;
  return `#${m.toLowerCase()}`;
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}

export function hslToHex(h: number, s: number, l: number): string {
  if (s === 0) return rgbToHex(l * 255, l * 255, l * 255);
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return rgbToHex(f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255);
}

/** El mateix to i saturació, amb la lluminositat fixada. */
export function withLightness(hex: string, l: number): string {
  const [h, s] = hexToHsl(hex);
  return hslToHex(h, s, clamp01(l));
}

export function alpha(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

// ——— contrast ———

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Mou la claror d'un color, conservant-ne to i saturació, fins que arriba al
 * contrast demanat contra TOTS els fons donats. `dir` és -1 per enfosquir
 * (text fosc sobre fons clars) i +1 per aclarir.
 */
export function contrastify(hex: string, backgrounds: string[], target: number, dir: 1 | -1): string {
  const ok = (c: string) => backgrounds.every((b) => contrastRatio(c, b) >= target);
  if (ok(hex)) return hex;
  const [h, s, l] = hexToHsl(hex);
  for (let i = 1; i <= 50; i++) {
    const nl = clamp01(l + dir * 0.02 * i);
    const c = hslToHex(h, s, nl);
    if (ok(c)) return c;
    if (nl === 0 || nl === 1) break;
  }
  // extrem del recorregut: preferim un negre/blanc llegible a un token que falla
  return dir > 0 ? "#ffffff" : "#000000";
}

/** La tinta de text que millor es llegeix sobre un color ple. */
export function bestTextOn(solid: string): string {
  return contrastRatio(TEXT_DARK, solid) >= contrastRatio(TEXT_LIGHT, solid) ? TEXT_DARK : TEXT_LIGHT;
}

/**
 * Ajusta un color ple fins que alguna de les dues tintes de text hi arribi a
 * `target`, movent-ne la claror el mínim possible en qualsevol direcció.
 * Conserva el to, així que l'accent continua sent reconeixible.
 */
export function solidWithReadableText(solid: string, target = AA): string {
  const best = (c: string) => Math.max(contrastRatio(TEXT_DARK, c), contrastRatio(TEXT_LIGHT, c));
  if (best(solid) >= target) return solid;
  const [h, s, l] = hexToHsl(solid);
  for (let i = 1; i <= 50; i++) {
    const d = 0.02 * i;
    const down = l - d >= 0 ? hslToHex(h, s, l - d) : null;
    const up = l + d <= 1 ? hslToHex(h, s, l + d) : null;
    // a igualtat de distància preferim enfosquir: manté el color més saturat
    if (down && best(down) >= target) return down;
    if (up && best(up) >= target) return up;
    if (!down && !up) break;
  }
  return solid;
}

// ——— neutres ———

// Neutres per defecte del tema (clar / fosc), tal com són a theme.ts.
// IMPORTANT: aquesta taula duplica els valors de `theme.ts`. Si en canvies un,
// canvia'l als dos llocs — el tema serveix l'SSR i aquesta taula és el fons
// contra el qual es comprova el contrast de cada accent.
export const NEUTRAL_DEFAULTS: Record<string, [string, string]> = {
  bg: ["#ECE5D5", "#141210"],
  "bg.subtle": ["#E4DBC8", "#1B1813"],
  "bg.panel": ["#F4EFE4", "#221E18"],
  fg: ["#1A1712", "#EDE6D6"],
  "fg.muted": ["#5C5546", "#A79F8E"],
  // pujat de #847C6A, que no arribava a 4,5:1 en cap mode i pinta capçaleres
  // de columna reals a la taula d'hores. El clar arriba fins a #635C4E perquè
  // el fons més exigent és bg.subtle (#E4DBC8), no bg.
  "fg.subtle": ["#635C4E", "#9A917F"],
  "bg.inverted": ["#141210", "#E9E2D3"],
  "fg.inverted": ["#EDE6D6", "#1A1712"],
  "fg.inverted.muted": ["#A79F8E", "#6B6353"],
  "gray.emphasized": ["#C9BFA8", "#4A4234"], // gris èmfasi: vel de les fotos
  "gray.contrast": ["#F7F3E9", "#0D0B09"], // panell de màxim contrast
  // tinta de les il·lustracions: fosca en tots dos modes
  "ink.bg": ["#14110c", "#14110c"],
  "ink.subtle": ["#1d1913", "#1d1913"],
  "ink.border": ["#4a4234", "#4a4234"],
  "ink.border.subtle": ["#2e2a22", "#2e2a22"],
  "ink.fg": ["#EDE6D6", "#EDE6D6"],
  "ink.fg.muted": ["#A79F8E", "#A79F8E"],
};

/** Els neutres del tema sense re-tintar, per al mode donat. */
export function defaultNeutrals(mode: Mode): Record<string, string> {
  const i = mode === "light" ? 0 : 1;
  const out: Record<string, string> = {};
  for (const [name, defaults] of Object.entries(NEUTRAL_DEFAULTS)) out[name] = defaults[i];
  out["bg.nav"] = mode === "light" ? alpha("#ECE5D5", 0.8) : alpha("#141210", 0.78);
  return out;
}

// ——— accent ———

/**
 * Deriva els tokens d'accent contra els fons que realment s'usaran.
 * Rep els neutres ja calculats perquè el contrast es comprova contra les
 * superfícies definitives, no contra les del tema per defecte.
 */
export function deriveAccent(hex: string, neutrals: Record<string, string>, mode: Mode): Record<string, string> {
  const dir = mode === "light" ? -1 : 1;
  const surfaces = [neutrals.bg, neutrals["bg.subtle"], neutrals["bg.panel"], neutrals["gray.contrast"]];

  // Fons ple dels botons: ajustat, si cal, perquè hi càpiga text llegible.
  const solid = solidWithReadableText(hex);
  const contrast = bestTextOn(solid);

  // L'estat de passada del ratolí es mou en la direcció que AUGMENTA el
  // contrast amb el text triat, no sempre cap a més clar: així el hover mai
  // no pot empitjorar la llegibilitat del botó.
  const textIsLight = contrast === TEXT_LIGHT;
  const [eh, es, el] = hexToHsl(solid);
  const emphasized = contrastify(
    hslToHex(eh, es, clamp01(el + (textIsLight ? -0.07 : 0.07))),
    [contrast],
    AA,
    textIsLight ? -1 : 1,
  );

  return {
    // text d'accent sobre les superfícies del mode
    "accent.fg": contrastify(hex, surfaces, AA, dir),
    // marca decorativa: no és text, però ha de distingir-se del fons
    "accent.dot": contrastify(hex, [neutrals.bg], AA_NON_TEXT, dir),
    "accent.solid": solid,
    "accent.emphasized": emphasized,
    "accent.contrast": contrast,
    // accent llegible per damunt del bloc invertit
    "accent.inverted": contrastify(hex, [neutrals["bg.inverted"]], AA, dir === 1 ? -1 : 1),
    "accent.muted": alpha(hex, 0.2),
  };
}

/**
 * Tokens que s'escriuen al DOM per a un accent. Els neutres del tema no es
 * toquen: el gris de la bitàcola és fix i és el que fa que el paper sembli
 * paper.
 */
export function deriveAll(hex: string, mode: Mode): Record<string, string> {
  return deriveAccent(hex, defaultNeutrals(mode), mode);
}
