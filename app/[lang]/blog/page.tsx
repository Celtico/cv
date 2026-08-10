import type { Metadata } from "next";
import { BlogIndexShell, blogIndexMetadata } from "../../blog/shell";
import type { Lang } from "../../content";

export function generateMetadata({ params }: { params: { lang: Lang } }): Metadata {
  return blogIndexMetadata(params.lang);
}

export default function Page({ params }: { params: { lang: Lang } }) {
  return <BlogIndexShell lang={params.lang} />;
}
