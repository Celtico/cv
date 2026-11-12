---
category: Media
---

# InlineSvg

Incrusta un SVG **dins del DOM** en comptes de carregar-lo amb `<img>`. És l'única manera que
la il·lustració resolgui les variables CSS dels tokens (`--chakra-colors-accent-*`) i es
tenyeixi amb el color de la secció on viu.

## Props

- `src` — URL de l'SVG. Només és la reserva: el camí normal és passar-li `markup`.
- `markup` — l'SVG ja llegit. Al lloc el llegeix un Server Component en temps de build
  (`app/svg.ts`) i baixa per prop, de manera que la il·lustració ja és a l'HTML servit.
- `title` — text alternatiu. Obligatori.
- `decorative` — per defecte `true`: l'SVG queda amagat als lectors de pantalla. Posa'l a
  `false` quan la il·lustració aporti informació que no hi hagi al text del voltant.
- La resta de props són de `Box`: mides, marges, `color`, el que calgui.

Perquè es tenyeixi, l'SVG ha de pintar amb `currentColor` o amb `fill="none"` i `stroke`
heretat — un SVG amb els colors escrits a dins no canviarà.

## Exemple

```jsx
<InlineSvg
  markup={svg}
  title="Esquema de la xarxa"
  color="accent.fg"
  maxW="28rem"
  mx="auto"
/>
```
