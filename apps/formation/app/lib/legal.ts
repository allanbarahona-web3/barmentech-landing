import type { Locale } from "./i18n";

export type FormationLegalPage = "disclaimer" | "privacy" | "terms";

type LegalSection = {
  body: string[];
  title: string;
};

export type FormationLegalContent = {
  description: string;
  eyebrow: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  sections: LegalSection[];
  title: string;
};

const legalPaths: Record<Locale, Record<FormationLegalPage, string>> = {
  en: {
    disclaimer: "disclaimer",
    privacy: "privacy",
    terms: "terms",
  },
  es: {
    disclaimer: "descargo-de-responsabilidad",
    privacy: "privacidad",
    terms: "terminos",
  },
};

const legalContent: Record<Locale, Record<FormationLegalPage, FormationLegalContent>> = {
  en: {
    privacy: {
      title: "Privacy notice",
      eyebrow: "Barmentech Formation",
      description: "How the current public Barmentech Formation website handles information and future service interactions.",
      lastUpdatedLabel: "Last updated",
      lastUpdated: "October 26, 2026",
      sections: [
        { title: "Scope", body: ["This initial notice describes the current public website. It is an operational foundation and will be updated when the website adds analytics, forms, authentication, payments, portal functionality, or tax-document collection."] },
        { title: "Information you may provide", body: ["Visitors may voluntarily provide information through future contact or service interactions. The current public frontend does not include a functional intake form.", "Do not send Social Security numbers, ITINs, EINs, identity documents, tax records, or other sensitive documents through the public website. Future secure intake and Client Portal features will use separate controls and updated privacy disclosures."] },
        { title: "Hosting and security logs", body: ["Hosting and infrastructure providers may process basic technical logs such as IP address, browser and device information, timestamp, and requested pages for operation, security, and troubleshooting."] },
        { title: "Third-party destinations", body: ["If you choose to open WhatsApp or a social-media link, that destination has its own privacy practices. Barmentech does not control how those independent services process information."] },
        { title: "Retention, security, and requests", body: ["Information should be retained only as needed for the applicable interaction, security, legal, or operational purpose. Reasonable safeguards should be used for information handled through future services.", "You may request access, correction, or information about a future service interaction through an available Barmentech communication channel. The available process may depend on the service and applicable records."] },
      ],
    },
    terms: {
      title: "Website terms of use",
      eyebrow: "Barmentech Formation",
      description: "Conservative terms for using the public Barmentech Formation website.",
      lastUpdatedLabel: "Last updated",
      lastUpdated: "October 26, 2026",
      sections: [
        { title: "Informational website", body: ["This website provides general information about Barmentech services. Visiting the website or communicating through a listed channel does not automatically create a client relationship."] },
        { title: "Quotes and services", body: ["Prices shown as starting at are not binding final quotes. Quotes and services require confirmation of scope and accepted engagement terms.", "Government, registered-agent, banking, payment-provider, accounting, tax, and other third-party costs or decisions may vary. Third-party approvals are outside Barmentech’s control."] },
        { title: "Website content and use", body: ["Website content belongs to Barmentech or its licensors and may not be copied, misused, or used in a way that harms the website, its visitors, or its operation. Use the website lawfully and do not attempt to disrupt, probe, or gain unauthorized access to it."] },
        { title: "External links and availability", body: ["External links are provided for convenience. Barmentech does not control their content or availability. Website content and availability may change without notice."] },
        { title: "Service agreements", body: ["Any purchased service is governed by its applicable confirmed scope and service-specific agreement. These website terms do not replace those agreements."] },
      ],
    },
    disclaimer: {
      title: "General disclaimer",
      eyebrow: "Barmentech Formation",
      description: "Important information about the limits of public Barmentech Formation website content and services.",
      lastUpdatedLabel: "Last updated",
      lastUpdated: "October 26, 2026",
      sections: [
        { title: "General information", body: ["Website information is general only. It is not legal advice, and tax information does not replace a review of a customer’s specific facts and records."] },
        { title: "No guaranteed outcomes", body: ["Barmentech does not guarantee formation, EIN, banking, payment-processor, tax, refund, compliance, timing, or financial outcomes. State agencies, the IRS, banks, registered agents, payment processors, and other third parties make their own decisions."] },
        { title: "Independent authorities and providers", body: ["Barmentech is not affiliated with or endorsed by the IRS or state authorities. Third-party availability, eligibility, fees, processing methods, and approvals may change."] },
        { title: "Tax-service scope", body: ["Tax preparation and filing support depend on confirmed engagement scope, records, eligibility, credentials, operational readiness, and available filing method. Barmentech does not claim CPA, Enrolled Agent, attorney, CAA, ERO, law-firm, accounting-firm, or unrestricted IRS representation status on this website."] },
        { title: "Verify your circumstances", body: ["Information may change and should be verified for your circumstances. Consult appropriately qualified professionals when your situation requires legal, tax, accounting, or other specialized advice."] },
      ],
    },
  },
  es: {
    privacy: {
      title: "Aviso de privacidad",
      eyebrow: "Barmentech Formation",
      description: "Cómo el sitio público actual de Barmentech Formation maneja información e interacciones futuras de servicio.",
      lastUpdatedLabel: "Última actualización",
      lastUpdated: "26 de octubre de 2026",
      sections: [
        { title: "Alcance", body: ["Este aviso inicial describe el sitio web público actual. Es una base operativa y se actualizará cuando el sitio agregue analítica, formularios, autenticación, pagos, funcionalidad de portal o recolección de documentos fiscales."] },
        { title: "Información que puedes proporcionar", body: ["Los visitantes pueden proporcionar información voluntariamente mediante futuras interacciones de contacto o servicio. El frontend público actual no incluye un formulario de admisión funcional.", "No envíes números de Seguro Social, ITIN, EIN, documentos de identidad, registros fiscales ni otros documentos sensibles a través del sitio público. Las futuras funciones de admisión segura y Portal de clientes usarán controles separados y avisos de privacidad actualizados."] },
        { title: "Registros de alojamiento y seguridad", body: ["Los proveedores de alojamiento e infraestructura pueden procesar registros técnicos básicos, como dirección IP, información del navegador y dispositivo, marca de tiempo y páginas solicitadas, para operación, seguridad y solución de problemas."] },
        { title: "Destinos de terceros", body: ["Si eliges abrir WhatsApp o un enlace de redes sociales, ese destino tiene sus propias prácticas de privacidad. Barmentech no controla cómo esos servicios independientes procesan información."] },
        { title: "Retención, seguridad y solicitudes", body: ["La información debe conservarse solo según sea necesario para la interacción, seguridad, finalidad legal u operativa aplicable. Deben usarse salvaguardas razonables para la información manejada mediante servicios futuros.", "Puedes solicitar acceso, corrección o información sobre una futura interacción de servicio mediante un canal de comunicación disponible de Barmentech. El proceso disponible puede depender del servicio y de los registros aplicables."] },
      ],
    },
    terms: {
      title: "Términos de uso del sitio web",
      eyebrow: "Barmentech Formation",
      description: "Términos conservadores para el uso del sitio web público de Barmentech Formation.",
      lastUpdatedLabel: "Última actualización",
      lastUpdated: "26 de octubre de 2026",
      sections: [
        { title: "Sitio web informativo", body: ["Este sitio web proporciona información general sobre los servicios de Barmentech. Visitar el sitio o comunicarse mediante un canal listado no crea automáticamente una relación con el cliente."] },
        { title: "Cotizaciones y servicios", body: ["Los precios mostrados como precios iniciales no son cotizaciones finales vinculantes. Las cotizaciones y servicios requieren confirmación del alcance y aceptación de los términos del encargo.", "Los costos o decisiones gubernamentales, de agente registrado, banca, proveedores de pago, contabilidad, impuestos y otros terceros pueden variar. Las aprobaciones de terceros están fuera del control de Barmentech."] },
        { title: "Contenido y uso del sitio", body: ["El contenido del sitio pertenece a Barmentech o a sus licenciantes y no puede copiarse, usarse indebidamente ni utilizarse de una forma que perjudique el sitio, a sus visitantes o su funcionamiento. Usa el sitio de forma lícita y no intentes interrumpirlo, examinarlo ni acceder sin autorización."] },
        { title: "Enlaces externos y disponibilidad", body: ["Los enlaces externos se proporcionan por conveniencia. Barmentech no controla su contenido ni disponibilidad. El contenido y disponibilidad del sitio pueden cambiar sin previo aviso."] },
        { title: "Acuerdos de servicio", body: ["Todo servicio adquirido se rige por su alcance confirmado aplicable y acuerdo específico de servicio. Estos términos del sitio web no reemplazan esos acuerdos."] },
      ],
    },
    disclaimer: {
      title: "Descargo de responsabilidad general",
      eyebrow: "Barmentech Formation",
      description: "Información importante sobre los límites del contenido y servicios públicos de Barmentech Formation.",
      lastUpdatedLabel: "Última actualización",
      lastUpdated: "26 de octubre de 2026",
      sections: [
        { title: "Información general", body: ["La información del sitio web es únicamente general. No constituye asesoramiento legal, y la información fiscal no reemplaza una revisión de los hechos y registros específicos del cliente."] },
        { title: "Sin resultados garantizados", body: ["Barmentech no garantiza resultados de formación, EIN, banca, procesadores de pago, impuestos, reembolsos, cumplimiento, tiempos ni resultados financieros. Las agencias estatales, el IRS, bancos, agentes registrados, procesadores de pago y otros terceros toman sus propias decisiones."] },
        { title: "Autoridades y proveedores independientes", body: ["Barmentech no está afiliada ni respaldada por el IRS ni por autoridades estatales. La disponibilidad, elegibilidad, tarifas, métodos de procesamiento y aprobaciones de terceros pueden cambiar."] },
        { title: "Alcance de los servicios fiscales", body: ["El apoyo para preparación y presentación fiscal depende del alcance confirmado del encargo, registros, elegibilidad, credenciales, preparación operativa y método de presentación disponible. Barmentech no afirma estatus de CPA, Enrolled Agent, abogado, CAA, ERO, firma de abogados, firma de contabilidad ni derechos ilimitados de representación ante el IRS en este sitio web."] },
        { title: "Verifica tus circunstancias", body: ["La información puede cambiar y debe verificarse según tus circunstancias. Consulta a profesionales adecuadamente calificados cuando tu situación requiera asesoramiento legal, fiscal, contable u otro asesoramiento especializado."] },
      ],
    },
  },
};

export function getFormationLegalPath(locale: Locale, page: FormationLegalPage) {
  return legalPaths[locale][page];
}

export function getFormationLegalPage(locale: Locale, path: string): FormationLegalPage | undefined {
  return (Object.keys(legalPaths[locale]) as FormationLegalPage[]).find((page) => legalPaths[locale][page] === path);
}

export function getFormationLegalContent(locale: Locale, page: FormationLegalPage) {
  return legalContent[locale][page];
}
