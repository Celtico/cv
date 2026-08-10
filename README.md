# CV — Celestí "Cel" Ticó Petit

Web personal / CV amb **Next.js 14 (App Router)** + **Chakra UI v2**, trilingüe amb una URL
per idioma, optimitzada per a SEO (metadata, Open Graph generada, JSON-LD, hreflang, sitemap,
feed RSS) i preparada per desplegar amb Docker.

## Executar

```bash
# amb Docker (recomanat) → http://localhost:3592
docker compose up --build

# desenvolupament → http://localhost:3000
npm install && npm run dev
```

## Verificar

```bash
npx tsc --noEmit     # tipus (no hi ha ESLint instal·lat)
npm test             # unitaris amb node:test, sense dependències
npm run test:e2e     # Playwright: chromium + mobile
```

`npm test` cobreix la lògica de color (contrast AA de les 112 combinacions d'accent × gris ×
mode), la coherència del diccionari trilingüe i les entrades del blog. No cal instal·lar res:
fa servir el *type stripping* natiu de Node.

## Rutes

| Ruta | Què és |
| --- | --- |
| `/`, `/es`, `/en` | portada, prerenderitzada en la llengua de la URL |
| `/blog`, `/es/blog`, `/en/blog` | índex d'entrades |
| `/blog/[slug]` (× 3 idiomes) | una pàgina per entrada, amb JSON-LD `BlogPosting` |
| `/opengraph-image`, `/blog/opengraph-image` | targetes socials generades amb `next/og` |
| `/feed.xml`, `/sitemap.xml`, `/robots.txt`, `/llms.txt` | sindicació i indexació |

El català viu a l'arrel i no té prefix; `app/[lang]/` només genera `es` i `en`.

## On és cada cosa

- `app/data.ts` — dades **neutres**: xifres, noms propis, stack, dates, URLs, imatges.
- `app/content.ts` — diccionari **CA/ES/EN** de tot el text traduïble. Els components combinen
  les dues fonts **per índex**; `npm test` comprova que no es desalineïn.
- `app/color.ts` — sistema de color: derivació dels tokens d'accent amb garantia de contrast
  (4,5:1 comprovat abans de publicar cap token). L'accent se sorteja a cada visita; els
  neutres són fixos.
- `app/theme.ts` — tema de Chakra (semantic tokens clar/fosc, `textStyles`, estils globals).
- `app/accent.tsx` — provider que projecta l'accent sobre les variables CSS.
- `app/svg.ts` — llegeix les il·lustracions en temps de build perquè viatgin dins de l'HTML.
- `app/seo.ts` — canonical, hreflang i URLs per idioma.

## Notes de manteniment

- El PDF del CV que se serveix des de `public/cv-celesti-tico.pdf` és una **còpia**: cal
  re-copiar-lo cada cop que es regenera (vegeu el `CLAUDE.md` de l'arrel).
- `output: "standalone"` fa que `next start` no funcioni: cal muntar la carpeta standalone.
- `REVISIO-2026-08.md` documenta l'auditoria d'agost de 2026, què se'n va aplicar i què
  queda obert.
