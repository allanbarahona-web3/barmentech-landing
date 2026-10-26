import type { Metadata } from "next";

import type { Locale } from "./i18n";

export const formationSiteOrigin = new URL("https://formation.barmentech.com");
export const formationDefaultLocale: Locale = "en";

type HomepageSeoContent = {
  description: string;
  locale: "en_US" | "es_US";
  serviceName: string;
  title: string;
};

const homepageSeoContent: Record<Locale, HomepageSeoContent> = {
  en: {
    description: "Form your company in any of the 50 states with bilingual support for registration, EIN, corporate documents, and operational setup.",
    locale: "en_US",
    serviceName: "U.S. business formation support",
    title: "U.S. Business Formation Services | Barmentech",
  },
  es: {
    description: "Forma tu empresa en cualquiera de los 50 estados con acompañamiento bilingüe para el registro, EIN, documentos corporativos y preparación operativa.",
    locale: "es_US",
    serviceName: "Apoyo para la formación de empresas en Estados Unidos",
    title: "Formación de empresas en Estados Unidos | Barmentech",
  },
};

export function formationUrl(pathname = "/") {
  return new URL(pathname, formationSiteOrigin).toString();
}

export function getHomepageSeoContent(locale: Locale) {
  return homepageSeoContent[locale];
}

export function getFormationHomepageMetadata(locale: Locale): Metadata {
  const content = getHomepageSeoContent(locale);
  const alternateLocale = locale === "en" ? "es" : "en";
  const canonicalUrl = formationUrl(`/${locale}`);

  return {
    title: {
      absolute: content.title,
    },
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: formationUrl("/en"),
        es: formationUrl("/es"),
        "x-default": formationUrl(`/${formationDefaultLocale}`),
      },
    },
    openGraph: {
      alternateLocale: homepageSeoContent[alternateLocale].locale,
      description: content.description,
      locale: content.locale,
      siteName: "Barmentech",
      title: content.title,
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary",
      description: content.description,
      title: content.title,
    },
  };
}

export function getFormationHomepageJsonLd(locale: Locale) {
  const content = getHomepageSeoContent(locale);
  const homepageUrl = formationUrl(`/${locale}`);
  const organizationId = `${formationUrl()}#organization`;
  const websiteId = `${formationUrl()}#website`;
  const serviceId = `${formationUrl()}#business-formation-service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": organizationId,
        "@type": "Organization",
        alternateName: "Barmentech",
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        knowsLanguage: ["en", "es"],
        name: "Barmentech LLC",
        url: formationUrl(),
      },
      {
        "@id": websiteId,
        "@type": "WebSite",
        inLanguage: locale,
        name: "Barmentech Formation",
        publisher: {
          "@id": organizationId,
        },
        url: formationUrl(),
      },
      {
        "@id": serviceId,
        "@type": "Service",
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        availableLanguage: ["en", "es"],
        description: content.description,
        name: content.serviceName,
        provider: {
          "@id": organizationId,
        },
        url: homepageUrl,
      },
    ],
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
