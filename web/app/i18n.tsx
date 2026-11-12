"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { content, DEFAULT_LANG, LANGS, type Lang } from "./content";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: DEFAULT_LANG, setLang: () => {} });

/**
 * Idioma de l'arbre. Ara sempre arriba per prop des de la ruta
 * (`/` = ca, `/es`, `/en`), de manera que el SERVIDOR ja renderitza el text en
 * la llengua correcta. Abans es decidia en un efecte a partir de
 * navigator.language: el servidor només emetia català, els altres dos idiomes
 * no existien per a cap cercador, i el text se substituïa sencer just després
 * d'hidratar.
 */
export function LanguageProvider({ initial, children }: { initial: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);

  useEffect(() => setLangState(initial), [initial]);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  // Es continua desant per poder enviar el visitant recurrent a la seva
  // llengua des de la portada, però la font de veritat és la URL.
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

// contingut localitzat de la llengua activa
export function useT() {
  return content[useContext(LangContext).lang];
}

/** `/` per a català, `/es` i `/en` per a la resta. */
export function langHref(lang: Lang, rest = ""): string {
  const base = lang === DEFAULT_LANG ? "" : `/${lang}`;
  return `${base}${rest}` || "/";
}

/**
 * Àncora d'una secció de la portada, conservant l'idioma actiu.
 * `ca` → `/#skills`; `en` → `/en#skills`. Cal el prefix perquè també ha de
 * funcionar des de /blog, i cal l'idioma perquè si no et torna al català.
 */
export function anchorHref(lang: Lang, id: string): string {
  return lang === DEFAULT_LANG ? `/#${id}` : `/${lang}#${id}`;
}

/** Treu el prefix d'idioma d'un camí: `/en/blog` → `/blog`. */
export function stripLang(pathname: string): string {
  for (const l of LANGS) {
    if (l === DEFAULT_LANG) continue;
    if (pathname === `/${l}`) return "";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname === "/" ? "" : pathname;
}
