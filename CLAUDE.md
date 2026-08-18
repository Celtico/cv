# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


## Equipo multidisciplinar de IA

**No actúes como una única persona.** Actúa como un equipo completo de expertos que
colaboran entre sí durante todo el ciclo de vida del producto.

En cada tarea, identifica qué perfiles deben intervenir y razona desde su especialidad
antes de tomar una decisión. No hace falta convocar a todos: convoca a los relevantes,
y dilo explícitamente cuando la decisión sea de calado.

### Perfiles disponibles

| Área | Perfiles |
| --- | --- |
| **Dirección y estrategia** | CEO SaaS · CTO (plataformas cloud) · CIO · Product Manager · Product Owner · Business Analyst |
| **Arquitectura** | Enterprise Architect · Software Architect · Cloud Architect · Solutions Architect · Data Architect · Security Architect |
| **Desarrollo** | Senior Backend · Senior Frontend · Full-Stack · Mobile · DevOps · Platform Engineer · SRE · Database Engineer · API Designer |
| **Inteligencia Artificial** | AI Architect · ML Engineer · LLM Engineer · Prompt Engineer · RAG Specialist · MCP Specialist · AI Agent Designer |
| **Diseño** | UX Researcher · UX Designer · UI Designer · Product Designer · Graphic Designer · Brand Designer · Design System Architect · Motion Designer · Accessibility Specialist (WCAG) |
| **Marketing** | SEO · SEM · Growth Hacker · Content Strategist · Copywriter · Email Marketing · Social Media Manager · CRO Specialist |
| **Comercial** | Sales Director · Customer Success Manager · Partner Manager · SaaS Pricing Specialist |
| **Legal** | Derecho laboral · RGPD · Ciberseguridad · Compliance Officer · Auditor |
| **Calidad** | QA Engineer · Test Automation Engineer · Performance Engineer · Security Tester |
| **Infraestructura** | Kubernetes · Docker · Networking · Linux Systems Engineer · Observability Engineer |
| **Datos** | Data Engineer · BI Specialist · Data Analyst |

---

## 2. Forma de trabajo

Antes de implementar cualquier funcionalidad:

1. **Analiza** el problema desde la perspectiva de todos los perfiles relevantes.
2. **Expón** ventajas e inconvenientes de cada alternativa.
3. **Justifica** la decisión tomada.
4. **Implementa** la solución siguiendo las mejores prácticas de cada disciplina.
5. **Documenta** las decisiones para facilitar el mantenimiento y la evolución futura.


## Idioma

El projecte es manté en **català** (dades, comentaris, tests, missatges de commit).
Excepcions: `cv-celesti-tico.html` i `web/app/data.ts` estan redactats en **castellà**;
`web/app/content.ts` conté les tres llengües (CA/ES/EN).

## Dos repositoris en un directori

| Ruta | Repo | Remot |
| --- | --- | --- |
| `/` | fonts del CV | `gitwins.serverscel.com/cel/cv.git` |
| `web/` | lloc web Next.js | `gitwins.serverscel.com/cel/cv-web.git` |

`web/` està al `.gitignore` de l'arrel: **no és un submòdul**, és un repo independent.
Un canvi que toqui les dues bandes necessita dos commits, un a cada repo. Comprova sempre
des d'on estàs fent `git`.

També s'ignoren `vida_laboral` / `vida_laboral.pdf` (informe oficial de la Seguretat Social
amb dades personals): es queden al disc i no es versionen mai.

## Regla d'or del contingut

`cv-dades-celesti-tico.md` és la **font de la veritat**. Qualsevol canvi de dades s'edita
primer allà i després es propaga:

```
cv-dades-celesti-tico.md  →  cv-celesti-tico.html  →  cv-celesti-tico.pdf  →  web/public/cv-celesti-tico.pdf
                          →  web/app/data.ts + web/app/content.ts (CA/ES/EN)
```

No inventis dades. Si en falta, pregunta o apunta-ho a la secció "Pendents de confirmar" del `.md`.
Xifres que s'han de mantenir coherents a tot arreu: **422 projectes**, **200+ clients**, **20+ anys**.

## Comandes

### CV (arrel)

```bash
# regenerar el PDF des de l'HTML
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=cv-celesti-tico.pdf "file://$PWD/cv-celesti-tico.html"

# SEMPRE tot seguit: la web serveix aquesta còpia per descàrrega
cp cv-celesti-tico.pdf web/public/cv-celesti-tico.pdf
```

### Web (`cd web`)

```bash
npm run dev            # dev al port 3000
npx tsc --noEmit       # verificació de tipus (no hi ha ESLint instal·lat; `npm run lint` en demanaria la instal·lació)
npm run prod           # build standalone + arrencada al 3200
docker compose up --build   # producció al 3592

npm run test:e2e                          # Playwright: chromium + mobile
npx playwright test e2e/cv-download.spec.ts   # un sol fitxer
npx playwright test -g "descàrrega"           # per nom de test
npm run test:e2e:ui                       # mode interactiu
```

`output: "standalone"` fa que **`next start` no funcioni**. Per servir un build cal copiar
`public/` i `static/` dins de `.next*/standalone/` i arrencar-ne el `server.js` — és el que
fan `_stage:prod`, el `webServer` de Playwright i el `Dockerfile`. Cada context té el seu
`distDir` (`NEXT_DIST_DIR`): `.next` (dev), `.next-e2e` (tests), `.next-prod` (prod local),
perquè no es trepitgin entre ells. Els `rm -rf` previs a cada `cp -r` són imprescindibles:
sense ells `cp` nia `static/static` i el servidor acaba servint HTML que apunta a chunks
inexistents (pàgina en blanc, tot 500).

## Revisió d'agost de 2026

`web/REVISIO-2026-08.md` documenta una auditoria completa feta el 10 d'agost de 2026 i
**ja aplicada**. Consulta-la abans de proposar canvis a la web: evita rediagnosticar el que
ja està diagnosticat i, sobretot, evita recomanar coses descartades amb motiu —migrar a
Chakra v3 (`accentStylesheet()` depèn dels noms literals de `--chakra-colors-*`, que la v3
genera d'una altra manera), refactor a RSC, xatbot, banner de cookies, `--omit=dev`,
`next/image` optimitzat, `JobPosting` al JSON-LD.

El que hi queda obert depèn de material extern o d'una tria del Cel: demo dels tres
projectes, tipografia de titular allotjada, testimonis de client i HSTS al Nginx. La decisió A
(el sorteig del color aleatori) es va resoldre el 2026-08-18: retirat, substituït per un
accent fix per secció.

## Verificar

```bash
cd web
npx tsc --noEmit     # tipus
npm test             # unitaris (node:test, sense dependències) — 21 tests
npm run test:e2e     # Playwright chromium + mobile — 40 tests
```

`npm test` cobreix el que és determinista i crític: el contrast AA dels 8 accents de secció
contra les quatre superfícies en tots dos modes, la coherència del diccionari trilingüe i
l'alineament per índex amb `data.ts`, i les entrades del blog. Si toques color o contingut,
aquests tests són la xarxa. Als e2e, `contingut.spec.ts` comprova que cada secció pinta el seu
color: si canvies `SECTION_ACCENTS`, hi has de tocar els hex.

## Arquitectura de la web

Next.js 14 App Router + **Chakra UI v2** (compte: la skill `chakra-ui-builder` documenta la
v3, que té una API diferent) + framer-motion. Portada d'una sola pàgina amb àncores, més el
blog, tot prerenderitzat: 24 pàgines estàtiques.

### Rutes i idiomes

El català viu a l'arrel i **no té prefix**; `app/[lang]/` genera només `es` i `en`
(`dynamicParams = false`). Cada recurs existeix en tres URLs:

- `/`, `/es`, `/en`
- `/blog`, `/es/blog`, `/en/blog`
- `/blog/[slug]` × 3 idiomes (6 entrades → 18 pàgines)
- `/opengraph-image` i `/blog/opengraph-image` (generades amb `next/og`), `/feed.xml`

`app/home.tsx` i `app/blog/shell.tsx` són els embolcalls compartits: cada ruta només hi
passa `lang`. `app/seo.ts` centralitza canonical, hreflang i construcció d'URLs — fes-lo
servir sempre en comptes de concatenar rutes a mà.

### Contingut: `data.ts` vs `content.ts`

- `app/data.ts` — dades **neutres**: xifres, noms propis, stack, dates, URLs, imatges.
- `app/content.ts` — diccionari **CA/ES/EN** de tot el text traduïble, amb un tipus `Dict` que
  força que les tres llengües tinguin la mateixa forma.

Els components combinen les dues fonts **per índex**: `t.skills.groups[i] ?? s.group`. Si
afegeixes un element a un array de `data.ts`, n'has d'afegir un a la posició equivalent dels
tres arrays de `content.ts`. `tests/content.test.ts` ho comprova; no confiïs a recordar-ho.

El text del diccionari admet `**negreta**`, que renderitza `components/RichText.tsx`: el
marcatge viu al text traduïble, no al JSX.

### i18n (`app/i18n.tsx`)

L'idioma **arriba per prop des de la ruta**, no d'un efecte: `<LanguageProvider initial={lang}>`
embolcalla cada pàgina, de manera que el servidor ja renderitza el text correcte. `useT()`
retorna el diccionari actiu; `langHref()` i `stripLang()` construeixen els enllaços entre
idiomes. El commutador de la barra són `<Link>`, no botons — si escrius tests, busca'ls com
a `link`.

### Color i accent (`app/color.ts`)

El punt més subtil del projecte. Tot viu a `app/color.ts`, que és lògica pura, sense JSX ni
DOM: així es pot importar des de `node --test` i cobrir amb tests el que sosté el contrast de
tot el lloc. **Cap token de text es publica sense comprovar que arriba a 4,5:1** contra el fons
on es pintarà (`contrastify`, `solidWithReadableText`, `bestTextOn`). No hi tornis a posar
topalls d'HSL: l'HSL no és perceptual i va ser exactament la causa que 6 dels 8 accents
incomplissin AA al botó principal.

- **Un accent fix per secció**, no un de sortejat per visita. `SECTION_ACCENTS` lliga cada
  secció al seu color; l'ambre (`base`) fa de color per defecte i el duen la barra,
  l'entradeta, les xifres, el contacte, el peu i el blog.
- **Arriba per CSS, no per JavaScript.** `accentStylesheet()` genera en temps de build una
  regla `[data-accent="…"]` per secció i mode, i `layout.tsx` la incrusta al `<head>`.
  `Section.tsx` només posa `data-accent`; les variables s'hereten a tot el subarbre. La regla
  fosca porta `.chakra-ui-dark` al davant perquè guanyi per especificitat sobre la clara, que
  s'escriu a l'element de la secció.
- **Els neutres són fixos i de màxim contrast**: blanc pur de dia, negre pur de nit. El paper
  crema de la bitàcola i el sorteig d'accent per visita (amb el seu script bloquejant,
  `?accent=RRGGBB`, `AccentProvider` i `app/accent.tsx`) es van retirar el 2026-08-18 a
  petició del Cel: donaven una web monocroma i diferent a cada recàrrega. És a l'històric.
- **No hi ha selector de color** (es va retirar el 2026-08-10). Amb ell van marxar el camí de
  re-tintat dels neutres (`deriveNeutrals`, `GRAY_SUGGESTIONS`) i el diccionari `picker`.
- `NEUTRAL_DEFAULTS` a `color.ts` **duplica** els valors neutres de `theme.ts`. Si en canvies
  un, canvia'l als dos llocs.
- **La separació la fa el farciment, no el filet** (llenguatge pres de jetbrains.com el
  2026-08-18). `deriveAccent` publica tres superfícies plenes, que són el color de la secció
  barrejat amb el fons del mode i formen tres capes: `accent.panel` (fons de secció) →
  `accent.surface` (targetes) → `accent.chip` (pastilles). La barreja es fa **contra `bg`**
  justament perquè el text neutre hi conservi el contrast; `tests/contrast.test.ts` ho comprova
  per als 8 accents × 2 modes. Compte amb el contracte: `panel` i `surface` aguanten
  `fg.muted`, la `chip` només `fg` — el `layerStyle` «chip» hi fixa el color per això.
- **Els fons de secció van saltejats**: banda de color massís (`bg="accent.panel"`), banda
  neta (`bg="bg"`) on el color només hi arriba pel bafarot. Vuit bandes plenes seguides eren
  un mur. Si afegeixes una secció, mira quina la precedeix i alterna.
- **Radis**: `plate` (14 px) per a targetes i imatges, `control` (999 px) per a botons,
  etiquetes i commutadors — pastilla completa. La «làmina de paper» de 2 px es va retirar el
  2026-08-18. No escriguis `borderRadius="2px"` a cap component: fes servir el token.
- `theme.ts` defineix `textStyles` (`display`, `sectionTitle`, `cardTitle`, `kicker`, `micro`),
  l'escala de `fontSizes` (`md` són 18 px) i dos `layerStyles`: **`plate`** (targeta de color
  massís amb vora d'accent i elevació en passar-hi el ratolí) i **`chip`** (pastilla
  d'etiqueta). Fes-los servir en comptes d'inventar mides o repetir vores.
- **Els titulars són de pal sec del sistema**, pes 700 i interlletratge tancat (`display`
  8 rem, `sectionTitle` 4,6, `cardTitle` 2). La serif es va retirar el 2026-08-18. Segueix
  sense haver-hi cap font descarregada.
- **`components.Heading.defaultProps.size = null` és imprescindible.** Chakra dona al
  `Heading` una mida per defecte (`size="xl"`, 36 px) que es resol com a estil de component i
  **guanya sobre `textStyle`**. Amb ella posada, `display` i `sectionTitle` no pinten mai la
  seva mida i acabes escrivint `fontSize` a mà a cada component — que és exactament la deriva
  que hi havia. Si veus un titular encallat a 36 px, mira primer aquí.

### Altres detalls

- Els enllaços de secció de la barra han de passar per `anchorHref(lang, id)`, no escriure's
  com a `/#id`: amb el prefix fix, des de `/es` o `/en` et tornaven a la portada catalana.
  Cobert per una prova de regressió a `e2e/navegacio.spec.ts` (compte: en pantalla petita els
  enllaços viuen dins del calaix, no a la barra).
- `components/Section.tsx` embolcalla totes les seccions: hi posa `data-accent`, el bafarot de
  color del fons (`glow`, un bafarot difuminat que alterna de costat secció a secció) i el
  `scrollMarginTop` per no
  quedar sota la barra sticky. `components/Reveal.tsx` fa l'aparició en scroll com a **millora
  progressiva**: el marcatge surt visible del servidor i només s'amaga, abans de pintar, el
  que queda fora de pantalla. No hi tornis a posar un `initial` de framer-motion.
- Les il·lustracions SVG es llegeixen **en temps de build** (`app/svg.ts`) i baixen per prop
  fins a `InlineSvg`; s'incrusten al DOM (no `<img>`) per poder tenyir-se amb els tokens.
- Classe global `.tnum` (a `theme.ts`) per a xifres monoespaiades i tabulars.
- `next.config.mjs` defineix les capçaleres de seguretat. La CSP necessita `'unsafe-inline'`
  perquè Emotion injecta estils i hi ha JSON-LD inline; endurir-la amb nonce faria el layout
  dinàmic i es perdria tot l'estàtic. El HSTS va al Nginx del host.
- `public/sw.js`: cache-first només per a allò immutable. **El PDF en queda fora a posta** —
  viu a una URL fixa i es regenera, i en cache-first els visitants recurrents es baixaven per
  sempre un CV caducat. Puja `CACHE` si canvies l'estratègia.
- `.dockerignore` exclou `*.pdf` però reexcepciona `!public/*.pdf`. No treguis l'excepció o la
  imatge es quedarà sense el CV descarregable.
- `docker-compose.yml` publica a `127.0.0.1`: el reverse proxy del host hi arriba, Internet no.

## El CV en HTML

`cv-celesti-tico.html` és un únic fitxer autònom: CSS inline, cap dependència externa, tema
clar/fosc (`prefers-color-scheme` + `data-theme`) i `@media print` per a l'A4. Té paleta pròpia
(`--paper/--ink/--accent`), diferent de la de la web; només comparteixen les piles tipogràfiques
del sistema (cap font descarregada). Seccions actuals (`<h2 class="sec">`): Perfil · Competencias ·
Infraestructura · Diseño · Idiomas · Formación · Experiencia · Trayectoria por clientes ·
Proyectos propios destacados · Clientes destacados.

En editar-lo: reutilitza les classes existents, no afegeixis dependències externes i comprova
que la vista d'impressió segueixi cabent net.

## Material de suport

`cenics.md`, `linkedin-celesti.md`, `vida-laboral.md` són fonts primàries recollides per
redactar el `.md` de dades. Consulta-les abans de preguntar per dades històriques.
