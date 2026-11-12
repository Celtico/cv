"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Aparició suau en entrar al viewport, com a MILLORA PROGRESSIVA.
//
// Abans això era un <motion.div> amb initial={{opacity:0}}: framer-motion
// serialitza l'initial al SSR, així que l'HTML servit duia deu seccions amb
// style="opacity:0" i res per sota del hero es veia fins que s'havien hidratat
// 200 kB de JS (i sense JS, mai). Ara el marcatge surt visible del servidor i
// només s'amaga, abans de pintar, allò que encara queda fora de pantalla.

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Si ja és a la vista en carregar, no s'amaga: animar el que ja es veu
    // només afegeix soroll i un parpelleig.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={
        state === "static"
          ? undefined
          : {
              opacity: state === "hidden" ? 0 : 1,
              transform: state === "hidden" ? "translateY(16px)" : "none",
              transition: "opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1)",
            }
      }
    >
      {children}
    </div>
  );
}
