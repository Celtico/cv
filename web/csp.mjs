// Content-Security-Policy del lloc, en un mòdul a part perquè el puguin
// importar tant `next.config.mjs` com els tests.
//
// Compatible amb aquest projecte tal com és:
// - Emotion (Chakra v2) injecta etiquetes <style> en línia,
// - layout.tsx fa dangerouslySetInnerHTML per al JSON-LD i per a l'script
//   d'accent, i Next n'afegeix de propis (self.__next_f.push),
// així que 'unsafe-inline' és obligatori a script-src i style-src.
//
// En DESENVOLUPAMENT, a més, Fast Refresh de Next avalua codi amb eval() i la
// seva connexió d'HMR va per websocket. Sense aquestes dues excepcions el
// runtime de react-refresh peta amb EvalError, la hidratació no s'acaba mai i
// TOTS els components de client queden morts (botó de tema, commutador
// d'idioma, menú del mòbil). En producció no s'emeten.
//
// Endurir-ho amb nonce exigiria llegir headers() a cada petició, cosa que
// converteix el layout en dinàmic i fa perdre el rendering estàtic de tot el
// lloc. En un CV sense entrades d'usuari, no compensa.
//
// HSTS no va aquí: només s'ha d'emetre sobre HTTPS i el TLS el fa el Nginx del
// host. Vegeu REVISIO-2026-08.md per a la línia d'Nginx i l'avís sobre
// includeSubDomains.

/**
 * @param {boolean} dev
 * @returns {string}
 */
export function buildCsp(dev) {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'", // tipografies del sistema, cap host extern
    `connect-src 'self'${dev ? " ws: wss:" : ""}`,
    "manifest-src 'self'",
    "worker-src 'self'", // sw.js
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}
