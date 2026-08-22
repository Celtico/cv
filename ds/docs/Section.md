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

## `tone`: la banda, no el filet

La separació entre seccions la fa el farciment, no una línia.

- `tone="wash"` — degradat vertical simètric: fons net a dalt, `accent.panel` al mig i fons
  net a baix. El color és el cos de la banda, no una vora. La secció sencera es llegeix com
  una parada.
- `tone="flat"` — negra (o blanca) del tot; el color hi entra només per l'etiqueta i pels
  accents del text.

**Van saltejades**: banda de color, banda neta, banda de color. Si n'hi afegeixes una, mira
quina la precedeix i alterna.

## Superfícies disponibles a dins

Tres capes, totes verificades a 4,5:1 contra el text neutre:
`accent.panel` (fons de secció) → `accent.surface` (targetes) → `accent.chip` (pastilles).
`panel` i `surface` aguanten `fg.muted`; la `chip` només `fg`.

Dos estils de targeta, i **no són intercanviables**: `layerStyle="plate"` (fons massís i
filet prim) damunt d'una banda `flat`; degradat en diagonal del fons net al color damunt
d'una banda `wash`.

## Exemple

```jsx
<Section
  id="serveis"
  kicker="Què faig"
  title="Infraestructura que no cau"
  subtitle="Vint-i-cinc anys posant **servidors** en producció."
  accent="skills"
  tone="wash"
>
  <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
    <Box bg="accent.surface" borderRadius="plate" p={6}>
      <Heading textStyle="cardTitle">Xarxa</Heading>
      <Text color="fg.muted">Encaminament, VLAN, tallafocs.</Text>
    </Box>
  </SimpleGrid>
</Section>
```
