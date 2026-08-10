export const profile = {
  name: "Celestí Ticó Petit",
  nick: "Cel",
  role: "Desarrollador de aplicaciones web",
  subrole: "Front-end & Back-end · Diseño UX/UI",
  tagline:
    "20+ años construyendo producto digital de principio a fin: del briefing y el diseño al código, la infraestructura y el SEO. Autodidacta, polivalente y orientado a resolver.",
  location: "Balaguer (Lleida) · España",
  phone: "+34 626 654 270",
  email: "celticopetit@gmail.com",
  portfolio: "https://serverscel.com",
  company: "https://cenics.net",
  linkedin: "https://www.linkedin.com/in/celesti-tico-petit/",
};

export const stats = [
  { value: "422", label: "Proyectos entregados" },
  { value: "200+", label: "Clientes" },
  { value: "20+", label: "Años de experiencia" },
  { value: "100%", label: "Autodidacta" },
];

export const about = [
  "Desarrollador full-stack y diseñador con más de dos décadas entregando webs, e-commerce y aplicaciones a medida. He acompañado el ciclo completo de cientos de proyectos: briefing, wireframes, diseño, maquetación, programación, infraestructura y publicación.",
  "Perfil polivalente y autodidacta: aprendo a partir de proyectos reales y de la comunidad de software libre. Combino un back-end sólido (NestJS, Node, APIs REST) con front-ends modernos (React 19, Next.js, Chakra UI) e integración de IA y ERP.",
];

export const skills = [
  {
    group: "Lenguajes",
    items: ["TypeScript", "JavaScript", "PHP", "SQL", "HTML", "CSS", "Bash"],
  },
  {
    group: "Front-end",
    items: ["React 19", "Next.js", "Chakra UI", "Radix UI", "Vite", "Recharts", "Responsive"],
  },
  {
    group: "Back-end",
    items: ["NestJS", "Node.js", "TypeORM", "Socket.IO", "Swagger", "API REST", "WebRTC", "SSE"],
  },
  {
    group: "IA & Datos",
    items: ["LangChain", "OpenAI GPT-4o", "Redes neuronales (ML)", "Integración Odoo (ERP)"],
  },
  {
    group: "Infra / DevOps",
    items: ["Docker", "Nginx", "JWT", "MySQL / SQLite", "Servidores", "SSL / dominios", "CI/CD"],
  },
  {
    group: "Diseño",
    items: ["UX/UI", "Identidad visual", "Photoshop", "Illustrator", "InDesign", "Print"],
  },
  {
    group: "Flujo de trabajo",
    items: ["Desarrollo asistido por IA (Claude Code)", "PhpStorm", "Git", "Code review", "Docker"],
  },
];

export type Featured = {
  title: string;
  subtitle: string;
  desc: string;
  stack: string[];
  img: string;
  url: string;
  accent: string;
  badge?: string;
};

export const featured: Featured[] = [
  {
    title: "RBAC Platform",
    subtitle: "Plataforma de administración empresarial",
    desc: "«Todo el control, en un solo lugar». Gestión de usuarios, roles y permisos granulares (RBAC), IA conversacional con LangChain y galería multimedia, todo integrado con Odoo ERP.",
    stack: ["React 19", "Chakra UI v3", "NestJS", "LangChain", "GPT-4o", "Odoo 17", "Docker"],
    img: "/img/anim-rbac.svg",
    url: "https://album.serverscel.com",
    accent: "blue.400",
    badge: "Odoo ERP",
  },
  {
    title: "FABRIK · Taller CNC",
    subtitle: "Trazabilidad de piezas para fabricación de mobiliario",
    desc: "«Identifica y sigue cada pieza después del nesting». Importa el CSV de nesting y el STEP de TopSolid en un visor único: cada pieza con su referencia, medida y posición en el tablero, ligada a su sólido 3D.",
    stack: ["React", "Visor 3D", "TypeScript", "STEP / CSV", "QR", "TopSolid"],
    img: "/img/anim-fabrik.svg",
    url: "https://fabrik.serverscel.com",
    accent: "orange.400",
  },
  {
    title: "VehicleOS",
    subtitle: "El cuadro digital que tu coche no traía de fábrica",
    desc: "«Lee. Entiende. Protege.» Convierte el puerto OBD-II de un coche de hace veinte años en un cuadro digital con diagnóstico explicado, asistente que interpreta la telemetría real y panel web de flota. PWA instalable: funciona en la pantalla del salpicadero, tableta o móvil.",
    stack: ["Next.js PWA", "NestJS", "PostgreSQL", "WebSocket", "Kotlin", "OBD-II · ELM327", "JWT"],
    img: "/img/anim-vehicleos.svg",
    url: "https://vehicleos.serverscel.com",
    accent: "blue.400",
    badge: "OBD-II",
  },
];

export type Project = {
  title: string;
  subtitle: string;
  desc: string;
  stack: string[];
  img: string;
  url?: string;
};

export const projects: Project[] = [
  {
    title: "Neural Network System",
    subtitle: "Detección de actividad humana con ML",
    desc: "Reconocimiento de actividades humanas a partir de los sensores del móvil mediante una red neuronal entrenada. Experimentación con machine learning aplicado a datos de movimiento en tiempo real.",
    stack: ["Machine Learning", "Redes neuronales", "JavaScript", "Sensores"],
    img: "/img/cover-neural.svg",
  },
  {
    title: "Laboratorio de experimentos",
    subtitle: "Runtime propio «instant» + I+D",
    desc: "Experimentos técnicos construidos sobre un runtime propio: WebRTC (comunicación en tiempo real), PHP-Wasm (PHP en WebAssembly), RTL-SDR (radio por software), Live Editor y Web Manager con Next.js.",
    stack: ["Runtime propio", "Next.js", "WebAssembly", "WebRTC", "RTL-SDR"],
    img: "/img/cover-lab.svg",
  },
];

export const experience = [
  {
    company: "Vunkers IT Experts, S.L.",
    role: "Desarrollador web · Sustitución del director de programación por baja de paternidad",
    period: "nov 2025 – jul 2026",
  },
  {
    company: "Iridium Network Digital Technologies, SL",
    role: "Desarrollador web · Tests E2E de todo el panel de control de cdmon",
    period: "nov 2023 – jul 2024",
  },
  {
    company: "Noves Tecnologies de Venta, S.L.",
    role: "Desarrollador web · Clúster MariaDB Galera + HAProxy con monitorización Prometheus y Grafana",
    period: "abr 2023 – may 2023",
  },
  {
    company: "Cenics — Balaguer (autónomo)",
    role: "Desarrollador de apps y web · 422 proyectos, 200+ clientes",
    period: "2000 – 2023",
  },
];

export const gallery = [
  { img: "/img/23-rodibook.png.webp", label: "Rodi" },
  { img: "/img/17-pamies.png.webp", label: "Pàmies Hortícoles" },
  { img: "/img/20-mecamaq.png.webp", label: "Mecamaq" },
  { img: "/img/21-gls.png.webp", label: "GLS Prefabricados" },
  { img: "/img/24-inglet.png.webp", label: "Inglet" },
  { img: "/img/25-nuseu.png.webp", label: "Nuseu" },
  { img: "/img/12-brightexportimport.png.webp", label: "Bright Export Import" },
  { img: "/img/22-lluc.png.webp", label: "Lluc Queralt" },
  { img: "/img/13-index.png.webp", label: "Proyecto web" },
  { img: "/img/10-index.png.webp", label: "Proyecto web" },
  { img: "/img/11-index.png.webp", label: "Proyecto web" },
  { img: "/img/14-index.png.webp", label: "Proyecto web" },
];

export type ClientHours = {
  name: string;
  hours: number;
  projects: number;
  period: string;
};

// Horas reales imputadas a proyectos en el gestor Cenics (lectura del 2026-07-18).
export const clientHours: ClientHours[] = [
  { name: "Grupo Rodi", hours: 4749.25, projects: 109, period: "2013 – 2016" },
  { name: "GLS Prefabricados", hours: 652, projects: 25, period: "2011 – 2017" },
  { name: "Pàmies Hortícoles", hours: 368.25, projects: 10, period: "2011 – 2020" },
  { name: "Nex (neumáticos)", hours: 364.5, projects: 13, period: "2015 – 2021" },
  { name: "Mecamaq", hours: 363.75, projects: 2, period: "2012 – 2021" },
  { name: "Inglet", hours: 266.25, projects: 16, period: "2011 – 2018" },
  { name: "Grupo Oses", hours: 210.25, projects: 2, period: "2012" },
  { name: "Natural Optics", hours: 57.88, projects: 13, period: "2011 – 2016" },
  { name: "Eliseu Ticó Petit", hours: 54, projects: 1, period: "2012 – 2021" },
  { name: "Ajuntament de Lleida", hours: 26.75, projects: 2, period: "2015" },
  { name: "Estudi Alfred Garcia Gotós", hours: 23.75, projects: 2, period: "2012 – 2016" },
];

export const clientHoursSummary = {
  totalHours: "7.136,63",
  totalProjects: "195",
  note: "Horas imputadas a proyectos en el gestor. Muchos encargos institucionales se facturaron sin imputar horas, por lo que la dedicación real es mayor.",
};

export const clients = {
  "Sector público e institucional": [
    "Ajuntament de Balaguer",
    "Ajuntament de Lleida",
    "Diputació de Lleida",
    "Universitat de Lleida",
    "Generalitat (Cultura)",
    "IRB Lleida",
    "Institut d'Estudis Ilerdencs",
    "COAC Lleida",
  ],
  "Empresas y cadenas": [
    "Rodi",
    "Europastry",
    "Rotecna",
    "Grupo Oses",
    "Hesperia Internacional",
    "Villart Logistic",
    "Natural Optics",
    "AMC Ibérica",
    "Mecamaq",
    "GLS Prefabricados",
    "Inglet",
    "Gespasa",
  ],
  "Cultura, salud y tercer sector": [
    "Fundació Mies van der Rohe",
    "Fundació Renal Jaume Arnó",
    "Monestir de les Avellanes",
    "Assoc. Antisida de Lleida",
    "Aspid",
  ],
};

export const languages = [
  { name: "Català", level: "Nativo" },
  { name: "Castellano", level: "Nativo" },
  { name: "English", level: "Nivel alto" },
];
