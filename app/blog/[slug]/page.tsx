import type { Metadata } from "next";
import { BlogPostShell, postMetadata, postParams } from "../shell";

export const dynamicParams = false;
export const generateStaticParams = postParams;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return postMetadata("ca", params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostShell lang="ca" slug={params.slug} />;
}
