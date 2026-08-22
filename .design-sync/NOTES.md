# Notes de design-sync — @serverscel/ds

## Què és aquest paquet i per què existeix

Aquest repo és una **aplicació Next.js**, no una llibreria de components. Les seccions
d'`app/components/` (Hero, Clients, Experience, Featured…) llegeixen elles mateixes
d'`app/data.ts` i del context d'i18n, i importen `next/link`, `next/image` i
`next/navigation`: no són reutilitzables i **no se sincronitzen a posta**.

El que se sincronitza són les cinc primitives que sí que tenen API — `Section`, `Kicker`,
`RichText`, `Reveal`, `InlineSvg` — més el tema. `ds/` és **només l'embolcall d'empaquetatge**:

- `ds/index.ts` — reexportacions d'`app/`. L'original viu a `app/`; si toques una primitiva,
  es toca allà.
- `ds/provider.tsx` — `DsProvider`, el mateix `<ChakraProvider theme={theme}>` que
  `app/providers.tsx` sense el `MotionConfig`. És el `cfg.provider` de les fitxes.
- `ds/gen-css.mjs` — crida `accentStylesheet()` d'`app/color.ts` i n'escriu
  `ds/dist/accent.css`, que és el `cfg.cssEntry`. **Sense això les seccions surten sense
  color**: els `accent.*` arriben per CSS, no pel tema.
- `ds/docs/*.md` — un doc per primitiva; el `category:` del frontmatter és el grup de la fitxa.

Build: `cd ds && npx tsc -p tsconfig.json && node gen-css.mjs` (és el `cfg.buildCmd`).
`ds/dist/` està al `.gitignore`.

## Coses que costaria de tornar a descobrir

- **Chakra és la v2, no la v3.** La skill `chakra-ui-builder` d'aquest entorn documenta la v3,
  que té una altra API. `accentStylesheet()` depèn dels noms literals de `--chakra-colors-*`
  que genera la v2.
- **Els previews no poden importar `@chakra-ui/react`.** Es bundlaria una segona còpia de
  Chakra i d'Emotion, amb un context de `ChakraProvider` diferent del del bundle, i els tokens
  no resoldrien. Els previews fan la maquetació amb `<div>` i `var(--chakra-colors-…)`, que a
  més ensenya el vocabulari de tokens. Les primitives sí que s'importen de `@serverscel/ds`.
- **Fora de `Section` cal posar `data-accent` a mà.** Els previews de `Kicker`, `Reveal` i
  `InlineSvg` embolcallen el contingut amb `<div data-accent="…">`; sense això `accent.deep` i
  companyia no existeixen i la pastilla surt transparent.
- **`==ressaltat==` no s'ha de fer servir dins d'una `Section` amb `inverted`.** El degradat de
  `.accent-text` està contrastat contra les quatre superfícies del mode (`bg`, `bg.subtle`,
  `bg.panel`, `gray.contrast`) i `bg.inverted` no n'és cap. Avui cap component del lloc passa
  `inverted`, així que no afecta res publicat.
- **Res de dades del CV als previews.** El Cel ho va demanar explícitament el 2026-08-22: el
  contingut de mostra ha de ser neutre, sense biografia, dates ni xifres del currículum.
  La regla d'or del repo («no inventis dades») també val aquí.
- `cfg.dtsPropsFor.InlineSvg` està escrit a mà: `InlineSvg` escampa `BoxProps` i l'extractor
  n'esbombava els ~90 pseudo-selectors de Chakra (`_hover`, `_groupFocusVisible`…), que feien
  el `.d.ts` inservible per a l'agent.
- `cfg.overrides.Section.cardMode = "column"`: una `Section` és una banda d'amplada sencera i
  no cap en una cel·la de graella multicolumna.

## Known render warns

- `[RENDER_THIN] components/media/InlineSvg/InlineSvg.html` — **benigne**. La fitxa és una
  il·lustració: no té text per definició. Les tres cel·les pinten bé (cian, fúcsia i vermell
  segons la secció); comprovat a `_screenshots/review/media__InlineSvg.png`.

## Re-sync risks

- **`ds/index.ts` no es manté sol.** Si algú afegeix una primitiva reutilitzable a
  `app/components/`, no apareixerà aquí fins que no s'hi afegeixi la reexportació. I si canvia
  el nom o la ruta d'una de les cinc, el `tsc` de `ds/` peta — que és el que volem.
- **`accent.css` es regenera del codi.** Qualsevol canvi a `SECTION_ACCENTS` o a `deriveAccent`
  canvia el CSS publicat. Torna a executar el `buildCmd` sencer, no només el `tsc`.
- **El tema es duplica a dos llocs dins del repo**: `NEUTRAL_DEFAULTS` a `app/color.ts` i els
  `semanticTokens` d'`app/theme.ts`. Si divergeixen, el CSS d'accents i el que pinta Chakra
  deixen de quadrar, i aquí es veuria com a targetes amb el contrast trencat.
- Els previews estan escrits contra l'API d'avui (`tone`, `kickerTone`, `inverted`,
  `decorative`). Si una prop canvia de nom, el preview compila igual però la fitxa deixa de
  demostrar el que diu — cal tornar a mirar les captures, no només el `validate`.
- El mode de les fitxes és el **clar**: `initialColorMode` és `"system"` i el chromium sense
  cap va en clar. El mode fosc no s'ha verificat mai per aquesta via; els tests unitaris del
  repo (`npm test`) sí que el cobreixen.
