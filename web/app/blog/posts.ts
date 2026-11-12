// Entrades del blog — publicades originalment a LinkedIn
// (linkedin.com/in/celesti-tico-petit). Dels posts repetits se n'ha conservat
// la versió més completa. Les imatges viuen a /public/img/blog/.

import type { Lang } from "../content";

export type BlogPost = {
  slug: string;
  date: string; // ISO
  // width/height reals: el navegador en dedueix la proporció i reserva la
  // caixa abans de descarregar la imatge (sense això, /blog feia CLS).
  images: { src: string; alt: string; width: number; height: number }[];
  content: Record<Lang, { title: string; excerpt: string; tags: string[]; body: string[] }>;
};

export const LINKEDIN_ACTIVITY = "https://www.linkedin.com/in/celesti-tico-petit/recent-activity/all/";

export const blogPosts: BlogPost[] = [
  {
    slug: "ia-resultats-recursos",
    date: "2026-08-09",
    images: [{ src: "/img/blog/ia-recursos.webp", width: 646, height: 437, alt: "Dos robots: un esgotat sense recursos i un altre productiu amb dades i infraestructura" }],
    content: {
      ca: {
        title: "Esperes resultats extraordinaris de la IA… amb recursos mínims?",
        excerpt: "La IA no és màgia: sense dades de qualitat, infraestructura i context, el seu potencial es queda en promeses.",
        tags: ["IA", "Infraestructura", "Dades"],
        body: [
          "La IA no és màgia.",
          "Sense dades de qualitat, sense infraestructura, sense context i sense recursos computacionals, el seu potencial es queda en promeses.",
          "Dona-li a la IA el que necessita, i descobriràs el que realment pot fer.",
        ],
      },
      es: {
        title: "¿Esperas resultados extraordinarios de la IA… con recursos mínimos?",
        excerpt: "La IA no es magia: sin datos de calidad, infraestructura y contexto, su potencial se queda en promesas.",
        tags: ["IA", "Infraestructura", "Datos"],
        body: [
          "La IA no es magia.",
          "Sin datos de calidad, sin infraestructura, sin contexto y sin recursos computacionales, su potencial se queda en promesas.",
          "Dale a la IA lo que necesita, y descubrirás lo que realmente puede hacer.",
        ],
      },
      en: {
        title: "Expecting extraordinary results from AI… on minimal resources?",
        excerpt: "AI is not magic: without quality data, infrastructure and context, its potential stays a promise.",
        tags: ["AI", "Infrastructure", "Data"],
        body: [
          "AI is not magic.",
          "Without quality data, without infrastructure, without context and without computing resources, its potential stays a promise.",
          "Give AI what it needs, and you'll find out what it can really do.",
        ],
      },
    },
  },
  {
    slug: "ia-empresarial-integrada",
    date: "2026-08-08",
    images: [{ src: "/img/blog/ia-empresarial.webp", width: 639, height: 604, alt: "Integrem IA a la teva empresa: automatització, decisions amb dades, seguretat i integració a mida" }],
    content: {
      ca: {
        title: "Integrar IA a l'empresa sense perdre el control de les dades",
        excerpt: "El repte no és utilitzar IA: és integrar-la com un servei empresarial, amb una API interna com a capa de control.",
        tags: ["IA", "Empresa", "RGPD", "Integració"],
        body: [
          "La Intel·ligència Artificial pot transformar una empresa. Però el veritable repte no és utilitzar IA: el repte és integrar-la a l'empresa sense perdre el control de les seves dades.",
          "Moltes empreses tenen por de connectar la seva informació interna amb sistemes d'IA. I és comprensible. Per això, la proposta no és simplement «posar ChatGPT» a l'empresa: és integrar IA com un servei empresarial, connectat a través d'una API interna que actua com a capa de control entre els sistemes de l'empresa i la IA.",
          "Les teves dades → API interna → Servei d'IA → Resultat. L'API controla quina informació pot sortir, qui hi pot accedir, quins processos pot executar i quines dades es poden utilitzar.",
          "L'objectiu:\n· Sense utilització de les dades per entrenar models, quan el servei contractat ho garanteix.\n· Sense retenció d'informació quan la configuració i el contracte del servei ho permeten.\n· Control d'accessos i permisos.\n· Traçabilitat de les operacions.\n· Integració amb ERP, CRM, bases de dades, documents i aplicacions internes.\n· Compliment de les obligacions de protecció de dades aplicables.",
          "I llavors sí que podem aprofitar tot el potencial de la IA: automatitzar processos, crear assistents i agents empresarials, consultar documentació mitjançant RAG, analitzar informació i ajudar en la presa de decisions, augmentar productivitat i eficiència.",
          "La IA no ha d'estar fora de la teva empresa. Pot formar-ne part. De manera integrada, controlada i dissenyada al voltant de les teves necessitats.",
          "IA potent. Dades protegides. Resultats reals. Si la teva empresa vol incorporar IA però la seguretat i la protecció de dades són una barrera, parlem-ne.",
        ],
      },
      es: {
        title: "Integrar IA en la empresa sin perder el control de los datos",
        excerpt: "El reto no es utilizar IA: es integrarla como un servicio empresarial, con una API interna como capa de control.",
        tags: ["IA", "Empresa", "RGPD", "Integración"],
        body: [
          "La Inteligencia Artificial puede transformar una empresa. Pero el verdadero reto no es utilizar IA: el reto es integrarla en la empresa sin perder el control de sus datos.",
          "Muchas empresas tienen miedo de conectar su información interna con sistemas de IA. Y es comprensible. Por eso, la propuesta no es simplemente «poner ChatGPT» en la empresa: es integrar IA como un servicio empresarial, conectado a través de una API interna que actúa como capa de control entre los sistemas de la empresa y la IA.",
          "Tus datos → API interna → Servicio de IA → Resultado. La API controla qué información puede salir, quién puede acceder, qué procesos puede ejecutar y qué datos se pueden utilizar.",
          "El objetivo:\n· Sin utilización de los datos para entrenar modelos, cuando el servicio contratado así lo garantiza.\n· Sin retención de información cuando la configuración y el contrato del servicio lo permiten.\n· Control de accesos y permisos.\n· Trazabilidad de las operaciones.\n· Integración con ERP, CRM, bases de datos, documentos y aplicaciones internas.\n· Cumplimiento de las obligaciones de protección de datos aplicables.",
          "Y entonces sí podemos aprovechar todo el potencial de la IA: automatizar procesos, crear asistentes y agentes empresariales, consultar documentación mediante RAG, analizar información y ayudar en la toma de decisiones, aumentar productividad y eficiencia.",
          "La IA no tiene que estar fuera de tu empresa. Puede formar parte de ella. De forma integrada, controlada y diseñada alrededor de tus necesidades.",
          "IA potente. Datos protegidos. Resultados reales. Si tu empresa quiere incorporar IA pero la seguridad y la protección de datos son una barrera, hablemos.",
        ],
      },
      en: {
        title: "Integrating AI into a company without losing control of its data",
        excerpt: "The challenge isn't using AI — it's integrating it as an enterprise service, with an internal API as the control layer.",
        tags: ["AI", "Enterprise", "GDPR", "Integration"],
        body: [
          "Artificial intelligence can transform a company. But the real challenge is not using AI: it's integrating it into the company without losing control of its data.",
          "Many companies are afraid of connecting their internal information to AI systems. Understandably so. That's why the proposal is not simply to \"drop ChatGPT\" into the company: it's to integrate AI as an enterprise service, connected through an internal API that acts as a control layer between the company's systems and the AI.",
          "Your data → internal API → AI service → Result. The API controls what information can leave, who can access it, which processes it can run and which data can be used.",
          "The goal:\n· No use of your data to train models, when the contracted service guarantees it.\n· No information retention, when the service's configuration and contract allow it.\n· Access and permission control.\n· Traceability of every operation.\n· Integration with ERP, CRM, databases, documents and internal applications.\n· Compliance with the applicable data-protection obligations.",
          "And then we can use AI's full potential: automating processes, building enterprise assistants and agents, querying documentation through RAG, analysing information to support decisions, raising productivity and efficiency.",
          "AI doesn't have to live outside your company. It can be part of it — integrated, controlled and designed around your needs.",
          "Powerful AI. Protected data. Real results. If your company wants to adopt AI but security and data protection are a barrier, let's talk.",
        ],
      },
    },
  },
  {
    slug: "vehicleos-ia-diagnostic",
    date: "2026-08-08",
    images: [{ src: "/img/blog/vehicleos-diagnostic.webp", width: 537, height: 632, alt: "VehicleOS: el diagnòstic intel·ligent que el teu cotxe mereix — comparativa amb eines de taller" }],
    content: {
      ca: {
        title: "I si poguessis dur al cotxe part de la intel·ligència de les eines de diagnosi d'un taller?",
        excerpt: "VehicleOS utilitza IA per anar molt més enllà del «codi P0401 detectat»: descobrir centralites, interpretar dades i explicar-ho en llenguatge comprensible.",
        tags: ["VehicleOS", "IA", "OBD-II", "Automoció"],
        body: [
          "Fa temps, un client em va demanar un PLC. I això em va fer pensar en una cosa: un cotxe modern no és només un motor. És una xarxa de centralites, sensors, busos de comunicació i milers de paràmetres. I l'OBD-II és només la porta d'entrada.",
          "Per això estic desenvolupant VehicleOS. La idea és utilitzar IA per anar molt més enllà de «Codi P0401 detectat».",
          "VehicleOS busca:\n· Descobrir quines centralites estan disponibles.\n· Llegir les dades que poden proporcionar.\n· Analitzar paràmetres en temps real.\n· Utilitzar IA per interpretar la informació.\n· Detectar comportaments anòmals.\n· Explicar què pot estar passant en un llenguatge comprensible.\n· Construir un perfil digital del vehicle.",
          "I amb una regla fonamental: READ-ONLY. VehicleOS pot llegir i interpretar; no modifica el comportament del vehicle.",
          "L'arquitectura és: COTXE → OBD-II → ECU → DADES → IA → INFORMACIÓ.",
          "No pretenc substituir les eines oficials dels fabricants. Però sí explorar una cosa diferent: pot una IA aprendre com funciona un vehicle simplement observant i correlacionant les seves dades? Si la resposta és sí, podríem ser davant d'una nova generació de diagnòstic automotriu.",
          "Això és VehicleOS: vehicleos.serverscel.com · coche.serverscel.com. El cotxe ja té les dades. Ara estem intentant ensenyar a la IA a entendre-les.",
        ],
      },
      es: {
        title: "¿Y si pudieras llevar en tu coche parte de la inteligencia de las herramientas de diagnóstico de un taller?",
        excerpt: "VehicleOS utiliza IA para ir mucho más allá del «código P0401 detectado»: descubrir centralitas, interpretar datos y explicarlo en lenguaje comprensible.",
        tags: ["VehicleOS", "IA", "OBD-II", "Automoción"],
        body: [
          "Hace tiempo, un cliente me pidió un PLC. Y eso me hizo pensar en algo: un coche moderno no es solo un motor. Es una red de centralitas, sensores, buses de comunicación y miles de parámetros. Y el OBD-II es solamente la puerta de entrada.",
          "Por eso estoy desarrollando VehicleOS. La idea es utilizar IA para ir mucho más allá de «Código P0401 detectado».",
          "VehicleOS busca:\n· Descubrir qué centralitas están disponibles.\n· Leer los datos que pueden proporcionar.\n· Analizar parámetros en tiempo real.\n· Utilizar IA para interpretar la información.\n· Detectar comportamientos anómalos.\n· Explicar qué puede estar pasando en un lenguaje comprensible.\n· Construir un perfil digital del vehículo.",
          "Y con una regla fundamental: READ-ONLY. VehicleOS puede leer e interpretar; no modifica el comportamiento del vehículo.",
          "La arquitectura es: COCHE → OBD-II → ECU → DATOS → IA → INFORMACIÓN.",
          "No pretendo sustituir las herramientas oficiales de los fabricantes. Pero sí explorar algo diferente: ¿puede una IA aprender cómo funciona un vehículo simplemente observando y correlacionando sus datos? Si la respuesta es sí, podríamos estar ante una nueva generación de diagnóstico automotriz.",
          "Esto es VehicleOS: vehicleos.serverscel.com · coche.serverscel.com. El coche ya tiene los datos. Ahora estamos intentando enseñarle a la IA a entenderlos.",
        ],
      },
      en: {
        title: "What if your car could carry part of the intelligence of a workshop's diagnostic tools?",
        excerpt: "VehicleOS uses AI to go far beyond \"code P0401 detected\": discovering ECUs, interpreting data and explaining it in plain language.",
        tags: ["VehicleOS", "AI", "OBD-II", "Automotive"],
        body: [
          "A while ago, a client asked me for a PLC. And that got me thinking: a modern car is not just an engine. It's a network of ECUs, sensors, communication buses and thousands of parameters. And OBD-II is only the entry door.",
          "That's why I'm building VehicleOS. The idea is to use AI to go far beyond \"Code P0401 detected\".",
          "VehicleOS aims to:\n· Discover which ECUs are available.\n· Read the data they can provide.\n· Analyse parameters in real time.\n· Use AI to interpret the information.\n· Detect anomalous behaviour.\n· Explain what may be happening in plain language.\n· Build a digital profile of the vehicle.",
          "With one fundamental rule: READ-ONLY. VehicleOS can read and interpret; it never modifies the vehicle's behaviour.",
          "The architecture is: CAR → OBD-II → ECU → DATA → AI → INFORMATION.",
          "I'm not trying to replace the manufacturers' official tools. But I am exploring something different: can an AI learn how a vehicle works just by observing and correlating its data? If the answer is yes, we could be looking at a new generation of automotive diagnostics.",
          "This is VehicleOS: vehicleos.serverscel.com · coche.serverscel.com. The car already has the data. Now we're trying to teach the AI to understand it.",
        ],
      },
    },
  },
  {
    slug: "vehicleos-quadre-digital",
    date: "2026-08-08",
    images: [{ src: "/img/blog/vehicleos-cockpit.webp", width: 642, height: 632, alt: "VehicleOS: el teu cotxe, intel·ligent i connectat — converteix la tauleta en el cervell del cotxe" }],
    content: {
      ca: {
        title: "I si el teu cotxe de fa 20 anys pogués tenir el quadre d'un cotxe nou?",
        excerpt: "Això és el que estic construint amb VehicleOS: dades en temps real, diagnòstic explicat i telemetria, tot com a PWA.",
        tags: ["VehicleOS", "PWA", "OBD-II", "Telemetria"],
        body: [
          "Això és el que estic construint amb VehicleOS. No volia fer simplement un altre lector OBD que t'ensenyi un codi com P0401 i t'enviï a Google.",
          "Volia una cosa diferent:\n· Dades del cotxe en temps real.\n· Diagnòstic explicat de manera comprensible.\n· Alertes i avaries.\n· Assistent que interpreta les dades del vehicle.\n· Historial de viatges i telemetria.\n· Una interfície pensada per a una pantalla del cotxe.\n· Panell web per controlar els teus vehicles.\n· Connexió mitjançant OBD-II + Bluetooth.",
          "I tot funcionant com una PWA, sense necessitat de convertir el cotxe en un ordinador nou. La idea és senzilla: no canviar el cotxe; canviar el que pot fer.",
          "He creat tant la plataforma web com el cockpit que funciona directament al cotxe. Això tot just comença.",
          "Vosaltres, quina informació us agradaria veure al quadre del vostre cotxe?",
        ],
      },
      es: {
        title: "¿Y si tu coche de hace 20 años pudiera tener el cuadro de un coche nuevo?",
        excerpt: "Eso es lo que estoy construyendo con VehicleOS: datos en tiempo real, diagnóstico explicado y telemetría, todo como PWA.",
        tags: ["VehicleOS", "PWA", "OBD-II", "Telemetría"],
        body: [
          "Eso es lo que estoy construyendo con VehicleOS. No quería hacer simplemente otro lector OBD que te enseñe un código como P0401 y te mande a Google.",
          "Quería algo diferente:\n· Datos del coche en tiempo real.\n· Diagnóstico explicado de forma comprensible.\n· Alertas y averías.\n· Asistente que interpreta los datos del vehículo.\n· Historial de viajes y telemetría.\n· Una interfaz pensada para una pantalla del coche.\n· Panel web para controlar tus vehículos.\n· Conexión mediante OBD-II + Bluetooth.",
          "Y todo funcionando como una PWA, sin necesidad de convertir el coche en un ordenador nuevo. La idea es sencilla: no cambiar el coche; cambiar lo que puede hacer.",
          "He creado tanto la plataforma web como el cockpit que funciona directamente en el coche. Esto acaba de empezar.",
          "¿Vosotros qué información os gustaría ver en el cuadro de vuestro coche?",
        ],
      },
      en: {
        title: "What if your 20-year-old car could have the dashboard of a new one?",
        excerpt: "That's what I'm building with VehicleOS: real-time data, explained diagnostics and telemetry, all as a PWA.",
        tags: ["VehicleOS", "PWA", "OBD-II", "Telemetry"],
        body: [
          "That's what I'm building with VehicleOS. I didn't want to make just another OBD reader that shows you a code like P0401 and sends you to Google.",
          "I wanted something different:\n· Real-time car data.\n· Diagnostics explained in plain language.\n· Alerts and faults.\n· An assistant that interprets the vehicle's data.\n· Trip history and telemetry.\n· An interface designed for a car screen.\n· A web panel to manage your vehicles.\n· Connection through OBD-II + Bluetooth.",
          "All running as a PWA, without turning the car into a new computer. The idea is simple: don't change the car; change what it can do.",
          "I've built both the web platform and the cockpit that runs right in the car. This has only just begun.",
          "What information would you like to see on your car's dashboard?",
        ],
      },
    },
  },
  {
    slug: "desenvolupadors-agents-ia",
    date: "2026-07-27",
    images: [
      {
        src: "/img/blog/agents-codi.webp",
        width: 1200,
        height: 669,
        alt: "Panell de codi sobre una retícula fosca: les tres primeres línies en gris, escrites a mà, i la resta en ambre, emeses per tres nodes connectats amb fils prims",
      },
    ],
    content: {
      ca: {
        title: "Els desenvolupadors ja no programaran la major part del codi",
        excerpt: "El que es delega és escriure. El que no es delega és el criteri: triar la solució que aguantarà i verificar que el que has acceptat funciona.",
        tags: ["IA", "Agents", "Futur del treball"],
        body: [
          "La feina ha canviat més en dos anys que en els deu anteriors. Avui puc definir un objectiu des del mòbil i trobar-me la feina feta —i revisable— en un ordinador de desenvolupament.",
          "El repartiment és net. Jo: els objectius, l'arquitectura, les prioritats i la decisió final. L'agent: escriure el codi, refactoritzar, executar les proves, corregir el que peta, documentar, desplegar, gestionar Git i Docker.",
          "El que no es delega és el criteri. Un agent et dona deu solucions plausibles en un minut; triar la que encara aguantarà d'aquí a tres anys continua sent feina teva. I entendre-la, també: el codi que no entens no el pots mantenir.",
          "Per això la part que més ha crescut de la meva feina no és escriure, és verificar. Tests que valguin la pena, tipus que facin impossible l'error, revisions on es llegeix el diff de debò. Sense això, la velocitat només serveix per acumular deute més de pressa.",
          "Qui aprengui a treballar així multiplicarà el que pot entregar. Qui no, competirà justament en la part de la feina que s'està automatitzant.",
          "No crec que la professió desaparegui. Crec que canvia de nom: de qui escriu el codi a qui en respon.",
        ],
      },
      es: {
        title: "Los desarrolladores ya no programarán la mayor parte del código",
        excerpt: "Lo que se delega es escribir. Lo que no se delega es el criterio: elegir la solución que aguantará y verificar que lo que has aceptado funciona.",
        tags: ["IA", "Agentes", "Futuro del trabajo"],
        body: [
          "El trabajo ha cambiado más en dos años que en los diez anteriores. Hoy puedo definir un objetivo desde el móvil y encontrarme el trabajo hecho —y revisable— en un ordenador de desarrollo.",
          "El reparto es limpio. Yo: los objetivos, la arquitectura, las prioridades y la decisión final. El agente: escribir el código, refactorizar, ejecutar las pruebas, corregir lo que peta, documentar, desplegar, gestionar Git y Docker.",
          "Lo que no se delega es el criterio. Un agente te da diez soluciones plausibles en un minuto; elegir la que seguirá aguantando dentro de tres años sigue siendo tu trabajo. Y entenderla, también: el código que no entiendes no lo puedes mantener.",
          "Por eso la parte que más ha crecido de mi trabajo no es escribir, es verificar. Tests que valgan la pena, tipos que hagan imposible el error, revisiones donde se lee el diff de verdad. Sin eso, la velocidad solo sirve para acumular deuda más deprisa.",
          "Quien aprenda a trabajar así multiplicará lo que puede entregar. Quien no, competirá justamente en la parte del trabajo que se está automatizando.",
          "No creo que la profesión desaparezca. Creo que cambia de nombre: de quien escribe el código a quien responde de él.",
        ],
      },
      en: {
        title: "Developers will no longer write most of the code",
        excerpt: "What you delegate is the typing. What you don't delegate is judgement: picking the solution that will hold, and verifying that what you accepted actually works.",
        tags: ["AI", "Agents", "Future of work"],
        body: [
          "The job has changed more in two years than in the previous ten. Today I can set a goal from my phone and find the work done — and reviewable — on a development machine.",
          "The split is clean. Me: the goals, the architecture, the priorities and the final call. The agent: writing the code, refactoring, running the tests, fixing what breaks, documenting, deploying, handling Git and Docker.",
          "What you don't delegate is judgement. An agent hands you ten plausible solutions in a minute; choosing the one that will still hold in three years is still your job. So is understanding it: code you don't understand is code you can't maintain.",
          "That's why the part of my work that has grown most isn't writing, it's verifying. Tests worth having, types that make the mistake impossible, reviews where the diff actually gets read. Without that, speed just piles up debt faster.",
          "Those who learn to work this way will multiply what they can ship. Those who don't will be competing on exactly the part of the job that is being automated.",
          "I don't think the profession disappears. I think it gets renamed: from the person who writes the code to the person who answers for it.",
        ],
      },
    },
  },
  {
    slug: "fabrik-tracabilitat-nesting",
    date: "2026-07-26",
    images: [
      { src: "/img/blog/fabrik-nesting.webp", width: 645, height: 348, alt: "FABRIK: tauler de nesting amb les peces i les etiquetes QR" },
      { src: "/img/blog/fabrik-mecanitzar.webp", width: 645, height: 380, alt: "FABRIK: peça en 3D marcada com a mecanitzada" },
      { src: "/img/blog/fabrik-laminar.webp", width: 646, height: 370, alt: "FABRIK: làmines col·locades sobre una peça etiquetada" },
      { src: "/img/blog/fabrik-muntar.webp", width: 646, height: 366, alt: "FABRIK: muntatge del moble pas a pas amb control de ferratges" },
    ],
    content: {
      ca: {
        title: "FABRIK: identifica i segueix cada peça després del nesting",
        excerpt: "Importa el CSV de nesting i l'STEP de TopSolid en un visor únic: cada peça amb la seva referència, mida i posició, lligada al seu sòlid 3D.",
        tags: ["FABRIK", "CNC", "Traçabilitat", "Indústria"],
        body: [
          "«Identifica i segueix cada peça després del nesting». FABRIK importa el CSV de nesting i l'STEP de TopSolid en un visor únic: cada peça amb la seva referència, mida i posició al tauler, lligada al seu sòlid 3D.",
          "El flux de treball cobreix tot el procés:\n· Etiquetar: genera i enganxa etiquetes amb QR, tauler a tauler.\n· Mecanitzar: talla les peces amb la CNC segons el nesting.\n· Laminar: marca les làmines col·locades a les peces ja etiquetades.\n· Muntar: munta el moble pas a pas amb escaneig de QR i control de ferratges.",
          "Traçabilitat completa de cada pas del procés.",
        ],
      },
      es: {
        title: "FABRIK: identifica y sigue cada pieza después del nesting",
        excerpt: "Importa el CSV de nesting y el STEP de TopSolid en un visor único: cada pieza con su referencia, medida y posición, ligada a su sólido 3D.",
        tags: ["FABRIK", "CNC", "Trazabilidad", "Industria"],
        body: [
          "«Identifica y sigue cada pieza después del nesting». FABRIK importa el CSV de nesting y el STEP de TopSolid en un visor único: cada pieza con su referencia, medida y posición en el tablero, ligada a su sólido 3D.",
          "El flujo de trabajo cubre todo el proceso:\n· Etiquetar: genera y pega etiquetas con QR, tablero a tablero.\n· Mecanizar: corta las piezas con la CNC según el nesting.\n· Laminar: marca las láminas colocadas en las piezas ya etiquetadas.\n· Montar: monta el mueble paso a paso con escaneo de QR y control de herrajes.",
          "Trazabilidad completa de cada paso del proceso.",
        ],
      },
      en: {
        title: "FABRIK: identify and track every part after nesting",
        excerpt: "It imports the nesting CSV and the TopSolid STEP into a single viewer: every part with its reference, size and position, linked to its 3D solid.",
        tags: ["FABRIK", "CNC", "Traceability", "Industry"],
        body: [
          "\"Identify and track every part after nesting.\" FABRIK imports the nesting CSV and the TopSolid STEP into a single viewer: every part with its reference, size and position on the board, linked to its 3D solid.",
          "The workflow covers the whole process:\n· Label: generate and stick QR labels, board by board.\n· Machine: cut the parts on the CNC following the nesting.\n· Laminate: mark the sheets placed on already-labelled parts.\n· Assemble: build the furniture step by step with QR scanning and hardware control.",
          "Full traceability of every step of the process.",
        ],
      },
    },
  },
];
