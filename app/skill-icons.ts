// Quina icona duu cada etiqueta de Competències.
//
// Viu separat de `Skills.tsx` i sense JSX per dues raons: perquè el component
// no s'ompli de quaranta línies de mapa, i perquè `tests/skills.test.ts` el
// pugui importar des de `node --test` i comprovar que no queda cap etiqueta
// sense icona. Sense aquesta xarxa, canviar una cadena a `data.ts` deixaria
// l'etiqueta muda i no ho diria ningú.
//
// La clau és la cadena NEUTRA de `data.ts`, no la traduïda: el text de la
// pastilla ve del diccionari i canvia amb l'idioma, la icona no.
//
// On hi ha logotip de marca (Simple Icons) s'hi posa. On no —perquè no és cap
// marca: «SQL», «Responsive», «Servidors»—, hi va una icona representativa de
// Feather. La barreja és a posta: sense això, tot el grup de Disseny s'hauria
// quedat sense res, que no sembla una tria sinó una peça que falta.

export const SKILL_ICONS = {
  // Llenguatges
  TypeScript: "typescript",
  JavaScript: "javascript",
  PHP: "php",
  SQL: "database",
  HTML: "html",
  CSS: "layers",
  Bash: "bash",
  // Front-end
  "React 19": "react",
  "Next.js": "nextjs",
  "Chakra UI": "chakra",
  "Radix UI": "radix",
  Vite: "vite",
  Recharts: "chart",
  Responsive: "smartphone",
  // Back-end
  NestJS: "nestjs",
  "Node.js": "node",
  TypeORM: "typeorm",
  "Socket.IO": "socketio",
  Swagger: "swagger",
  "API REST": "api",
  WebRTC: "webrtc",
  SSE: "stream",
  // IA i dades
  LangChain: "langchain",
  "OpenAI GPT-4o": "chat",
  "Redes neuronales (ML)": "neural",
  "Integración Odoo (ERP)": "odoo",
  // Infra / DevOps
  Docker: "docker",
  Nginx: "nginx",
  JWT: "jwt",
  "MySQL / SQLite": "mysql",
  Servidores: "server",
  "SSL / dominios": "lock",
  "CI/CD": "cicd",
  // Disseny
  "UX/UI": "layout",
  "Identidad visual": "identity",
  Photoshop: "image",
  Illustrator: "pen",
  InDesign: "book",
  Print: "printer",
  // Flux de treball
  "Desarrollo asistido por IA (Claude Code)": "claude",
  PhpStorm: "phpstorm",
  Git: "git",
  "Code review": "review",
} as const satisfies Record<string, string>;

export type SkillIconId = (typeof SKILL_ICONS)[keyof typeof SKILL_ICONS];

/** La icona d'una etiqueta, o `null` si encara no en té cap. */
export const skillIcon = (item: string): SkillIconId | null =>
  (SKILL_ICONS as Record<string, SkillIconId>)[item] ?? null;
