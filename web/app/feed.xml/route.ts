import { blogPosts } from "../blog/posts";
import { profile } from "../data";
import { SITE_URL, urlFor } from "../seo";

// Un blog sense feed no el pot seguir ningú. Es genera en temps de build, com
// la resta del lloc, i publica la versió catalana amb enllaç a cada entrada.
export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const ordenats = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const items = ordenats
    .map((p) => {
      const c = p.content.ca;
      const url = urlFor("ca", `/blog/${p.slug}`);
      return `    <item>
      <title>${esc(c.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(c.excerpt)}</description>
${c.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — ${esc(profile.name)}</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Notes sobre IA aplicada, integració empresarial i projectes propis en producció.</description>
    <language>ca</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
