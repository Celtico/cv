// Regressió: la CSP inicial no permetia 'unsafe-eval', i Fast Refresh de Next
// l'usa. El runtime de react-refresh petava amb EvalError, la hidratació no
// s'acabava mai i tots els components de client quedaven morts en `npm run dev`
// — sense que cap test se n'assabentés, perquè els e2e corren contra un build
// de producció.

import test from "node:test";
import assert from "node:assert/strict";
import { buildCsp } from "../next.config.mjs";

test("en desenvolupament la CSP deixa treballar Fast Refresh", () => {
  const dev = buildCsp(true);
  assert.match(dev, /script-src [^;]*'unsafe-eval'/, "cal 'unsafe-eval' per a react-refresh");
  assert.match(dev, /connect-src [^;]*ws:/, "cal ws: per al websocket d'HMR");
});

test("en producció no s'afluixa res del que no cal", () => {
  const prod = buildCsp(false);
  assert.doesNotMatch(prod, /'unsafe-eval'/, "'unsafe-eval' no ha de sortir en producció");
  assert.doesNotMatch(prod, /ws:/, "ws: no ha de sortir en producció");
});

test("les directives que sostenen el projecte hi són en tots dos modes", () => {
  for (const csp of [buildCsp(true), buildCsp(false)]) {
    // Emotion injecta <style> i hi ha JSON-LD inline: sense això, res es pinta
    assert.match(csp, /style-src [^;]*'unsafe-inline'/);
    assert.match(csp, /script-src [^;]*'unsafe-inline'/);
    for (const d of ["object-src 'none'", "frame-ancestors 'none'", "base-uri 'self'", "worker-src 'self'"]) {
      assert.ok(csp.includes(d), `falta ${d}`);
    }
  }
});
