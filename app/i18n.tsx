"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { content, DEFAULT_LANG, LANGS, type Lang } from "./content";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: DEFAULT_LANG, setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored && LANGS.includes(stored)) {
      setLangState(stored);
    } else if (typeof navigator !== "undefined") {
      const nav = navigator.language.slice(0, 2) as Lang;
      if (LANGS.includes(nav)) setLangState(nav);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

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
  const { lang } = useContext(LangContext);
  return content[lang];
}
