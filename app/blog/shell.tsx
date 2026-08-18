import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LanguageProvider } from "../i18n";
import { content, type Lang } from "../content";
import { profile } from "../data";
import { alternatesFor, ogLocale, urlFor, SITE_URL } from "../seo";
import { blogPosts } from "./posts";
import { BlogIndex } from "./BlogIndex";
import { PostView } from "./PostView";
import { stripMarkup } from "../markup";

const personRef = { "@id": `${SITE_URL}/#person` };

// ——— índex ———

export function blogIndexMetadata(lang: Lang): Metadata {
  const t = content[lang].blog;
  return {
    title: t.title,
    description: stripMarkup(t.subtitle),
    keywords: ["Celestí Ticó Petit", "blog", "IA", "VehicleOS", "FABRIK", "Odoo", "Next.js"],
    alternates: alternatesFor(lang, "/blog"),
    openGraph: {
      type: "website",
      url: urlFor(lang, "/blog"),
      title: `${t.title} · ${profile.name}`,
      description: stripMarkup(t.subtitle),
      locale: ogLocale(lang),
    },
  };
}

export function BlogIndexShell({ lang }: { lang: Lang }) {
  const t = content[lang].blog;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${t.title} — ${profile.name}`,
    url: urlFor(lang, "/blog"),
    inLanguage: lang,
    author: personRef,
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.content[lang].title,
      description: p.content[lang].excerpt,
      datePublished: p.date,
      url: urlFor(lang, `/blog/${p.slug}`),
      image: p.images.map((i) => `${SITE_URL}${i.src}`),
      author: personRef,
      inLanguage: lang,
      keywords: p.content[lang].tags.join(", "),
    })),
  };

  return (
    <LanguageProvider initial={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogIndex />
    </LanguageProvider>
  );
}

// ——— entrada individual ———

export function postMetadata(lang: Lang, slug: string): Metadata {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const c = post.content[lang];
  return {
    title: c.title,
    description: c.excerpt,
    keywords: c.tags,
    alternates: alternatesFor(lang, `/blog/${slug}`),
    openGraph: {
      type: "article",
      url: urlFor(lang, `/blog/${slug}`),
      title: c.title,
      description: c.excerpt,
      locale: ogLocale(lang),
      publishedTime: post.date,
      authors: [SITE_URL],
      images: post.images.map((i) => ({ url: `${SITE_URL}${i.src}`, alt: i.alt })),
    },
  };
}

export function BlogPostShell({ lang, slug }: { lang: Lang; slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const c = post.content[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: c.title,
    description: c.excerpt,
    datePublished: post.date,
    url: urlFor(lang, `/blog/${slug}`),
    mainEntityOfPage: { "@type": "WebPage", "@id": urlFor(lang, `/blog/${slug}`) },
    image: post.images.map((i) => `${SITE_URL}${i.src}`),
    author: personRef,
    publisher: personRef,
    inLanguage: lang,
    keywords: c.tags.join(", "),
  };

  return (
    <LanguageProvider initial={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PostView post={post} />
    </LanguageProvider>
  );
}

export function postParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}
