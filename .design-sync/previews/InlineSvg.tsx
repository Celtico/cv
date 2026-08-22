import { InlineSvg } from "@serverscel/ds";

// Al lloc, el marcatge el llegeix del disc un Server Component en temps de
// build (`app/svg.ts`). Aquí va escrit a mà perquè la fitxa sigui autònoma.
//
// La clau és que l'SVG NO porti els colors escrits a dins: els que han de
// canviar es demanen als tokens, i llavors la mateixa il·lustració es tenyeix
// sola a cada secció.
const esquema = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img">
  <rect x="8" y="8" width="304" height="164" rx="14"
        fill="var(--chakra-colors-ink-subtle, #141416)"
        stroke="var(--chakra-colors-ink-border, #3F3F46)"/>
  <rect x="34" y="40" width="86" height="46" rx="8" fill="var(--chakra-colors-accent-solid, #2563EB)"/>
  <rect x="200" y="40" width="86" height="46" rx="8" fill="var(--chakra-colors-accent-emphasized, #1D4ED8)"/>
  <rect x="117" y="112" width="86" height="34" rx="8" fill="none"
        stroke="var(--chakra-colors-accent-dot, #60A5FA)" stroke-width="2"/>
  <path d="M120 63h80M77 86v26h83M243 86v26h-83" fill="none"
        stroke="var(--chakra-colors-ink-fg-muted, #A1A1A1)" stroke-width="2"/>
</svg>
`;

const banc = (accent: string) => ({ "data-accent": accent, style: { padding: 24 } }) as const;

/**
 * La mateixa il·lustració dins d'una secció cian: els `accent.*` que demana
 * l'SVG els resol el `data-accent` de la secció.
 */
export function TenyidaPerLaSeccio() {
  return (
    <div {...banc("cian")}>
      <InlineSvg src="/img/esquema.svg" markup={esquema} title="Esquema de la xarxa" maxW="20rem" />
    </div>
  );
}

/** I la mateixa, en una secció fúcsia. No canvia l'SVG: canvia la secció. */
export function LaMateixaEnUnaAltraSeccio() {
  return (
    <div {...banc("fucsia")}>
      <InlineSvg src="/img/esquema.svg" markup={esquema} title="Esquema de la xarxa" maxW="20rem" />
    </div>
  );
}

/**
 * Quan la il·lustració aporta informació que no és al text del voltant,
 * `decorative={false}` la deixa visible per als lectors de pantalla amb el
 * `title` com a nom accessible.
 */
export function AmbNomAccessible() {
  return (
    <div {...banc("vermell")}>
      <InlineSvg
        src="/img/esquema.svg"
        markup={esquema}
        title="Dues seus connectades per VPN, amb el tallafocs al mig"
        decorative={false}
        maxW="20rem"
      />
    </div>
  );
}
