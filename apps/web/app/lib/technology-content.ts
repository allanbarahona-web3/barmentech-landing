import type { Locale } from "./i18n";

export const technologyServiceIds = ["web-development", "custom-software", "automation"] as const;

export type TechnologyServiceId = (typeof technologyServiceIds)[number];

export type TechnologyRailCard = {
  capabilities: string[];
  id: string;
  image: string;
  serviceId?: TechnologyServiceId;
  title: string;
};

type ServicePageContent = {
  build: {
    intro: string;
    items: string[];
    title: string;
  };
  cta: {
    body: string;
    label: string;
    title: string;
  };
  engagement: {
    items: string[];
    title: string;
  };
  eyebrow: string;
  intro: string;
  maintenance: {
    body: string;
    title: string;
  };
  needs: {
    items: string[];
    title: string;
  };
  title: string;
};

type TechnologyContent = {
  capabilities: string[];
  company: {
    body: string;
    formationLabel: string;
    title: string;
  };
  finalCta: {
    body: string;
    label: string;
    title: string;
  };
  hero: {
    eyebrow: string;
    primaryLabel: string;
    secondaryLabel: string;
    title: string;
    body: string;
  };
  maintenance: {
    body: string;
    contactLabel: string;
    items: string[];
    title: string;
  };
  process: {
    introduction: string;
    steps: Array<{
      body: string;
      title: string;
    }>;
    title: string;
  };
  services: {
    introduction: string;
    nextLabel: string;
    previousLabel: string;
    viewDetailsLabel: string;
    backLabel: string;
    exploreServiceLabel: string;
    discussNeedLabel: string;
    title: string;
  } & { items: TechnologyRailCard[] };
  servicePages: Record<TechnologyServiceId, ServicePageContent>;
  value: {
    body: string;
    points: string[];
    title: string;
  };
};

const content: Record<Locale, TechnologyContent> = {
  en: {
    capabilities: ["Web and commerce", "Systems and SaaS", "Automation and integrations", "Maintenance and modernization"],
    hero: {
      eyebrow: "Barmentech Technology",
      title: "Digital solutions designed to move your business forward.",
      body: "We design, build, integrate, and evolve websites, e-commerce experiences, business systems, SaaS platforms, automation, and integrations—while maintaining and modernizing the solutions your team already uses.",
      primaryLabel: "Talk to Barmentech",
      secondaryLabel: "Explore services",
    },
    value: {
      title: "Technology with a practical business focus.",
      body: "We start before the interface or the integration: with the business context and a clear understanding of what needs to work better.",
      points: ["The people involved in the work", "Existing tools and operating constraints", "Information that needs to move", "Decisions the solution needs to support", "An agreed, workable next step"],
    },
    services: {
      title: "Technology services",
      introduction: "We support distinct digital needs while keeping the architecture, integrations, and future evolution in view.",
      previousLabel: "View previous service",
      nextLabel: "View next service",
      viewDetailsLabel: "View details",
      backLabel: "Back",
      exploreServiceLabel: "Explore service",
      discussNeedLabel: "Discuss this need",
      items: [
        {
          id: "web-development",
          serviceId: "web-development",
          title: "Websites and e-commerce",
          capabilities: ["Corporate and service websites", "Landing pages and digital catalogs", "Online stores and payment integrations", "Responsive, accessible, and multilingual foundations"],
          image: "/images/Designing%20a%20polished%20online%20storefront-1.webp",
        },
        {
          id: "custom-software",
          serviceId: "custom-software",
          title: "Custom systems and SaaS platforms",
          capabilities: ["Internal systems, portals, and dashboards", "Workflow-oriented applications", "APIs and business rules", "SaaS foundations for validated requirements"],
          image: "/images/Collaborative%20business%20systems%20in%20action-2.webp",
        },
        {
          id: "automation",
          serviceId: "automation",
          title: "Automation and integrations",
          capabilities: ["API and platform integrations", "Notifications and asynchronous processes", "Controlled data exchange and validation", "Reduction of repetitive operational steps"],
          image: "/images/Seamless%20automation%20across%20business%20systems-3.webp",
        },
        {
          id: "maintenance-modernization",
          title: "Maintenance and modernization",
          capabilities: ["Existing website and system maintenance", "Dependency and technical-foundation updates", "Mobile usability and accessibility improvements", "Progressive feature development and documentation"],
          image: "/images/Modernizing%20legacy%20software%20with%20care-4.webp",
        },
        {
          id: "digital-product-experience",
          title: "Digital product and experience",
          capabilities: ["User and operational-flow review", "Interface structure and responsive behavior", "Prototypes for validating an approach", "Accessibility and usability considerations"],
          image: "/images/Designing%20better%20journeys%2C%20together-5.webp",
        },
        {
          id: "data-applied-ai",
          title: "Data and applied AI",
          capabilities: ["Data organization and operational reporting", "Assisted document or information processing", "AI-supported workflow exploration", "Human review and controlled implementation"],
          image: "/images/Analysts%20reviewing%20AI%20insights-6.webp",
        },
      ],
    },
    maintenance: {
      title: "Maintenance, modernization, and continuous improvement.",
      body: "Technology work does not always begin with a new build. We can assess an existing solution, stabilize the foundations, and plan improvements in stages when the scope is confirmed.",
      contactLabel: "Discuss an existing solution",
      items: ["Maintain existing websites and systems", "Modernize interfaces, dependencies, and technical foundations", "Improve mobile usability and accessibility", "Add features progressively and document existing solutions"],
    },
    process: {
      title: "How we work",
      introduction: "Scope, deliverables, schedule, and responsibilities are agreed for each engagement before implementation begins.",
      steps: [
        { title: "Discovery and context", body: "We review the business need, existing tools, constraints, and the people who will use the solution." },
        { title: "Scope and proposal", body: "We define a practical engagement with confirmed priorities, deliverables, and responsibilities." },
        { title: "Design and implementation", body: "We shape the experience and technical work around the approved scope." },
        { title: "Validation and delivery", body: "We review the agreed solution, prepare delivery, and identify the next operational steps." },
        { title: "Maintenance and evolution", body: "When contracted, we continue with improvements, support, and planned technical evolution." },
      ],
    },
    company: {
      title: "Technology built around the way your business operates.",
      body: "Barmentech combines business understanding with technology implementation. When relevant, we can also connect clients with other specialized Barmentech services in business formation and tax.",
      formationLabel: "Explore Barmentech Formation",
    },
    finalCta: {
      title: "Bring a new idea, an existing system, or an operational problem.",
      body: "We start by understanding the context and defining a practical scope for the next step—whether you are building, connecting, stabilizing, or improving a digital solution.",
      label: "Contact Barmentech",
    },
    servicePages: {
      "web-development": {
        eyebrow: "Websites and e-commerce",
        title: "A clear digital presence for the next business conversation.",
        intro: "We build public websites and online commerce experiences around how a business presents its services, products, and next steps.",
        build: {
          title: "What we can build or support",
          intro: "The right combination depends on the confirmed objective, content, and operating requirements.",
          items: ["Corporate and service websites", "Landing pages and product catalogs", "Online stores and purchase flows", "Responsive implementation with accessibility and performance foundations", "Multilingual experiences", "Forms, payment, analytics, and business-tool integrations when required"],
        },
        needs: { title: "Suitable when you need to", items: ["Clarify a public offer or service path", "Create a reliable destination for a campaign or new initiative", "Organize products for an online catalog or store", "Improve an existing site’s mobile experience or technical foundation"] },
        engagement: { title: "How the engagement works", items: ["We review audience, content, priorities, and current tools", "We confirm scope, responsibilities, and a delivery plan", "We design and implement the approved experience", "We validate the result and prepare the agreed handoff"] },
        maintenance: { title: "Built to evolve", body: "After launch, we can maintain the experience, improve content paths, modernize dependencies, or add confirmed capabilities progressively." },
        cta: { title: "Discuss your website or commerce needs.", body: "Tell us what customers need to understand, find, or complete online.", label: "Contact Barmentech" },
      },
      "custom-software": {
        eyebrow: "Custom systems and SaaS platforms",
        title: "Systems shaped around the work your business needs to coordinate.",
        intro: "We design and build applications for operational workflows, customer experiences, and the information a team needs to manage deliberately.",
        build: {
          title: "What we can build or support",
          intro: "Capabilities are selected according to validated requirements and the agreed service scope.",
          items: ["Internal business systems", "Customer and operational portals", "Workflow-oriented applications and administrative dashboards", "APIs, backend services, and databases", "Role-based access where appropriate", "Multi-tenant SaaS foundations where appropriate"],
        },
        needs: { title: "Suitable when you need to", items: ["Bring a repeated operational process into one working system", "Give customers or teams a clearer place to complete defined tasks", "Replace disconnected spreadsheets or manual handoffs", "Validate an application concept before extending it in stages"] },
        engagement: { title: "How the engagement works", items: ["We understand the workflow, users, data, and constraints", "We confirm a phased scope, responsibilities, and technical direction", "We design and implement the approved foundation", "We validate the agreed flows before delivery and future evolution"] },
        maintenance: { title: "A foundation for continued improvement", body: "We can stabilize an existing system, document it, update technical dependencies, and introduce confirmed improvements over time." },
        cta: { title: "Discuss a system your business needs.", body: "Share the workflow, users, and operational context you need to support.", label: "Contact Barmentech" },
      },
      automation: {
        eyebrow: "Automation and integrations",
        title: "Connect the work that should move between your existing tools.",
        intro: "We plan and implement controlled integrations and automations around the systems your team already relies on.",
        build: {
          title: "What we can build or support",
          intro: "Integration work starts with the available platforms, the data involved, and the controls the workflow needs.",
          items: ["Connections between existing platforms", "API integrations", "Workflow automation", "Notifications and asynchronous processes", "Controlled data exchange", "Integration planning, validation, and documentation"],
        },
        needs: { title: "Suitable when you need to", items: ["Reduce repeated manual handoffs between approved tools", "Keep defined information aligned across systems", "Trigger a reviewed notification or follow-up process", "Plan an integration before committing to a broader system change"] },
        engagement: { title: "How the engagement works", items: ["We map the current workflow, platforms, and data boundaries", "We confirm scope, dependencies, and validation criteria", "We implement and test the approved connections", "We prepare the agreed documentation and next operational steps"] },
        maintenance: { title: "Integration support over time", body: "When systems change, we can review dependencies, adjust confirmed connections, and improve the reliability of the documented workflow." },
        cta: { title: "Discuss an integration or automation need.", body: "Tell us which systems are involved and where the current process needs more continuity.", label: "Contact Barmentech" },
      },
    },
  },
  es: {
    capabilities: ["Web y comercio", "Sistemas y SaaS", "Automatización e integraciones", "Mantenimiento y modernización"],
    hero: {
      eyebrow: "Barmentech Tecnología",
      title: "Soluciones digitales diseñadas para impulsar tu negocio.",
      body: "Nosotros diseñamos, construimos, integramos y evolucionamos sitios web, experiencias de comercio electrónico, sistemas empresariales, plataformas SaaS, automatizaciones e integraciones; también mantenemos y modernizamos las soluciones que tu equipo ya utiliza.",
      primaryLabel: "Hablar con Barmentech",
      secondaryLabel: "Explorar servicios",
    },
    value: {
      title: "Tecnología con un enfoque práctico de negocio.",
      body: "Nosotros comenzamos antes de la interfaz o la integración: con el contexto de negocio y una comprensión clara de lo que debe funcionar mejor.",
      points: ["Las personas involucradas en el trabajo", "Herramientas existentes y restricciones operativas", "Información que debe circular", "Decisiones que la solución debe respaldar", "Un siguiente paso acordado y viable"],
    },
    services: {
      title: "Servicios de tecnología",
      introduction: "Nosotros atendemos necesidades digitales distintas manteniendo en perspectiva la arquitectura, las integraciones y la evolución futura.",
      previousLabel: "Ver servicio anterior",
      nextLabel: "Ver siguiente servicio",
      viewDetailsLabel: "Ver detalles",
      backLabel: "Volver",
      exploreServiceLabel: "Explorar servicio",
      discussNeedLabel: "Conversar sobre esta necesidad",
      items: [
        {
          id: "web-development",
          serviceId: "web-development",
          title: "Sitios web y comercio electrónico",
          capabilities: ["Sitios corporativos y de servicios", "Landing pages y catálogos digitales", "Tiendas en línea e integraciones de pago", "Bases responsivas, accesibles y multilingües"],
          image: "/images/Designing%20a%20polished%20online%20storefront-1.webp",
        },
        {
          id: "custom-software",
          serviceId: "custom-software",
          title: "Sistemas a medida y plataformas SaaS",
          capabilities: ["Sistemas internos, portales y paneles", "Aplicaciones orientadas a flujos", "APIs y reglas de negocio", "Bases SaaS para requisitos validados"],
          image: "/images/Collaborative%20business%20systems%20in%20action-2.webp",
        },
        {
          id: "automation",
          serviceId: "automation",
          title: "Automatización e integraciones",
          capabilities: ["Integraciones de APIs y plataformas", "Notificaciones y procesos asíncronos", "Intercambio controlado de datos y validación", "Reducción de pasos operativos repetitivos"],
          image: "/images/Seamless%20automation%20across%20business%20systems-3.webp",
        },
        {
          id: "maintenance-modernization",
          title: "Mantenimiento y modernización",
          capabilities: ["Mantenimiento de sitios web y sistemas existentes", "Actualización de dependencias y bases técnicas", "Mejoras de usabilidad móvil y accesibilidad", "Desarrollo progresivo de funciones y documentación"],
          image: "/images/Modernizing%20legacy%20software%20with%20care-4.webp",
        },
        {
          id: "digital-product-experience",
          title: "Producto digital y experiencia",
          capabilities: ["Revisión de usuarios y flujos operativos", "Estructura de interfaces y comportamiento responsivo", "Prototipos para validar un enfoque", "Consideraciones de accesibilidad y usabilidad"],
          image: "/images/Designing%20better%20journeys%2C%20together-5.webp",
        },
        {
          id: "data-applied-ai",
          title: "Datos e IA aplicada",
          capabilities: ["Organización de datos y reportes operativos", "Procesamiento asistido de documentos o información", "Exploración de flujos apoyados por IA", "Revisión humana e implementación controlada"],
          image: "/images/Analysts%20reviewing%20AI%20insights-6.webp",
        },
      ],
    },
    maintenance: {
      title: "Mantenimiento, modernización y mejora continua.",
      body: "El trabajo tecnológico no siempre empieza con un desarrollo nuevo. Nosotros podemos evaluar una solución existente, estabilizar sus bases y planificar mejoras por etapas cuando el alcance está confirmado.",
      contactLabel: "Conversar sobre una solución existente",
      items: ["Mantener sitios web y sistemas existentes", "Modernizar interfaces, dependencias y bases técnicas", "Mejorar la usabilidad móvil y la accesibilidad", "Incorporar funciones progresivamente y documentar soluciones existentes"],
    },
    process: {
      title: "Cómo trabajamos",
      introduction: "El alcance, los entregables, el calendario y las responsabilidades se acuerdan para cada servicio antes de iniciar la implementación.",
      steps: [
        { title: "Descubrimiento y contexto", body: "Nosotros revisamos la necesidad de negocio, las herramientas actuales, las restricciones y las personas que utilizarán la solución." },
        { title: "Alcance y propuesta", body: "Nosotros definimos un servicio viable con prioridades, entregables y responsabilidades confirmadas." },
        { title: "Diseño e implementación", body: "Nosotros estructuramos la experiencia y el trabajo técnico según el alcance aprobado." },
        { title: "Validación y entrega", body: "Nosotros revisamos la solución acordada, preparamos la entrega e identificamos los siguientes pasos operativos." },
        { title: "Mantenimiento y evolución", body: "Cuando se contrata, continuamos con mejoras, soporte y evolución técnica planificada." },
      ],
    },
    company: {
      title: "Tecnología construida alrededor de la operación de tu negocio.",
      body: "Barmentech combina comprensión de negocio con implementación tecnológica. Cuando corresponde, también podemos conectar a nuestros clientes con otros servicios especializados de Barmentech en formación de empresas e impuestos.",
      formationLabel: "Explorar Barmentech Formación",
    },
    finalCta: {
      title: "Trae una idea nueva, un sistema existente o un problema operativo.",
      body: "Nosotros comenzamos entendiendo el contexto y definiendo un alcance práctico para el siguiente paso, ya sea construir, conectar, estabilizar o mejorar una solución digital.",
      label: "Contactar a Barmentech",
    },
    servicePages: {
      "web-development": {
        eyebrow: "Sitios web y comercio electrónico",
        title: "Una presencia digital clara para la próxima conversación de negocio.",
        intro: "Nosotros construimos sitios públicos y experiencias de comercio en línea según la forma en que una empresa presenta sus servicios, productos y próximos pasos.",
        build: { title: "Qué podemos construir o apoyar", intro: "La combinación adecuada depende del objetivo, el contenido y los requisitos operativos confirmados.", items: ["Sitios corporativos y de servicios", "Landing pages y catálogos de productos", "Tiendas en línea y flujos de compra", "Implementación responsiva con bases de accesibilidad y rendimiento", "Experiencias multilingües", "Integraciones con formularios, pagos, analítica y herramientas de negocio cuando se requieren"] },
        needs: { title: "Adecuado cuando necesitas", items: ["Aclarar una oferta pública o ruta de servicio", "Crear un destino confiable para una campaña o iniciativa", "Organizar productos para un catálogo o tienda en línea", "Mejorar la experiencia móvil o la base técnica de un sitio existente"] },
        engagement: { title: "Cómo funciona el servicio", items: ["Nosotros revisamos audiencia, contenido, prioridades y herramientas actuales", "Nosotros confirmamos alcance, responsabilidades y un plan de entrega", "Nosotros diseñamos e implementamos la experiencia aprobada", "Nosotros validamos el resultado y preparamos la entrega acordada"] },
        maintenance: { title: "Diseñado para evolucionar", body: "Después del lanzamiento, nosotros podemos mantener la experiencia, mejorar rutas de contenido, modernizar dependencias o incorporar capacidades confirmadas progresivamente." },
        cta: { title: "Conversemos sobre tu sitio o comercio electrónico.", body: "Cuéntanos qué necesitan entender, encontrar o completar tus clientes en línea.", label: "Contactar a Barmentech" },
      },
      "custom-software": {
        eyebrow: "Sistemas a medida y plataformas SaaS",
        title: "Sistemas organizados alrededor del trabajo que tu negocio necesita coordinar.",
        intro: "Nosotros diseñamos y construimos aplicaciones para flujos operativos, experiencias de clientes e información que un equipo necesita gestionar deliberadamente.",
        build: { title: "Qué podemos construir o apoyar", intro: "Las capacidades se seleccionan según requisitos validados y el alcance de servicio acordado.", items: ["Sistemas empresariales internos", "Portales de clientes y operación", "Aplicaciones orientadas a flujos y paneles administrativos", "APIs, servicios de backend y bases de datos", "Acceso basado en roles cuando corresponde", "Bases SaaS multiempresa cuando corresponde"] },
        needs: { title: "Adecuado cuando necesitas", items: ["Llevar un proceso operativo repetido a un sistema de trabajo", "Dar a clientes o equipos un lugar más claro para completar tareas definidas", "Reemplazar hojas de cálculo desconectadas o entregas manuales", "Validar un concepto de aplicación antes de ampliarlo por etapas"] },
        engagement: { title: "Cómo funciona el servicio", items: ["Nosotros entendemos el flujo, usuarios, datos y restricciones", "Nosotros confirmamos un alcance por etapas, responsabilidades y dirección técnica", "Nosotros diseñamos e implementamos la base aprobada", "Nosotros validamos los flujos acordados antes de la entrega y evolución futura"] },
        maintenance: { title: "Una base para mejorar continuamente", body: "Nosotros podemos estabilizar un sistema existente, documentarlo, actualizar dependencias técnicas e introducir mejoras confirmadas con el tiempo." },
        cta: { title: "Conversemos sobre el sistema que necesitas.", body: "Comparte el flujo, los usuarios y el contexto operativo que necesitas respaldar.", label: "Contactar a Barmentech" },
      },
      automation: {
        eyebrow: "Automatización e integraciones",
        title: "Conecta el trabajo que debe circular entre tus herramientas existentes.",
        intro: "Nosotros planificamos e implementamos integraciones y automatizaciones controladas alrededor de los sistemas en los que tu equipo ya confía.",
        build: { title: "Qué podemos construir o apoyar", intro: "El trabajo de integración comienza con las plataformas disponibles, los datos involucrados y los controles que necesita el flujo.", items: ["Conexiones entre plataformas existentes", "Integraciones de APIs", "Automatización de flujos", "Notificaciones y procesos asíncronos", "Intercambio de datos controlado", "Planificación, validación y documentación de integraciones"] },
        needs: { title: "Adecuado cuando necesitas", items: ["Reducir entregas manuales repetidas entre herramientas aprobadas", "Mantener información definida alineada entre sistemas", "Activar una notificación o proceso de seguimiento revisado", "Planificar una integración antes de comprometer un cambio de sistema más amplio"] },
        engagement: { title: "Cómo funciona el servicio", items: ["Nosotros mapeamos el flujo actual, plataformas y límites de datos", "Nosotros confirmamos alcance, dependencias y criterios de validación", "Nosotros implementamos y probamos las conexiones aprobadas", "Nosotros preparamos la documentación acordada y los siguientes pasos operativos"] },
        maintenance: { title: "Soporte de integraciones con el tiempo", body: "Cuando los sistemas cambian, nosotros podemos revisar dependencias, ajustar conexiones confirmadas y mejorar la confiabilidad del flujo documentado." },
        cta: { title: "Conversemos sobre una integración o automatización.", body: "Cuéntanos qué sistemas participan y dónde el proceso actual necesita mayor continuidad.", label: "Contactar a Barmentech" },
      },
    },
  },
};

export function getTechnologyContent(locale: Locale): TechnologyContent {
  return content[locale];
}

export function isTechnologyServiceId(value: string): value is TechnologyServiceId {
  return technologyServiceIds.includes(value as TechnologyServiceId);
}

export function getTechnologyServicePath(locale: Locale, service: TechnologyServiceId): string {
  return `/${locale}/services/${service}`;
}

