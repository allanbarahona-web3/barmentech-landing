import type { Locale } from "./i18n";
import type { NavigationItem } from "@barmentech/ui";

type FormationProcessStep = {
  description: string;
  title: string;
};

type FormationService = {
  description: string;
  qualifier?: string;
  title: string;
};

type FormationServiceStage = {
  services: FormationService[];
  title: string;
};

export type FormationPage =
  | "about"
  | "bookkeeping"
  | "business-formation"
  | "business-services"
  | "contact"
  | "home"
  | "privacy"
  | "taxes"
  | "terms";

type FormationLabels = {
  about: string;
  businessFormation: string;
  businessServices: string;
  bookkeeping: string;
  contact: string;
  contactCta: string;
  division: string;
  footerNavigation: string;
  coverageBody: string;
  coverageExamplesLabel: string;
  coverageHighlightedStatement: string;
  coverageMessage: string;
  coverageStateLabel: string;
  coverageTitle: string;
  coverageVisualLabel: string;
  coverageWyomingDescription: string;
  coverageFloridaDescription: string;
  coverageEyebrow: string;
  heroAlt: string;
  heroDescription: string;
  heroEyebrow: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroTitle: string;
  home: string;
  howWeWork: string;
  language: string;
  menuClose: string;
  menuOpen: string;
  previewBody: string;
  previewPrimary: string;
  previewSecondary: string;
  previewTitle: string;
  privacy: string;
  provisionalBody: string;
  provisionalLabel: string;
  processConsultationBody: string;
  processConsultationCta: string;
  processConsultationTitle: string;
  processSteps: FormationProcessStep[];
  processTitle: string;
  servicesAvailability: string;
  servicesCtaBody: string;
  servicesCtaLabel: string;
  servicesCtaTitle: string;
  servicesEyebrow: string;
  servicesIntroduction: string;
  servicesStages: FormationServiceStage[];
  servicesTitle: string;
  services: string;
  taxes: string;
  terms: string;
};

const labels: Record<Locale, FormationLabels> = {
  en: {
    about: "About",
    businessFormation: "Business formation",
    businessServices: "Business services",
    bookkeeping: "Bookkeeping",
    contact: "Contact",
    contactCta: "Contact",
    division: "Business services",
    footerNavigation: "Footer navigation",
    coverageBody: "We support business formation across all 50 states. We help you evaluate where to form based on your activity, location, operations, and growth plans.",
    coverageExamplesLabel: "Frequently considered examples",
    coverageEyebrow: "Nationwide U.S. coverage",
    coverageFloridaDescription: "A frequent choice for businesses with a presence, operations, or connections in Florida.",
    coverageHighlightedStatement: "Not every business should be formed in the same state.",
    coverageMessage: "Need another state? We can help with business formation in any of the 50 states.",
    coverageStateLabel: "States",
    coverageTitle: "Form your company in the state that fits your goals",
    coverageVisualLabel: "supported nationwide",
    coverageWyomingDescription: "A state many entrepreneurs consider for its business structure and ongoing maintenance.",
    heroAlt: "People reviewing business documents at a table",
    heroDescription: "We help you establish and manage your company, organize your bookkeeping, and set up the tools your business needs. Personal support in English and Spanish.",
    heroEyebrow: "Business and tax services",
    heroPrimaryCta: "Let’s talk about your business",
    heroSecondaryCta: "Explore services",
    heroTitle: "Your business in the United States. Supported from the first step.",
    home: "Home",
    howWeWork: "How we work",
    language: "Language",
    menuClose: "Close menu",
    menuOpen: "Open menu",
    previewBody: "This provisional page establishes the shared visual system, navigation and bilingual routes. Commercial content is intentionally pending.",
    previewPrimary: "View contact placeholder",
    previewSecondary: "View how we work",
    previewTitle: "Business services website shell",
    privacy: "Privacy",
    provisionalBody: "This is a development placeholder. Content is pending review before publication.",
    provisionalLabel: "Content pending",
    processConsultationBody: "Tell us what you want to build, and we’ll help you identify the next step.",
    processConsultationCta: "Talk to Barmentech",
    processConsultationTitle: "Let’s start with a consultation",
    processSteps: [
      {
        description: "We review your activity, partners, location, customers, and growth plans.",
        title: "We learn about your business",
      },
      {
        description: "We help you evaluate the state and entity type that best fit your situation.",
        title: "We define the structure",
      },
      {
        description: "We coordinate the company filing, registered agent, and documents included in your selected service.",
        title: "We prepare the formation",
      },
      {
        description: "We can support you with an EIN, corporate documents, business tools, digital presence, and ongoing operations.",
        title: "We help you get started",
      },
    ],
    processTitle: "How we form your company",
    servicesAvailability: "Services are configured according to the company, selected state, and contracted scope. Government and third-party costs are identified separately when applicable.",
    servicesCtaBody: "Tell us what you need, and we’ll prepare a path based on your business.",
    servicesCtaLabel: "Explore a consultation",
    servicesCtaTitle: "Let’s build the right setup",
    servicesEyebrow: "Formation and operational support",
    servicesIntroduction: "We help you move from forming your company to preparing the tools needed to begin operating. Available services depend on your business needs and selected package.",
    servicesStages: [
      {
        title: "Form your company",
        services: [
          {
            description: "We coordinate the filing of your LLC or corporation in the selected state and organize the documents issued during the process.",
            title: "Company registration",
          },
          {
            description: "We coordinate the registered agent service required in the formation state, according to the selected service.",
            title: "Registered agent",
          },
          {
            description: "We can support you with the EIN application and with preparing or organizing the corporate documents included in your service.",
            title: "EIN and corporate documents",
          },
        ],
      },
      {
        title: "Prepare to operate",
        services: [
          {
            description: "We can coordinate business-address and mail-handling options when they are needed for the customer’s operations.",
            title: "Business address and mail",
          },
          {
            description: "We guide you through preparing and applying for bank accounts and payment processors that may fit your company’s characteristics.",
            qualifier: "Account opening and approval are determined exclusively by each provider.",
            title: "Banking and payment guidance",
          },
          {
            description: "We can help you configure a domain, business email, Google Workspace, and business phone options, depending on your selected service.",
            title: "Business tools",
          },
          {
            description: "We can build your company’s initial digital presence through a domain, website, and tools that support a professional presentation.",
            title: "Digital presence",
          },
          {
            description: "After formation, we can help you organize renewals, state reports, documents, and upcoming compliance steps.",
            title: "Ongoing business support",
          },
        ],
      },
    ],
    servicesTitle: "More than registering a company",
    services: "Services",
    taxes: "Taxes",
    terms: "Terms",
  },
  es: {
    about: "Nosotros",
    businessFormation: "Formación de empresas",
    businessServices: "Servicios empresariales",
    bookkeeping: "Bookkeeping",
    contact: "Contacto",
    contactCta: "Contacto",
    division: "Servicios empresariales",
    footerNavigation: "Navegación del pie de página",
    coverageBody: "Ofrecemos formación de empresas en los 50 estados. Te ayudamos a evaluar dónde constituir tu compañía según tu actividad, ubicación, operaciones y planes de crecimiento.",
    coverageExamplesLabel: "Ejemplos que se consideran con frecuencia",
    coverageEyebrow: "Cobertura en todo Estados Unidos",
    coverageFloridaDescription: "Una opción frecuente para negocios con presencia, operaciones o vínculos en Florida.",
    coverageHighlightedStatement: "No todas las empresas necesitan registrarse en el mismo estado.",
    coverageMessage: "¿Necesitas otro estado? Podemos ayudarte con la formación en cualquiera de los 50 estados.",
    coverageStateLabel: "Estados",
    coverageTitle: "Forma tu empresa en el estado adecuado para tus objetivos",
    coverageVisualLabel: "con cobertura nacional",
    coverageWyomingDescription: "Una opción que muchos emprendedores consideran por su estructura empresarial y mantenimiento continuo.",
    heroAlt: "Personas revisando documentos empresariales en una mesa",
    heroDescription: "Te acompañamos en la formación y gestión de tu empresa, la organización de su contabilidad y la puesta en marcha de sus herramientas de negocio. Atención directa en español e inglés.",
    heroEyebrow: "Servicios empresariales y fiscales",
    heroPrimaryCta: "Conversemos sobre tu negocio",
    heroSecondaryCta: "Explorar servicios",
    heroTitle: "Tu empresa en Estados Unidos. Acompañada desde el primer paso.",
    home: "Inicio",
    howWeWork: "Cómo trabajamos",
    language: "Idioma",
    menuClose: "Cerrar menú",
    menuOpen: "Abrir menú",
    previewBody: "Esta página provisional establece el sistema visual compartido, la navegación y las rutas bilingües. El contenido comercial queda deliberadamente pendiente.",
    previewPrimary: "Ver contacto provisional",
    previewSecondary: "Ver cómo trabajamos",
    previewTitle: "Shell de servicios empresariales",
    privacy: "Privacidad",
    provisionalBody: "Este es un marcador de desarrollo. El contenido está pendiente de revisión antes de publicarse.",
    provisionalLabel: "Contenido pendiente",
    processConsultationBody: "Cuéntanos qué deseas construir y te ayudaremos a identificar el siguiente paso.",
    processConsultationCta: "Hablar con Barmentech",
    processConsultationTitle: "Comencemos con una consulta",
    processSteps: [
      {
        description: "Revisamos tu actividad, socios, ubicación, clientes y planes de crecimiento.",
        title: "Conocemos tu proyecto",
      },
      {
        description: "Te ayudamos a evaluar el estado y el tipo de entidad más adecuados para tu situación.",
        title: "Definimos la estructura",
      },
      {
        description: "Coordinamos el registro de la empresa, el agente registrado y los documentos incluidos en el servicio contratado.",
        title: "Preparamos la formación",
      },
      {
        description: "Podemos acompañarte con EIN, documentos corporativos, herramientas empresariales, presencia digital y continuidad operativa.",
        title: "Te ayudamos a comenzar",
      },
    ],
    processTitle: "Cómo formamos tu empresa",
    servicesAvailability: "Los servicios se configuran según la empresa, el estado seleccionado y el alcance contratado. Los costos gubernamentales y de terceros se identifican por separado cuando corresponda.",
    servicesCtaBody: "Cuéntanos qué necesitas y prepararemos una ruta de trabajo según tu empresa.",
    servicesCtaLabel: "Explorar una consulta",
    servicesCtaTitle: "Construyamos la estructura adecuada",
    servicesEyebrow: "Formación y soporte operativo",
    servicesIntroduction: "Te ayudamos a avanzar desde la formación de tu compañía hasta la preparación de las herramientas necesarias para comenzar a operar. Los servicios disponibles dependen de las necesidades de tu empresa y del paquete seleccionado.",
    servicesStages: [
      {
        title: "Forma tu empresa",
        services: [
          {
            description: "Coordinamos la presentación de tu LLC o corporación en el estado seleccionado y organizamos los documentos emitidos durante el proceso.",
            title: "Registro de la empresa",
          },
          {
            description: "Coordinamos el servicio de agente registrado requerido en el estado de formación, de acuerdo con el servicio contratado.",
            title: "Agente registrado",
          },
          {
            description: "Podemos ayudarte con la solicitud del EIN y con la preparación u organización de los documentos corporativos incluidos en tu servicio.",
            title: "EIN y documentos corporativos",
          },
        ],
      },
      {
        title: "Prepárate para operar",
        services: [
          {
            description: "Podemos coordinar opciones de dirección empresarial y manejo de correspondencia cuando sean necesarias para la operación del cliente.",
            title: "Dirección empresarial y correspondencia",
          },
          {
            description: "Te orientamos durante la preparación y solicitud de cuentas bancarias y procesadores de pago compatibles con las características de tu empresa.",
            qualifier: "La apertura y aprobación dependen exclusivamente de cada proveedor.",
            title: "Banca y procesadores de pago",
          },
          {
            description: "Podemos ayudarte a configurar dominio, correo corporativo, Google Workspace y opciones de telefonía empresarial, según el servicio contratado.",
            title: "Herramientas empresariales",
          },
          {
            description: "Podemos desarrollar la identidad digital inicial de tu empresa mediante dominio, página web y herramientas que apoyen su presentación profesional.",
            title: "Presencia digital",
          },
          {
            description: "Después de la formación, podemos ayudarte a organizar renovaciones, reportes estatales, documentos y próximos pasos de cumplimiento.",
            title: "Continuidad empresarial",
          },
        ],
      },
    ],
    servicesTitle: "Más que registrar una empresa",
    services: "Servicios",
    taxes: "Impuestos",
    terms: "Términos",
  },
};

const pageTitles: Record<Locale, Record<Exclude<FormationPage, "home">, string>> = {
  en: {
    about: labels.en.about,
    bookkeeping: labels.en.bookkeeping,
    "business-formation": labels.en.businessFormation,
    "business-services": labels.en.businessServices,
    contact: labels.en.contact,
    privacy: labels.en.privacy,
    taxes: labels.en.taxes,
    terms: labels.en.terms,
  },
  es: {
    about: labels.es.about,
    bookkeeping: labels.es.bookkeeping,
    "business-formation": labels.es.businessFormation,
    "business-services": labels.es.businessServices,
    contact: labels.es.contact,
    privacy: labels.es.privacy,
    taxes: labels.es.taxes,
    terms: labels.es.terms,
  },
};

export function isFormationPage(value: string): value is FormationPage {
  return value === "home" || value in pageTitles.en;
}

export function getFormationLabels(locale: Locale) {
  return labels[locale];
}

export function getFormationPageTitle(locale: Locale, page: Exclude<FormationPage, "home">) {
  return pageTitles[locale][page];
}

export function getFormationNavigation(locale: Locale, activePage: FormationPage): NavigationItem[] {
  const copy = getFormationLabels(locale);

  return [
    { href: `/${locale}#services`, id: "services", label: copy.services },
    { href: `/${locale}#how-we-work`, id: "how-we-work", label: copy.howWeWork },
    { active: activePage === "about", href: `/${locale}/about`, id: "about", label: copy.about },
    { active: activePage === "contact", href: `/${locale}/contact`, id: "contact", label: copy.contact },
  ];
}

export function getFormationFooterNavigation(locale: Locale) {
  const copy = getFormationLabels(locale);

  return [
    { href: `/${locale}`, label: copy.home },
    { href: `/${locale}/services/business-formation`, label: copy.businessFormation },
    { href: `/${locale}/services/bookkeeping`, label: copy.bookkeeping },
    { href: `/${locale}/services/taxes`, label: copy.taxes },
    { href: `/${locale}/services/business-services`, label: copy.businessServices },
    { href: `/${locale}#how-we-work`, label: copy.howWeWork },
    { href: `/${locale}/about`, label: copy.about },
    { href: `/${locale}/contact`, label: copy.contact },
  ];
}
