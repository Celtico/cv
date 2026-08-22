---
category: Estructura
---

# Kicker

L'etiqueta de secció: una pastilla massissa i la regla que l'acompanya fins al marge. Va
just abans del titular. `Section` ja en posa una quan li dones `kicker`; el component es fa
servir a part quan una secció no passa per `Section` (al lloc, la de contacte).

## Els dos tons

- `tone="accent"` — pastilla d'`accent.deep` amb text blanc. `accent.deep` és el color de la
  secció enfosquit **just el que cal** perquè el blanc hi arribi a 4,5:1: sense ell, quatre
  dels vuit accents demanaven text fosc i desentonaven.
- `tone="neutral"` — pastilla grisa (`gray.emphasized`) amb el text normal.

Van repartides a posta: vuit pastilles de color seguides cansen.

`rule` és el color de la regla horitzontal; per defecte `border.emphasized`, i sobre fons
invertit li has de passar `whiteAlpha.300`.

## Exemple

```jsx
<Kicker tone="accent">Projectes propis</Kicker>
<Heading as="h2" textStyle="sectionTitle">Tres aplicacions vives</Heading>
```
