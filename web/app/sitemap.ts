import type { MetadataRoute } from "next";
import { LANGS } from "./content";
import { blogPosts } from "./blog/posts";
import { pathFor, SITE_URL, urlFor } from "./seo";

// Una entrada per idioma i recurs, cadascuna declarant les seves alternatives.
// Abans hi havia 2 URLs per a 3 idiomes i 6 entrades de blog sense adreça.
function alternates(rest: string) {
  const languages: Record<string, string> = {};
  for (const l of LANGS) languages[l] = `${SITE_URL}${pathFor(l, rest)}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const modificat = new Date();
  const out: MetadataRoute.Sitemap = [];

  for (const lang of LANGS) {
    out.push({
      url: urlFor(lang),
      lastModified: modificat,
      changeFrequency: "monthly",
      priority: lang === "ca" ? 1 : 0.9,
      alternates: alternates(""),
    });
    out.push({
      url: urlFor(lang, "/blog"),
      lastModified: modificat,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates("/blog"),
    });
    for (const post of blogPosts) {
      out.push({
        url: urlFor(lang, `/blog/${post.slug}`),
        lastModified: new Date(`${post.date}T12:00:00`),
        changeFrequency: "yearly",
        priority: 0.7,
        alternates: alternates(`/blog/${post.slug}`),
      });
    }
  }

  return out;
}
