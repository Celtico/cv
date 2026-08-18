// Nucli determinista del sistema de color de la web.
//
// Neutres de màxim contrast (blanc pur ↔ negre pur) i un accent FIX PER SECCIÓ.
// El sorteig d'accent per visita es va retirar el 2026-08-18: donava una web
// monocroma i diferent a cada recàrrega. Ara cada secció duu el seu color, els
// vuit conviuen a la mateixa pàgina i el resultat és estable i reproduïble.
//
// Viu separat d'`accent.tsx` (que és el provider de React) perquè és lògica
// pura, sense JSX ni DOM: així es pot importar des de `node --test` i cobrir
// amb tests el que sosté el contrast de tot el lloc.
//
// Regla que governa aquest fitxer: cap token de text es publica sense haver
// comprovat que arriba a 4,5:1 contra el fons on es pintarà. Els topalls
// d'HSL no serveixen — l'HSL no és perceptual i un blau al 34% de claror és
// molt més fosc que un groc a la mateixa claror.

/**
 * L'accent de cada secció de la portada. La clau és el valor de `data-accent`
 * que `Section.tsx` posa a l'element; `layout.tsx` en precalcula els tokens
 * per als dos modes i els publica com a regles CSS, de manera que el color
 * arriba sense JavaScript ni flaix.
 *
 * L'ambre és el de la bitàcola original i fa de color per defecte: el duen la
 * barra, l'entradeta, les xifres, el contacte, el peu i el blog. La resta són
 * els que canten a JetBrains: saturats, un per secció.
 */
export const SECTION_ACCENTS = {
  base: "#E8912A", // ambre — barra, entradeta, xifres, contacte, peu, blog
  featured: "#2563EB", // blau elèctric — Tres aplicacions vives
  about: "#16A34A", // verd — Perfil
  skills: "#0891B2", // cian — Competències
  experience: "#6366F1", // indi — Experiència
  gallery: "#DB2777", // rosa — Galeria
  clients: "#EA580C", // taronja — Clients i trajectòria
  projects: "#7C3AED", // violeta — Projectes
} as const;

export type AccentName = keyof typeof SECTION_ACCENTS;

/** Els vuit accents en llista, per als tests de contrast. */
export const ACCENT_HEXES = Object.values(SECTION_ACCENTS) as readonly string[];

/** Les dues tintes de text disponibles per damunt d'un color ple. */
export const TEXT_DARK = "#0A0A0A";
export const TEXT_LIGHT = "#FFFFFF";

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

/** Barreja lineal de dos colors, `t` = quantitat del primer. */
export function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(r1 * t + r2 * (1 - t), g1 * t + g2 * (1 - t), b1 * t + b2 * (1 - t));
}

// ——— neutres ———

// Neutres per defecte del tema (clar / fosc), tal com són a theme.ts.
// Blanc pur ↔ negre pur: la parella de màxim contrast. El paper crema de la
// bitàcola es va retirar el 2026-08-18 a petició del Cel.
// IMPORTANT: aquesta taula duplica els valors de `theme.ts`. Si en canvies un,
// canvia'l als dos llocs — el tema serveix l'SSR i aquesta taula és el fons
// contra el qual es comprova el contrast de cada accent.
export const NEUTRAL_DEFAULTS: Record<string, [string, string]> = {
  bg: ["#FFFFFF", "#000000"],
  "bg.subtle": ["#F4F4F5", "#111113"],
  "bg.panel": ["#FFFFFF", "#0A0A0B"],
  fg: ["#0A0A0A", "#FFFFFF"],
  // El fons més exigent per als grisos no és `bg` sinó `bg.subtle`: els valors
  // estan triats contra aquell, no contra el blanc/negre pur.
  "fg.muted": ["#575757", "#A1A1A1"],
  "fg.subtle": ["#666666", "#8A8A8A"],
  "bg.inverted": ["#000000", "#FFFFFF"],
  "fg.inverted": ["#FFFFFF", "#0A0A0A"],
  "fg.inverted.muted": ["#A1A1A1", "#575757"],
  "gray.emphasized": ["#D4D4D8", "#3F3F46"], // gris èmfasi: vel de les fotos
  "gray.contrast": ["#FAFAFA", "#0A0A0B"], // panell separat del fons pur
  // tinta de les il·lustracions: fosca en tots dos modes
  "ink.bg": ["#0A0A0A", "#0A0A0A"],
  "ink.subtle": ["#141416", "#141416"],
  "ink.border": ["#3F3F46", "#3F3F46"],
  "ink.border.subtle": ["#242427", "#242427"],
  "ink.fg": ["#FFFFFF", "#FFFFFF"],
  "ink.fg.muted": ["#A1A1A1", "#A1A1A1"],
};

/** Els neutres del tema sense re-tintar, per al mode donat. */
export function defaultNeutrals(mode: Mode): Record<string, string> {
  const i = mode === "light" ? 0 : 1;
  const out: Record<string, string> = {};
  for (const [name, defaults] of Object.entries(NEUTRAL_DEFAULTS)) out[name] = defaults[i];
  out["bg.nav"] = mode === "light" ? alpha("#FFFFFF", 0.82) : alpha("#000000", 0.8);
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
    // Superfícies plenes, a la manera de JetBrains: la separació la fa el
    // farciment i no cap filet. La barreja es fa contra el fons del mode, de
    // manera que el text neutre hi conserva pràcticament tot el contrast —
    // `tests/contrast.test.ts` ho comprova.
    "accent.panel": mix(hex, neutrals.bg, mode === "dark" ? 0.2 : 0.09), // fons de secció
    "accent.surface": mix(hex, neutrals.bg, mode === "dark" ? 0.34 : 0.16), // targetes
    "accent.chip": mix(hex, neutrals.bg, mode === "dark" ? 0.48 : 0.26), // pastilles
  };
}

/**
 * Tokens que s'escriuen al DOM per a un accent. Els neutres del tema no es
 * toquen mai: només varien els accent.*, que és el que canvia de secció a
 * secció.
 */
export function deriveAll(hex: string, mode: Mode): Record<string, string> {
  return deriveAccent(hex, defaultNeutrals(mode), mode);
}

// ——— publicació com a CSS ———

/** Nom de la variable CSS de Chakra per a un token semàntic. */
export const cssVarFor = (token: string) => `--chakra-colors-${token.replace(/\./g, "-")}`;

const declarations = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(([name, value]) => `${cssVarFor(name)}:${value}`)
    .join(";");

/**
 * Full d'estil amb els tokens d'accent de cada secció, en clar i en fosc.
 *
 * Es genera en prerenderitzar i s'incrusta al `<head>`: el color arriba amb el
 * marcatge, sense JavaScript i sense flaix. Abans això ho feia un script
 * bloquejant que sortejava un accent i escrivia les variables al DOM.
 *
 * La regla fosca porta `.chakra-ui-dark` al davant (la classe que Chakra posa
 * al `<body>`) perquè guanyi per especificitat: sense això, la variable escrita
 * a l'element de la secció s'heretaria als fills i el mode fosc no hi arribaria.
 */
export function accentStylesheet(): string {
  const rules: string[] = [];
  // El fons de l'entradeta, a la manera de jetbrains.com: tres degradats
  // radials superposats que es fonen a transparent, cadascun amb la seva
  // posició i escala. No hi ha cap `filter: blur` — és més barat i el caient
  // es controla amb les parades del degradat, no amb un radi de desenfocament.
  //
  // Els dos colors vius no es queden quiets: recorren els vuit accents de la
  // pàgina, desfasats mig cicle l'un de l'altre perquè sempre n'hi hagi dos de
  // diferents alhora. Perquè un custom property de color es pugui interpolar
  // cal declarar-lo amb `@property`; als navegadors que no el tenen, es queda
  // al valor inicial i el fons simplement no s'anima.
  const cycle = Object.values(SECTION_ACCENTS);
  const half = Math.floor(cycle.length / 2);
  const stopsFor = (offset: number) =>
    cycle
      .map((_, i) => {
        const hex = cycle[(i + offset) % cycle.length];
        return `${((i / cycle.length) * 100).toFixed(2)}%{--glow-${offset ? 2 : 1}:${hex}}`;
      })
      .join("") + `100%{--glow-${offset ? 2 : 1}:${cycle[offset % cycle.length]}}`;

  rules.push(`@property --glow-1{syntax:"<color>";inherits:false;initial-value:${cycle[0]}}`);
  rules.push(`@property --glow-2{syntax:"<color>";inherits:false;initial-value:${cycle[half]}}`);
  rules.push(`@keyframes glow1{${stopsFor(0)}}`);
  rules.push(`@keyframes glow2{${stopsFor(half)}}`);
  rules.push(
    `.accent-cycle{` +
      `background:` +
      // La doble parada és el que fa el degradat: color ple fins al 12-15% i
      // només després el caient. Amb una sola parada se'n veu la cua i prou.
      `radial-gradient(72% 86% at 88% 8%,var(--glow-1) 0,var(--glow-1) 12%,transparent 70%),` +
      `radial-gradient(62% 76% at 68% 96%,var(--glow-2) 0,var(--glow-2) 10%,transparent 62%);` +
      `animation:glow1 64s linear infinite,glow2 64s linear infinite,` +
      `glowDrift 18s ease-in-out infinite}`,
  );

  // El mateix cicle, però per pintar l'interior de les lletres amb
  // `background-clip: text`. Aquí no s'hi poden fer servir els accents crus:
  // l'ambre sobre blanc no arriba ni a 3:1. S'usa `accent.fg`, que ja està
  // contrastat contra les superfícies del mode, i per això cal un joc de
  // fotogrames per mode.
  //
  // Que els dos extrems compleixin AA NO n'hi ha prou. La lluminància creix
  // de manera monòtona amb cada canal i la interpolació manté cada canal entre
  // els dels extrems, però la combinació resultant pot ser més fosca que tots
  // dos: barrejar un blau i un rosa que passen just el llindar dona un punt
  // intermedi que no hi arriba. Per això els extrems es contrasten amb marge,
  // i `tests/contrast.test.ts` mostreja tot el recorregut per comprovar-ho.
  const TEXT_MARGIN = 1.5;
  for (const mode of ["light", "dark"] as Mode[]) {
    const n = defaultNeutrals(mode);
    const surfaces = [n.bg, n["bg.subtle"], n["bg.panel"], n["gray.contrast"]];
    const texts = cycle.map((hex) => contrastify(hex, surfaces, AA * TEXT_MARGIN, mode === "light" ? -1 : 1));
    const suffix = mode === "dark" ? "Dark" : "Light";
    for (const [n, offset] of [[1, 0], [2, half]] as const) {
      const stops =
        texts
          .map((_, i) => `${((i / texts.length) * 100).toFixed(2)}%{--text-${n}:${texts[(i + offset) % texts.length]}}`)
          .join("") + `100%{--text-${n}:${texts[offset % texts.length]}}`;
      rules.push(`@keyframes text${n}${suffix}{${stops}}`);
    }
  }
  const initialText = (i: number) => {
    const n = defaultNeutrals("light");
    return contrastify(cycle[i], [n.bg, n["bg.subtle"], n["bg.panel"], n["gray.contrast"]], AA * 1.5, -1);
  };
  rules.push(`@property --text-1{syntax:"<color>";inherits:false;initial-value:${initialText(0)}}`);
  rules.push(`@property --text-2{syntax:"<color>";inherits:false;initial-value:${initialText(half)}}`);
  const textRule =
    `background-image:linear-gradient(100deg,var(--text-1),var(--text-2));` +
    `-webkit-background-clip:text;background-clip:text;color:transparent;`;
  rules.push(`.accent-text{${textRule}animation:text1Light 64s linear infinite,text2Light 64s linear infinite}`);
  rules.push(`.chakra-ui-dark .accent-text{animation:text1Dark 64s linear infinite,text2Dark 64s linear infinite}`);
  // En mode d'alt contrast del sistema, el text transparent desapareixeria.
  rules.push(`@media (forced-colors:active){.accent-text{background-image:none;color:CanvasText}}`);

  for (const [name, hex] of Object.entries(SECTION_ACCENTS)) {
    rules.push(`[data-accent="${name}"]{${declarations(deriveAll(hex, "light"))}}`);
    rules.push(`.chakra-ui-dark [data-accent="${name}"]{${declarations(deriveAll(hex, "dark"))}}`);
  }
  return rules.join("\n");
}
