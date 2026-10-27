import type { Metadata } from "next";

import type { Locale } from "./i18n";
import { getFormationLegalContent, getFormationLegalPath, type FormationLegalPage } from "./legal";
import { getFormationPublicSettings } from "./public-settings";
import { getFormationFaqPath, getFormationLabels, getFormationTaxServicesPath } from "./site";

export const formationSiteOrigin = new URL("https://formation.barmentech.com");
export const formationDefaultLocale: Locale = "en";

type HomepageSeoContent = {
  description: string;
  locale: "en_US" | "es_US";
  serviceName: string;
  title: string;
};

type PortalSeoContent = {
  description: string;
  title: string;
};

type ContactSeoContent = {
  description: string;
  title: string;
};

type TaxServicesSeoContent = {
  description: string;
  locale: "en_US" | "es_US";
  serviceName: string;
  title: string;
};

type FaqSeoContent = {
  description: string;
  locale: "en_US" | "es_US";
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

const portalSeoContent: Record<Locale, PortalSeoContent> = {
  en: {
    description: "Information about Barmentech’s future client portal.",
    title: "Client portal",
  },
  es: {
    description: "Información sobre el futuro portal de clientes de Barmentech.",
    title: "Portal de clientes",
  },
};

const contactSeoContent: Record<Locale, ContactSeoContent> = {
  en: {
    description: "Barmentech online contact requests are not available yet.",
    title: "Contact (coming soon)",
  },
  es: {
    description: "Las solicitudes de contacto en línea de Barmentech aún no están disponibles.",
    title: "Contacto (próximamente)",
  },
};

const taxServicesSeoContent: Record<Locale, TaxServicesSeoContent> = {
  en: {
    description: "U.S. federal tax preparation and compliance support for businesses, foreign owners, and individuals after intake, eligibility review, and scope confirmation.",
    locale: "en_US",
    serviceName: "U.S. tax preparation and compliance support",
    title: "U.S. Tax Preparation and Compliance Support | Barmentech",
  },
  es: {
    description: "Apoyo para preparación y cumplimiento fiscal federal en Estados Unidos para empresas, propietarios extranjeros y personas después de la admisión, revisión de elegibilidad y confirmación del alcance.",
    locale: "es_US",
    serviceName: "Apoyo para preparación y cumplimiento fiscal en Estados Unidos",
    title: "Preparación y cumplimiento fiscal en Estados Unidos | Barmentech",
  },
};

const faqSeoContent: Record<Locale, FaqSeoContent> = {
  en: {
    description: "Answers about U.S. company formation, pricing, EIN assistance, banking guidance, annual compliance, tax services, and Barmentech’s future Client Portal.",
    locale: "en_US",
    title: "Company Formation FAQ | Barmentech",
  },
  es: {
    description: "Respuestas sobre formación de empresas en Estados Unidos, precios, asistencia con EIN, orientación bancaria, cumplimiento anual, servicios fiscales y el futuro Portal de clientes de Barmentech.",
    locale: "es_US",
    title: "Preguntas frecuentes sobre formación de empresas | Barmentech",
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

export function getFormationPortalMetadata(locale: Locale): Metadata {
  const content = portalSeoContent[locale];
  const canonicalUrl = formationUrl(`/${locale}/portal`);

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: formationUrl("/en/portal"),
        es: formationUrl("/es/portal"),
        "x-default": formationUrl(`/${formationDefaultLocale}/portal`),
      },
    },
    robots: {
      follow: false,
      index: false,
    },
  };
}

export function getFormationContactMetadata(locale: Locale): Metadata {
  const content = contactSeoContent[locale];
  const canonicalUrl = formationUrl(`/${locale}/contact`);

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: formationUrl("/en/contact"),
        es: formationUrl("/es/contact"),
        "x-default": formationUrl(`/${formationDefaultLocale}/contact`),
      },
    },
    robots: {
      follow: false,
      index: false,
    },
  };
}

export function getFormationTaxServicesMetadata(locale: Locale): Metadata {
  const content = taxServicesSeoContent[locale];
  const alternateLocale = locale === "en" ? "es" : "en";
  const canonicalUrl = formationUrl(`/${locale}/${getFormationTaxServicesPath(locale)}`);

  return {
    title: {
      absolute: content.title,
    },
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: formationUrl(`/en/${getFormationTaxServicesPath("en")}`),
        es: formationUrl(`/es/${getFormationTaxServicesPath("es")}`),
        "x-default": formationUrl(`/en/${getFormationTaxServicesPath("en")}`),
      },
    },
    openGraph: {
      alternateLocale: taxServicesSeoContent[alternateLocale].locale,
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

export function getFormationFaqMetadata(locale: Locale): Metadata {
  const content = faqSeoContent[locale];
  const alternateLocale = locale === "en" ? "es" : "en";
  const canonicalUrl = formationUrl(`/${locale}/${getFormationFaqPath(locale)}`);

  return {
    title: {
      absolute: content.title,
    },
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: formationUrl(`/en/${getFormationFaqPath("en")}`),
        es: formationUrl(`/es/${getFormationFaqPath("es")}`),
        "x-default": formationUrl(`/en/${getFormationFaqPath("en")}`),
      },
    },
    openGraph: {
      alternateLocale: faqSeoContent[alternateLocale].locale,
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

export function getFormationLegalMetadata(locale: Locale, page: FormationLegalPage): Metadata {
  const content = getFormationLegalContent(locale, page);
  const canonicalUrl = formationUrl(`/${locale}/${getFormationLegalPath(locale, page)}`);

  return {
    title: {
      absolute: `${content.title} | Barmentech`,
    },
    description: content.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: formationUrl(`/en/${getFormationLegalPath("en", page)}`),
        es: formationUrl(`/es/${getFormationLegalPath("es", page)}`),
        "x-default": formationUrl(`/en/${getFormationLegalPath("en", page)}`),
      },
    },
    openGraph: {
      alternateLocale: locale === "en" ? "es_US" : "en_US",
      description: content.description,
      locale: locale === "en" ? "en_US" : "es_US",
      siteName: "Barmentech",
      title: `${content.title} | Barmentech`,
      type: "website",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary",
      description: content.description,
      title: `${content.title} | Barmentech`,
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
      getFormationOrganizationJsonLd(),
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

export function getFormationTaxServicesJsonLd(locale: Locale) {
  const content = taxServicesSeoContent[locale];
  const pageUrl = formationUrl(`/${locale}/${getFormationTaxServicesPath(locale)}`);
  const organizationId = `${formationUrl()}#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      getFormationOrganizationJsonLd(),
      {
        "@id": `${pageUrl}#webpage`,
        "@type": "WebPage",
        description: content.description,
        inLanguage: locale,
        name: content.title,
        publisher: {
          "@id": organizationId,
        },
        url: pageUrl,
      },
      {
        "@id": `${pageUrl}#service`,
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
        url: pageUrl,
      },
    ],
  };
}

export function getFormationFaqJsonLd(locale: Locale) {
  const content = faqSeoContent[locale];
  const copy = getFormationLabels(locale);
  const pageUrl = formationUrl(`/${locale}/${getFormationFaqPath(locale)}`);
  const organizationId = `${formationUrl()}#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      getFormationOrganizationJsonLd(),
      {
        "@id": `${pageUrl}#webpage`,
        "@type": "FAQPage",
        description: content.description,
        inLanguage: locale,
        mainEntity: copy.faqGroups.flatMap((group) =>
          group.items.map((item) => ({
            "@type": "Question",
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
            name: item.question,
          })),
        ),
        name: content.title,
        publisher: {
          "@id": organizationId,
        },
        url: pageUrl,
      },
    ],
  };
}

function getFormationOrganizationJsonLd() {
  const socialLinks = getFormationPublicSettings().socialLinks.map((social) => social.url);

  return {
    "@id": `${formationUrl()}#organization`,
    "@type": "Organization",
    address: [
      {
        "@type": "PostalAddress",
        addressCountry: "US",
        addressLocality: "Miami",
        addressRegion: "FL",
        postalCode: "33131",
        streetAddress: "1110 Brickell Ave #400K-101",
      },
      {
        "@type": "PostalAddress",
        addressCountry: "CR",
        addressLocality: "Sánchez, Curridabat",
        addressRegion: "San José",
        postalCode: "11803",
        streetAddress: "Oficentro Momentum Pinares, Piso 4 – Republic Workspace",
      },
    ],
    alternateName: "Barmentech",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        availableLanguage: ["en", "es"],
        contactType: "general contact",
        email: "info@barmentech.com",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          closes: "18:00",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
        },
        telephone: "+1-786-391-8722",
      },
      {
        "@type": "ContactPoint",
        availableLanguage: ["en", "es"],
        contactType: "general contact",
        email: "info@barmentech.com",
        telephone: "+506-7006-7572",
      },
    ],
    email: "info@barmentech.com",
    knowsLanguage: ["en", "es"],
    name: "Barmentech LLC",
    ...(socialLinks.length ? { sameAs: socialLinks } : {}),
    url: formationUrl(),
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
