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

export type TechnologyContactContent = {
  booking: {
    action: string;
    body: string;
    eyebrow: string;
    newTab: string;
    supportingNote: string;
    title: string;
  };
  body: string;
  guidance: {
    closing: string;
    emailAction: string;
    eyebrow: string;
    intro: string;
    items: string[];
    listTitle: string;
    title: string;
    whatsappAction: string;
    directTitle: string;
  };
  form: {
    companyLabel: string;
    countryLabel: string;
    emailInvalid: string;
    emailLabel: string;
    fullNameLabel: string;
    interestLabel: string;
    interestOptions: Array<{
      label: string;
      value: string;
    }>;
    interestPlaceholder: string;
    messageHelper: string;
    messageLabel: string;
    messageTooShort: string;
    phoneLabel: string;
    privacyConsentEnd: string;
    privacyConsentRequired: string;
    privacyConsentStart: string;
    privacyLinkLabel: string;
    rateLimitError: string;
    requiredField: string;
    sensitiveWarning: string;
    submitting: string;
    submit: string;
    success: {
      body: string;
      homeLabel: string;
      title: string;
    };
    temporaryError: string;
    fallback: {
      body: string;
      emailAction: string;
      title: string;
      whatsappAction: string;
    };
    title: string;
    validationError: string;
  };
  title: string;
};

type ServicePageEditorialBlock = {
  body: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  items: string[];
  title: string;
};

type ServicePageEditorialProcess = {
  introduction?: string;
  stages: Array<{
    body: string;
    eyebrow: string;
    title: string;
  }>;
  title: string;
};

type ServicePageEditorialPresentation = {
  blocks: ServicePageEditorialBlock[];
  heroImage: string;
  process: ServicePageEditorialProcess;
  variant: "editorial";
};

type ServicePageSystemCapability = {
  body: string;
  image: string;
  imageAlt: string;
  items: string[];
  label: string;
  title: string;
};

type ServicePageSystemPresentation = {
  capabilities: ServicePageSystemCapability[];
  heroCtaLabel: string;
  introTitle: string;
  variant: "systems";
};

type ServicePagePresentation = ServicePageEditorialPresentation | ServicePageSystemPresentation;

export type ServicePageContent = {
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
  engagement?: {
    items: string[];
    title: string;
  };
  eyebrow: string;
  intro: string;
  maintenance: {
    body: string;
    title: string;
  };
  needs?: {
    items: string[];
    title: string;
  };
  presentation?: ServicePagePresentation;
  title: string;
};

type TechnologyContent = {
  capabilities: string[];
  contact: TechnologyContactContent;
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
    contact: {
      title: "Let’s talk about the digital work ahead.",
      body: "Tell us whether you are planning a new website, improving an existing system, connecting tools, or defining a practical next step for your operation.",
      booking: {
        eyebrow: "Prefer a conversation?",
        title: "Schedule an initial call",
        body: "Choose a convenient time for a 30-minute conversation about your technology needs and the next practical step.",
        action: "Schedule a call",
        supportingNote: "Google Meet · 30 minutes",
        newTab: "opens in a new tab",
      },
      guidance: {
        eyebrow: "Barmentech Technology",
        title: "Start with the context.",
        intro: "Tell us what needs to work better, what your team uses today, and the outcome you are trying to reach. We will review the context and help define a practical next step.",
        listTitle: "Helpful details to include",
        items: ["The current process, system, or business need.", "The tools, platforms, or information already involved.", "The result your team or customers need.", "Any known priority, dependency, or operational constraint."],
        directTitle: "Prefer a direct conversation?",
        whatsappAction: "Continue on WhatsApp",
        emailAction: "Email support@barmentech.com",
        closing: "Please do not send passwords, authentication credentials, banking information, identity documents, tax records, or other sensitive files through these public channels.",
      },
      form: {
        title: "Tell us what you need to move forward",
        fullNameLabel: "Full name",
        emailLabel: "Email",
        emailInvalid: "Enter a valid email address.",
        phoneLabel: "Phone or WhatsApp (optional)",
        countryLabel: "Country",
        companyLabel: "Company (optional)",
        interestLabel: "Technology need",
        interestPlaceholder: "Select an area",
        interestOptions: [
          { label: "Websites and e-commerce", value: "websites-ecommerce" },
          { label: "Custom systems and SaaS", value: "custom-systems-saas" },
          { label: "Automation and integrations", value: "automation-integrations" },
          { label: "Maintenance and modernization", value: "maintenance-modernization" },
          { label: "Digital product and experience", value: "digital-product-experience" },
          { label: "Data and applied AI", value: "data-applied-ai" },
          { label: "Another technology need", value: "other" },
        ],
        messageLabel: "How can we help?",
        messageHelper: "Please keep your message to 1,800 characters or fewer.",
        messageTooShort: "Add a little more detail so we can understand your request.",
        sensitiveWarning: "Do not send passwords, authentication credentials, banking or payment information, identity documents, tax records, or other sensitive documents through this public form.",
        privacyConsentStart: "I have read the",
        privacyLinkLabel: "Privacy notice",
        privacyConsentEnd: "and agree that Barmentech may use my information to respond to this inquiry.",
        privacyConsentRequired: "Please confirm that you have read the privacy notice.",
        requiredField: "Please complete this field.",
        validationError: "Please review the information in your inquiry and try again.",
        rateLimitError: "Too many requests were sent. Please wait {seconds} before trying again.",
        temporaryError: "We could not send your message right now. Please try again shortly.",
        fallback: {
          title: "Contact Barmentech directly",
          body: "We could not send your inquiry through the form. Your information remains here. You can try again or contact Barmentech directly through WhatsApp or email.",
          whatsappAction: "Continue on WhatsApp",
          emailAction: "Email support@barmentech.com",
        },
        submitting: "Sending your message…",
        submit: "Send inquiry",
        success: {
          title: "We received your inquiry",
          body: "Thank you for contacting Barmentech. We will review your information and reach out using the details you provided.",
          homeLabel: "Return to Technology",
        },
      },
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
        title: "Websites and e-commerce for your business.",
        intro: "We build public websites and online commerce experiences around how a business presents its services, products, and next steps.",
        presentation: {
          blocks: [
            {
              eyebrow: "01 · Websites",
              title: "Corporate and service websites",
              body: "Present your business clearly and give customers a reliable place to understand your services. We design professional websites around your offer, audience, content, and next steps. Projects can include multilingual experiences when the business serves customers in more than one market.",
              items: ["Corporate and professional-service websites", "Clear service and contact paths", "Responsive and multilingual experiences"],
              image: "/images/barmentech-corporate-service-websites.webp",
              imageAlt: "Professional corporate website shown on a laptop screen",
            },
            {
              eyebrow: "02 · Campaigns and catalogs",
              title: "Landing pages and product catalogs",
              body: "Create focused digital destinations for campaigns, products, services, or new initiatives. We build landing pages and organized catalogs that help visitors understand an offer, explore available options, and take a defined next step.",
              items: ["Campaign and product landing pages", "Digital catalogs and featured collections", "Lead capture and conversion paths"],
              image: "/images/barmentech-landing-pages-product-catalogs.webp",
              imageAlt: "Landing-page and product-catalog interfaces shown across devices",
            },
            {
              eyebrow: "03 · E-commerce",
              title: "Online stores and purchase flows",
              body: "Turn product discovery into a clear and dependable buying experience. We design online stores and purchase journeys covering products, carts, checkout, payment, confirmation, and the operational information needed to fulfill an order.",
              items: ["Product pages, carts, and checkout", "Payment and order-confirmation flows", "Mobile-friendly purchasing experiences"],
              image: "/images/barmentech-online-stores-purchase-flows.webp",
              imageAlt: "Online store interface showing products and purchase information",
            },
            {
              eyebrow: "04 · Connected tools",
              title: "Forms, analytics, and business-tool integrations",
              body: "Connect your public website with the tools your business uses to respond, measure, and operate. When required, we integrate forms, payment platforms, analytics, email, CRM systems, and other approved business tools.",
              items: ["Contact, registration, and request forms", "Payments, analytics, CRM, and email", "APIs and controlled business-tool integrations"],
              image: "/images/barmentech-forms-payments-analytics-integrations.webp",
              imageAlt: "Business dashboard with forms and connected tools",
            },
          ],
          process: {
            title: "How we build your website",
            introduction: "Each project follows a defined process, adapted to the confirmed scope, content, integrations, and operating requirements.",
            stages: [
              {
                eyebrow: "Discovery",
                title: "Initial meeting and business context",
                body: "We begin by understanding your business, audience, objectives, current digital presence, and the actions customers need to complete.",
              },
              {
                eyebrow: "Planning",
                title: "Requirements, content and technical scope",
                body: "We define the required pages, content, functionality, integrations, responsibilities, delivery phases, and technical foundations before implementation begins.",
              },
              {
                eyebrow: "Implementation",
                title: "Design, development and integrations",
                body: "We design and build the approved experience, prepare responsive layouts, connect confirmed tools, and review progress throughout implementation.",
              },
              {
                eyebrow: "Delivery",
                title: "Quality assurance, launch and evolution",
                body: "We validate content, accessibility, responsive behavior, performance, forms, and integrations before launch, then define the agreed support and improvement path.",
              },
            ],
          },
          variant: "editorial",
          heroImage: "/images/Designing a polished online storefront-1.webp",
        },
        build: {
          title: "What we can build or support",
          intro: "We design focused digital experiences around your business objectives, content, customers, and operating requirements. Every implementation is responsive and built with accessibility, performance, and future evolution in mind.",
          items: [],
        },
        maintenance: { title: "Built to evolve", body: "After launch, we can maintain the experience, improve content paths, modernize dependencies, or add confirmed capabilities progressively." },
        cta: { title: "Discuss your website or commerce needs.", body: "Tell us what customers need to understand, find, or complete online.", label: "Contact Barmentech" },
      },
      "custom-software": {
        eyebrow: "Custom systems and SaaS platforms",
        title: "Custom systems for the way your business operates.",
        intro: "We design and build software that coordinates workflows, people, documents, financial processes, and business information within one deliberate operational experience.",
        presentation: {
          variant: "systems",
          heroCtaLabel: "Discuss your system",
          introTitle: "One connected operational foundation.",
          capabilities: [
            {
              label: "OPERATIONS AND WORKFORCE",
              title: "Operations and workforce systems",
              body: "Coordinate employees, schedules, attendance, responsibilities, and recurring operational work within one controlled environment.",
              items: ["Attendance, shifts, timesheets, and overtime", "Employees, roles, permissions, and records", "Tasks, approvals, and operational follow-up"],
              image: "/images/barmentech-saas-operations-workforce.webp",
              imageAlt: "Operations and workforce management interface with schedules and attendance records",
            },
            {
              label: "COMMERCIAL AND FINANCIAL WORKFLOWS",
              title: "Quoting, sales and billing systems",
              body: "Connect cost, margin, and pricing decisions with quotations, contracts, orders, invoices, payments, and receivables.",
              items: ["Cost, margin, and quotation workflows", "Orders, invoicing, payments, and receivables", "Commercial dashboards and financial reporting"],
              image: "/images/barmentech-saas-quoting-finance.webp",
              imageAlt: "Commercial pricing and financial workflow interface",
            },
            {
              label: "DOCUMENTS AND APPROVALS",
              title: "Contracts, documents, and web signatures",
              body: "Generate documents from approved information, guide users through structured workflows, and preserve a traceable record of every stage.",
              items: ["Contract and document generation", "Templates, forms, and PDF output", "Review, approval, and web-signature flows"],
              image: "/images/barmentech-saas-contracts-signatures.webp",
              imageAlt: "Contract workflow interface with document preview and approval controls",
            },
            {
              label: "SOFTWARE PRODUCTS",
              title: "Multi-tenant SaaS platforms",
              body: "Build software for multiple companies or operating units while keeping users, roles, workflows, configurations, and business information appropriately separated.",
              items: ["Company, tenant, user, and role management", "Configurable workflows and business rules", "APIs, integrations, notifications, and reporting"],
              image: "/images/barmentech-saas-multitenant-platform.webp",
              imageAlt: "Multi-tenant SaaS executive dashboard with company performance reporting",
            },
          ],
        },
        build: {
          title: "Systems we can design and build",
          intro: "The right solution begins with the operation that needs to work better. We define the workflows, users, information, decisions, and controls before selecting the modules and technical architecture.",
          items: [],
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
    contact: {
      title: "Conversemos sobre el trabajo digital que sigue.",
      body: "Cuéntanos si estás planificando un sitio web nuevo, mejorando un sistema existente, conectando herramientas o definiendo un siguiente paso práctico para tu operación.",
      booking: {
        eyebrow: "¿Prefieres conversar?",
        title: "Agenda una llamada inicial",
        body: "Elige un horario conveniente para conversar durante 30 minutos sobre tus necesidades tecnológicas y el siguiente paso práctico.",
        action: "Agendar una llamada",
        supportingNote: "Google Meet · 30 minutos",
        newTab: "se abre en una pestaña nueva",
      },
      guidance: {
        eyebrow: "Barmentech Tecnología",
        title: "Empecemos por el contexto.",
        intro: "Cuéntanos qué necesita funcionar mejor, qué utiliza hoy tu equipo y qué resultado deseas alcanzar. Revisaremos el contexto y te ayudaremos a definir un siguiente paso práctico.",
        listTitle: "Información útil para comenzar",
        items: ["El proceso, sistema o necesidad actual del negocio.", "Las herramientas, plataformas o información involucradas.", "El resultado que necesita tu equipo o tus clientes.", "Alguna prioridad, dependencia o restricción operativa conocida."],
        directTitle: "¿Prefieres una conversación directa?",
        whatsappAction: "Continuar por WhatsApp",
        emailAction: "Escribir a support@barmentech.com",
        closing: "No envíes contraseñas, credenciales de acceso, información bancaria, documentos de identidad, registros fiscales ni otros archivos sensibles mediante estos canales públicos.",
      },
      form: {
        title: "Cuéntanos qué necesitas para avanzar",
        fullNameLabel: "Nombre completo",
        emailLabel: "Correo electrónico",
        emailInvalid: "Ingresa una dirección de correo electrónico válida.",
        phoneLabel: "Teléfono o WhatsApp (opcional)",
        countryLabel: "País",
        companyLabel: "Empresa (opcional)",
        interestLabel: "Necesidad de tecnología",
        interestPlaceholder: "Selecciona un área",
        interestOptions: [
          { label: "Sitios web y comercio electrónico", value: "websites-ecommerce" },
          { label: "Sistemas a medida y SaaS", value: "custom-systems-saas" },
          { label: "Automatización e integraciones", value: "automation-integrations" },
          { label: "Mantenimiento y modernización", value: "maintenance-modernization" },
          { label: "Producto digital y experiencia", value: "digital-product-experience" },
          { label: "Datos e IA aplicada", value: "data-applied-ai" },
          { label: "Otra necesidad tecnológica", value: "other" },
        ],
        messageLabel: "¿Cómo podemos ayudarte?",
        messageHelper: "Mantén tu mensaje en 1.800 caracteres o menos.",
        messageTooShort: "Agrega un poco más de detalle para que podamos comprender tu consulta.",
        sensitiveWarning: "No envíes contraseñas, credenciales de autenticación, información bancaria o de pagos, documentos de identidad, registros fiscales ni otros documentos sensibles mediante este formulario público.",
        privacyConsentStart: "He leído el",
        privacyLinkLabel: "Aviso de privacidad",
        privacyConsentEnd: "y acepto que Barmentech use mi información para responder a esta consulta.",
        privacyConsentRequired: "Confirma que has leído el aviso de privacidad.",
        requiredField: "Completa este campo.",
        validationError: "Revisa la información de tu consulta e inténtalo de nuevo.",
        rateLimitError: "Se enviaron demasiadas solicitudes. Espera {seconds} antes de intentarlo de nuevo.",
        temporaryError: "No pudimos enviar tu mensaje en este momento. Inténtalo nuevamente en breve.",
        fallback: {
          title: "Contacta directamente a Barmentech",
          body: "No pudimos enviar tu consulta mediante el formulario. La información permanece aquí. Puedes intentarlo nuevamente o contactar directamente a Barmentech por WhatsApp o correo electrónico.",
          whatsappAction: "Continuar por WhatsApp",
          emailAction: "Escribir a support@barmentech.com",
        },
        submitting: "Enviando tu mensaje…",
        submit: "Enviar consulta",
        success: {
          title: "Recibimos tu consulta",
          body: "Gracias por contactar a Barmentech. Revisaremos tu información y nos comunicaremos utilizando los datos que proporcionaste.",
          homeLabel: "Volver a Tecnología",
        },
      },
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
        title: "Sitios web y comercio electrónico para su negocio.",
        intro: "Nosotros construimos sitios públicos y experiencias de comercio en línea según la forma en que una empresa presenta sus servicios, productos y próximos pasos.",
        presentation: {
          blocks: [
            {
              eyebrow: "01 · Sitios web",
              title: "Sitios corporativos y de servicios",
              body: "Presente su negocio con claridad y ofrezca a sus clientes un lugar confiable para comprender sus servicios. Diseñamos sitios profesionales alrededor de su oferta, audiencia, contenido y próximos pasos. Los proyectos pueden incluir experiencias multilingües cuando el negocio atiende más de un mercado.",
              items: ["Sitios corporativos y de servicios profesionales", "Rutas claras hacia servicios y contacto", "Experiencias responsivas y multilingües"],
              image: "/images/barmentech-corporate-service-websites.webp",
              imageAlt: "Sitio corporativo profesional mostrado en la pantalla de una computadora portátil",
            },
            {
              eyebrow: "02 · Campañas y catálogos",
              title: "Landing pages y catálogos de productos",
              body: "Cree destinos digitales enfocados para campañas, productos, servicios o nuevas iniciativas. Desarrollamos landing pages y catálogos organizados que ayudan a comprender una oferta, explorar opciones y completar un próximo paso definido.",
              items: ["Landing pages para campañas y productos", "Catálogos digitales y colecciones destacadas", "Captura de prospectos y rutas de conversión"],
              image: "/images/barmentech-landing-pages-product-catalogs.webp",
              imageAlt: "Interfaces de landing pages y catálogos de productos mostradas en varios dispositivos",
            },
            {
              eyebrow: "03 · Comercio electrónico",
              title: "Tiendas en línea y flujos de compra",
              body: "Convierta el descubrimiento de productos en una experiencia de compra clara y confiable. Diseñamos tiendas y recorridos de compra que abarcan productos, carrito, checkout, pago, confirmación y la información operativa necesaria para completar el pedido.",
              items: ["Productos, carrito y checkout", "Pagos y confirmación de pedidos", "Experiencias de compra optimizadas para dispositivos móviles"],
              image: "/images/barmentech-online-stores-purchase-flows.webp",
              imageAlt: "Interfaz de tienda en línea con productos e información de compra",
            },
            {
              eyebrow: "04 · Herramientas conectadas",
              title: "Formularios, analítica e integraciones empresariales",
              body: "Conecte su sitio público con las herramientas que utiliza su negocio para responder, medir y operar. Cuando se requiere, integramos formularios, plataformas de pago, analítica, correo electrónico, CRM y otras herramientas empresariales aprobadas.",
              items: ["Formularios de contacto, registro y solicitudes", "Pagos, analítica, CRM y correo electrónico", "APIs e integraciones controladas con herramientas empresariales"],
              image: "/images/barmentech-forms-payments-analytics-integrations.webp",
              imageAlt: "Panel empresarial con formularios y herramientas conectadas",
            },
          ],
          process: {
            title: "Cómo construimos su sitio web",
            introduction: "Cada proyecto sigue un proceso definido, adaptado al alcance, contenido, integraciones y requisitos operativos confirmados.",
            stages: [
              {
                eyebrow: "Descubrimiento",
                title: "Reunión inicial y contexto del negocio",
                body: "Comenzamos comprendiendo su negocio, audiencia, objetivos, presencia digital actual y las acciones que sus clientes necesitan completar.",
              },
              {
                eyebrow: "Planificación",
                title: "Requisitos, contenido y alcance técnico",
                body: "Definimos las páginas, el contenido, las funcionalidades, las integraciones, las responsabilidades, las etapas de entrega y las bases técnicas antes de iniciar la implementación.",
              },
              {
                eyebrow: "Implementación",
                title: "Diseño, desarrollo e integraciones",
                body: "Diseñamos y construimos la experiencia aprobada, preparamos las vistas responsivas, conectamos las herramientas confirmadas y revisamos el avance durante la implementación.",
              },
              {
                eyebrow: "Entrega",
                title: "Control de calidad, lanzamiento y evolución",
                body: "Validamos el contenido, la accesibilidad, el comportamiento responsivo, el rendimiento, los formularios y las integraciones antes del lanzamiento, y luego definimos la ruta acordada de soporte y mejora.",
              },
            ],
          },
          variant: "editorial",
          heroImage: "/images/Designing a polished online storefront-1.webp",
        },
        build: { title: "Qué podemos construir o apoyar", intro: "Diseñamos experiencias digitales enfocadas en los objetivos, el contenido, los clientes y los requisitos operativos de su negocio. Cada implementación es responsiva y se desarrolla considerando accesibilidad, rendimiento y evolución futura.", items: [] },
        maintenance: { title: "Diseñado para evolucionar", body: "Después del lanzamiento, nosotros podemos mantener la experiencia, mejorar rutas de contenido, modernizar dependencias o incorporar capacidades confirmadas progresivamente." },
        cta: { title: "Conversemos sobre tu sitio o comercio electrónico.", body: "Cuéntanos qué necesitan entender, encontrar o completar tus clientes en línea.", label: "Contactar a Barmentech" },
      },
      "custom-software": {
        eyebrow: "Sistemas a medida y plataformas SaaS",
        title: "Sistemas a medida para la operación de su negocio.",
        intro: "Diseñamos y construimos software que coordina flujos de trabajo, personas, documentos, procesos financieros e información empresarial dentro de una experiencia operativa deliberada.",
        presentation: {
          variant: "systems",
          heroCtaLabel: "Conversemos sobre su sistema",
          introTitle: "Una base operativa conectada.",
          capabilities: [
            {
              label: "OPERACIONES Y PERSONAL",
              title: "Sistemas de operaciones y personal",
              body: "Coordine empleados, horarios, asistencia, responsabilidades y trabajo operativo recurrente dentro de un entorno controlado.",
              items: ["Asistencia, turnos, marcajes y horas extra", "Empleados, roles, permisos y expedientes", "Tareas, aprobaciones y seguimiento operativo"],
              image: "/images/barmentech-saas-operations-workforce.webp",
              imageAlt: "Interfaz de gestión de operaciones y personal con horarios y registros de asistencia",
            },
            {
              label: "FLUJOS COMERCIALES Y FINANCIEROS",
              title: "Sistemas de cotización, ventas y facturación",
              body: "Conecte las decisiones de costos, márgenes y precios con cotizaciones, contratos, órdenes, facturas, pagos y cuentas por cobrar.",
              items: ["Flujos de costos, márgenes y cotización", "Órdenes, facturación, pagos y cuentas por cobrar", "Paneles comerciales y reportes financieros"],
              image: "/images/barmentech-saas-quoting-finance.webp",
              imageAlt: "Interfaz de flujos comerciales de precios y finanzas",
            },
            {
              label: "DOCUMENTOS Y APROBACIONES",
              title: "Contratos, documentos y firmas web",
              body: "Genere documentos a partir de información aprobada, guíe a los usuarios mediante flujos estructurados y conserve un registro trazable de cada etapa.",
              items: ["Generación de contratos y documentos", "Plantillas, formularios y archivos PDF", "Flujos de revisión, aprobación y firma web"],
              image: "/images/barmentech-saas-contracts-signatures.webp",
              imageAlt: "Interfaz de flujo de contrato con vista previa de documento y controles de aprobación",
            },
            {
              label: "PRODUCTOS DE SOFTWARE",
              title: "Plataformas SaaS multiempresa",
              body: "Construya software para varias empresas o unidades operativas, manteniendo separados los usuarios, roles, flujos, configuraciones e información empresarial.",
              items: ["Administración de empresas, usuarios y roles", "Flujos configurables y reglas de negocio", "APIs, integraciones, notificaciones y reportes"],
              image: "/images/barmentech-saas-multitenant-platform.webp",
              imageAlt: "Panel ejecutivo de SaaS multiempresa con reportes de desempeño por empresa",
            },
          ],
        },
        build: { title: "Sistemas que podemos diseñar y construir", intro: "La solución adecuada comienza con la operación que necesita funcionar mejor. Definimos los flujos, usuarios, información, decisiones y controles antes de seleccionar los módulos y la arquitectura técnica.", items: [] },
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

