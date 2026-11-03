import type { Metadata } from "next";

import type { Locale } from "./i18n";
import { getTechnologySiteUrl } from "./public-settings";

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
