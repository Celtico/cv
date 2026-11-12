---
category: Text
---

# RichText

Pinta una cadena de text admetent dos marcadors, perquè el marcatge pugui viure al text
traduïble i no al JSX:

- `**negreta**` → pes 600, color heretat.
- `==ressaltat==` → la frase pintada amb el degradat que recorre la paleta **per dins de les
  lletres** (`background-clip: text`).

Rep el text com a **fill de tipus string**, no com a prop.

## El ressaltat és per a una frase, no per a un paràgraf

El que el fa funcionar és el contrast amb el text apagat del voltant: una frase clau dins
d'un paràgraf `fg.muted`. Un paràgraf sencer ressaltat no ressalta res.

El color sòlid de reserva ja compleix AA, i sota `forced-colors: active` el degradat es
retira — el text no desapareix mai.

## Compte amb les metadades

Si el mateix text alimenta una `<meta description>` o l'OpenGraph, passa'l abans per
`stripMarkup()`, o els `**` i els `==` surten literals als cercadors.

## Exemple

```jsx
<Text color="fg.muted" fontSize="lg" lineHeight="1.7">
  <RichText>
    Munto i mantinc infraestructura des del 2000. ==Vint-i-cinc anys sense una caiguda
    llarga==, i **200 clients** que hi segueixen.
  </RichText>
</Text>
```
