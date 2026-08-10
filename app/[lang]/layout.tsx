import { notFound } from "next/navigation";
import { LANGS, type Lang } from "../content";
import { OTHER_LANGS } from "../seo";

// Només es generen /es i /en: el català viu a l'arrel i qualsevol altre valor
// cau al not-found (que redirigeix a la portada).
export const dynamicParams = false;

export function generateStaticParams() {
  return OTHER_LANGS.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!LANGS.includes(params.lang as Lang)) notFound();

  // El <html lang> el fixa el layout arrel en català; aquí el corregim abans
  // de la primera pintada perquè coincideixi amb el contingut servit.
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(params.lang)};`,
        }}
      />
      {children}
    </>
  );
}
