"use client";

// Accent dinàmic de la web. El color «principal» es tria al selector del peu
// (o a l'atzar a cada visita si no s'ha triat mai) i es projecta sobre els
// tokens semàntics de Chakra sobreescrivint les seves variables CSS al <body>,
// amb valors derivats segons el mode dia/nit perquè el contrast es mantingui.

import { createContext, useContext, useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/react";

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

// Grisos candidats per al secundari: mateix rang de claror, tons diferents.
export const GRAY_SUGGESTIONS = [
  "#847C6A", // càlid (el de la bitàcola)
  "#7F7F7F", // neutre pur
  "#708090", // pissarra freda
  "#6E7B8B", // blau apagat
  "#75816F", // verd oliva apagat
  "#867680", // malva apagat
] as const;

const STORAGE_KEY = "accent-hex";
const STORAGE_KEY2 = "accent2-hex";

// ——— utilitats de color (hex ↔ HSL) ———

export function normalizeHex(raw: string): string | null {
  const m = raw.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(m)) return null;
  return `#${m.toLowerCase()}`;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (v: number) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function hexToHsl(hex: string): [number, number, number] {
  let [r, g, b] = hexToRgb(hex).map((v) => v / 255);
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

function hslToHex(h: number, s: number, l: number): string {
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
  return hslToHex(h, s, l);
}

function alpha(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// ——— derivació de tokens per a cada mode ———

// El secundari és el GRIS de la web: re-tinta l'escala de neutres (paper,
// tinta, textos apagats) amb el seu to, mantenint les clarors originals
// perquè el contrast no es mogui. Per defecte, el gris càlid de la bitàcola.
export const DEFAULT_SECONDARY = "#847C6A";

function deriveTokens(hex: string, mode: "light" | "dark"): Record<string, string> {
  const [, , l] = hexToHsl(hex);
  const solid = hex;
  const dot = mode === "light" ? hex : withLightness(hex, Math.max(l, 0.6));
  return {
    "accent.fg": mode === "light" ? withLightness(hex, Math.min(l, 0.34)) : withLightness(hex, Math.max(l, 0.62)),
    "accent.dot": dot,
    "accent.solid": solid,
    "accent.emphasized": withLightness(hex, Math.min(l + 0.1, 0.82)),
    "accent.contrast": relativeLuminance(solid) > 0.35 ? "#141210" : "#f5efe2",
    "accent.inverted": mode === "light" ? withLightness(hex, 0.66) : withLightness(hex, 0.34),
    "accent.muted": alpha(dot, 0.2),
  };
}

// Neutres per defecte del tema (clar / fosc), tal com són a theme.ts.
const NEUTRAL_DEFAULTS: Record<string, [string, string]> = {
  bg: ["#ECE5D5", "#141210"],
  "bg.subtle": ["#E4DBC8", "#1B1813"],
  "bg.panel": ["#F4EFE4", "#221E18"],
  fg: ["#1A1712", "#EDE6D6"],
  "fg.muted": ["#5C5546", "#A79F8E"],
  "fg.subtle": ["#847C6A", "#847C6A"],
  "bg.inverted": ["#141210", "#E9E2D3"],
  "fg.inverted": ["#EDE6D6", "#1A1712"],
  "fg.inverted.muted": ["#A79F8E", "#6B6353"],
  "gray.emphasized": ["#C9BFA8", "#4A4234"], // gris èmfasi: vel de les fotos
  "gray.contrast": ["#F7F3E9", "#0D0B09"], // panell de màxim contrast
  // tinta de les il·lustracions: sempre fosca, però segueix el to del gris
  "ink.bg": ["#14110c", "#14110c"],
  "ink.subtle": ["#1d1913", "#1d1913"],
  "ink.border": ["#4a4234", "#4a4234"],
  "ink.border.subtle": ["#2e2a22", "#2e2a22"],
  "ink.fg": ["#EDE6D6", "#EDE6D6"],
  "ink.fg.muted": ["#A79F8E", "#A79F8E"],
};

/** Reconstrueix un neutre amb el to del gris triat, conservant la claror. */
function retint(defaultHex: string, hue: number, k: number): string {
  const [, s, l] = hexToHsl(defaultHex);
  return hslToHex(hue, Math.min(s * k, 0.5), l);
}

function deriveNeutrals(hex2: string, mode: "light" | "dark"): Record<string, string> {
  const [h2, s2] = hexToHsl(hex2);
  const [, sRef] = hexToHsl(DEFAULT_SECONDARY);
  // factor de saturació relatiu al gris de referència, acotat perquè un color
  // molt viu no converteixi els fons en fluorescents
  const k = Math.min(s2 / sRef, 3);
  const i = mode === "light" ? 0 : 1;
  const out: Record<string, string> = {};
  for (const [name, defaults] of Object.entries(NEUTRAL_DEFAULTS)) {
    out[name] = retint(defaults[i], h2, k);
  }
  // fons translúcid de la barra de navegació
  out["bg.nav"] = mode === "light" ? alpha(retint("#ECE5D5", h2, k), 0.8) : alpha(retint("#141210", h2, k), 0.78);
  return out;
}

type Ctx = {
  hex: string;
  setHex: (h: string) => void;
  hex2: string; // el gris efectiu (triat o el per defecte)
  setHex2: (h: string) => void;
};
const AccentContext = createContext<Ctx>({
  hex: ACCENT_SUGGESTIONS[0],
  setHex: () => {},
  hex2: DEFAULT_SECONDARY,
  setHex2: () => {},
});

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const { colorMode } = useColorMode();
  const [hex, setHexState] = useState<string>(ACCENT_SUGGESTIONS[0]);
  // null = automàtic (derivat del principal)
  const [hex2, setHex2State] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Cada càrrega de pàgina sorteja el color principal I el gris, sempre.
  // La tria del selector viu només en memòria: com que la navegació interna
  // és SPA (sense recàrrega), es manté mentre navegues, i la càrrega següent
  // torna a ser aleatòria. No es desa res.
  useEffect(() => {
    // neteja d'esquemes antics que fixaven el color
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY2);
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY2);
    const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];
    setHexState(pick(ACCENT_SUGGESTIONS));
    setHex2State(pick(GRAY_SUGGESTIONS));
    setReady(true);
  }, []);

  const effective2 = hex2 ?? DEFAULT_SECONDARY;

  useEffect(() => {
    if (!ready) return;
    const mode = colorMode === "dark" ? "dark" : "light";
    const tokens = {
      ...deriveTokens(hex, mode),
      // els neutres només se sobreescriuen si l'usuari ha triat un gris
      ...(hex2 ? deriveNeutrals(hex2, mode) : {}),
    };
    for (const [name, value] of Object.entries(tokens)) {
      const cssVar = `--chakra-colors-${name.replace(/\./g, "-")}`;
      // al body (mana sobre el contingut) i a l'html (fons de l'overscroll)
      document.body.style.setProperty(cssVar, value);
      document.documentElement.style.setProperty(cssVar, value);
    }
  }, [hex, hex2, colorMode, ready]);

  const setHex = (h: string) => {
    const norm = normalizeHex(h);
    if (norm) setHexState(norm);
  };

  const setHex2 = (h: string) => {
    const norm = normalizeHex(h);
    if (norm) setHex2State(norm);
  };

  return (
    <AccentContext.Provider value={{ hex, setHex, hex2: effective2, setHex2 }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  return useContext(AccentContext);
}
