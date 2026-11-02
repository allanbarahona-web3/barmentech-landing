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
