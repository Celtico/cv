# Revisió tècnica — agost 2026

> **Estat: aplicada el 10 d'agost de 2026.** Les onades 1, 2 i 3 s'han
> implementat i verificat (`tsc` net · 18/18 unitaris · 36/36 e2e · build de 24
> pàgines estàtiques). El que queda obert són quatre punts que depenen de
> material extern o d'una decisió del Cel, recollits a
> [Què queda obert](#què-queda-obert). La resta del document es conserva com a
> registre del diagnòstic i del perquè de cada canvi.

Revisió completa de la web feta el **10 d'agost de 2026** per vuit taules
multidisciplinàries treballant en paral·lel sobre el codi real. Cap conclusió és una
impressió: totes porten fitxer i línia.

**Acta visual:** https://claude.ai/code/artifact/a4b5473d-7ef6-4aa7-ad1c-8ea44eee04c0

**Criteri de priorització:** l'objectiu de la web és **que el Cel sigui contractat**
(empresa o client), no ser una demostració tècnica. Tot està jutjat contra això.

**Estat en el moment de la revisió:** `tsc --noEmit` net · 28/28 tests e2e verds en 19,8 s ·
First Load JS de `/` = 203 kB · cap fitxer modificat durant la revisió.

---

## Índex

- [Onada 1 — defectes actius](#onada-1--defectes-actius)
- [Onada 2 — oportunitats perdudes](#onada-2--oportunitats-perdudes)
- [Onada 3 — estructura](#onada-3--estructura)
- [Dades: el contrast recalculat](#dades-el-contrast-recalculat)
- [El que s'ha decidit NO fer](#el-que-sha-decidit-no-fer)
- [Decisions pendents del Cel](#decisions-pendents-del-cel)
- [Annex: troballes per taula](#annex-troballes-per-taula)

---

## Consens entre taules

Les taules van treballar aïllades. Quan diverses hi arriben per camins diferents, deixa de
ser opinió.

| Taules | Troballa |
| --- | --- |
| 4 | `Section.tsx:34` posa `scrollMarginTop="0"` sota un nav `sticky` de 64 px: el títol queda tapat en arribar a una àncora |
| 3 | No hi ha imatge Open Graph i `layout.tsx:45-49` promet `summary_large_image` |
| 3 | El blog viu en àncores `#slug`, sense URL per post |
| 3 | `ClientHours` resta (feina antiga, facturació per hores, no és una `<table>` semàntica) |
| 2 | El service worker serveix el PDF del CV caducat per sempre |
| 2 | La derivació de color d'`accent.tsx` trenca el contrast AA |
| 2 | Hi ha codi escrit que no es renderitza (LinkedIn, `profile.status`) |

---

## Onada 1 — defectes actius

Cost estimat conjunt: **mig dia**.

### 1.1 El service worker serveix un CV caducat · VERIFICAT

`public/sw.js:36` inclou `pdf` al regex cache-first, i `CACHE = "cv-v1"` (`sw.js:3`) no
s'incrementa mai. `activate` (`sw.js:9-16`) només purga caus amb un altre nom, així que mai
no purga res. Com que `/cv-celesti-tico.pdf` és una URL sense hash, **tot visitant recurrent
es descarrega la versió desada indefinidament**.

Xoca directament amb el flux de regeneració del PDF documentat a `CLAUDE.md`.

**Correcció:** treure `pdf` del regex i deixar-lo network-first o stale-while-revalidate.
Versionar `CACHE` amb el build id. Alternativa: reduir el SW a l'*offline fallback* de
navegació, que és l'única part que aporta valor real aquí.

### 1.2 El CTA principal incompleix WCAG AA · VERIFICAT

- `accent.tsx:118` — `relativeLuminance(solid) > 0.35 ? "#141210" : "#f5efe2"`. Cap dels 8
  accents supera 0,35 (màxim: `#CE8724` = 0,306), així que `accent.contrast` **sempre** és
  el text clar. Resultat: **6 dels 8 accents fallen** el 4,5:1 als botons plens
  (`Hero.tsx:97-109`, `Contact.tsx:52-66`, `Featured.tsx:128-143`). En hover
  (`accent.emphasized`) fallen **8 de 8**.
- `accent.tsx:114` — `accent.fg` usa topalls d'HSL (`Math.min(l, 0.34)` / `Math.max(l, 0.62)`),
  que no és perceptual. **83 de 384** combinacions (accent × gris × mode × fons) cauen sota
  4,5:1. Afecta kickers (`Section.tsx:40`), el rol de l'heroi (`Hero.tsx:81-90`), dates
  (`Experience.tsx:29`), subtítols (`Projects.tsx:28`) i la data dels posts.
- `fg.subtle` (`theme.ts:33` i `accent.tsx:131`) no arriba a 4,5:1 amb **cap** dels 6 grisos
  en cap mode, i pinta les capçaleres de columna de `ClientHours.tsx:26-40` a ~10,5 px.

**Punt clau:** el parell per defecte de `theme.ts` sí que compleix. La fallada la introdueix
exclusivament la derivació dinàmica.

**Correcció:** substituir els llindars per una cerca de contrast real, reutilitzant la
`relativeLuminance` que ja hi ha al fitxer — baixar/pujar la claror en passos de 0,02 fins
a superar 4,5:1 contra el fons més exigent (`bg.subtle` en clar, `bg.panel` en fosc). Per a
`accent.contrast`, comparar els dos ràtios en comptes d'usar un llindar; i normalitzar
també `accent.solid` perquè els 4 accents que no es resolen només invertint el text puguin
complir. Valors suggerits per a `fg.subtle`: `#6E6757` en clar, `#9A917F` en fosc — recorda
canviar-los **als dos llocs** (`theme.ts` i `NEUTRAL_DEFAULTS`).

### 1.3 Al mòbil, la galeria són rectangles de color

`Gallery.tsx:31-40` tapa cada captura amb un vel `bg="accent.solid"` a `opacity={0.9}` que
només es retira amb `_groupHover`, i la imatge porta `filter="grayscale(1)"` (`Gallery.tsx:27`).
Al mòbil no hi ha `:hover`: «Una tria de 422 projectes» es renderitza com **12 quadrats plans
del color d'accent**. Mateix patró a `BlogClient.tsx:44-51` (`TintedImage`), que oculta les
imatges de tots els posts.

**Correcció:** vel a `opacity={0.45}` de base i anul·lat amb `@media (hover: none)`; igual
per al `grayscale`. Extra de baix cost: fer les tessel·les clicables cap al lloc del client
(ara `Gallery.tsx:14` no és un enllaç).

### 1.4 Deu seccions s'envien amb `opacity:0` des del servidor · VERIFICAT

`Reveal.tsx:9` (`initial={{ opacity: 0, y: 16 }}`) × 10 embolcalls a `page.tsx:24-34`.
Framer-motion serialitza l'`initial` al SSR: al prerender hi ha 10 ocurrències de
`style="opacity:0;transform:translateY(16px)"`. Res per sota del hero és visible fins que
s'han hidratat 203 kB de JS. Amb JS desactivat o fallit, la web és el hero i prou.

**Correcció:** invertir el valor per defecte — marcatge visible al servidor, animació com a
millora progressiva (IntersectionObserver o `@starting-style`). Com a mínim, un
`<noscript><style>` que forci `opacity:1`.

### 1.5 El contenidor és accessible saltant-se el Nginx

`docker-compose.yml:9` publica `3592:3000`, que escolta a `0.0.0.0`. Docker escriu les seves
regles a `DOCKER-USER`, **per davant d'ufw/firewalld**: el Next queda accessible des
d'Internet sense TLS ni capçaleres.

**Correcció:**

```yaml
ports:
  - "127.0.0.1:3592:3000"
logging:
  driver: "json-file"
  options: { max-size: "10m", max-file: "3" }
mem_limit: 512m
cpus: 1.0
security_opt: ["no-new-privileges:true"]
cap_drop: ["ALL"]
```

### 1.6 Cap capçalera de seguretat

`next.config.mjs` no defineix `headers()` ni `poweredByHeader: false`. Falten CSP, HSTS,
`X-Content-Type-Options`, `Referrer-Policy` i `Permissions-Policy`.

Atenció en redactar la CSP: Emotion injecta `<style>` en línia i `layout.tsx:91-94` fa
`dangerouslySetInnerHTML` per al JSON-LD, així que `'unsafe-inline'` és **obligatori** a
`script-src` i `style-src`. `'unsafe-eval'` no cal. El HSTS va al Nginx, no aquí, i convé
començar amb `max-age=300` abans de pujar a un any perquè `includeSubDomains` afecta
`gitwins.`, `album.`, `fabrik.` i `vehicleos.serverscel.com`.

Endurir-ho amb nonce **no compensa**: obligaria a llegir `headers()`, cosa que converteix el
layout en dinàmic i perd el rendering estàtic de tot el lloc.

---

## Onada 2 — oportunitats perdudes

Cost estimat conjunt: **1–2 dies**.

### 2.1 No hi ha imatge Open Graph (3 taules)

`layout.tsx:36-44` no té `openGraph.images` i `layout.tsx:45-49` declara
`twitter.card: "summary_large_image"` sense imatge. No existeix cap `opengraph-image.*` a
`app/`. El blog (`blog/page.tsx:25-31`) **sí** que en defineix; la portada, que és la que es
comparteix, no.

**Correcció:** `app/opengraph-image.tsx` amb `ImageResponse` de `next/og` (1200×630): nom,
rol, «Disponible» i les xifres 422 / 200+ / 20+, amb la paleta de `theme.ts` i l'ambre
congelat. Un segon per a `/blog`. Afegir `twitter.images`.

### 2.2 El senyal «disponible» és el més amagat de la pàgina

- `Hero.tsx:58-61` — el xip `{t.hero.disponible}` porta `display={{ base: "none", sm: "block" }}`:
  **al mòbil no es veu**, i on es veu fa 0,68 rem en `fg.muted`.
- `data.ts:13` — `status: "Disponible · en búsqueda activa"` **no es renderitza enlloc**.
- `Hero.tsx:65-77` — l'`<h1>` és només el nom, a 7 rem. `Hero.tsx:81-90` — el rol, que és la
  dada de decisió, va a 0,75 rem: el text més petit de la pantalla.
- `content.ts:229` — `contact.subtitle` diu «Disponible per a projectes i col·laboracions»:
  framing 100% freelance, que fa concloure que no busca feina per compte d'altri.

**Correcció:** píndola visible a totes les mides amb data concreta; `<h1>` = proposta i el
nom a línia de firma; i copy que digui explícitament què busca. Text proposat per a
`hero.tagline`:

> «20+ anys construint producte digital de principi a fi: del briefing i el disseny al codi,
> la infraestructura i el SEO. Autodidacta i polivalent. Ara busco incorporar-me a un equip:
> presencial a Lleida, híbrid a Barcelona o en remot.»

I per a `contact.subtitle`:

> «En cerca activa de feina com a desenvolupador full-stack (React · Next.js · NestJS) i
> obert a projectes freelance. Escriu-me i et responc el mateix dia.»

Cal propagar-ho a ES i EN (`content.ts:388-394` i `551-557`).

### 2.3 Els tres CTA principals aterren en un mur de login

`Featured.tsx:128-143` posa tres botons `accent.solid` («Visitar») cap a `album.`, `fabrik.`
i `vehicleos.serverscel.com`, i tota la làmina també és enllaç extern (`Featured.tsx:82-84`).
Comprovat: `album.serverscel.com` serveix una SPA amb JWT i cap compte de demo anunciat.

El pic d'interès es produeix llegint els destacats, i just allà l'acció més visible expulsa
el visitant cap a una pantalla on no pot entrar. **Tota l'evidència de l'avantatge
diferencial és avui inaccessible.**

**Correcció:** compte de demo en només-lectura amb credencials impreses al costat del botó,
o un vídeo de 20 s on es vegi la factura creant-se a Odoo. Regla: si la demo no està polida,
no s'obre — es posa el vídeo. Degradar «Visitar» a `variant="outline"` i afegir un enllaç
«Parlem d'aquest projecte» cap a `#contacto`.

### 2.4 Cap enllaç a LinkedIn, i el JSON-LD és una entitat òrfena

Codi ja escrit que no es renderitza:

| Símbol | Ubicació |
| --- | --- |
| `LINKEDIN_ACTIVITY` | `blog/posts.ts:14` |
| `blog.source` («Veure a LinkedIn») | `content.ts:243`, en 3 idiomes |
| `blog.backHome` | `content.ts:244`, en 3 idiomes |
| `profile.status` | `data.ts:13` |

`Contact.tsx:114-121` només enllaça `cenics.net`. El `Person` de `layout.tsx:66-82` no té
`sameAs`, `@id`, `image`, `knowsLanguage` ni `hasOccupation`: Google no pot lligar
`serverscel.com` amb el perfil de LinkedIn, que és on hi ha l'historial verificable.

**Correcció:** renderitzar les constants que ja existeixen, i afegir al JSON-LD
`"@id": "https://serverscel.com/#person"`, `sameAs`, `hasOccupation` i `seeks`.

> ⚠️ **No** afegir un `JobPosting`: està definit per a ofertes publicades per un ocupador.
> Un candidat que en publica un és spam estructurat i pot costar una acció manual. La
> propietat correcta és `Person.seeks`.
>
> **No** inventar `alumniOf`: és autodidacta i això és part del relat.

### 2.5 CLS a `/blog` per imatges sense proporció reservada

`BlogClient.tsx:32-42` — `TintedImage` renderitza un `<Image>` de Chakra (un `<img>` pelat)
amb `w="full"` i sense `width`, `height`, `aspectRatio` ni `sizes`; els contenidors
(`BlogClient.tsx:62,68`) tampoc reserven proporció. A la portada no passa perquè
`Gallery.tsx:15` i `Featured.tsx:53` embolcallen amb `AspectRatio`.

**Correcció:** `AspectRatio` al contenidor, o `width`/`height` reals als objectes de `posts.ts`.

### 2.6 Les cinc il·lustracions es carreguen per `fetch()` · VERIFICAT

`InlineSvg.tsx:15-33` fa `fetch()` en client. **El 100% de l'art de la portada és SVG**
(`data.ts:83,99,114,136,143`), o sigui 32.950 B en 5 peticions que es disparen en cascada
després d'hidratar. Res al marcatge del servidor. A més surten de `public/`, servit sense
hash i amb `max-age=0`: revalidació a cada visita.

**Correcció:** llegir-los en temps de build (`fs.readFile` en un Server Component o import
`?raw`) i pintar-los síncronament. Cost: +8 kB gzip a l'HTML, zero peticions. Els tokens
`--chakra-colors-*` segueixen resolent-se igual perquè continua sent DOM.

---

## Onada 3 — estructura

### 3.1 Dos terços del contingut no són indexables

`i18n.tsx:9-20` és client: el servidor sempre renderitza `DEFAULT_LANG = "ca"`. Els 26 kB de
diccionari ES+EN viatgen al bundle però mai apareixen a l'HTML servit. `sitemap.ts:4-17`
llista 2 URLs per a 3 idiomes, sense `hreflang` ni `x-default`.

Efecte secundari poc obvi: Googlebot renderitza amb locale `en-US`, així que
`i18n.tsx:16-19` converteix el DOM a anglès mentre el `<title>` i `<html lang="ca">` es
queden en català — senyals contradictoris sobre un mateix document.

**Correcció (la més barata, sense middleware):** deixar `/` en català i afegir
`app/[lang]/page.tsx` i `app/[lang]/blog/page.tsx` amb `generateStaticParams()` per a `es` i
`en`. `LanguageProvider` accepta `initial?: Lang` i no fa sniffing quan ve de la URL.
Afegir `alternates.languages` i les 6 URLs al sitemap. El commutador passa de `setState` a
`<Link>`.

### 3.2 El blog sense URLs per post

`blog/page.tsx:41-51` declara 6 `BlogPosting` amb `url: .../blog#${slug}`. Per a Google,
`#slug` no és una URL: els 6 posts són el mateix document. `openGraph.images`
(`blog/page.tsx:31`) acumula la primera imatge de tots.

**Correcció:** `app/[lang]/blog/[slug]/page.tsx` amb `generateStaticParams()` sobre
`blogPosts × LANGS` → 18 pàgines estàtiques, cadascuna amb `generateMetadata` i JSON-LD
`BlogPosting` propi (`inLanguage` d'un sol idioma, no tres). Afegir `feed.xml`. Fer-ho
**després** de 3.1: comparteixen el mateix `[lang]`.

### 3.3 Sistema de disseny sense escala tipogràfica

`theme.ts:23` només estén `semanticTokens.colors`. Conseqüència mesurada sobre `app/`:

- 16 parells de `fontSize` responsiu diferents, en rem cru.
- 13 valors de `letterSpacing` i 11 de `lineHeight`.
- La microetiqueta `tnum` en versaletes apareix amb **6 mides** (0,66 · 0,68 · 0,70 · 0,72 ·
  0,78 · 0,80 rem).
- 18 radis de `2px` — bon llenguatge — **excepte `ColorPicker.tsx:54,77,129`**, que fa 6/8 px:
  justament el component que exhibeix el sistema és l'únic que el trenca.
- **Zero `<h3>` a tot el lloc.** Els ~40 títols de projecte, client i eina són
  `<Text fontFamily="heading">` (`Featured.tsx:92`, `Skills.tsx:31`, `Experience.tsx:33`,
  `Projects.tsx:36`, `Clients.tsx:32`). L'esquema del document és un `h1` i nou `h2` plans.

**Correcció:** cinc `textStyles` al tema (`display`, `sectionTitle`, `cardTitle`, `kicker`,
`micro`) + `radii.plate`, i convertir els títols de targeta en `<Heading as="h3">` — canvi
semàntic amb zero impacte visual. Arregla disseny i accessibilitat alhora.

### 3.4 Accessibilitat estructural

- **Cap skip-link** (2.4.1): `Nav.tsx:140-171` posa 9 enllaços + 3 botons d'idioma + tema
  abans del contingut, a cada pàgina.
- **`Contact` queda fora de tot landmark**: `page.tsx:34` el deixa fora del `<Box as="main">`
  i no hi ha `<footer>` ni `<header>`.
- **Focus invisible al `ColorPicker`** (2.4.7): `ColorPicker.tsx:104-123` són `Box as="button"`
  amb `outline` **permanent**, que guanya sobre el `:focus-visible` de l'UA — 8 controls
  consecutius sense indicador. `ColorPicker.tsx:79` elimina l'anell de l'`Input`
  (`boxShadow: "none"`).
- **`ClientHours` no és una taula** (1.3.1): `ClientHours.tsx:44-120` construeix un dataset de
  5 columnes amb `Grid`/`Box`, sense `<th>` ni `scope`.
- **`InlineSvg` amaga text informatiu** (1.1.1): `InlineSvg.tsx:36-45` posa `role="img"` +
  `aria-label={title}`, que fa presentacional tot el subarbre — però els SVG contenen text
  real («Odoo / ERP CONNECTAT», «crea una factura a l'Odoo → ✓ feta»). A més, els `id`
  interns (`bgL`, `glowF`, `wave`) col·lisionen si dos SVG conviuen al DOM.
- **Paral·laxis fora del control de moviment** (2.3.3): `MotionConfig reducedMotion="user"`
  no afecta els `MotionValue` enllaçats directament a `style`, així que `Hero.tsx:13,24` i
  `Featured.tsx:31-32` segueixen actius. La regla de `theme.ts:88-93` tampoc cobreix les
  *transicions* CSS (`Nav.tsx:120`, `Gallery.tsx:31`).
- **`scrollMarginTop`** hauria de ser ≥ 72 px a `Section.tsx:34` (reportat per 4 taules).

### 3.5 Tests

Estat: `tsc` net, 28/28 e2e verds, diccionari CA/ES/EN complet (verificat: 0 claus que
faltin, 0 arrays de longitud diferent — però per sort, no per construcció).

Buits per ordre de risc:

1. **`accent.tsx` al 0%.** Lògica determinista de la qual depèn el contrast de tot el lloc.
2. **`Featured.tsx:72` llegeix el diccionari per índex sense fallback** (`const tr = t.featured.items[i]`),
   a diferència de la resta de components que fan `?? data`. Afegir un projecte i oblidar-se
   de `content.ts` peta en render. **El desajust ja existeix**: `data.featured[1]` (FABRIK)
   declara 4 `highlights` i `content.ts` en té 5 — no es veu perquè
   `data.featured[].highlights` no es renderitza enlloc. Camp mort divergit en silenci.
3. **`/blog` sense cap test.**
4. **`e2e/contingut.spec.ts:45-52` pot passar en fals**: llegeix `background-color` del body,
   però `AccentProvider` el reescriu en un `useEffect`; el `poll` es pot complir per la
   pintada de l'accent i no pel canvi de tema.
5. **Selectors ancorats a copy literal** (`contingut.spec.ts:19,35,50,62`): fallaran quan es
   reescrigui el text, sense que hi hagi regressió real.

**Infraestructura recomanada: `node:test`, zero dependències noves.** Verificat que funciona
avui (Node v24 fa *type stripping*). Requereix extreure les utilitats de color a
`app/color.ts` (sense JSX) i reexportar-les des d'`accent.tsx` — un split bo per si sol.
Quatre fitxers cobririen tot: `color.test.ts`, `contrast.test.ts` (les 96 combinacions),
`content.test.ts` i `posts.test.ts`.

Per a l'alineament per índex, la solució correcta són **tipus, no tests**:

```ts
type SameLen<T extends readonly unknown[], U> = { [K in keyof T]: U };
// content.ts:  groups: SameLen<typeof skills, string>;
```

Ho detecta `npx tsc --noEmit`, que ja és la porta del projecte.

### 3.6 CI/CD i monitoratge

No existeix cap pipeline als dos repos. El risc real per a un operador únic no és el
desplegament: és el **silenci** si el contenidor entra en bucle o caduca un certificat.

Mínim viable per al GitLab autoallotjat: `tsc --noEmit` + `next build` + `playwright test`
(el `webServer` de `playwright.config.ts` ja fa el build standalone, no cal cap servei
extra). Monitoratge: Uptime Kuma amb *keyword check* (no només el 200), avís d'expiració de
certificat a 21 dies i alerta de disc. Res de Prometheus/Grafana: desproporcionat.

### 3.7 Contingut i `llms.txt`

- Falta **VehicleOS** al bloc de projectes de `llms.txt:76-93`, tot i ser un dels tres
  destacats i el tema de 2 dels 6 posts.
- `llms.txt` diu que hi ha blog però no en llista cap entrada, i no hi ha el LinkedIn.
- Cal un bloc explícit `## Cerca de feina` amb rol, stack, ubicació i modalitat: és el que
  citarà un assistent quan li preguntin pel candidat.
- Millor encara: generar-lo des de `data.ts` + `posts.ts` amb una route handler estàtica
  perquè no es pugui tornar a desincronitzar.
- **Blog:** són 6 posts, tots de jul–ago 2026, tots reciclats de LinkedIn. Dos són aforismes
  de 3 línies que en un blog propi baixen la mitjana. Cadència recomanada: un post cada 2–3
  setmanes, mai per sota de 400 paraules, sempre amb una decisió tècnica i el preu que va
  costar. I invertir el flux: publicar primer a la web i després a LinkedIn amb enllaç.

### 3.8 Ordre de les seccions i posicionament

Ordre actual (`page.tsx:22-33`): Hero → Stats → About → Skills → Lighthouse → Featured →
Projects → Gallery → Experience → ClientHours → Clients → Contact.

Problema: el reclutador travessa ~40 etiquetes de tecnologia i una auditoria de la mateixa
web abans de veure la primera prova de feina real, i acaba amb una taula d'hores de
2011–2021 just abans del contacte — tot i que `Experience` mostra activitat fins al 2026.

Ordre proposat: Hero → Stats → **Featured** → About → Skills → **Experience** → Gallery →
Clients → ClientHours → Projects → Contact.

**Avantatge diferencial identificat** (i que la web dilueix): *ha posat un LLM a executar
escriptures reals dins d'un ERP en producció, amb la capa de permisos i la infraestructura
que això exigeix, i se les administra ell mateix.* Evidència: `data.ts:78` («crea facturas en
Odoo chateando»), el post `ia-empresarial-integrada`, i la secció d'infraestructura del CV.
Això ocupa avui la posició 6 de 13.

---

## Dades: el contrast recalculat

Les taules d'accessibilitat i qualitat discrepaven en el recompte. Recalculat de zero: **6
fallen tal com estan**, i invertir només la tria del text n'arregla 2.

Contrast d'`accent.contrast` sobre `accent.solid` (botons plens). Llindar AA: 4,5:1.

| Accent | Luminància | Ràtio actual | AA | Millor possible | AA |
| --- | ---: | ---: | :-: | ---: | :-: |
| `#CE8724` | 0,306 | **2,58** | ✗ | 6,33 | ✓ |
| `#DD6B20` | 0,260 | **2,96** | ✗ | 5,52 | ✓ |
| `#D53F8C` | 0,196 | **3,73** | ✗ | 4,38 | ✗ |
| `#2F855A` | 0,181 | **3,96** | ✗ | 4,11 | ✗ |
| `#D33A2C` | 0,171 | **4,15** | ✗ | 4,15 | ✗ |
| `#1D6CE0` | 0,164 | **4,29** | ✗ | 4,29 | ✗ |
| `#0E7490` | 0,146 | 4,68 | ✓ | 4,68 | ✓ |
| `#4F46E5` | 0,117 | 5,49 | ✓ | 5,49 | ✓ |

L'ambre original de la bitàcola és el cas més dolorós: **2,58** quan amb text fosc donaria
**6,33**.

> **Ironia a resoldre:** la secció Lighthouse proclama **100 en accessibilitat** mentre la web
> incompleix AA en la majoria de càrregues.

---

## El que s'ha decidit NO fer

Tan important com la llista del que sí. Cadascuna sembla raonable i no ho és aquí.

| Descartat | Motiu |
| --- | --- |
| **Xatbot «pregunta'm sobre el Cel»** | És el gest més genèric que existeix; diu «sé cridar una API», que és el nivell del qual vol distingir-se. Pitjor cas: al·lucina una dada falsa del seu CV davant d'un reclutador. La versió correcta ja funciona: `llms.txt`. |
| **Migrar a Chakra v3** | Reescriptura d'API, no migració. `accent.tsx` depèn dels noms literals de `--chakra-colors-*`, que v3 genera d'una altra manera. Pagaries el cost sencer sense arribar al final del camí. |
| **Refactor a Server Components** | El chunk propi de la pàgina són 5,7 kB gzip. El pes real és Chakra + Emotion, i Chakra v2 no té suport RSC. L'i18n no és el culpable. |
| **CSP amb nonce** | Obligaria a llegir `headers()` → layout dinàmic → es perd el rendering estàtic de tot el lloc. `'unsafe-inline'` aquí és una decisió defensable. |
| **Banner de cookies** | Cap analítica, cap rastrejador, cap CDN de tercers. L'únic emmagatzematge és `localStorage["lang"]`, exempt (art. 22.2 LSSI-CE). |
| **`--omit=dev` al Dockerfile** | Seria un error: el builder necessita TypeScript. El runner ja no copia `node_modules` perquè `standalone` hi porta només el que cal. Sí que cal canviar `npm install` → `npm ci --ignore-scripts`. |
| **`next/image` optimitzat** | `unoptimized: true` és correcte: 624 kB en 26 fitxers ja WebP i redimensionats. Afegiria un servei amb estat a una imatge `standalone` sense guanyar-hi res. |
| **`JobPosting` al JSON-LD** | És per a ofertes d'un ocupador; publicar-ne com a candidat pot costar una acció manual. |
| **Ofuscar el correu amb JS** | Trenca accessibilitat i SEO, i els bots moderns ho resolen igual. |

---

## Decisions pendents del Cel

Quatre bifurcacions que no es poden resoldre des del codi.

### A. El sorteig del color aleatori

> **Resolt el 2026-08-18: retirat.** El Cel el va tombar sencer. En comptes d'un accent
> sortejat per visita hi ha ara un accent **fix per secció** (`SECTION_ACCENTS` a
> `app/color.ts`), publicat com a CSS estàtic per `accentStylesheet()`: vuit colors conviuen
> a la mateixa pàgina, la web és reproduïble i no cal cap JavaScript per pintar-la. Amb el
> sorteig van marxar l'script bloquejant, `?accent=RRGGBB`, `AccentProvider` i el fitxer
> `app/accent.tsx`. Els neutres van passar de paper crema a blanc pur ↔ negre pur.

Disseny defensa la idea (demostrar en viu que els tokens aguanten qualsevol accent val més
que una captura) però adverteix que sortejar **també** el gris deixa 48 combinacions i cap
constant visual. Accessibilitat no discuteix la idea sinó l'execució.

**Recomanació:** mantenir-lo, però (1) corregir la derivació primer, (2) congelar el gris a
`DEFAULT_SECONDARY`, (3) moure el sorteig a un script bloquejant al `<head>` com el
`ColorModeScript` per treure el flaix ambre inicial, i (4) afegir `?accent=RRGGBB` per tenir
enllaços deterministes i captures reproduïbles. Un accent que falla el contrast no demostra
que domines els tokens: demostra el contrari.

> Nota: `ColorPicker.tsx:4-5` encara diu que el color «es recorda». Comentari mort des que
> `accent.tsx:192-202` esborra `localStorage`.

### B. La secció Lighthouse

Estratègia demana eliminar-la (cap contractació ha depès mai d'un Lighthouse; ocupa la
posició prèvia als destacats; un 100 en una pàgina estàtica és l'esperat, no un mèrit).
Accessibilitat hi afegeix que ara mateix el 100 no és cert.

**Recomanació:** treure-la de la portada i deixar-la en una línia al peu, amb enllaç a
l'informe públic de PageSpeed. Si es conserva com a secció, arreglar el contrast abans.

### C. L'ordre de seccions i la frase de posicionament

**Recomanació:** fer-ho d'una sola tirada. El perill és quedar-se a mig camí — afegir la
frase i deixar-hi les quatre xifres — perquè llavors no es guanya res.

### D. Una tipografia de titular allotjada

`theme.ts:14` resol a New York a macOS i cau a **Georgia** a Windows: una cara amb un color i
una amplada diferents. Bona part de qui obrirà el CV ho farà des de Windows i veurà un
disseny que el Cel no ha vist mai. El propi `theme.ts:76-78` ja pedaça un problema de Georgia.

**Recomanació:** una sola cara display en `woff2`, subconjunt llatí, ~25 kB, via
`next/font/local`. El cos es queda en `system-ui`.

---

## Annex: troballes per taula

| Taula | Perfils | Troballes |
| --- | --- | ---: |
| UX i conversió | UX Researcher · Product Designer · CRO | 6 |
| Disseny i marca | UI · Brand · Design System · Motion | 6 |
| Accessibilitat | Accessibility Specialist (WCAG 2.2 AA) · QA | 7 |
| SEO i contingut | SEO · Content Strategist · Copywriter | 7 |
| Frontend i rendiment | Senior Frontend · Performance · Software Architect | 7 |
| Infraestructura | DevOps · SRE · Security Architect · RGPD | 7 |
| Qualitat | QA · Test Automation | 6 |
| Estratègia | CTO · PM · AI Architect · Growth | 6 |

Verificacions fetes durant la revisió: build real amb `NEXT_DIST_DIR=.next-analyze`
(revertit), càlcul de les 384 combinacions de contrast, `tsc --noEmit`, `playwright test`,
comprovació de resposta dels tres subdominis de producció i escombrada de secrets sobre
`git rev-list --all` dels dos repositoris.

Cap fitxer del projecte va ser modificat durant la revisió.

---

## Què queda obert

Res d'això és un defecte pendent: són coses que no es poden resoldre des del codi.

| Pendent | Per què no s'ha fet | Qui ho desbloqueja |
| --- | --- | --- |
| **Demo o vídeo dels tres projectes** | Els botons ja no són primaris i s'ha afegit «Parlem d'aquest projecte», però obrir un compte de demo en només-lectura és feina a `album.serverscel.com`, que no viu en aquest repositori. | El Cel, a l'app RBAC |
| **Tipografia de titular allotjada** | Cal un fitxer `woff2` amb llicència; no se'n pot inventar cap. Un cop triada la cara (Newsreader, Fraunces o Instrument Serif), és `next/font/local` i mitja hora. | El Cel, triant la cara |
| **Testimonis de client i logotips** | Requereix cites reals i actius gràfics. No es poden fabricar. | El Cel, demanant-los |
| **HSTS** | Ha d'anar al Nginx del host, que no és en aquest repositori. Vegeu la línia i l'avís sobre `includeSubDomains` a l'apartat 1.6. | El Cel, al servidor |

### Retirat després de la revisió

- **El selector de color del peu** (10 d'agost, decisió del Cel). Amb ell se n'ha anat el camí
  de re-tintat dels neutres (`deriveNeutrals`, `GRAY_SUGGESTIONS`, `DEFAULT_SECONDARY`) i el
  bloc `picker` del diccionari: n'era l'únic consumidor i deixar-ho hauria estat codi mort.
  La decisió A d'aquest document («mantenir el sorteig, congelar el gris») es manté: la web
  segueix sortejant l'accent a cada visita amb garantia de contrast, simplement ja no es pot
  triar a mà. `First Load JS` baixa de 210 a 206 kB.
- Efecte lateral detectat en fer-ho: `fg.subtle` en clar havia de pujar de `#6E6757` a
  `#635C4E`. El valor anterior el salvava en execució el `contrastify` del camí del gris; sense
  aquell camí, la constant estàtica ha de complir per si sola (4,08:1 sobre `bg.subtle`).

També s'ha deixat conscientment sense tocar, tot i estar recomanat:

- **«100% Autodidacta» com a quarta xifra** (`data.ts`). La taula d'UX proposava
  substituir-la per una mètrica defensable. És contingut personal, no un defecte.
- **El nom com a `<h1>` en comptes de la proposta de valor.** UX el volia degradar;
  disseny defensava que el *nameplate* és la identitat del lloc. S'ha resolt pujant el
  rol i la disponibilitat, que era el problema real, i deixant el nom on és.
- **Les apostes arriscades** de cada taula (hero interactiu, sorteig de color com a
  contingut declarat, servidor MCP públic). Són propostes de producte, no arranjaments.

