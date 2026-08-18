// La sintaxi del text ric del diccionari, en un sol lloc.
//
// `content.ts` admet **negreta** i ==ressaltat==. Qui ho pinta és
// `components/RichText.tsx`; qui ho ha de treure és tot el que se'n va a
// metadades (meta description, OpenGraph, JSON-LD), on el marcatge sortiria
// literal als cercadors. Les dues coses han de conèixer la mateixa sintaxi:
// per això viu aquí i no repetida a cada banda.

/** Talla el text en trossos, deixant els marcadors dins del tros que marquen. */
export const MARKUP_SPLIT = /(\*\*[^*]+\*\*|==[^=]+==)/g;

/** Treu el marcatge i deixa el text pla. Per a metadades i per a `alt`. */
export function stripMarkup(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/==([^=]+)==/g, "$1");
}
