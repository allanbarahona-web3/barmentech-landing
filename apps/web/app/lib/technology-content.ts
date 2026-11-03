import type { Locale } from "./i18n";

export const technologyServiceIds = ["web-development", "custom-software", "automation"] as const;

export type TechnologyServiceId = (typeof technologyServiceIds)[number];

export type TechnologyRailCard = {
  capabilities: string[];
  id: string;
  image: string;
  relatedNavigation?: {
    action: string;
    category: string;
    description: string;
    title: string;
  };
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
    callRequest: {
      action: string;
      helper: string;
      phoneLabel: string;
      title: string;
    };
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
  workflow: {
    closingEyebrow: string;
    eyebrow: string;
    introduction: string;
    steps: Array<{
      body: string;
      eyebrow: string;
      title: string;
    }>;
    title: string;
  };
};

type ServicePagePresentation = ServicePageEditorialPresentation | ServicePageSystemPresentation;

type ServicePageAutomationCapability = {
  description: string;
  items: string[];
  label: string;
  title: string;
};

type ServicePageAutomationVisualType = "workflow" | "messages" | "knowledge" | "integration";

type ServicePageAutomationJourney = {
  eyebrow: string;
  introduction: string;
  stages: Array<{
    explanation: string;
    label: string;
    needs: string;
    needsLabel: string;
    receives: string;
    receivesLabel: string;
    title: string;
  }>;
  support: {
    body: string;
    eyebrow: string;
    title: string;
  };
  title: string;
};

type ServicePageAutomationCapabilities = {
  blocks: ServicePageAutomationCapability[];
  bridge: Array<{
    label: string;
    statement: string;
  }>;
  closing: {
    body: string;
    title: string;
  };
  eyebrow: string;
  introduction: string;
  journey: ServicePageAutomationJourney;
  title: string;
  visualLabels: Record<ServicePageAutomationVisualType, [string, string, string, string]>;
};

export type ServicePageContent = {
  automationCapabilities?: ServicePageAutomationCapabilities;
  build?: {
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
  heroImage?: string;
  intro: string;
  maintenance?: {
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

export type TechnologyAboutContent = {
  broaderBusiness: {
    body: string;
    title: string;
  };
  cta: {
    body: string;
    eyebrow: string;
    label: string;
    title: string;
  };
  faq: {
    items: Array<{
      answer: string;
      question: string;
    }>;
    title: string;
  };
  founder: {
    alt: string;
    eyebrow: string;
    name: string;
    paragraphs: string[];
    role: string;
    title: string;
  };
  hero: {
    body: string;
    eyebrow: string;
    label: string;
    title: string;
    trustLine: string;
  };
  metadata: {
    description: string;
    title: string;
  };
  method: {
    eyebrow: string;
    stages: Array<{
      body: string;
      title: string;
    }>;
    title: string;
  };
  perspective: {
    body: string;
    detail: string;
    eyebrow: string;
    title: string;
  };
  presence: {
    body: string;
    details: string[];
    eyebrow: string;
    title: string;
  };
  servicesTitle: string;
};

type TechnologyContent = {
  about: TechnologyAboutContent;
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
    relatedTitle: string;
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
    about: {
      metadata: {
        title: "About Barmentech | Technology and Operational Experience",
        description: "Learn how Barmentech combines operational experience with websites, custom systems, integrations, automation, and applied AI for businesses in the United States and beyond.",
      },
      hero: {
        eyebrow: "ABOUT BARMENTECH",
        title: "Technology shaped by real operational experience.",
        body: "Barmentech LLC builds websites, business systems, integrations, and carefully applied automation for organizations that need technology to support the way work actually happens.",
        trustLine: "United States company · Office operations in Costa Rica · Service in English and Spanish",
        label: "Discuss your project",
      },
      perspective: {
        eyebrow: "WHY BARMENTECH EXISTS",
        title: "The process should determine the technology.",
        body: "Business technology works best when it begins with a clear understanding of the operation. Barmentech studies the workflow, the people involved, the information being handled, and the result the organization needs before defining the solution.",
        detail: "This approach allows us to choose between a focused website, a custom operational system, an integration, conventional automation, or applied AI without forcing every business problem into the same answer.",
      },
      founder: {
        eyebrow: "FOUNDER-LED",
        title: "Operational experience brought into every project.",
        name: "Allan Barahona",
        role: "Founder, Barmentech LLC",
        alt: "Portrait of Allan Barahona, founder of Barmentech",
        paragraphs: [
          "Before founding Barmentech, Allan spent approximately 12 years working in multinational environments connected to financial and capital-market operations. That experience developed a practical understanding of structured processes, operational controls, accuracy, and the responsibility involved in handling business information.",
          "His most recent corporate experience was at Amazon, supporting work related to automation and machine-learning vision. His responsibilities included auditing human-performed processes, labeling movement information used by machine-learning systems, and coordinating a small team.",
          "In 2025, Allan left his corporate role to focus on building technology products and practical business services through Barmentech. Today, he works directly with clients to understand their operations, define an appropriate scope, and guide the development of the agreed solution.",
        ],
      },
      method: {
        eyebrow: "FROM EXPERIENCE TO METHOD",
        title: "A disciplined way to move from need to working system.",
        stages: [
          { title: "Understand the operation", body: "We review the current workflow, responsibilities, information, and constraints." },
          { title: "Define a practical scope", body: "We agree on priorities, boundaries, and the result the first stage must deliver." },
          { title: "Build and review", body: "The solution is developed in focused stages so important decisions can be reviewed as the work advances." },
          { title: "Prepare for real use", body: "We validate the agreed workflow, document the solution, and prepare the next operational step." },
        ],
      },
      presence: {
        eyebrow: "BUSINESS PRESENCE",
        title: "Structured in the United States. Operated close to the work.",
        body: "Barmentech LLC provides technology and business services through its United States structure, with office operations and client support in Costa Rica. This combination supports businesses that need clear communication across markets and service in either English or Spanish.",
        details: ["Barmentech LLC — United States", "Business presence in the United States", "Office operations in Costa Rica", "English and Spanish service"],
      },
      broaderBusiness: {
        title: "Technology considered in its business context.",
        body: "Alongside its technology work, Barmentech supports a separate service line related to United States business formation and administrative operations. That experience reinforces an understanding that software, documentation, responsibilities, and regulatory processes must work together in the real operation.",
      },
      servicesTitle: "Explore our technology services",
      faq: {
        title: "Frequently asked questions",
        items: [
          { question: "Where is Barmentech based?", answer: "Barmentech LLC is a United States company with business presence in the United States and office operations and client support in Costa Rica." },
          { question: "Do you work with clients outside the United States?", answer: "Yes. Barmentech can work remotely with businesses in different markets when the project scope, communication, and delivery requirements can be supported appropriately." },
          { question: "Is service available in Spanish?", answer: "Yes. Client communication and project discussions are available in English and Spanish." },
          { question: "Does the founder participate directly in projects?", answer: "Yes. Allan participates directly in discovery, scope definition, important project decisions, and review of the agreed solution." },
          { question: "Does every automation project use artificial intelligence?", answer: "No. Barmentech first determines whether the need can be solved reliably with clear rules, integrations, or conventional automation. Applied AI is introduced only when interpretation, language, or business knowledge makes it useful." },
          { question: "Can Barmentech improve an existing website or system?", answer: "Yes. Existing solutions can be reviewed to determine whether improvement, integration, modernization, or replacement is the most practical next step." },
        ],
      },
      cta: {
        eyebrow: "START A CONVERSATION",
        title: "Tell us what your business needs to improve.",
        body: "Share the workflow, system, or customer experience you want to strengthen. We will help you determine an appropriate next step.",
        label: "Contact Barmentech",
      },
    },
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
        callRequest: {
          action: "Request a call",
          title: "Request a call",
          helper: "Tell us how to reach you and briefly describe what you would like to discuss.",
          phoneLabel: "Phone or WhatsApp number",
        },
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
          { label: "Call request", value: "call-request" },
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
      relatedTitle: "Explore other technology services",
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
          relatedNavigation: {
            category: "DIGITAL PRESENCE",
            description: "Focused websites, landing pages, and digital catalogs built around clear business goals.",
            action: "Explore websites",
            title: "Websites and e-commerce",
          },
          capabilities: ["Corporate and service websites", "Landing pages and digital catalogs", "Online stores and payment integrations", "Responsive, accessible, and multilingual foundations"],
          image: "/images/Designing%20a%20polished%20online%20storefront-1.webp",
        },
        {
          id: "custom-software",
          serviceId: "custom-software",
          title: "Custom systems and SaaS platforms",
          relatedNavigation: {
            category: "CUSTOM SOFTWARE",
            description: "Operational systems, portals, and workflow applications built for defined business processes.",
            action: "Explore custom systems",
            title: "Custom systems and SaaS",
          },
          capabilities: ["Internal systems, portals, and dashboards", "Workflow-oriented applications", "APIs and business rules", "SaaS foundations for validated requirements"],
          image: "/images/Collaborative%20business%20systems%20in%20action-2.webp",
        },
        {
          id: "automation",
          serviceId: "automation",
          title: "Automation and integrations",
          relatedNavigation: {
            category: "CONNECTED OPERATIONS",
            description: "Controlled workflows that connect systems, communications, documents, and business information.",
            action: "Explore automation",
            title: "Automation and integrations",
          },
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
          workflow: {
            eyebrow: "CUSTOM SYSTEMS AND SAAS PLATFORMS",
            title: "How we work",
            introduction: "We turn an operational need into a controlled system through a phased process that keeps priorities, responsibilities, and technical decisions clear.",
            steps: [
              { eyebrow: "UNDERSTAND", title: "Understand the operation", body: "We review workflows, users, information, constraints, and the decisions the system needs to support." },
              { eyebrow: "DEFINE", title: "Define scope and direction", body: "We confirm priorities, responsibilities, integrations, delivery phases, and the approved technical foundation." },
              { eyebrow: "BUILD", title: "Design and build", body: "We implement the agreed experience, review progress, and validate important decisions throughout development." },
              { eyebrow: "EVOLVE", title: "Validate and evolve", body: "We test the agreed workflows, prepare the handoff, and define the support and improvement path that follows." },
            ],
            closingEyebrow: "CONTINUOUS IMPROVEMENT",
          },
        },
        build: {
          title: "Systems we can design and build",
          intro: "The right solution begins with the operation that needs to work better. We define the workflows, users, information, decisions, and controls before selecting the modules and technical architecture.",
          items: [],
        },
        maintenance: { title: "A foundation built to evolve", body: "After delivery, we can stabilize, document, maintain, and extend the system through confirmed improvements over time." },
        cta: { title: "Discuss a system your business needs.", body: "Share the workflow, users, and operational context you need to support.", label: "Contact Barmentech" },
      },
      automation: {
        eyebrow: "Automation, integrations and applied AI",
        title: "Automate the work. Connect your systems. Apply AI with purpose.",
        heroImage: "/images/service-automation-integrations-hero.webp",
        intro: "We plan and implement controlled integrations and automations around the systems your team already relies on.",
        automationCapabilities: {
          eyebrow: "CONNECTED OPERATIONS",
          title: "Automate the predictable. Apply intelligence where it matters.",
          introduction: "We connect approved tools, information, and communication steps into controlled workflows. Clear rules handle repeatable work, while AI supports the moments that require interpretation, language, or business knowledge.",
          bridge: [
            { label: "RULE-BASED AUTOMATION", statement: "Automate repeatable actions" },
            { label: "CONTROLLED INTEGRATIONS", statement: "Connect approved systems" },
            { label: "APPLIED AI", statement: "Support interpretation and knowledge" },
          ],
          journey: {
            eyebrow: "HOW WE WORK WITH YOU",
            title: "A clear path from the current process to a working solution",
            introduction: "We begin with how the work happens today, agree on what should change, and implement the solution in controlled stages. You can review the direction before the project moves forward.",
            stages: [
              {
                label: "UNDERSTAND",
                title: "Show us how the work happens today",
                explanation: "You explain the task, the people involved, the tools currently used, and where delays, repeated work, or missed follow-ups occur.",
                needsLabel: "WHAT WE NEED FROM YOU",
                needs: "A real example of the current process and the result you want to improve.",
                receivesLabel: "WHAT YOU RECEIVE",
                receives: "A shared understanding of the problem, priority, and desired outcome.",
              },
              {
                label: "DEFINE",
                title: "Agree on the right approach",
                explanation: "We identify which steps can follow clear automation rules, which systems may need to connect, and where human review or applied AI could add value.",
                needsLabel: "WHAT WE NEED FROM YOU",
                needs: "Confirmation of priorities, responsible people, and the tools that must remain part of the process.",
                receivesLabel: "WHAT YOU RECEIVE",
                receives: "A proposed scope, responsibilities, implementation stages, and agreed direction.",
              },
              {
                label: "BUILD AND TEST",
                title: "Review a focused working version",
                explanation: "We build the agreed first version and test it using representative situations before expanding the workflow.",
                needsLabel: "WHAT WE NEED FROM YOU",
                needs: "Timely review, practical examples, and feedback from the people who will use the solution.",
                receivesLabel: "WHAT YOU RECEIVE",
                receives: "A tested workflow that reflects the approved scope and identified corrections.",
              },
              {
                label: "PREPARE FOR USE",
                title: "Put the approved workflow into operation",
                explanation: "After validation, we prepare the agreed workflow for use, document its main steps, and clarify responsibilities for operation and future changes.",
                needsLabel: "WHAT WE NEED FROM YOU",
                needs: "Final approval and confirmation of the people responsible for using or supervising the workflow.",
                receivesLabel: "WHAT YOU RECEIVE",
                receives: "An approved working solution with documented operation and agreed next steps.",
              },
            ],
            support: {
              eyebrow: "AFTER IMPLEMENTATION",
              title: "Support can continue as the workflow evolves",
              body: "When included in the agreed scope, we can review platform changes, adjust confirmed workflows, update documentation, and implement approved improvements over time.",
            },
          },
          visualLabels: {
            workflow: ["REQUEST", "RULE", "ACTION", "APPROVED"],
            messages: ["MESSAGE", "ASSIST", "CAPTURE", "HANDOFF"],
            knowledge: ["DOCUMENT", "EXTRACT", "ORGANIZE", "ANSWER"],
            integration: ["SYSTEM A", "VALIDATE", "SYSTEM B", "CONFIRMED"],
          },
          blocks: [
            {
              label: "WORKFLOW AUTOMATION",
              title: "Keep recurring work moving",
              description: "Automate defined actions such as sending emails, scheduling reminders, creating documents, updating records, and notifying the right people when a workflow changes.",
              items: ["Email delivery and scheduled follow-ups", "Reminders, alerts, and internal notifications", "Document creation and record updates", "Human review points for sensitive actions"],
            },
            {
              label: "BOTS AND CONVERSATIONAL CHANNELS",
              title: "Guide requests from the first message",
              description: "Create focused assistants for web, WhatsApp, or Telegram that collect information, answer defined questions, initiate workflows, and transfer the conversation when human support is required.",
              items: ["Structured customer or employee intake", "Frequently requested information", "Workflow initiation from approved channels", "Escalation to a responsible person"],
            },
            {
              label: "DOCUMENTS AND BUSINESS KNOWLEDGE",
              title: "Turn approved information into usable answers",
              description: "Extract supported information from documents, organize trusted company knowledge, and help users find answers grounded in authorized business content.",
              items: ["OCR-assisted data extraction", "Document classification and validation", "Internal knowledge bases", "AI assistants grounded in approved information"],
            },
            {
              label: "INTEGRATIONS AND AI-ENABLED MVPs",
              title: "Connect systems and validate new ideas",
              description: "Build controlled API connections, synchronize defined data, and create focused MVPs that test an automation or AI-assisted workflow before broader investment.",
              items: ["API and platform integrations", "Controlled data exchange", "AI-assisted drafting and classification", "Focused MVPs with measurable scope"],
            },
          ],
          closing: {
            title: "The process determines the technology.",
            body: "We do not add AI to every workflow. We select the simplest reliable approach, document its controls, and introduce intelligence only when it improves the result.",
          },
        },
        cta: { title: "Discuss an integration or automation need.", body: "Tell us which systems are involved and where the current process needs more continuity.", label: "Contact Barmentech" },
      },
    },
  },
  es: {
    about: {
      metadata: {
        title: "Acerca de Barmentech | Tecnología y experiencia operativa",
        description: "Conozca cómo Barmentech combina experiencia operativa con sitios web, sistemas a medida, integraciones, automatización e IA aplicada para empresas en Estados Unidos y otros mercados.",
      },
      hero: {
        eyebrow: "ACERCA DE BARMENTECH",
        title: "Tecnología definida por experiencia operativa real.",
        body: "Barmentech LLC construye sitios web, sistemas empresariales, integraciones y automatización aplicada con criterio para organizaciones que necesitan tecnología que respalde la forma en que el trabajo ocurre realmente.",
        trustLine: "Empresa de Estados Unidos · Operación de oficina en Costa Rica · Atención en inglés y español",
        label: "Conversemos sobre su proyecto",
      },
      perspective: {
        eyebrow: "POR QUÉ EXISTE BARMENTECH",
        title: "El proceso debe determinar la tecnología.",
        body: "La tecnología empresarial funciona mejor cuando comienza con una comprensión clara de la operación. Barmentech estudia el flujo de trabajo, las personas involucradas, la información que se maneja y el resultado que necesita la organización antes de definir la solución.",
        detail: "Este enfoque nos permite elegir entre un sitio web enfocado, un sistema operativo a medida, una integración, automatización convencional o IA aplicada, sin forzar cada problema empresarial dentro de la misma respuesta.",
      },
      founder: {
        eyebrow: "DIRIGIDA POR SU FUNDADOR",
        title: "Experiencia operativa presente en cada proyecto.",
        name: "Allan Barahona",
        role: "Fundador, Barmentech LLC",
        alt: "Retrato de Allan Barahona, fundador de Barmentech",
        paragraphs: [
          "Antes de fundar Barmentech, Allan trabajó durante aproximadamente 12 años en entornos multinacionales relacionados con operaciones financieras y mercados de capitales. Esa experiencia desarrolló una comprensión práctica de los procesos estructurados, los controles operativos, la precisión y la responsabilidad asociada con el manejo de información empresarial.",
          "Su experiencia corporativa más reciente fue en Amazon, apoyando labores relacionadas con automatización y visión mediante aprendizaje automático. Sus responsabilidades incluyeron auditar procesos realizados por personas, etiquetar información de movimientos utilizada por sistemas de aprendizaje automático y coordinar un equipo pequeño.",
          "En 2025, Allan dejó su posición corporativa para concentrarse en construir productos tecnológicos y servicios empresariales prácticos mediante Barmentech. Actualmente trabaja directamente con los clientes para comprender sus operaciones, definir un alcance apropiado y orientar el desarrollo de la solución acordada.",
        ],
      },
      method: {
        eyebrow: "DE LA EXPERIENCIA AL MÉTODO",
        title: "Una forma disciplinada de pasar de la necesidad a un sistema funcional.",
        stages: [
          { title: "Entender la operación", body: "Revisamos el flujo actual, las responsabilidades, la información y las limitaciones." },
          { title: "Definir un alcance práctico", body: "Acordamos las prioridades, los límites y el resultado que debe entregar la primera etapa." },
          { title: "Construir y revisar", body: "La solución se desarrolla en etapas enfocadas para revisar las decisiones importantes conforme avanza el trabajo." },
          { title: "Preparar para el uso real", body: "Validamos el flujo acordado, documentamos la solución y preparamos el siguiente paso operativo." },
        ],
      },
      presence: {
        eyebrow: "PRESENCIA EMPRESARIAL",
        title: "Estructurada en Estados Unidos. Operada cerca del trabajo.",
        body: "Barmentech LLC brinda servicios tecnológicos y empresariales mediante su estructura en Estados Unidos, con operación de oficina y atención al cliente en Costa Rica. Esta combinación respalda a empresas que necesitan comunicación clara entre mercados y servicio en inglés o español.",
        details: ["Barmentech LLC — Estados Unidos", "Presencia empresarial en Estados Unidos", "Operación de oficina en Costa Rica", "Atención en inglés y español"],
      },
      broaderBusiness: {
        title: "Tecnología considerada dentro de su contexto empresarial.",
        body: "Además de su trabajo tecnológico, Barmentech mantiene una línea separada de servicios relacionados con la formación de empresas en Estados Unidos y sus operaciones administrativas. Esa experiencia refuerza la comprensión de que el software, la documentación, las responsabilidades y los procesos regulatorios deben funcionar juntos dentro de la operación real.",
      },
      servicesTitle: "Explore nuestros servicios tecnológicos",
      faq: {
        title: "Preguntas frecuentes",
        items: [
          { question: "¿Dónde está ubicada Barmentech?", answer: "Barmentech LLC es una empresa de Estados Unidos con presencia empresarial en ese país y operación de oficina y atención al cliente en Costa Rica." },
          { question: "¿Trabajan con clientes fuera de Estados Unidos?", answer: "Sí. Barmentech puede trabajar de forma remota con empresas de distintos mercados cuando el alcance, la comunicación y los requisitos de entrega pueden atenderse adecuadamente." },
          { question: "¿La atención está disponible en español?", answer: "Sí. La comunicación con clientes y las conversaciones del proyecto están disponibles en inglés y español." },
          { question: "¿El fundador participa directamente en los proyectos?", answer: "Sí. Allan participa directamente en el análisis inicial, la definición del alcance, las decisiones importantes y la revisión de la solución acordada." },
          { question: "¿Todos los proyectos de automatización utilizan inteligencia artificial?", answer: "No. Barmentech primero determina si la necesidad puede resolverse de forma confiable mediante reglas claras, integraciones o automatización convencional. La IA aplicada se incorpora únicamente cuando la interpretación, el lenguaje o el conocimiento empresarial la hacen útil." },
          { question: "¿Puede Barmentech mejorar un sitio web o sistema existente?", answer: "Sí. Las soluciones existentes pueden revisarse para determinar si la mejora, integración, modernización o sustitución es el siguiente paso más práctico." },
        ],
      },
      cta: {
        eyebrow: "INICIEMOS UNA CONVERSACIÓN",
        title: "Cuéntenos qué necesita mejorar su empresa.",
        body: "Comparta el flujo, sistema o experiencia del cliente que desea fortalecer. Le ayudaremos a determinar un siguiente paso apropiado.",
        label: "Contactar a Barmentech",
      },
    },
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
        callRequest: {
          action: "Solicitar una llamada",
          title: "Solicitar una llamada",
          helper: "Indíquenos cómo contactarle y describa brevemente lo que desea conversar.",
          phoneLabel: "Teléfono o WhatsApp",
        },
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
          { label: "Solicitud de llamada", value: "call-request" },
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
      relatedTitle: "Explore otros servicios tecnológicos",
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
          relatedNavigation: {
            category: "PRESENCIA DIGITAL",
            description: "Sitios web, páginas de destino y catálogos digitales creados alrededor de objetivos empresariales claros.",
            action: "Explorar sitios web",
            title: "Sitios web y comercio electrónico",
          },
          capabilities: ["Sitios corporativos y de servicios", "Landing pages y catálogos digitales", "Tiendas en línea e integraciones de pago", "Bases responsivas, accesibles y multilingües"],
          image: "/images/Designing%20a%20polished%20online%20storefront-1.webp",
        },
        {
          id: "custom-software",
          serviceId: "custom-software",
          title: "Sistemas a medida y plataformas SaaS",
          relatedNavigation: {
            category: "SOFTWARE A MEDIDA",
            description: "Sistemas operativos, portales y aplicaciones de flujo creados para procesos empresariales definidos.",
            action: "Explorar sistemas",
            title: "Sistemas a medida y SaaS",
          },
          capabilities: ["Sistemas internos, portales y paneles", "Aplicaciones orientadas a flujos", "APIs y reglas de negocio", "Bases SaaS para requisitos validados"],
          image: "/images/Collaborative%20business%20systems%20in%20action-2.webp",
        },
        {
          id: "automation",
          serviceId: "automation",
          title: "Automatización e integraciones",
          relatedNavigation: {
            category: "OPERACIONES CONECTADAS",
            description: "Flujos controlados que conectan sistemas, comunicaciones, documentos e información empresarial.",
            action: "Explorar automatización",
            title: "Automatización e integraciones",
          },
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
          workflow: {
            eyebrow: "SISTEMAS A MEDIDA Y PLATAFORMAS SAAS",
            title: "Cómo trabajamos",
            introduction: "Convertimos una necesidad operativa en un sistema controlado mediante un proceso por etapas que mantiene claras las prioridades, responsabilidades y decisiones técnicas.",
            steps: [
              { eyebrow: "ENTENDER", title: "Entender la operación", body: "Revisamos los flujos, usuarios, información, restricciones y decisiones que el sistema necesita respaldar." },
              { eyebrow: "DEFINIR", title: "Definir el alcance y la dirección", body: "Confirmamos prioridades, responsabilidades, integraciones, fases de entrega y la base técnica aprobada." },
              { eyebrow: "CONSTRUIR", title: "Diseñar y construir", body: "Implementamos la experiencia acordada, revisamos avances y validamos las decisiones importantes durante el desarrollo." },
              { eyebrow: "EVOLUCIONAR", title: "Validar y evolucionar", body: "Probamos los flujos acordados, preparamos la entrega y definimos el camino de soporte y mejora posterior." },
            ],
            closingEyebrow: "MEJORA CONTINUA",
          },
        },
        build: { title: "Sistemas que podemos diseñar y construir", intro: "La solución adecuada comienza con la operación que necesita funcionar mejor. Definimos los flujos, usuarios, información, decisiones y controles antes de seleccionar los módulos y la arquitectura técnica.", items: [] },
        maintenance: { title: "Una base preparada para evolucionar", body: "Después de la entrega, podemos estabilizar, documentar, mantener y ampliar el sistema mediante mejoras confirmadas con el tiempo." },
        cta: { title: "Conversemos sobre el sistema que su negocio necesita.", body: "Comparta el flujo, los usuarios y el contexto operativo que necesita respaldar.", label: "Contactar a Barmentech" },
      },
      automation: {
        eyebrow: "Automatización, integraciones e IA aplicada",
        title: "Automatice el trabajo. Conecte sus sistemas. Aplique IA con propósito.",
        heroImage: "/images/service-automation-integrations-hero.webp",
        intro: "Nosotros planificamos e implementamos integraciones y automatizaciones controladas alrededor de los sistemas en los que tu equipo ya confía.",
        automationCapabilities: {
          eyebrow: "OPERACIONES CONECTADAS",
          title: "Automatizamos lo predecible. Aplicamos inteligencia donde aporta valor.",
          introduction: "Conectamos herramientas aprobadas, información y pasos de comunicación mediante flujos controlados. Las reglas claras gestionan el trabajo repetible, mientras la IA apoya los momentos que requieren interpretación, lenguaje o conocimiento empresarial.",
          bridge: [
            { label: "AUTOMATIZACIÓN CON REGLAS", statement: "Automatizamos acciones repetibles" },
            { label: "INTEGRACIONES CONTROLADAS", statement: "Conectamos sistemas aprobados" },
            { label: "IA APLICADA", statement: "Apoyamos la interpretación y el conocimiento" },
          ],
          journey: {
            eyebrow: "CÓMO TRABAJAMOS CON USTED",
            title: "Una ruta clara desde el proceso actual hasta una solución funcional",
            introduction: "Comenzamos por comprender cómo se realiza el trabajo actualmente, acordamos qué debe cambiar e implementamos la solución mediante etapas controladas. Usted puede revisar la dirección antes de que el proyecto avance.",
            stages: [
              {
                label: "COMPRENDER",
                title: "Muéstrenos cómo se realiza el trabajo actualmente",
                explanation: "Usted nos explica la tarea, las personas involucradas, las herramientas utilizadas y dónde ocurren atrasos, trabajo repetido o seguimientos pendientes.",
                needsLabel: "QUÉ NECESITAMOS DE USTED",
                needs: "Un ejemplo real del proceso actual y el resultado que desea mejorar.",
                receivesLabel: "QUÉ RECIBE",
                receives: "Una comprensión compartida del problema, la prioridad y el resultado esperado.",
              },
              {
                label: "DEFINIR",
                title: "Acordamos el enfoque adecuado",
                explanation: "Identificamos cuáles pasos pueden seguir reglas claras de automatización, qué sistemas podrían necesitar conexión y dónde la revisión humana o la IA aplicada podrían aportar valor.",
                needsLabel: "QUÉ NECESITAMOS DE USTED",
                needs: "Confirmación de prioridades, personas responsables y herramientas que deben permanecer dentro del proceso.",
                receivesLabel: "QUÉ RECIBE",
                receives: "Una propuesta de alcance, responsabilidades, etapas de implementación y dirección acordada.",
              },
              {
                label: "CONSTRUIR Y PROBAR",
                title: "Revise una primera versión funcional y enfocada",
                explanation: "Construimos la primera versión acordada y la probamos mediante situaciones representativas antes de ampliar el flujo.",
                needsLabel: "QUÉ NECESITAMOS DE USTED",
                needs: "Revisión oportuna, ejemplos prácticos y retroalimentación de las personas que utilizarán la solución.",
                receivesLabel: "QUÉ RECIBE",
                receives: "Un flujo probado que refleja el alcance aprobado y las correcciones identificadas.",
              },
              {
                label: "PREPARAR PARA SU USO",
                title: "Ponemos en operación el flujo aprobado",
                explanation: "Después de la validación, preparamos el flujo acordado para su uso, documentamos sus pasos principales y aclaramos las responsabilidades de operación y cambios futuros.",
                needsLabel: "QUÉ NECESITAMOS DE USTED",
                needs: "Aprobación final y confirmación de las personas responsables de utilizar o supervisar el flujo.",
                receivesLabel: "QUÉ RECIBE",
                receives: "Una solución funcional aprobada, con operación documentada y próximos pasos acordados.",
              },
            ],
            support: {
              eyebrow: "DESPUÉS DE LA IMPLEMENTACIÓN",
              title: "El soporte puede continuar conforme evoluciona el flujo",
              body: "Cuando esté incluido en el alcance acordado, podemos revisar cambios en las plataformas, ajustar flujos confirmados, actualizar la documentación e implementar mejoras aprobadas a lo largo del tiempo.",
            },
          },
          visualLabels: {
            workflow: ["SOLICITUD", "REGLA", "ACCIÓN", "APROBADO"],
            messages: ["MENSAJE", "ASISTIR", "RECOPILAR", "TRANSFERIR"],
            knowledge: ["DOCUMENTO", "EXTRAER", "ORGANIZAR", "RESPONDER"],
            integration: ["SISTEMA A", "VALIDAR", "SISTEMA B", "CONFIRMADO"],
          },
          blocks: [
            {
              label: "AUTOMATIZACIÓN DE PROCESOS",
              title: "Mantenemos en movimiento el trabajo recurrente",
              description: "Automatizamos acciones definidas como enviar correos, programar recordatorios, crear documentos, actualizar registros y notificar a las personas correctas cuando cambia un proceso.",
              items: ["Envío de correos y seguimientos programados", "Recordatorios, alertas y notificaciones internas", "Creación de documentos y actualización de registros", "Puntos de revisión humana para acciones sensibles"],
            },
            {
              label: "BOTS Y CANALES CONVERSACIONALES",
              title: "Guiamos las solicitudes desde el primer mensaje",
              description: "Creamos asistentes específicos para web, WhatsApp o Telegram que recopilan información, responden consultas definidas, inician procesos y transfieren la conversación cuando se requiere atención humana.",
              items: ["Recopilación estructurada de datos", "Información solicitada con frecuencia", "Inicio de procesos desde canales aprobados", "Escalamiento a una persona responsable"],
            },
            {
              label: "DOCUMENTOS Y CONOCIMIENTO EMPRESARIAL",
              title: "Convertimos información aprobada en respuestas útiles",
              description: "Extraemos información compatible de documentos, organizamos el conocimiento confiable de la empresa y ayudamos a los usuarios a encontrar respuestas basadas en contenido autorizado.",
              items: ["Extracción de datos asistida mediante OCR", "Clasificación y validación de documentos", "Bases de conocimiento internas", "Asistentes de IA basados en información aprobada"],
            },
            {
              label: "INTEGRACIONES Y MVPs CON IA",
              title: "Conectamos sistemas y validamos nuevas ideas",
              description: "Construimos conexiones controladas mediante APIs, sincronizamos datos definidos y creamos MVPs enfocados para probar una automatización o un flujo asistido por IA antes de realizar una inversión mayor.",
              items: ["Integraciones con APIs y plataformas", "Intercambio controlado de datos", "Redacción y clasificación asistidas por IA", "MVPs enfocados con alcance medible"],
            },
          ],
          closing: {
            title: "El proceso determina la tecnología.",
            body: "No añadimos IA a todos los flujos. Seleccionamos el enfoque confiable más sencillo, documentamos sus controles e incorporamos inteligencia únicamente cuando mejora el resultado.",
          },
        },
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

