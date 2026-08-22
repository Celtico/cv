// `public/llms.txt` és el resum del lloc per a models de llenguatge, i està
// escrit a mà. Això vol dir que se'n va sol: quan es va mirar el 22 d'agost
// deia «més de 20 anys d'experiència» mentre tota la resta del lloc deia 25, i
// descrivia un commutador d'idioma «sense canviar la URL» que fa temps que no
// existeix. Cap d'aquestes dues coses no la va detectar ningú perquè el fitxer
// no el llegeix cap prova.
//
// Aquestes comprovacions no el poden validar sencer —és prosa—, però sí que
// lliguen el que la regla d'or diu que no pot divergir: les xifres i les rutes.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { stats } from "../app/data.ts";
import { blogPosts } from "../app/blog/posts.ts";

const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");

test("les xifres de llms.txt són les de data.ts", () => {
  // El nombre, no la manera d'escriure'l: `data.ts` diu «200+» i el text diu
  // «més de 200 clients». El que no pot passar és que el nombre sigui un altre.
  for (const s of stats) {
    const xifra = s.value.replace(/\D/g, "");
    assert.ok(
      new RegExp(`\\b${xifra}\\b`).test(llms),
      `llms.txt no diu enlloc el nombre ${xifra} (${s.label}). Si ha canviat a data.ts, canvia'l també allà.`,
    );
  }
});

test("llms.txt no arrossega la xifra vella d'anys", () => {
  assert.ok(
    !/m[ée]s de 20 anys/i.test(llms),
    "llms.txt encara diu «més de 20 anys»: la xifra del lloc és 25 des del 2026-08-18",
  );
});

test("llms.txt llista totes les entrades del blog per la seva ruta", () => {
  const falten = blogPosts.filter((p) => !llms.includes(`/blog/${p.slug}`));
  assert.deepEqual(
    falten.map((p) => p.slug),
    [],
    "entrades del blog que no surten a llms.txt amb la seva ruta",
  );
});

test("llms.txt no descriu el commutador d'idioma antic", () => {
  // Cada idioma té la seva URL des de la revisió d'agost: /, /es i /en.
  assert.ok(
    !/sense canviar la URL/i.test(llms),
    "llms.txt encara diu que l'idioma es tria sense canviar la URL",
  );
});
