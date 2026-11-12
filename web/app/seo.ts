// Ajudes de metadades comunes a les rutes localitzades.
//
// Abans hi havia una sola URL per a tres idiomes: castellà i anglès viatjaven
// al bundle però mai apareixien a l'HTML servit, així que per a un cercador no
// existien. Ara cada llengua té la seva URL i totes es declaren entre elles.

import { DEFAULT_LANG, LANGS, type Lang } from "./content";

export const SITE_URL = "https://serverscel.com";

/** `/` per a català, `/es` i `/en` per a la resta. */
export function pathFor(lang: Lang, rest = ""): string {
  const base = lang === DEFAULT_LANG ? "" : `/${lang}`;
  return `${base}${rest}` || "/";
}

export function urlFor(lang: Lang, rest = ""): string {
  return `${SITE_URL}${pathFor(lang, rest)}`;
}

/** canonical + hreflang de totes les llengües per a un mateix recurs. */
export function alternatesFor(lang: Lang, rest = "") {
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = pathFor(l, rest);
  languages["x-default"] = pathFor(DEFAULT_LANG, rest);
  return { canonical: pathFor(lang, rest), languages };
}

/** Locale d'Open Graph a partir del codi de llengua. */
export function ogLocale(lang: Lang): string {
  return lang === "ca" ? "ca_ES" : lang === "es" ? "es_ES" : "en_US";
}

export const OTHER_LANGS = LANGS.filter((l) => l !== DEFAULT_LANG);
