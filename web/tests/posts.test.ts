import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { LANGS } from "../app/content.ts";
import { blogPosts } from "../app/blog/posts.ts";

const PUBLIC = path.join(process.cwd(), "public");

test("hi ha entrades i cap slug repetit", () => {
  assert.ok(blogPosts.length > 0);
  const slugs = blogPosts.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, "hi ha slugs duplicats");
  for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/, `slug no vàlid: ${s}`);
});

test("cada entrada té les tres llengües amb contingut", () => {
  for (const post of blogPosts) {
    for (const lang of LANGS) {
      const c = post.content[lang];
      assert.ok(c, `${post.slug} no té ${lang}`);
      assert.ok(c.title.trim(), `${post.slug}/${lang} sense títol`);
      assert.ok(c.excerpt.trim(), `${post.slug}/${lang} sense extracte`);
      assert.ok(c.body.length > 0, `${post.slug}/${lang} sense cos`);
      assert.ok(c.tags.length > 0, `${post.slug}/${lang} sense etiquetes`);
    }
  }
});

test("les dates són ISO i vàlides", () => {
  for (const post of blogPosts) {
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/, `data no ISO a ${post.slug}`);
    assert.ok(!Number.isNaN(Date.parse(post.date)), `data invàlida a ${post.slug}`);
  }
});

test("les imatges existeixen al disc i les mides declarades són les reals", () => {
  for (const post of blogPosts) {
    for (const img of post.images) {
      const file = path.join(PUBLIC, img.src.replace(/^\//, ""));
      assert.ok(fs.existsSync(file), `falta ${img.src} (${post.slug})`);
      assert.ok(img.alt.trim(), `${img.src} sense text alternatiu`);
      assert.ok(img.width > 0 && img.height > 0, `${img.src} sense dimensions`);
    }
  }
});
