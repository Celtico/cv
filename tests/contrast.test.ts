// El contrast de tota la web depèn de funcions pures. Aquí s'escombren els vuit
// accents de secció en clar i en fosc contra les quatre superfícies on realment
// es pinta text. Els neutres són fixos (blanc pur ↔ negre pur), així que no hi
// ha cap altra dimensió a creuar.

import test from "node:test";
import assert from "node:assert/strict";
import {
  AA,
  AA_NON_TEXT,
  ACCENT_HEXES,
  contrastRatio,
  defaultNeutrals,
  TEXT_GRADIENT_ACCENTS,
  contrastify,
  hexToHsl,
  hslToHex,
  deriveAll,
  mix,
  type Mode,
} from "../app/color.ts";

const MODES: Mode[] = ["light", "dark"];

function surfacesFor(mode: Mode) {
  const n = defaultNeutrals(mode);
  return { n, list: [n.bg, n["bg.subtle"], n["bg.panel"], n["gray.contrast"]] };
}

test("accent.fg arriba a AA sobre totes les superfícies", () => {
  for (const accent of ACCENT_HEXES) {
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
  for (const accent of ACCENT_HEXES) {
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
  for (const accent of ACCENT_HEXES) {
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
  for (const accent of ACCENT_HEXES) {
    for (const mode of MODES) {
      const { n } = surfacesFor(mode);
      const r = contrastRatio(deriveAll(accent, mode)["accent.inverted"], n["bg.inverted"]);
      assert.ok(r >= AA, `accent.inverted ${accent}/${mode} = ${r.toFixed(2)}`);
    }
  }
});

test("el text neutre segueix llegible sobre les superfícies plenes de color", () => {
  // Les targetes i les pastilles ja no són `bg.panel`: són el color de la
  // secció barrejat amb el fons. La barreja es fa contra `bg` justament perquè
  // el text neutre hi conservi el contrast, però això s'ha de comprovar.
  for (const accent of ACCENT_HEXES) {
    for (const mode of MODES) {
      const n = defaultNeutrals(mode);
      const t = deriveAll(accent, mode);
      // `accent.panel` (fons de secció) i `accent.surface` (targetes) porten
      // paràgrafs sencers, amb text apagat inclòs. `accent.chip` és el més
      // saturat dels tres i el `layerStyle` «chip» hi fixa `color: fg`
      // justament per això: si algú hi posa `fg.muted` a sobre, no passarà.
      for (const surface of ["accent.panel", "accent.surface"]) {
        for (const token of ["fg", "fg.muted"]) {
          const r = contrastRatio(n[token], t[surface]);
          assert.ok(r >= AA, `${token} sobre ${surface} (${accent}/${mode}) = ${r.toFixed(2)}`);
        }
      }
      const chip = contrastRatio(n.fg, t["accent.chip"]);
      assert.ok(chip >= AA, `fg sobre accent.chip (${accent}/${mode}) = ${chip.toFixed(2)}`);
    }
  }
});

test("el degradat de dins de les lletres compleix AA a tot el recorregut", () => {
  // El nom de l'entradeta es pinta amb `background-clip: text` i un degradat
  // entre dos `accent.fg`. L'argument és que la lluminància relativa creix de
  // manera monòtona amb cada canal i que una interpolació en sRGB manté cada
  // canal entre els dels extrems, així que cap punt intermedi pot ser pitjor
  // que el pitjor extrem. Aquí es mostreja el recorregut per no haver-ho de
  // creure: barrejar un blau i un rosa que passen just el llindar dona un punt
  // intermedi que NO hi arriba, i per això els extrems es calculen amb marge
  // (AA × 1,4, calibrat: deixa el pitjor punt a 4,95, i amb 1,3 cauria a 4,43).
  // Si algú abaixa el marge, puja la saturació, treu un color de la llista
  // —que reparella la resta— o canvia la interpolació (posem-hi `in oklab`),
  // aquest test se n'ha d'assabentar.
  for (const mode of MODES) {
    const n = defaultNeutrals(mode);
    const surfaces = [n.bg, n["bg.subtle"], n["bg.panel"], n["gray.contrast"]];
    // Mateix càlcul que `accentStylesheet()`: saturar i després contrastar.
    const vivid = (hex: string) => {
      const [h, sat, l] = hexToHsl(hex);
      return hslToHex(h, Math.min(1, sat * 1.4), l);
    };
    // La mateixa llista que fa servir `accentStylesheet()`: el verd en queda
    // fora, i per tant tampoc s'ha de comprovar aquí.
    const texts = TEXT_GRADIENT_ACCENTS.map((hex) =>
      contrastify(vivid(hex), surfaces, AA * 1.4, mode === "light" ? -1 : 1),
    );
    for (let i = 0; i < texts.length; i++) {
      const a = texts[i];
      const b = texts[(i + Math.floor(texts.length / 2)) % texts.length];
      for (let step = 0; step <= 10; step++) {
        const c = mix(a, b, step / 10);
        for (const bg of [n.bg, n["bg.subtle"]]) {
          const r = contrastRatio(c, bg);
          assert.ok(r >= AA, `${a}→${b} al ${step * 10}% = ${c} sobre ${bg} (${mode}) = ${r.toFixed(2)}`);
        }
      }
    }
  }
});

test("l'etiqueta de secció aguanta el text blanc a les vuit seccions", () => {
  // `accent.deep` existeix perquè les vuit etiquetes puguin dur text blanc
  // sense que cap hagi de canviar a text fosc. Es comprova també que la
  // pastilla es continuï distingint del fons: si s'enfosquís massa,
  // desapareixeria sobre negre.
  for (const accent of ACCENT_HEXES) {
    for (const mode of MODES) {
      const t = deriveAll(accent, mode);
      const n = defaultNeutrals(mode);
      const text = contrastRatio(t["accent.deep.fg"], t["accent.deep"]);
      assert.ok(text >= AA, `blanc sobre accent.deep (${accent}/${mode}) = ${text.toFixed(2)}`);
      const block = contrastRatio(t["accent.deep"], n.bg);
      assert.ok(block >= AA_NON_TEXT, `accent.deep sobre el fons (${accent}/${mode}) = ${block.toFixed(2)}`);
    }
  }
});

test("la pastilla d'etiqueta grisa aguanta el text", () => {
  // L'altra meitat de les etiquetes va de gris amb text normal. `gray.emphasized`
  // es va triar per als vels de les fotos i aquí se li demana una feina nova:
  // sostenir text a 4,5:1.
  for (const mode of MODES) {
    const n = defaultNeutrals(mode);
    const r = contrastRatio(n.fg, n["gray.emphasized"]);
    assert.ok(r >= AA, `fg sobre gray.emphasized (${mode}) = ${r.toFixed(2)}`);
  }
});
