// Diccionari de continguts — CA / ES / EN.
// Les dades "neutres" (xifres, noms propis, stack, dates, imatges) viuen a data.ts.

export type Lang = "ca" | "es" | "en";
export const LANGS: Lang[] = ["ca", "es", "en"];
export const DEFAULT_LANG: Lang = "ca";

type Dict = {
  nav: Record<string, string>;
  hero: {
    expedient: string;
    location: string;
    registre: string;
    disponible: string;
    role: string;
    tagline: string;
    contactar: string;
    veure: string;
  };
  statLabels: string[];
  about: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    idiomes: string;
    languages: { name: string; level: string }[];
  };
  skills: { kicker: string; title: string; subtitle: string; groups: string[] };
  lighthouse: { kicker: string; title: string; subtitle: string; labels: string[] };
  featured: {
    kicker: string;
    title: string;
    subtitle: string;
    plate: string;
    visitar: string;
    items: { subtitle: string; desc: string; highlights: string[] }[];
  };
  projects: {
    kicker: string;
    title: string;
    subtitle: string;
    items: { subtitle: string; desc: string }[];
  };
  gallery: { kicker: string; title: string; subtitle: string; web: string };
  experience: { kicker: string; title: string; roles: string[] };
  ledger: {
    kicker: string;
    title: string;
    subtitle: string;
    colClient: string;
    colProj: string;
    colPeriod: string;
    colHours: string;
    total: string;
    note: string;
  };
  clients: { kicker: string; title: string; subtitle: string; groups: string[] };
  contact: {
    kicker: string;
    t1: string;
    ti: string;
    t2: string;
    subtitle: string;
  };
};

export const content: Record<Lang, Dict> = {
  ca: {
    nav: {
      perfil: "Perfil",
      eines: "Eines",
      qualitat: "Qualitat",
      destacats: "Destacats",
      projectes: "Projectes",
      trajectoria: "Trajectòria",
      registre: "Registre",
      contacte: "Contacte",
    },
    hero: {
      expedient: "Expedient 001",
      location: "Balaguer · Lleida",
      registre: "Registre 2000 — 2026",
      disponible: "Disponible",
      role: "Dissenyador · Desenvolupador full-stack",
      tagline:
        "20+ anys construint producte digital de principi a fi: del briefing i el disseny al codi, la infraestructura i el SEO. Autodidacta, polivalent i orientat a resoldre.",
      contactar: "Contactar",
      veure: "Veure projectes",
    },
    statLabels: ["Projectes entregats", "Clients", "Anys d'experiència", "Autodidacta"],
    about: {
      kicker: "Perfil — expedient",
      title: "De l'ofici a la infraestructura",
      p1: "Desenvolupador full-stack i dissenyador amb més de dues dècades entregant webs, e-commerce i aplicacions a mida. He acompanyat el cicle complet de centenars de projectes: briefing, wireframes, disseny, maquetació, programació, infraestructura i publicació.",
      p2: "Perfil polivalent i autodidacta: aprenc a partir de projectes reals i de la comunitat de programari lliure. Combino un back-end sòlid (NestJS, Node, APIs REST) amb front-ends moderns (React 19, Next.js, Chakra UI) i integració d'IA i ERP.",
      idiomes: "Idiomes",
      languages: [
        { name: "Català", level: "Natiu" },
        { name: "Castellà", level: "Natiu" },
        { name: "Anglès", level: "Nivell alt" },
      ],
    },
    skills: {
      kicker: "Eines — inventari",
      title: "Amb què treballo",
      subtitle: "Tecnologies i disciplines evidenciades per projectes reals, agrupades per domini.",
      groups: ["Llenguatges", "Front-end", "Back-end", "IA i dades", "Infra / DevOps", "Disseny"],
    },
    lighthouse: {
      kicker: "Qualitat — auditoria",
      title: "100 · 100 · 100 · 100",
      subtitle:
        "Auditoria de Google Lighthouse sobre aquesta mateixa web en producció (serverscel.com): rendiment, accessibilitat, bones pràctiques i SEO, tot al màxim.",
      labels: ["Rendiment", "Accessibilitat", "Bones pràctiques", "SEO"],
    },
    featured: {
      kicker: "Destacats — en producció",
      title: "Dues aplicacions vives",
      subtitle:
        "Producte complet que pots visitar ara mateix: front-end, back-end, IA i integració d'ERP.",
      plate: "Plate",
      visitar: "Visitar",
      items: [
        {
          subtitle: "Plataforma d'administració empresarial",
          desc: "«Tot el control, en un sol lloc». Gestió d'usuaris, rols i permisos granulars (RBAC), IA conversacional amb LangChain i galeria multimèdia, tot integrat amb Odoo ERP.",
          highlights: [
            "Integració Odoo: KPIs en viu de vendes, clients, productes, factures pendents, oportunitats CRM i empleats",
            "IA conversacional (LangChain + GPT-4o) que respon sobre el negoci i crea factures a Odoo xatejant",
            "Control d'accés RBAC: cada usuari veu exactament el que li pertoca",
            "Dashboards i logs en temps real (SSE · Socket.IO), seguretat JWT",
          ],
        },
        {
          subtitle: "Traçabilitat de peces per a fabricació de mobiliari",
          desc: "«Identifica i segueix cada peça després del nesting». Importa el CSV de nesting i el STEP de TopSolid en un visor únic: cada peça amb la seva referència, mida i posició al tauler, lligada al seu sòlid 3D.",
          highlights: [
            "Etiquetar: genera i enganxa etiquetes amb QR, tauler a tauler",
            "Laminar: marca les làmines col·locades a les peces ja etiquetades",
            "Muntar: munta el moble pas a pas amb escaneig de QR i control de ferratges",
            "Traçabilitat completa de cada pas del procés",
          ],
        },
      ],
    },
    projects: {
      kicker: "I+D — experiments",
      title: "Altres projectes propis",
      subtitle: "Recerca i experiments tècnics fora de la feina de client.",
      items: [
        {
          subtitle: "Detecció d'activitat humana amb ML",
          desc: "Reconeixement d'activitats humanes a partir dels sensors del mòbil mitjançant una xarxa neuronal entrenada. Experimentació amb machine learning aplicat a dades de moviment en temps real.",
        },
        {
          subtitle: "Runtime propi «instant» + I+D",
          desc: "Experiments tècnics construïts sobre un runtime propi: WebRTC (comunicació en temps real), PHP-Wasm (PHP a WebAssembly), RTL-SDR (ràdio per software), Live Editor i Web Manager amb Next.js.",
        },
      ],
    },
    gallery: {
      kicker: "Feina de client — mostra",
      title: "Una tria de 422 projectes",
      subtitle: "Webs, e-commerce i aplicacions entregades a més de 200 clients.",
      web: "Projecte web",
    },
    experience: {
      kicker: "Trajectòria — per compte d'altri",
      title: "Experiència professional",
      roles: [
        "Desenvolupador web",
        "Desenvolupador web",
        "Desenvolupador web",
        "Desenvolupador d'apps i web · 422 projectes, 200+ clients",
      ],
    },
    ledger: {
      kicker: "Registre — hores per client",
      title: "El llibre d'hores",
      subtitle:
        "Dades reals de dedicació imputada a projectes al gestor Cenics, ordenades per hores. Un extracte del registre de 20 anys d'ofici.",
      colClient: "Client",
      colProj: "Proj.",
      colPeriod: "Període",
      colHours: "Hores",
      total: "Total registrat",
      note: "Hores imputades a projectes al gestor. Molts encàrrecs institucionals es van facturar sense imputar-hi hores, així que la dedicació real és més gran.",
    },
    clients: {
      kicker: "Confiança — extracte",
      title: "Clients destacats",
      subtitle: "Una mostra dels més de 200 clients: sector públic, indústria, cultura i tercer sector.",
      groups: ["Sector públic i institucional", "Empreses i cadenes", "Cultura, salut i tercer sector"],
    },
    contact: {
      kicker: "Contacte — final d'expedient",
      t1: "Construïm",
      ti: "alguna cosa",
      t2: "junts?",
      subtitle: "Disponible per a projectes i col·laboracions. Escriu-me i et responc de seguida.",
    },
  },

  es: {
    nav: {
      perfil: "Perfil",
      eines: "Herramientas",
      qualitat: "Calidad",
      destacats: "Destacados",
      projectes: "Proyectos",
      trajectoria: "Trayectoria",
      registre: "Registro",
      contacte: "Contacto",
    },
    hero: {
      expedient: "Expediente 001",
      location: "Balaguer · Lleida",
      registre: "Registro 2000 — 2026",
      disponible: "Disponible",
      role: "Diseñador · Desarrollador full-stack",
      tagline:
        "20+ años construyendo producto digital de principio a fin: del briefing y el diseño al código, la infraestructura y el SEO. Autodidacta, polivalente y orientado a resolver.",
      contactar: "Contactar",
      veure: "Ver proyectos",
    },
    statLabels: ["Proyectos entregados", "Clientes", "Años de experiencia", "Autodidacta"],
    about: {
      kicker: "Perfil — expediente",
      title: "Del oficio a la infraestructura",
      p1: "Desarrollador full-stack y diseñador con más de dos décadas entregando webs, e-commerce y aplicaciones a medida. He acompañado el ciclo completo de cientos de proyectos: briefing, wireframes, diseño, maquetación, programación, infraestructura y publicación.",
      p2: "Perfil polivalente y autodidacta: aprendo a partir de proyectos reales y de la comunidad de software libre. Combino un back-end sólido (NestJS, Node, APIs REST) con front-ends modernos (React 19, Next.js, Chakra UI) e integración de IA y ERP.",
      idiomes: "Idiomas",
      languages: [
        { name: "Catalán", level: "Nativo" },
        { name: "Castellano", level: "Nativo" },
        { name: "Inglés", level: "Nivel alto" },
      ],
    },
    skills: {
      kicker: "Herramientas — inventario",
      title: "Con qué trabajo",
      subtitle: "Tecnologías y disciplinas evidenciadas por proyectos reales, agrupadas por dominio.",
      groups: ["Lenguajes", "Front-end", "Back-end", "IA y datos", "Infra / DevOps", "Diseño"],
    },
    lighthouse: {
      kicker: "Calidad — auditoría",
      title: "100 · 100 · 100 · 100",
      subtitle:
        "Auditoría de Google Lighthouse sobre esta misma web en producción (serverscel.com): rendimiento, accesibilidad, buenas prácticas y SEO, todo al máximo.",
      labels: ["Rendimiento", "Accesibilidad", "Buenas prácticas", "SEO"],
    },
    featured: {
      kicker: "Destacados — en producción",
      title: "Dos aplicaciones vivas",
      subtitle:
        "Producto completo que puedes visitar ahora mismo: front-end, back-end, IA e integración de ERP.",
      plate: "Plate",
      visitar: "Visitar",
      items: [
        {
          subtitle: "Plataforma de administración empresarial",
          desc: "«Todo el control, en un solo lugar». Gestión de usuarios, roles y permisos granulares (RBAC), IA conversacional con LangChain y galería multimedia, todo integrado con Odoo ERP.",
          highlights: [
            "Integración Odoo: KPIs en vivo de ventas, clientes, productos, facturas pendientes, oportunidades CRM y empleados",
            "IA conversacional (LangChain + GPT-4o) que responde sobre el negocio y crea facturas en Odoo chateando",
            "Control de acceso RBAC: cada usuario ve exactamente lo que le corresponde",
            "Dashboards y logs en tiempo real (SSE · Socket.IO), seguridad JWT",
          ],
        },
        {
          subtitle: "Trazabilidad de piezas para fabricación de mobiliario",
          desc: "«Identifica y sigue cada pieza después del nesting». Importa el CSV de nesting y el STEP de TopSolid en un visor único: cada pieza con su referencia, medida y posición en el tablero, ligada a su sólido 3D.",
          highlights: [
            "Etiquetar: genera y pega etiquetas con QR, tablero a tablero",
            "Laminar: marca las láminas colocadas en las piezas ya etiquetadas",
            "Montar: monta el mueble paso a paso con escaneo de QR y control de herrajes",
            "Trazabilidad completa de cada paso del proceso",
          ],
        },
      ],
    },
    projects: {
      kicker: "I+D — experimentos",
      title: "Otros proyectos propios",
      subtitle: "Investigación y experimentos técnicos fuera del trabajo de cliente.",
      items: [
        {
          subtitle: "Detección de actividad humana con ML",
          desc: "Reconocimiento de actividades humanas a partir de los sensores del móvil mediante una red neuronal entrenada. Experimentación con machine learning aplicado a datos de movimiento en tiempo real.",
        },
        {
          subtitle: "Runtime propio «instant» + I+D",
          desc: "Experimentos técnicos construidos sobre un runtime propio: WebRTC (comunicación en tiempo real), PHP-Wasm (PHP en WebAssembly), RTL-SDR (radio por software), Live Editor y Web Manager con Next.js.",
        },
      ],
    },
    gallery: {
      kicker: "Trabajo de cliente — muestra",
      title: "Una selección de 422 proyectos",
      subtitle: "Webs, e-commerce y aplicaciones entregadas a más de 200 clientes.",
      web: "Proyecto web",
    },
    experience: {
      kicker: "Trayectoria — por cuenta ajena",
      title: "Experiencia profesional",
      roles: [
        "Desarrollador web",
        "Desarrollador web",
        "Desarrollador web",
        "Desarrollador de apps y web · 422 proyectos, 200+ clientes",
      ],
    },
    ledger: {
      kicker: "Registro — horas por cliente",
      title: "El libro de horas",
      subtitle:
        "Datos reales de dedicación imputada a proyectos en el gestor Cenics, ordenados por horas. Un extracto del registro de 20 años de oficio.",
      colClient: "Cliente",
      colProj: "Proy.",
      colPeriod: "Período",
      colHours: "Horas",
      total: "Total registrado",
      note: "Horas imputadas a proyectos en el gestor. Muchos encargos institucionales se facturaron sin imputar horas, por lo que la dedicación real es mayor.",
    },
    clients: {
      kicker: "Confianza — extracto",
      title: "Clientes destacados",
      subtitle: "Una muestra de los más de 200 clientes: sector público, industria, cultura y tercer sector.",
      groups: ["Sector público e institucional", "Empresas y cadenas", "Cultura, salud y tercer sector"],
    },
    contact: {
      kicker: "Contacto — fin de expediente",
      t1: "¿Construimos",
      ti: "algo",
      t2: "juntos?",
      subtitle: "Disponible para proyectos y colaboraciones. Escríbeme y te respondo enseguida.",
    },
  },

  en: {
    nav: {
      perfil: "Profile",
      eines: "Tools",
      qualitat: "Quality",
      destacats: "Featured",
      projectes: "Projects",
      trajectoria: "Career",
      registre: "Ledger",
      contacte: "Contact",
    },
    hero: {
      expedient: "File 001",
      location: "Balaguer · Lleida",
      registre: "Record 2000 — 2026",
      disponible: "Available",
      role: "Designer · Full-stack developer",
      tagline:
        "20+ years building digital product end to end: from briefing and design to code, infrastructure and SEO. Self-taught, versatile and focused on solving.",
      contactar: "Get in touch",
      veure: "View projects",
    },
    statLabels: ["Projects delivered", "Clients", "Years of experience", "Self-taught"],
    about: {
      kicker: "Profile — file",
      title: "From craft to infrastructure",
      p1: "Full-stack developer and designer with more than two decades delivering websites, e-commerce and custom applications. I've owned the full cycle of hundreds of projects: briefing, wireframes, design, layout, programming, infrastructure and launch.",
      p2: "Versatile and self-taught: I learn from real projects and the free-software community. I pair a solid back-end (NestJS, Node, REST APIs) with modern front-ends (React 19, Next.js, Chakra UI) and AI and ERP integration.",
      idiomes: "Languages",
      languages: [
        { name: "Catalan", level: "Native" },
        { name: "Spanish", level: "Native" },
        { name: "English", level: "Advanced" },
      ],
    },
    skills: {
      kicker: "Tools — inventory",
      title: "What I work with",
      subtitle: "Technologies and disciplines evidenced by real projects, grouped by domain.",
      groups: ["Languages", "Front-end", "Back-end", "AI & data", "Infra / DevOps", "Design"],
    },
    lighthouse: {
      kicker: "Quality — audit",
      title: "100 · 100 · 100 · 100",
      subtitle:
        "Google Lighthouse audit of this very site in production (serverscel.com): performance, accessibility, best practices and SEO, all maxed out.",
      labels: ["Performance", "Accessibility", "Best practices", "SEO"],
    },
    featured: {
      kicker: "Featured — in production",
      title: "Two live applications",
      subtitle: "Complete product you can visit right now: front-end, back-end, AI and ERP integration.",
      plate: "Plate",
      visitar: "Visit",
      items: [
        {
          subtitle: "Business administration platform",
          desc: "“All the control, in one place.” User, role and granular permission management (RBAC), conversational AI with LangChain and a media gallery, all integrated with Odoo ERP.",
          highlights: [
            "Odoo integration: live KPIs for sales, clients, products, pending invoices, CRM opportunities and staff",
            "Conversational AI (LangChain + GPT-4o) that answers about the business and creates invoices in Odoo by chatting",
            "RBAC access control: every user sees exactly what they should",
            "Real-time dashboards and logs (SSE · Socket.IO), JWT security",
          ],
        },
        {
          subtitle: "Part traceability for furniture manufacturing",
          desc: "“Identify and track every part after nesting.” Imports the nesting CSV and the TopSolid STEP into a single viewer: each part with its reference, size and position on the board, linked to its 3D solid.",
          highlights: [
            "Label: generate and stick QR labels, board by board",
            "Laminate: mark the sheets placed on already-labelled parts",
            "Assemble: build the furniture step by step with QR scanning and hardware control",
            "Full traceability of every step of the process",
          ],
        },
      ],
    },
    projects: {
      kicker: "R&D — experiments",
      title: "Other personal projects",
      subtitle: "Technical research and experiments outside of client work.",
      items: [
        {
          subtitle: "Human activity detection with ML",
          desc: "Human activity recognition from phone sensors using a trained neural network. Experimentation with machine learning applied to real-time motion data.",
        },
        {
          subtitle: "Own “instant” runtime + R&D",
          desc: "Technical experiments built on a custom runtime: WebRTC (real-time communication), PHP-Wasm (PHP in WebAssembly), RTL-SDR (software radio), Live Editor and Web Manager with Next.js.",
        },
      ],
    },
    gallery: {
      kicker: "Client work — sample",
      title: "A selection of 422 projects",
      subtitle: "Websites, e-commerce and applications delivered to more than 200 clients.",
      web: "Web project",
    },
    experience: {
      kicker: "Career — employed",
      title: "Professional experience",
      roles: [
        "Web developer",
        "Web developer",
        "Web developer",
        "App & web developer · 422 projects, 200+ clients",
      ],
    },
    ledger: {
      kicker: "Ledger — hours per client",
      title: "The book of hours",
      subtitle:
        "Real dedication data logged to projects in the Cenics manager, sorted by hours. An extract from 20 years of craft.",
      colClient: "Client",
      colProj: "Proj.",
      colPeriod: "Period",
      colHours: "Hours",
      total: "Total logged",
      note: "Hours logged to projects in the manager. Many institutional commissions were invoiced without logging hours, so the real dedication is higher.",
    },
    clients: {
      kicker: "Trust — extract",
      title: "Notable clients",
      subtitle: "A sample of the 200+ clients: public sector, industry, culture and third sector.",
      groups: ["Public & institutional sector", "Companies & chains", "Culture, health & third sector"],
    },
    contact: {
      kicker: "Contact — end of file",
      t1: "Shall we build",
      ti: "something",
      t2: "together?",
      subtitle: "Available for projects and collaborations. Write to me and I'll reply right away.",
    },
  },
};
