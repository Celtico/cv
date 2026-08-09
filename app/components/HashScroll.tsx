"use client";

// El salt d'àncora natiu es perd amb la hidratació del router: aquest gestor
// desplaça explícitament fins a l'element del hash en carregar la pàgina i a
// cada canvi de hash (el suau ve del scroll-behavior global del tema).

import { useEffect } from "react";

export function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      document.getElementById(id)?.scrollIntoView();
    };
    // a la càrrega inicial el salt es perd (la hidratació el trepitja):
    // reintenta uns quants cops fins que el layout queda estable
    const timers = [0, 150, 400, 800].map((ms) => window.setTimeout(scrollToHash, ms));
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);
  return null;
}
