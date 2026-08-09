// Service worker de la PWA: navegació network-first amb reserva a la memòria
// cau, i estàtics cache-first. Sense dependències.
const CACHE = "cv-v1";

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

  if (/\/_next\/static\/|\/img\/|\.(?:png|webp|svg|pdf|ico|woff2?)$/.test(request.url)) {
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
  }
});
