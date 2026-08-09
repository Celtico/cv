import type { Metadata } from "next";
import { profile } from "../data";
import { blogPosts } from "./posts";
import { BlogClient } from "./BlogClient";

const siteUrl = "https://serverscel.com";
const title = "Blog";
const description =
  "Notes sobre IA aplicada, integració empresarial i projectes propis en producció (VehicleOS, FABRIK). Publicades originalment a LinkedIn. En català, castellà i anglès.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Celestí Ticó Petit",
    "blog",
    "intel·ligència artificial",
    "IA empresarial",
    "VehicleOS",
    "OBD-II",
    "FABRIK",
    "agents IA",
    "desenvolupament web",
  ],
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: `${title} · ${profile.name}`,
    description,
    images: blogPosts.filter((p) => p.images.length > 0).map((p) => `${siteUrl}${p.images[0].src}`),
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `Blog — ${profile.name}`,
  url: `${siteUrl}/blog`,
  author: { "@type": "Person", name: profile.name, url: siteUrl },
  blogPost: blogPosts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.content.ca.title,
    datePublished: p.date,
    url: `${siteUrl}/blog#${p.slug}`,
    image: p.images.map((i) => `${siteUrl}${i.src}`),
    author: { "@type": "Person", name: profile.name },
    inLanguage: ["ca", "es", "en"],
    keywords: p.content.ca.tags.join(", "),
    description: p.content.ca.excerpt,
  })),
};

export default function BlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogClient />
    </>
  );
}
