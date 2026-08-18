import test from "node:test";
import assert from "node:assert/strict";
import {
  AA,
  ACCENT_HEXES,
  SECTION_ACCENTS,
  TEXT_DARK,
  TEXT_LIGHT,
  bestTextOn,
  contrastRatio,
  hexToHsl,
  hslToHex,
  normalizeHex,
  relativeLuminance,
  solidWithReadableText,
  withLightness,
} from "../app/color.ts";

test("normalizeHex accepta el que ha d'acceptar i rebutja la resta", () => {
  assert.equal(normalizeHex("#CE8724"), "#ce8724");
  assert.equal(normalizeHex("ce8724"), "#ce8724");
  assert.equal(normalizeHex("  #CE8724  "), "#ce8724");
  assert.equal(normalizeHex("#ce87"), null);
  assert.equal(normalizeHex("#ce87244"), null);
  assert.equal(normalizeHex("vermell"), null);
  assert.equal(normalizeHex(""), null);
});

test("hex → HSL → hex torna al mateix color", () => {
  for (const hex of [...ACCENT_HEXES, "#847C6A", "#000000", "#ffffff", "#7f7f7f"]) {
    const [h, s, l] = hexToHsl(hex);
    assert.equal(hslToHex(h, s, l), hex.toLowerCase(), `round-trip de ${hex}`);
  }
});

test("withLightness conserva el to i acota la claror", () => {
  for (const hex of ACCENT_HEXES) {
    const [h0] = hexToHsl(hex);
    for (const l of [0, 0.25, 0.5, 0.75, 1]) {
      const out = withLightness(hex, l);
      const [h1, , l1] = hexToHsl(out);
      assert.ok(l1 >= 0 && l1 <= 1);
      // a claror 0 o 1 el to es perd (negre/blanc): només el comprovem enmig
      if (l > 0 && l < 1) assert.ok(Math.abs(h1 - h0) < 0.02, `to de ${hex} a l=${l}`);
    }
  }
  // fora de rang, s'acota en comptes de produir un color invàlid
  assert.equal(withLightness("#CE8724", -1), "#000000");
  assert.equal(withLightness("#CE8724", 2), "#ffffff");
});

test("relativeLuminance situa el negre i el blanc als extrems", () => {
  assert.equal(relativeLuminance("#000000"), 0);
  assert.equal(relativeLuminance("#ffffff"), 1);
  assert.equal(contrastRatio("#000000", "#ffffff"), 21);
  assert.equal(contrastRatio("#CE8724", "#CE8724"), 1);
});

test("bestTextOn tria sempre la tinta amb més contrast", () => {
  for (const hex of ACCENT_HEXES) {
    const chosen = bestTextOn(hex);
    const other = chosen === TEXT_DARK ? TEXT_LIGHT : TEXT_DARK;
    assert.ok(
      contrastRatio(chosen, hex) >= contrastRatio(other, hex),
      `sobre ${hex} s'ha triat ${chosen}`,
    );
  }
  // El cas que va originar el test: aquest ambre és prou clar perquè hi vagi
  // text fosc, i la derivació antiga hi posava el clar. Ja no és a la paleta
  // —els grocs i taronges en van sortir—, però va escrit literal a posta: el
  // que es vigila és el comportament de la funció davant d'un color clar, no
  // quins colors fem servir avui.
  assert.equal(bestTextOn("#E8912A"), TEXT_DARK);
});

test("solidWithReadableText només mou el que cal i conserva el to", () => {
  for (const hex of ACCENT_HEXES) {
    const solid = solidWithReadableText(hex);
    const best = Math.max(contrastRatio(TEXT_DARK, solid), contrastRatio(TEXT_LIGHT, solid));
    assert.ok(best >= AA, `${hex} → ${solid} = ${best.toFixed(2)}`);
    const [h0] = hexToHsl(hex);
    const [h1] = hexToHsl(solid);
    assert.ok(Math.abs(h1 - h0) < 0.02, `el to de ${hex} s'ha mogut`);
  }
  // els que ja complien no s'han de tocar
  assert.equal(solidWithReadableText("#E8912A"), "#E8912A");
});
