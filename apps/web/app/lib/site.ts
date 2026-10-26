import type { Locale } from "./i18n";
import type { NavigationItem } from "@barmentech/ui";

export type TechnologyPage = "about" | "automation" | "contact" | "custom-software" | "home" | "privacy" | "terms" | "web-development";

type TechnologyLabels = {
  about: string;
  automation: string;
  contact: string;
  contactCta: string;
  customSoftware: string;
  developmentLabel: string;
  division: string;
  footerNavigation: string;
  home: string;
  howWeWork: string;
  howWeWorkBody: string;
  howWeWorkTitle: string;
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
  services: string;
  terms: string;
  webDevelopment: string;
};

const labels: Record<Locale, TechnologyLabels> = {
  en: {
    about: "About",
    automation: "Automation",
    contact: "Contact",
    contactCta: "Contact",
    customSoftware: "Custom software",
    developmentLabel: "Development preview",
    division: "Technology",
    footerNavigation: "Footer navigation",
    home: "Home",
    howWeWork: "How we work",
    howWeWorkBody: "This section is the future destination for the working-process explanation. Its final content is pending review.",
    howWeWorkTitle: "How we work",
    language: "Language",
    menuClose: "Close menu",
    menuOpen: "Open menu",
    previewBody: "This provisional page establishes the shared visual system, navigation and bilingual routes. Commercial content is intentionally pending.",
    previewPrimary: "View contact placeholder",
    previewSecondary: "View how we work",
    previewTitle: "Technology website shell",
    privacy: "Privacy",
    provisionalBody: "This is a development placeholder. Content is pending review before publication.",
    provisionalLabel: "Content pending",
    services: "Services",
    terms: "Terms",
    webDevelopment: "Web development",
  },
  es: {
    about: "Nosotros",
    automation: "Automatización",
    contact: "Contacto",
    contactCta: "Contacto",
    customSoftware: "Software a medida",
    developmentLabel: "Vista de desarrollo",
    division: "Tecnología",
    footerNavigation: "Navegación del pie de página",
    home: "Inicio",
    howWeWork: "Cómo trabajamos",
    howWeWorkBody: "Esta sección será el destino futuro de la explicación del proceso de trabajo. Su contenido final está pendiente de revisión.",
    howWeWorkTitle: "Cómo trabajamos",
    language: "Idioma",
    menuClose: "Cerrar menú",
    menuOpen: "Abrir menú",
    previewBody: "Esta página provisional establece el sistema visual compartido, la navegación y las rutas bilingües. El contenido comercial queda deliberadamente pendiente.",
    previewPrimary: "Ver contacto provisional",
    previewSecondary: "Ver cómo trabajamos",
    previewTitle: "Shell de tecnología",
    privacy: "Privacidad",
    provisionalBody: "Este es un marcador de desarrollo. El contenido está pendiente de revisión antes de publicarse.",
    provisionalLabel: "Contenido pendiente",
    services: "Servicios",
    terms: "Términos",
    webDevelopment: "Desarrollo web",
  },
};

const pageTitles: Record<Locale, Record<Exclude<TechnologyPage, "home">, string>> = {
  en: {
    about: labels.en.about,
    automation: labels.en.automation,
    contact: labels.en.contact,
    "custom-software": labels.en.customSoftware,
    privacy: labels.en.privacy,
    terms: labels.en.terms,
    "web-development": labels.en.webDevelopment,
  },
  es: {
    about: labels.es.about,
    automation: labels.es.automation,
    contact: labels.es.contact,
    "custom-software": labels.es.customSoftware,
    privacy: labels.es.privacy,
    terms: labels.es.terms,
    "web-development": labels.es.webDevelopment,
  },
};

export function isTechnologyPage(value: string): value is TechnologyPage {
  return value === "home" || value in pageTitles.en;
}

export function getTechnologyLabels(locale: Locale) {
  return labels[locale];
}

export function getTechnologyPageTitle(locale: Locale, page: Exclude<TechnologyPage, "home">) {
  return pageTitles[locale][page];
}

export function getTechnologyNavigation(locale: Locale, activePage: TechnologyPage): NavigationItem[] {
  const copy = getTechnologyLabels(locale);
  const serviceItems = [
    { href: `/${locale}/services/web-development`, id: "web-development", label: copy.webDevelopment },
    { href: `/${locale}/services/custom-software`, id: "custom-software", label: copy.customSoftware },
    { href: `/${locale}/services/automation`, id: "automation", label: copy.automation },
  ];

  return [
    {
      active: serviceItems.some((item) => item.id === activePage),
      children: serviceItems.map((item) => ({ ...item, active: item.id === activePage })),
      id: "services",
      label: copy.services,
    },
    { href: `/${locale}#how-we-work`, id: "how-we-work", label: copy.howWeWork },
    { active: activePage === "about", href: `/${locale}/about`, id: "about", label: copy.about },
    { active: activePage === "contact", href: `/${locale}/contact`, id: "contact", label: copy.contact },
  ];
}

export function getTechnologyFooterNavigation(locale: Locale) {
  const copy = getTechnologyLabels(locale);

  return [
    { href: `/${locale}`, label: copy.home },
    { href: `/${locale}/services/web-development`, label: copy.webDevelopment },
    { href: `/${locale}/services/custom-software`, label: copy.customSoftware },
    { href: `/${locale}/services/automation`, label: copy.automation },
    { href: `/${locale}#how-we-work`, label: copy.howWeWork },
    { href: `/${locale}/about`, label: copy.about },
    { href: `/${locale}/contact`, label: copy.contact },
  ];
}
