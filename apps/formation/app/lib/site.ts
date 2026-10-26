import type { Locale } from "./i18n";
import type { NavigationItem } from "@barmentech/ui";

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
    developmentLabel: "Development preview",
    division: "Business services",
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
    previewTitle: "Business services website shell",
    privacy: "Privacy",
    provisionalBody: "This is a development placeholder. Content is pending review before publication.",
    provisionalLabel: "Content pending",
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
    developmentLabel: "Vista de desarrollo",
    division: "Servicios empresariales",
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
    previewTitle: "Shell de servicios empresariales",
    privacy: "Privacidad",
    provisionalBody: "Este es un marcador de desarrollo. El contenido está pendiente de revisión antes de publicarse.",
    provisionalLabel: "Contenido pendiente",
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
  const serviceItems = [
    { href: `/${locale}/services/business-formation`, id: "business-formation", label: copy.businessFormation },
    { href: `/${locale}/services/bookkeeping`, id: "bookkeeping", label: copy.bookkeeping },
    { href: `/${locale}/services/taxes`, id: "taxes", label: copy.taxes },
    { href: `/${locale}/services/business-services`, id: "business-services", label: copy.businessServices },
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
