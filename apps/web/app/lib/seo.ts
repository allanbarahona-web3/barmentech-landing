import type { Metadata } from "next";

import type { Locale } from "./i18n";
import { getTechnologyLegalContent, type TechnologyLegalPage } from "./legal";
import { getTechnologySiteUrl } from "./public-settings";
import { getTechnologyContent } from "./technology-content";

const contactSeoContent: Record<Locale, { description: string; title: string }> = {
  en: {
    title: "Contact Barmentech Technology",
    description: "Discuss websites, systems, SaaS platforms, automation, integrations, modernization, digital products, and applied AI with Barmentech Technology.",
  },
  es: {
    title: "Contacta a Barmentech Tecnología",
    description: "Conversemos sobre sitios web, sistemas, plataformas SaaS, automatización, integraciones, modernización, productos digitales e IA aplicada.",
  },
};

const webDevelopmentSeoContent: Record<Locale, { description: string; title: string }> = {
  en: {
    title: "Websites and e-commerce | Barmentech Technology",
    description: "Websites, catalogs, online stores, and purchase flows designed around how customers understand, find, and complete the next step online.",
  },
  es: {
    title: "Sitios web y comercio electrónico | Barmentech Tecnología",
    description: "Sitios web, catálogos, tiendas en línea y flujos de compra diseñados según lo que los clientes necesitan entender, encontrar y completar en línea.",
  },
};

export function getTechnologyContactMetadata(locale: Locale): Metadata {
  const content = contactSeoContent[locale];
  const canonical = getTechnologySiteUrl(`/${locale}/contact`);

  return {
    title: { absolute: content.title },
    description: content.description,
    ...(canonical ? {
      alternates: {
        canonical,
        languages: {
          en: getTechnologySiteUrl("/en/contact")!,
          es: getTechnologySiteUrl("/es/contact")!,
          "x-default": getTechnologySiteUrl("/en/contact")!,
        },
      },
      openGraph: {
        description: content.description,
        locale: locale === "en" ? "en_US" : "es_US",
        siteName: "Barmentech Technology",
        title: content.title,
        type: "website",
        url: canonical,
      },
    } : {}),
  };
}

export function getTechnologyWebDevelopmentMetadata(locale: Locale): Metadata {
  const content = webDevelopmentSeoContent[locale];
  const canonical = getTechnologySiteUrl(`/${locale}/services/web-development`);

  return {
    title: { absolute: content.title },
    description: content.description,
    ...(canonical ? {
      alternates: {
        canonical,
        languages: {
          en: getTechnologySiteUrl("/en/services/web-development")!,
          es: getTechnologySiteUrl("/es/services/web-development")!,
          "x-default": getTechnologySiteUrl("/en/services/web-development")!,
        },
      },
      openGraph: {
        description: content.description,
        locale: locale === "en" ? "en_US" : "es_US",
        siteName: "Barmentech Technology",
        title: content.title,
        type: "website",
        url: canonical,
      },
    } : {}),
  };
}

export function getTechnologyAboutMetadata(locale: Locale): Metadata {
  const content = getTechnologyContent(locale).about.metadata;
  const canonical = getTechnologySiteUrl(`/${locale}/about`);

  return {
    title: { absolute: content.title },
    description: content.description,
    ...(canonical ? {
      alternates: {
        canonical,
        languages: {
          en: getTechnologySiteUrl("/en/about")!,
          es: getTechnologySiteUrl("/es/about")!,
          "x-default": getTechnologySiteUrl("/en/about")!,
        },
      },
      openGraph: {
        description: content.description,
        locale: locale === "en" ? "en_US" : "es_US",
        siteName: "Barmentech Technology",
        title: content.title,
        type: "website",
        url: canonical,
      },
    } : {}),
  };
}

export function getTechnologyLegalMetadata(locale: Locale, page: TechnologyLegalPage): Metadata {
  const content = getTechnologyLegalContent(locale, page);
  const canonical = getTechnologySiteUrl(`/${locale}/${page}`);
  const privacyDescription = locale === "en"
    ? "Learn how the Barmentech Technology website handles contact inquiries, call requests, privacy requests, technical information, and service-provider processing."
    : "Conozca cómo el sitio de Barmentech Technology maneja consultas de contacto, solicitudes de llamada, solicitudes de privacidad, información técnica y proveedores de servicios.";
  const termsDescription = locale === "en"
    ? "Review the terms governing use of the Barmentech Technology website, project inquiries, call requests, proposals, client materials, and third-party technology services."
    : "Consulte los términos que regulan el uso del sitio de Barmentech Technology, las consultas de proyectos, solicitudes de llamada, propuestas, materiales del cliente y servicios tecnológicos de terceros.";
  const disclaimerDescription = locale === "en"
    ? "Review important limitations concerning public technology information, project examples, third-party platforms, automation, artificial intelligence, security, and expected outcomes."
    : "Consulte limitaciones importantes sobre información tecnológica pública, ejemplos de proyectos, plataformas de terceros, automatización, inteligencia artificial, seguridad y resultados esperados.";
  const description = page === "privacy" ? privacyDescription : page === "terms" ? termsDescription : page === "disclaimer" ? disclaimerDescription : content.description;

  return {
    title: { absolute: `${content.title} | Barmentech Technology` },
    description,
    ...(canonical ? {
      alternates: {
        canonical,
        languages: {
          en: getTechnologySiteUrl(`/en/${page}`)!,
          es: getTechnologySiteUrl(`/es/${page}`)!,
          "x-default": getTechnologySiteUrl(`/en/${page}`)!,
        },
      },
      openGraph: {
        description,
        locale: locale === "en" ? "en_US" : "es_US",
        siteName: "Barmentech Technology",
        title: content.title,
        type: "website",
        url: canonical,
      },
    } : {}),
  };
}
