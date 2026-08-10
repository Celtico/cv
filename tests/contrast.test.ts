// El contrast de tota la web depèn de funcions pures. Aquí s'escombren els 8
// accents en clar i en fosc contra les quatre superfícies on realment es pinta
// text. Els neutres són fixos (el gris de la bitàcola), així que no hi ha cap
// altra dimensió a creuar.

import test from "node:test";
import assert from "node:assert/strict";
import {
  AA,
  AA_NON_TEXT,
  ACCENT_SUGGESTIONS,
  contrastRatio,
  defaultNeutrals,
  deriveAll,
  type Mode,
} from "../app/color.ts";

const MODES: Mode[] = ["light", "dark"];

function surfacesFor(mode: Mode) {
  const n = defaultNeutrals(mode);
  return { n, list: [n.bg, n["bg.subtle"], n["bg.panel"], n["gray.contrast"]] };
}

test("accent.fg arriba a AA sobre totes les superfícies", () => {
  for (const accent of ACCENT_SUGGESTIONS) {
    for (const mode of MODES) {
      const { list } = surfacesFor(mode);
      const fg = deriveAll(accent, mode)["accent.fg"];
      for (const bg of list) {
        const r = contrastRatio(fg, bg);
        assert.ok(r >= AA, `accent.fg ${fg} sobre ${bg} (${accent}/${mode}) = ${r.toFixed(2)}`);
      }
    }
  }
});

test("el text dels botons plens arriba a AA, també en hover", () => {
  for (const accent of ACCENT_SUGGESTIONS) {
    for (const mode of MODES) {
      const t = deriveAll(accent, mode);
      const solid = contrastRatio(t["accent.contrast"], t["accent.solid"]);
      const hover = contrastRatio(t["accent.contrast"], t["accent.emphasized"]);
      assert.ok(solid >= AA, `botó ${accent}/${mode} = ${solid.toFixed(2)}`);
      assert.ok(hover >= AA, `hover ${accent}/${mode} = ${hover.toFixed(2)}`);
    }
  }
});

test("la marca decorativa es distingeix del fons (1.4.11)", () => {
  for (const accent of ACCENT_SUGGESTIONS) {
    for (const mode of MODES) {
      const { n } = surfacesFor(mode);
      const dot = deriveAll(accent, mode)["accent.dot"];
      const r = contrastRatio(dot, n.bg);
      assert.ok(r >= AA_NON_TEXT, `accent.dot ${dot} sobre ${n.bg} = ${r.toFixed(2)}`);
    }
  }
});

test("els neutres del tema mantenen el contrast del text", () => {
  for (const mode of MODES) {
    const n = defaultNeutrals(mode);
    const surfaces = [n.bg, n["bg.subtle"], n["bg.panel"], n["gray.contrast"]];
    for (const token of ["fg", "fg.muted", "fg.subtle"]) {
      for (const bg of surfaces) {
        const r = contrastRatio(n[token], bg);
        assert.ok(r >= AA, `${token} ${n[token]} sobre ${bg} (${mode}) = ${r.toFixed(2)}`);
      }
    }
    const inv = contrastRatio(n["fg.inverted"], n["bg.inverted"]);
    assert.ok(inv >= AA, `fg.inverted (${mode}) = ${inv.toFixed(2)}`);
  }
});

test("accent.inverted és llegible sobre el bloc invertit", () => {
  for (const accent of ACCENT_SUGGESTIONS) {
    for (const mode of MODES) {
      const { n } = surfacesFor(mode);
      const r = contrastRatio(deriveAll(accent, mode)["accent.inverted"], n["bg.inverted"]);
      assert.ok(r >= AA, `accent.inverted ${accent}/${mode} = ${r.toFixed(2)}`);
    }
  }
});
