// Genera el full d'estil dels accents a partir de la font de la veritat
// (`app/color.ts`), tal com fa `layout.tsx` en prerenderitzar. És el fitxer que
// `cfg.cssEntry` publica: sense ell les seccions surten sense color.
import { writeFileSync } from "node:fs";
import { accentStylesheet } from "./dist/app/color.js";

writeFileSync(new URL("./dist/accent.css", import.meta.url), accentStylesheet() + "\n");
console.log("dist/accent.css escrit");
