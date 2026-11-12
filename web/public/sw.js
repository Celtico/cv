// Service worker de la PWA: navegació network-first amb reserva a la memòria
// cau, i estàtics cache-first. Sense dependències.
//
// Puja el número cada cop que canviï l'estratègia d'aquest fitxer: `activate`
// només purga les caus que tinguin un nom diferent de l'actual.
const CACHE = "cv-v2";

// Cache-first NOMÉS per a allò que és realment immutable: els chunks de Next
// porten hash al nom, i les imatges i icones es reemplacen amb nom nou.
// El PDF del CV en queda FORA a posta: viu a una URL fixa i es regenera cada
// cop que canvien les dades, així que en cache-first un visitant recurrent es
// descarregaria per sempre la versió antiga del currículum.
const IMMUTABLE = /\/_next\/static\/|\/img\/|\.(?:png|webp|svg|ico|woff2?)$/;

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || new URL(request.url).origin !== location.origin) return;

  if (request.mode === "navigate") {
    // pàgines: xarxa primer; si no hi ha connexió, l'última còpia desada
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((m) => m || caches.match("/"))),
    );
    return;
  }

  if (IMMUTABLE.test(request.url)) {
    // estàtics amb hash o immutables: memòria cau primer
    event.respondWith(
      caches.match(request).then(
        (m) =>
          m ||
          fetch(request).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(request, copy));
            }
            return res;
          }),
      ),
    );
    return;
  }

  if (/\.pdf$/.test(request.url)) {
    // el CV: xarxa primer perquè sempre s'entregui l'última versió, amb la
    // còpia desada només com a reserva sense connexió
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => caches.match(request)),
    );
  }
});
