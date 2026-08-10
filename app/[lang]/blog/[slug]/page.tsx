import type { Metadata } from "next";
import { BlogPostShell, postMetadata, postParams } from "../../../blog/shell";
import type { Lang } from "../../../content";

export const dynamicParams = false;
export const generateStaticParams = postParams;

export function generateMetadata({ params }: { params: { lang: Lang; slug: string } }): Metadata {
  return postMetadata(params.lang, params.slug);
}

export default function Page({ params }: { params: { lang: Lang; slug: string } }) {
  return <BlogPostShell lang={params.lang} slug={params.slug} />;
}
