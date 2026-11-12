# Com es construeix amb aquest sistema

Cinc primitives extretes del lloc **serverscel.com** (Chakra UI **v2** + Emotion). No hi ha
llibreria de botons ni de formularis: per a això fes servir els components de Chakra, que ja
són al mateix arbre i llegeixen aquest mateix tema.

## 1. Embolcalla-ho tot amb `DsProvider`

```jsx
import { DsProvider, Section } from "@serverscel/ds";

<DsProvider>
  <Section id="serveis" kicker="Què fem" title="Un titular" accent="cian">…</Section>
</DsProvider>
```

Sense `DsProvider` no hi ha tema: cap `textStyle`, cap `layerStyle` i cap variable
`--chakra-colors-*`. El text surt amb la tipografia per defecte del navegador i les targetes,
sense color. **I cal el `styles.css`**, que és qui porta les regles `[data-accent="…"]`: el
tema sol no dona el color de secció.

## 2. Es dona estil amb props de Chakra, no amb classes

No hi ha vocabulari de classes d'utilitat. El color, l'espaiat i la mida s'escriuen com a
props, amb el **nom del token** com a valor:

```jsx
<Box bg="accent.surface" color="fg.muted" borderRadius="plate" p={6} />
<Heading textStyle="cardTitle" />
<Box layerStyle="plate" />
```

**Colors** (semàntics, s'adapten sols al mode clar/fosc):
`bg` · `bg.subtle` · `bg.panel` · `bg.muted` · `bg.inverted` · `bg.nav` ·
`fg` · `fg.muted` · `fg.subtle` · `fg.inverted` · `fg.inverted.muted` ·
`border` · `border.emphasized` · `border.inverted` · `gray.emphasized` · `gray.contrast` ·
`ink.bg` · `ink.subtle` · `ink.border` · `ink.border.subtle` · `ink.fg` · `ink.fg.muted`.

**Colors d'accent** — canvien sols segons la secció on siguis:
`accent.fg` (text) · `accent.solid` (fons de botó) · `accent.emphasized` (el seu hover) ·
`accent.contrast` (text a sobre del sòlid) · `accent.dot` (marca decorativa i anell de focus) ·
`accent.muted` · `accent.inverted` (sobre bloc invertit) · `accent.deep` + `accent.deep.fg`
(pastilla d'etiqueta) · `accent.panel` → `accent.surface` → `accent.chip` (les tres
superfícies plenes, de fons de secció a pastilla).

**`textStyle`**: `display` · `sectionTitle` · `cardTitle` · `kicker` · `micro`.
No escriguis `fontSize` a mà per a un titular: n'hi ha cinc papers i prou.

**`layerStyle`**: `plate` (targeta de fons igual que la secció i filet prim) ·
`plateTinted` (degradat en diagonal del fons net a `accent.surface`) · `chip` (pastilla).
Els extrems dels dos degradats són superfícies verificades, i per això s'hi pot posar text a
sobre sense recalcular res.

**`borderRadius`**: `plate` (14 px) per a targetes i imatges, `control` (999 px) per a botons,
etiquetes i commutadors. No escriguis mai un radi en píxels.

**`fontSize`**: `xs` 14 · `sm` 16 · `md` 18 (el del cos) · `lg` 21 · `xl` 24 · `2xl` 30.

## 3. Les regles de composició que no es veuen a l'API

- **Una `Section` per banda**, i el color va **per banda**, no per element: `accent="cian"`
  i tots els fills de dins ja resolen `accent.*` al cian. La sèrie, en ordre: `blau` (també
  el to per defecte fora de secció) · `violeta` · `verd` · `verdblau` · `cian` · `vermell` ·
  `rosa` · `fucsia`. Recorre-la per ordre i torna a començar quan s'acabi.
- **El fons de la banda arriba en bombolles**, dos degradats radials d'`accent.panel` que
  `Section` pinta sola i que alternen de costat. La separació entre bandes la fa el
  farciment, mai un filet.
- **`==ressaltat==` és per a una frase**, dins d'un paràgraf `fg.muted`. Un paràgraf sencer
  ressaltat no ressalta res. I no el facis servir dins d'una `Section` amb `inverted`.
- **Cap font descarregada**: pila de sistema (`system-ui`) a titulars i a cos.

## 4. On és la veritat

`styles.css` i el que importa (`_ds_bundle.css`, amb les regles `[data-accent]` i els
degradats) — llegeix-lo abans de tocar color. Per component, `components/<grup>/<Nom>/`, amb
el seu `.d.ts` (les props) i el seu `.prompt.md` (com es fa servir).
