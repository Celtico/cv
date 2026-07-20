---
name: cv
description: Mantenir i regenerar el CV de Celestí "Cel" Ticó Petit. Usa-la quan es demani actualitzar dades, afegir experiència/projectes/clients, regenerar l'HTML del CV, exportar a PDF o revisar-ne el disseny. Fitxers clau — dades a cv-dades-celesti-tico.md, CV final a cv-celesti-tico.html.
---

# Skill: CV del Cel

Projecte de CV personal de **Celestí Ticó Petit ("Cel")** — desenvolupador web front-end/back-end i disseny.

## Fitxers del projecte
- **`cv-dades-celesti-tico.md`** — FONT DE LA VERITAT. Totes les dades (contacte, experiència,
  competències, projectes, clients, idiomes, formació). Recollides de cenics.net/gestor i serverscel.com.
- **`cv-celesti-tico.html`** — CV final: HTML d'una sola pàgina, autònom (CSS inline, sense dependències
  externes). Suporta tema clar/fosc (`prefers-color-scheme` + `data-theme`). Optimitzat per pantalla i `@media print`.
- **`cv-celesti-tico.pdf`** — export del CV. La web el serveix des de `web/public/cv-celesti-tico.pdf`,
  que és una **còpia**: cal re-copiar-la cada cop que es regenera el PDF (vegeu tasca 3).
- **`web/`** — lloc web Next.js (Chakra + framer-motion), trilingüe CA/ES/EN via `app/content.ts`.

## Regla d'or
El `.md` mana. Qualsevol canvi de contingut s'edita **primer** al `.md` i **després** es propaga a l'HTML.
No inventis mai dades noves: si falta informació, pregunta al Cel o marca-ho a "Pendents de confirmar".

## Tasques habituals

### 1. Actualitzar dades (afegir experiència, projecte, client, competència)
1. Edita la secció corresponent de `cv-dades-celesti-tico.md`.
2. Reflecteix el canvi a la secció equivalent de `cv-celesti-tico.html` (`<h2 class="sec">`:
   Perfil · Competències · Disseny · Idiomes · Formació · Experiència · Projectes propis destacats · Clients destacats).
3. Respecta l'estil existent: mateixes classes CSS, mateix to, català. No trenquis el layout ni afegeixis
   dependències externes (ha de seguir sent un únic fitxer autònom).

### 2. Regenerar l'HTML des de zero
Reconstrueix `cv-celesti-tico.html` a partir del `.md` mantenint el sistema de disseny actual
(paleta `--paper/--ink/--accent`, tipografia, graella de la capçalera, seccions). Verifica que
el resultat es vegi bé en clar i fosc i que la versió d'impressió (`@media print`) càpiga net.

### 3. Exportar a PDF (i sincronitzar-lo amb la web)
1. Imprimeix `cv-celesti-tico.html` a A4 des del navegador, o amb Chrome headless `--print-to-pdf`,
   desant-lo a `cv-celesti-tico.pdf`.
2. **Sempre** copia'l tot seguit a la web, que el serveix per descàrrega:
   ```
   cp cv-celesti-tico.pdf web/public/cv-celesti-tico.pdf
   ```
   Si no es fa, la web segueix oferint la versió antiga. El botó "Descarregar CV (PDF)" apareix
   al Hero (`web/app/components/Hero.tsx`) i a Contacte (`web/app/components/Contact.tsx`),
   amb el text a la clau `hero.descarregar` de `web/app/content.ts` (CA/ES/EN).
   Nota: `web/.dockerignore` exclou `*.pdf` però reexcepciona `!public/*.pdf` — no ho treguis.

### 4. Verificar
Obre l'HTML al navegador (skill `run` o Chrome) i comprova capçalera, seccions, tema clar/fosc i vista d'impressió.

## To i estil
- Idioma: **català**. Concís, professional, sense floritures.
- Xifres que donen força i s'han de mantenir: **422 projectes entregats**, **200+ clients**, activitat 2012–2026.
- Destacar la implementació d'**Odoo + IA conversacional** (RBAC Platform) com a projecte insígnia.

## Context pendent (del propi .md)
- Confirmar dates d'experiència (el portfoli diu des del 2000; el gestor mostra 2012–2026).
- Tasca futura del Cel: reordenar serverscel.com per categories (FEINA DE CLIENT vs PROJECTES PROPIS).