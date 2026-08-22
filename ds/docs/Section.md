---
category: Estructura
---

# Section

La banda de pàgina. Tot el contingut de la portada va dins d'una `Section`: ella posa
l'espaiat entre bandes, l'amplada màxima (`72rem`), l'ancoratge per a la barra sticky i,
sobretot, **el color de la secció**.

## Com hi arriba el color

`Section` només escriu `data-accent="<accent>"` a l'element. Les variables
`--chakra-colors-accent-*` les publica el full d'estil (`styles.css`), que porta una regla
`[data-accent="…"]` per accent i per mode. S'hereten a tot el subarbre: qualsevol fill pot
escriure `bg="accent.surface"` o `color="accent.fg"` i li tocarà el color de la seva secció.

Els vuit accents: `base` (blau, el per defecte fora de secció), `featured` (violeta),
`about` (verd), `clients` (verd blau), `skills` (cian), `experience` (vermell),
`gallery` (rosa), `projects` (fúcsia).

## El color arriba en bombolles

Cada secció duu dos degradats radials d'`accent.panel` que es fonen a transparent: un al
cantó de dalt i un altre al de baix, al costat contrari. No hi ha cap franja ni cap filet
entre bandes — la separació la fa el farciment.

El costat de la bombolla l'escull sola, per la posició de l'accent a `SECTION_ACCENTS`, de
manera que dues bandes seguides no queden enquadrades igual. No cal fer-hi res.

La bombolla és `accent.panel` i no res més saturat: així qualsevol punt de la banda queda
entre `bg` i `accent.panel`, que són superfícies verificades a 4,5:1 contra el text neutre.
El text hi és llegible per damunt de la bombolla i fora.

## Superfícies disponibles a dins

Tres capes, totes verificades a 4,5:1 contra el text neutre:
`accent.panel` (fons de secció) → `accent.surface` (targetes) → `accent.chip` (pastilles).
`panel` i `surface` aguanten `fg.muted`; la `chip` només `fg`.

Dos estils de targeta: `layerStyle="plate"` (fons igual que la secció i filet prim) i
`layerStyle="plateTinted"` (degradat en diagonal del fons net a `accent.surface`). Els dos
extrems del degradat són superfícies verificades, i per això s'hi pot posar text a sobre
sense recalcular res.

## Exemple

```jsx
<Section
  id="serveis"
  kicker="Què faig"
  title="Infraestructura que no cau"
  subtitle="Vint-i-cinc anys posant **servidors** en producció."
  accent="skills"
>
  <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
    <Box bg="accent.surface" borderRadius="plate" p={6}>
      <Heading textStyle="cardTitle">Xarxa</Heading>
      <Text color="fg.muted">Encaminament, VLAN, tallafocs.</Text>
    </Box>
  </SimpleGrid>
</Section>
```
