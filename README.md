# CV — Celestí Ticó Petit

Fonts del currículum i, a `web/`, el lloc web (Next.js) que el publica.

## Fitxers

| Fitxer | Què és |
| --- | --- |
| `cv-dades-celesti-tico.md` | **Font de la veritat.** Totes les dades: contacte, experiència, competències, projectes, clients, idiomes i formació. |
| `cv-celesti-tico.html` | CV final. Una sola pàgina, autònoma: CSS inline, cap dependència externa, tema clar/fosc i estils d'impressió. |
| `cv-celesti-tico.pdf` | Export del CV a A4, tres pàgines. |
| `web/` | Lloc web del CV (Next.js). Té el seu propi `README.md`. |
| `img/` | Captures dels projectes de client. |
| `.claude/skills/cv/` | Instruccions per mantenir i regenerar el CV. |

## Regla d'or

El `.md` mana. Qualsevol canvi de contingut s'edita **primer** a
`cv-dades-celesti-tico.md` i **després** es propaga a l'HTML.

## Regenerar el PDF

```bash
# des del navegador: imprimir a A4, o bé
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=cv-celesti-tico.pdf \
  "file://$PWD/cv-celesti-tico.html"

# i sincronitzar-lo amb el web, que el serveix per descàrrega
cp cv-celesti-tico.pdf web/public/cv-celesti-tico.pdf
```

## Tipografia

CV i web comparteixen piles del sistema; no es descarrega cap font.

- Titulars: `ui-serif, "New York", Georgia, "Times New Roman", serif`
- Cos: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- Mono: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace`

## Fora del repositori

L'informe de **vida laboral** de la Seguretat Social (`vida_laboral`,
`vida_laboral.pdf`) està al `.gitignore`: és un document oficial amb dades
personals i es queda només al disc.
