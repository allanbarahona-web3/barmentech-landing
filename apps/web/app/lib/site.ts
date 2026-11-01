import type { Locale } from "./i18n";
import type { NavigationItem } from "@barmentech/ui";

export type TechnologyPage = "about" | "automation" | "contact" | "custom-software" | "disclaimer" | "home" | "privacy" | "terms" | "web-development";

type TechnologyLabels = {
  about: string;
  automation: string;
  contact: string;
  contactCta: string;
  customSoftware: string;
  disclaimer: string;
  division: string;
  formation: string;
  footerNavigation: string;
  footerBusinessHours: string;
  footerCostaRicaAppointment: string;
  footerCostaRicaPhoneLabel: string;
  footerCostaRicaTitle: string;
  footerDescription: string;
  footerDevelopmentCredit: string;
  footerEmailLabel: string;
  footerGeneralContact: string;
  footerServicesNavigation: string;
  footerSocialNavigation: string;
  footerUnitedStatesCountry: string;
  footerUnitedStatesPhoneLabel: string;
  footerUnitedStatesTitle: string;
  footerWhatsappLabel: string;
  home: string;
  howWeWork: string;
  language: string;
  menuClose: string;
  menuOpen: string;
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
    customSoftware: "Custom systems & SaaS",
    disclaimer: "Disclaimer",
    division: "Technology",
    formation: "Formation",
    footerNavigation: "Footer navigation",
    footerBusinessHours: "Monday–Friday, 9:00 AM–6:00 PM ET",
    footerCostaRicaAppointment: "In-person assistance by appointment",
    footerCostaRicaPhoneLabel: "Call Barmentech Costa Rica",
    footerCostaRicaTitle: "Costa Rica",
    footerDescription: "Technology services for businesses that need to build, connect, maintain, or improve digital systems according to their confirmed scope.",
    footerDevelopmentCredit: "Website designed and developed by Barmentech",
    footerEmailLabel: "Email",
    footerGeneralContact: "General contact",
    footerServicesNavigation: "Services",
    footerSocialNavigation: "Social links",
    footerUnitedStatesCountry: "United States",
    footerUnitedStatesPhoneLabel: "Call Barmentech United States",
    footerUnitedStatesTitle: "United States",
    footerWhatsappLabel: "Chat with Barmentech on WhatsApp",
    home: "Home",
    howWeWork: "How we work",
    language: "Language",
    menuClose: "Close menu",
    menuOpen: "Open menu",
    privacy: "Privacy",
    provisionalBody: "This is a development placeholder. Content is pending review before publication.",
    provisionalLabel: "Content pending",
    services: "Services",
    terms: "Terms",
    webDevelopment: "Websites & e-commerce",
  },
  es: {
    about: "Nosotros",
    automation: "Automatización",
    contact: "Contacto",
    contactCta: "Contacto",
    customSoftware: "Sistemas a medida y SaaS",
    disclaimer: "Descargo de responsabilidad",
    division: "Tecnología",
    formation: "Formación",
    footerNavigation: "Navegación del pie de página",
    footerBusinessHours: "Lunes–viernes, 9:00 a. m.–6:00 p. m. ET",
    footerCostaRicaAppointment: "Atención presencial con cita previa",
    footerCostaRicaPhoneLabel: "Llamar a Barmentech Costa Rica",
    footerCostaRicaTitle: "Costa Rica",
    footerDescription: "Servicios de tecnología para empresas que necesitan construir, conectar, mantener o mejorar sistemas digitales según el alcance confirmado.",
    footerDevelopmentCredit: "Diseño y desarrollo web por Barmentech",
    footerEmailLabel: "Correo electrónico",
    footerGeneralContact: "Contacto general",
    footerServicesNavigation: "Servicios",
    footerSocialNavigation: "Redes sociales",
    footerUnitedStatesCountry: "Estados Unidos",
    footerUnitedStatesPhoneLabel: "Llamar a Barmentech Estados Unidos",
    footerUnitedStatesTitle: "Estados Unidos",
    footerWhatsappLabel: "Escribir a Barmentech por WhatsApp",
    home: "Inicio",
    howWeWork: "Cómo trabajamos",
    language: "Idioma",
    menuClose: "Cerrar menú",
    menuOpen: "Abrir menú",
    privacy: "Privacidad",
    provisionalBody: "Este es un marcador de desarrollo. El contenido está pendiente de revisión antes de publicarse.",
    provisionalLabel: "Contenido pendiente",
    services: "Servicios",
    terms: "Términos",
    webDevelopment: "Sitios web y comercio electrónico",
  },
};

const pageTitles: Record<Locale, Record<Exclude<TechnologyPage, "home">, string>> = {
  en: {
    about: labels.en.about,
    automation: labels.en.automation,
    contact: labels.en.contact,
    "custom-software": labels.en.customSoftware,
    disclaimer: labels.en.disclaimer,
    privacy: labels.en.privacy,
    terms: labels.en.terms,
    "web-development": labels.en.webDevelopment,
  },
  es: {
    about: labels.es.about,
    automation: labels.es.automation,
    contact: labels.es.contact,
    "custom-software": labels.es.customSoftware,
    disclaimer: labels.es.disclaimer,
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

export function getTechnologyNavigation(locale: Locale, activePage: TechnologyPage, formationHref: string): NavigationItem[] {
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
    { href: formationHref, id: "formation", label: copy.formation },
    { active: activePage === "contact", href: `/${locale}/contact`, id: "contact", label: copy.contact },
  ];
}
