---
category: Moviment
---

# Reveal

Aparició suau quan l'element entra a la pantalla. Embolcalla qualsevol contingut.

## És una millora progressiva, i això importa

El marcatge **surt visible del servidor**. Només s'amaga, abans de pintar, allò que encara
queda fora de pantalla; el que ja es veu en carregar no s'anima mai, perquè animar el que ja
és a la vista només afegeix un parpelleig.

No hi posis un `initial={{ opacity: 0 }}` de framer-motion: serialitza l'opacitat zero a
l'HTML servit i la pàgina es queda en blanc fins que s'ha hidratat tot el JavaScript (i sense
JavaScript, per sempre).

Respecta `prefers-reduced-motion: reduce`: amb el moviment reduït, no fa res.

## Exemple

```jsx
<Reveal>
  <Box bg="accent.surface" borderRadius="plate" p={8}>
    <Heading textStyle="cardTitle">Servidors dedicats</Heading>
  </Box>
</Reveal>
```
