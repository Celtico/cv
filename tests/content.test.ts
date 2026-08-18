// Els components combinen data.ts i content.ts PER ÍNDEX
// (`t.skills.groups[i] ?? s.group`). Un desajust no peta: deixa text de
// l'idioma equivocat, o desalineat, en silenci. Aquests tests el converteixen
// en un error.

import test from "node:test";
import assert from "node:assert/strict";
import { LANGS, content } from "../app/content.ts";
import { clients, experience, featured, projects, skills, stats } from "../app/data.ts";
import { stripMarkup } from "../app/markup.ts";

type Shape = string | { [k: string]: Shape } | Shape[];

/** Descriu l'estructura d'un valor ignorant-ne el contingut. */
function shapeOf(v: unknown): Shape {
  if (Array.isArray(v)) return v.map(shapeOf);
  if (v && typeof v === "object") {
    const out: Record<string, Shape> = {};
    for (const k of Object.keys(v as object).sort()) out[k] = shapeOf((v as Record<string, unknown>)[k]);
    return out;
  }
  return typeof v;
}

test("les tres llengües tenen exactament les mateixes claus i longituds", () => {
  const ref = shapeOf(content.ca);
  for (const lang of LANGS) {
    assert.deepEqual(shapeOf(content[lang]), ref, `el diccionari ${lang} no té la mateixa forma que ca`);
  }
});

test("cap cadena del diccionari no és buida", () => {
  const walk = (v: unknown, path: string) => {
    if (typeof v === "string") {
      assert.ok(v.trim().length > 0, `cadena buida a ${path}`);
      return;
    }
    if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${path}[${i}]`));
    if (v && typeof v === "object") {
      for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
    }
  };
  for (const lang of LANGS) walk(content[lang], lang);
});

test("els arrays traduïts s'alineen amb els de data.ts", () => {
  const parells: [string, number, (l: (typeof LANGS)[number]) => number][] = [
    ["skills.groups", skills.length, (l) => content[l].skills.groups.length],
    ["statLabels", stats.length, (l) => content[l].statLabels.length],
    ["featured.items", featured.length, (l) => content[l].featured.items.length],
    ["projects.items", projects.length, (l) => content[l].projects.items.length],
    ["experience.roles", experience.length, (l) => content[l].experience.roles.length],
    ["clients.groups", Object.keys(clients).length, (l) => content[l].clients.groups.length],
  ];
  for (const [nom, esperat, actual] of parells) {
    for (const lang of LANGS) {
      assert.equal(actual(lang), esperat, `${nom} en ${lang} té ${actual(lang)} elements i data.ts en té ${esperat}`);
    }
  }
});

test("el marcatge del diccionari no s'escapa cap a les metadades", () => {
  // `hero.tagline` i `blog.subtitle` es pinten a la pàgina PERÒ també alimenten
  // la meta description i l'OpenGraph. Quan es va afegir ==ressaltat== al
  // tagline, el marcatge va sortir literal als cercadors durant unes hores.
  // Aquí es fixa el contracte: tot el que vagi a metadades passa per
  // `stripMarkup`, i `stripMarkup` no deixa cap marcador.
  for (const lang of LANGS) {
    for (const raw of [content[lang].hero.tagline, content[lang].blog.subtitle]) {
      const net = stripMarkup(raw);
      assert.ok(!net.includes("**"), `queda negreta a ${lang}: ${net}`);
      assert.ok(!net.includes("=="), `queda ressaltat a ${lang}: ${net}`);
      assert.ok(net.length > 0, `s'ha buidat a ${lang}`);
    }
  }
  assert.equal(stripMarkup("un **fort** i un ==viu=="), "un fort i un viu");
});
