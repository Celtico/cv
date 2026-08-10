import type { Metadata } from "next";
import { HomeShell } from "../home";
import { content, type Lang } from "../content";
import { profile } from "../data";
import { alternatesFor, ogLocale } from "../seo";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  const t = content[params.lang];
  const title = `${profile.name} — ${t.hero.role}`;
  return {
    title,
    description: t.hero.tagline,
    alternates: alternatesFor(params.lang),
    openGraph: { title, description: t.hero.tagline, locale: ogLocale(params.lang) },
  };
}

export default function LocalizedHome({ params }: { params: { lang: Lang } }) {
  return <HomeShell lang={params.lang} />;
}
