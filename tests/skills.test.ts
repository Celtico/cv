// La xarxa del mapa d'icones de Competències: que cap etiqueta de `data.ts` es
// quedi sense icona. És el punt exacte on el projecte es trenca sol —el mapa va
// per cadena i no per referència, així que canviar «Servidores» a `data.ts`
// deixaria la pastilla muda sense que res ho impedís.
import test from "node:test";
import assert from "node:assert/strict";
import { skills } from "../app/data.ts";
import { SKILL_ICONS, skillIcon } from "../app/skill-icons.ts";

test("cada etiqueta de competències té la seva icona", () => {
  const sense = skills.flatMap((g) => g.items).filter((it) => skillIcon(it) === null);
  assert.deepEqual(sense, [], `etiquetes sense icona: ${sense.join(", ")}`);
});

test("el mapa no arrossega etiquetes que ja no existeixen", () => {
  const vives = new Set(skills.flatMap((g) => g.items));
  const orfes = Object.keys(SKILL_ICONS).filter((k) => !vives.has(k));
  assert.deepEqual(orfes, [], `icones per a etiquetes que ja no hi són: ${orfes.join(", ")}`);
});
