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

type FormationServicePanel = {
  image: string;
  services: FormationService[];
  title: string;
};

export type FormationContactContent = {
  alternativeContactTitle: string;
  companyLabel: string;
  countryLabel: string;
  emailInvalid: string;
  emailLabel: string;
  fallbackBody: string;
  fallbackTitle: string;
  fullNameLabel: string;
  interestLabel: string;
  interestOptions: Array<{ label: string; value: string }>;
  interestPlaceholder: string;
  messageHelper: string;
  messageLabel: string;
  phoneLabel: string;
  privacyConsentEnd: string;
  privacyConsentRequired: string;
  privacyConsentStart: string;
  privacyLinkLabel: string;
  providerError: string;
  requiredField: string;
  responseTime: string;
  sensitiveWarning: string;
  submitting: string;
  submit: string;
  success: string;
  title: string;
  whatsappAlternative: string;
};

type FormationDifferentiator = {
  description: string;
  title: string;
};

type FormationComplianceArea = {
  description: string;
  services: string[];
  title: string;
};

export type FormationTaxServiceGroup = {
  description: string;
  services: string[];
  title: string;
};

export type FormationFaqGroup = {
  items: Array<{
    answer: string;
    question: string;
  }>;
  title: string;
};

export type FormationPage =
  | "about"
  | "bookkeeping"
  | "business-formation"
  | "business-services"
  | "contact"
  | "disclaimer"
  | "faq"
  | "home"
  | "portal"
  | "privacy"
  | "taxes"
  | "terms";

type FormationLabels = {
  about: string;
  annualComplianceAdditionalBody: string;
  annualComplianceAdditionalTitle: string;
  annualComplianceAreas: FormationComplianceArea[];
  annualComplianceCta: string;
  annualComplianceEyebrow: string;
  annualComplianceIntroduction: string;
  annualCompliancePortalBody: string;
  annualCompliancePortalCta: string;
  annualComplianceScopeBody: string;
  annualComplianceScopeTitle: string;
  annualComplianceTitle: string;
  businessFormation: string;
  businessServices: string;
  bookkeeping: string;
  contact: string;
  contactBody: string;
  contactForm: FormationContactContent;
  contactSupportingMessage: string;
  contactCta: string;
  division: string;
  footerNavigation: string;
  footerDescription: string;
  footerGeneralContact: string;
  footerBusinessHours: string;
  footerCostaRicaAppointment: string;
  footerCostaRicaTitle: string;
  footerDevelopmentCredit: string;
  footerEmailLabel: string;
  footerLegalNavigation: string;
  footerServicesNavigation: string;
  footerSocialNavigation: string;
  footerUnitedStatesTitle: string;
  footerUnitedStatesCountry: string;
  footerUnitedStatesPhoneLabel: string;
  footerCostaRicaPhoneLabel: string;
  footerWhatsappLabel: string;
  formation: string;
  faq: string;
  faqCta: string;
  faqCtaBody: string;
  faqCtaTitle: string;
  faqEyebrow: string;
  faqGroups: FormationFaqGroup[];
  faqIntroduction: string;
  faqTitle: string;
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
  disclaimer: string;
  heroAlt: string;
  heroDescription: string;
  heroEyebrow: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroTitle: string;
  headerHomeLabel: string;
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
  pricingAdditionalServices: string;
  pricingCta: string;
  pricingEyebrow: string;
  pricingFinalPriceBody: string;
  pricingFinalPriceTitle: string;
  pricingIncludedTitle: string;
  pricingInclusions: string[];
  pricingIntro: string;
  pricingLabel: string;
  pricingNavigation: string;
  pricingPrice: string;
  pricingPriceQualifier: string;
  pricingProviderQualification: string;
  pricingRenewalQualification: string;
  pricingSecondaryCta: string;
  pricingTitle: string;
  portal: string;
  portalBody: string;
  portalCta: string;
  portalImageAlt: string;
  portalSupportingMessage: string;
  servicesAvailability: string;
  servicesCalloutBody: string;
  servicesCalloutContactLabel: string;
  servicesCalloutScheduleLabel: string;
  servicesCalloutTitle: string;
  servicesEyebrow: string;
  servicesIntroduction: string;
  servicesPanels: FormationServicePanel[];
  servicesSelect: string;
  servicesSelected: string;
  servicesTitle: string;
  services: string;
  taxes: string;
  taxServices: string;
  taxServicesAudience: string[];
  taxServicesAudienceTitle: string;
  taxServicesBusiness: FormationTaxServiceGroup;
  taxServicesCta: string;
  taxServicesCtaBody: string;
  taxServicesCtaTitle: string;
  taxServicesEngagementSteps: string[];
  taxServicesEngagementTitle: string;
  taxServicesEyebrow: string;
  taxServicesForeignOwnerBody: string;
  taxServicesForeignOwnerTitle: string;
  taxServicesHeroBody: string;
  taxServicesHeroCta: string;
  taxServicesHeroSecondaryCta: string;
  taxServicesIndividual: FormationTaxServiceGroup;
  taxServicesScopeFactors: string[];
  taxServicesScopeTitle: string;
  taxServicesTitle: string;
  terms: string;
  whyBarmentechClosingBody: string;
  whyBarmentechClosingTitle: string;
  whyBarmentechDifferentiators: FormationDifferentiator[];
  whyBarmentechEyebrow: string;
  whyBarmentechIntroduction: string;
  whyBarmentechPrimaryCta: string;
  whyBarmentechSecondaryCta: string;
  whyBarmentechTitle: string;
};

const labels: Record<Locale, FormationLabels> = {
  en: {
    about: "About",
    annualComplianceAdditionalBody: "Additional bookkeeping, tax, mail, virtual-office, technology, and operational services are available through a separate evaluation or quote.",
    annualComplianceAdditionalTitle: "Additional support, evaluated separately",
    annualComplianceAreas: [
      {
        description: "For company records and state-related requirements that may apply after formation.",
        services: [
          "Registered-agent renewal.",
          "Preparation and filing support for state annual reports when applicable.",
          "Compliance calendar and deadline reminders.",
          "Company-information review before renewal.",
          "Organization of corporate documents.",
        ],
        title: "Corporate maintenance",
      },
      {
        description: "Tax and informational filing needs are based on the company’s entity classification, owners, residency, and activity. These services are evaluated and contracted separately.",
        services: ["Coordination of applicable federal, state, tax, or informational filings when separately contracted."],
        title: "Tax and informational compliance",
      },
    ],
    annualComplianceCta: "Talk about your annual support",
    annualComplianceEyebrow: "After formation",
    annualComplianceIntroduction: "The initial Formation package includes registered-agent service for the first year. After that, annual renewal and compliance support can be selected based on the company’s needs.",
    annualCompliancePortalBody: "When available, the future Client Portal will allow customers to review their documents, services, invoices, and account status.",
    annualCompliancePortalCta: "Client portal (coming soon)",
    annualComplianceScopeBody: "Government fees, penalties, third-party costs, registered-agent renewal, and tax or accounting services depend on the case and confirmed scope.",
    annualComplianceScopeTitle: "Scope is confirmed for your company",
    annualComplianceTitle: "Annual renewal and compliance support",
    businessFormation: "Business formation",
    businessServices: "Business services",
    bookkeeping: "Bookkeeping",
    contact: "Contact",
    contactBody: "Tell us what your business needs, and we will review the appropriate next step for your formation, tax, or operational-support inquiry.",
    contactForm: {
      alternativeContactTitle: "Other ways to reach us",
      companyLabel: "Company (optional)",
      countryLabel: "Country",
      emailInvalid: "Enter a valid email address.",
      emailLabel: "Email",
      fallbackBody: "Online form submission is not available at the moment. Use WhatsApp when available or email us at info@barmentech.com.",
      fallbackTitle: "Contact options",
      fullNameLabel: "Full name",
      interestLabel: "Service of interest",
      interestOptions: [
        { label: "Company formation", value: "company-formation" },
        { label: "Tax services", value: "tax-services" },
        { label: "Annual compliance", value: "annual-compliance" },
        { label: "Banking and payment solutions", value: "banking-payments" },
        { label: "Technology and digital presence", value: "technology-digital" },
        { label: "In-person workshop", value: "workshop" },
        { label: "Other", value: "other" },
      ],
      interestPlaceholder: "Select a service",
      messageHelper: "Please keep your message to 2,000 characters or fewer.",
      messageLabel: "How can we help?",
      phoneLabel: "Phone or WhatsApp (optional)",
      privacyConsentEnd: "and agree that Barmentech may use my information to respond to this inquiry.",
      privacyConsentRequired: "Please confirm that you have read the privacy notice.",
      privacyConsentStart: "I have read the",
      privacyLinkLabel: "Privacy notice",
      providerError: "We could not send your message right now. Please try again or use one of the contact options below.",
      requiredField: "Please complete this field.",
      responseTime: "We review new inquiries and respond through the appropriate channel as soon as reasonably possible.",
      sensitiveWarning: "Do not submit Social Security numbers, ITINs, EINs, identity documents, banking information, payment-card information, tax returns, authentication credentials, or other sensitive documents through this public form.",
      submitting: "Sending your message…",
      submit: "Send inquiry",
      success: "Thank you. Your inquiry was sent successfully.",
      title: "Tell us how we can help",
      whatsappAlternative: "Contact Barmentech on WhatsApp",
    },
    contactSupportingMessage: "Submitting this form does not automatically create a client, legal, tax, or professional-services relationship.",
    contactCta: "Contact",
    division: "Business services",
    footerNavigation: "Navigation",
    footerDescription: "Company formation and tax services for entrepreneurs and businesses operating in the United States. We support formation, organization, and tax filings according to each case and the confirmed scope.",
    footerGeneralContact: "General contact",
    footerBusinessHours: "Monday–Friday, 9:00 AM–6:00 PM ET",
    footerCostaRicaAppointment: "In-person assistance by appointment",
    footerCostaRicaTitle: "Costa Rica",
    footerDevelopmentCredit: "Website designed and developed by Barmentech",
    footerEmailLabel: "Email",
    footerLegalNavigation: "Legal",
    footerServicesNavigation: "Services",
    footerSocialNavigation: "Social links",
    footerUnitedStatesTitle: "United States",
    footerUnitedStatesCountry: "United States",
    footerUnitedStatesPhoneLabel: "Call Barmentech United States",
    footerCostaRicaPhoneLabel: "Call Barmentech Costa Rica",
    footerWhatsappLabel: "Chat with Barmentech on WhatsApp",
    formation: "Formation",
    faq: "FAQ",
    faqCta: "Contact Barmentech",
    faqCtaBody: "We can review the requested service and explain the next step before any scope is confirmed.",
    faqCtaTitle: "Need help with your specific situation?",
    faqEyebrow: "Barmentech answers",
    faqGroups: [
      {
        title: "Formation and eligibility",
        items: [
          { question: "Can I form a U.S. company if I do not live in the United States?", answer: "In many cases, yes. Nonresident and international owners can request an evaluation for U.S. company formation. The available structure, documents, providers, and next steps depend on the state, ownership, residency, and the company’s facts." },
          { question: "In which states does Barmentech provide formation support?", answer: "Barmentech provides formation support in all 50 states. Wyoming and Florida are common examples, but they are not the only states available or a universal recommendation." },
          { question: "What is the difference between an LLC and a Corporation?", answer: "An LLC and a Corporation are different state-level entity structures with different ownership, governance, and tax considerations. The appropriate structure depends on the company’s circumstances, and this information is not legal or tax advice." },
          { question: "Is an S Corporation a separate state-level business entity?", answer: "No. An S Corporation is a federal tax election that may be evaluated later for eligible entities and owners. It is not a separate state-level formation type equivalent to an LLC or a Corporation." },
          { question: "Can Barmentech help a company that was formed by another provider?", answer: "Yes, support may be available for existing companies after an evaluation of their records, needs, and requested scope. Formation by Barmentech is not required for every operational, compliance, or tax-support service." },
          { question: "Does Barmentech provide legal advice?", answer: "No. Barmentech does not provide legal advice and is not presented as a law firm. Customers should consult a qualified attorney for legal questions or advice about their specific circumstances." },
        ],
      },
      {
        title: "Pricing and package scope",
        items: [
          { question: "What does “company formation starting at $575” mean?", answer: "The USD 575 starting price applies to a standard, eligible formation case. Barmentech reviews the company details and provides one final Formation price before payment." },
          { question: "What is included in the initial Formation package?", answer: "The package includes state company formation filing, EIN assistance, initial company documents, registered-agent service for the first year, assistance with business-bank applications and payment-provider setup when suitable, plus initial onboarding and formation guidance." },
          { question: "Why does the final price vary by state and company structure?", answer: "The final price depends on the selected state, entity type, number and residency of owners, registered-agent provider cost, and case requirements. Government fees, third-party costs, and the confirmed scope can also differ." },
          { question: "Can I request a personalized quote before paying?", answer: "Yes. Barmentech reviews the formation details and provides a final quote before payment. The quote reflects the confirmed scope and the factors relevant to the company’s case." },
        ],
      },
      {
        title: "Timing, EIN, banking, and payment providers",
        items: [
          { question: "How long does company formation take?", answer: "Barmentech can prepare and submit a complete standard filing promptly after receiving the required information. State processing time varies by jurisdiction, workload, filing method, and expedited-service availability. Expedited state processing may be available for an additional cost." },
          { question: "Is the company guaranteed to be approved within 48 hours?", answer: "No. A state filing, EIN issuance, bank review, and payment-provider approval are separate processes. Barmentech does not guarantee a state approval timeline or delivery of a complete operational company within 48 hours." },
          { question: "Is an EIN included?", answer: "EIN assistance is included in the initial Formation package. EIN issuance is determined through the applicable federal process and depends on the information, eligibility, and requirements of the case." },
          { question: "Does Barmentech guarantee approval from Mercury, Relay, Stripe, or PayPal?", answer: "No. Barmentech can assist with applications or setup when suitable, but eligibility, review, availability, and approval are controlled exclusively by each independent provider." },
        ],
      },
      {
        title: "Annual renewal and compliance",
        items: [
          { question: "Is registered-agent service included?", answer: "Registered-agent service for the first year is included in the initial Formation package. The service is not included indefinitely in the initial Formation price." },
          { question: "What happens after the first year?", answer: "Customers may purchase annual renewal and compliance support after the first year. Registered-agent renewal, state reports, company records, tax or informational filings, and other services depend on the state, company activity, contracted scope, and applicable requirements." },
        ],
      },
      {
        title: "Tax services",
        items: [
          { question: "Does company formation include bookkeeping or tax-return preparation?", answer: "No. Bookkeeping and tax-return preparation are not automatically included in company formation. They may be available as separately scoped services after evaluation." },
          { question: "Does Barmentech provide tax preparation for businesses and individuals?", answer: "Tax preparation and compliance support may be available for businesses and individuals after intake, eligibility review, and scope confirmation. Availability depends on the taxpayer’s facts, records, and requested service." },
          { question: "Can Barmentech handle foreign-owner informational filing requirements?", answer: "Support for foreign-owner informational filing requirements may be available when applicable and within confirmed scope. Requirements depend on entity classification, ownership, residency, activity, and records; this FAQ does not provide individualized tax advice." },
        ],
      },
      {
        title: "Client Portal and support",
        items: [
          { question: "How will the future Client Portal work?", answer: "Barmentech is preparing a secure Client Portal for future customer access to information, documents, services, invoices, and account status. It is not currently functional; existing customers should continue using the communication channel provided to them." },
        ],
      },
    ],
    faqIntroduction: "These answers describe the current public scope of Barmentech services. Final scope, third-party availability, and applicable requirements are confirmed for each case.",
    faqTitle: "Frequently asked questions about forming and operating a U.S. company",
    coverageBody: "We support business formation across all 50 states. We help you evaluate where to form based on your activity, location, operations, and growth plans.",
    coverageExamplesLabel: "Frequently considered examples",
    coverageEyebrow: "Nationwide U.S. coverage",
    disclaimer: "Disclaimer",
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
    headerHomeLabel: "Barmentech Formation home",
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
    pricingAdditionalServices: "Broader services may include registered-agent renewal and annual compliance, state annual reports, bookkeeping, federal or state tax and information filings, virtual office and CMRA/mail services, business websites, domains, business email, and other operational or technology services. These are scoped separately.",
    pricingCta: "Talk about your formation",
    pricingEyebrow: "Formation offer",
    pricingFinalPriceBody: "Your final Formation price depends on the selected state, company structure (LLC or Corporation), number of owners, owner residency, registered-agent provider cost, provider availability, and case requirements.",
    pricingFinalPriceTitle: "One reviewed final Formation price",
    pricingIncludedTitle: "Included in the initial Formation package",
    pricingInclusions: [
      "State company formation filing.",
      "EIN assistance.",
      "Initial company documents.",
      "Registered-agent service for the first year.",
      "Assistance with applying for a business bank account, generally through providers such as Mercury or Relay when suitable.",
      "Assistance with setting up payment processors such as Stripe or PayPal when suitable.",
      "Initial onboarding and formation guidance.",
    ],
    pricingIntro: "A clear starting point for standard, eligible formation cases. We review your company details before payment and provide one final Formation price.",
    pricingLabel: "Starting at",
    pricingNavigation: "Pricing",
    pricingPrice: "$575",
    pricingPriceQualifier: "For a standard, eligible formation case.",
    pricingProviderQualification: "Bank accounts and payment processors are subject to each independent provider’s eligibility requirements, review, availability, and approval. We assist with applications and setup, but do not guarantee approval.",
    pricingRenewalQualification: "Registered-agent service is included for the first year. Renewal after the first year and annual compliance services are scoped separately.",
    pricingSecondaryCta: "Explore broader services",
    pricingTitle: "Company formation starting at $575",
    portal: "Client portal",
    portalBody: "We are building a secure workspace where clients will be able to review their services, documents, invoices, account status, and next steps in one place.",
    portalCta: "Contact Barmentech",
    portalImageAlt: "Barmentech founder developing the client portal",
    portalSupportingMessage: "If you are already a Barmentech client, continue using the communication channel provided to you while we prepare the portal.",
    servicesAvailability: "Services are configured according to the company, selected state, and contracted scope. Government and third-party costs are identified separately when applicable.",
    servicesCalloutBody: "Schedule an introductory call or contact us to review your company formation, tax, or operational-support needs.",
    servicesCalloutContactLabel: "Contact us",
    servicesCalloutScheduleLabel: "Schedule a call",
    servicesCalloutTitle: "Let’s discuss what your business needs",
    servicesEyebrow: "Formation and operational support",
    servicesIntroduction: "We help you move from forming your company to preparing the tools needed to begin operating. Available services depend on your business needs and selected package.",
    servicesPanels: [
      {
        image: "/images/service-company-formation.webp",
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
        ],
      },
      {
        image: "/images/service-ein-documents.webp",
        title: "EIN and corporate documents",
        services: [
          {
            description: "We support your EIN application and prepare or organize the corporate documents included in your service.",
            title: "EIN and corporate documents",
          },
        ],
      },
      {
        image: "/images/service-business-address-mail.webp",
        title: "Business address and mail",
        services: [
          {
            description: "We coordinate business-address and mail-handling options when they are needed for the customer’s operations.",
            title: "Business address and mail",
          },
        ],
      },
      {
        image: "/images/service-banking-payments.webp",
        title: "Banking and payment guidance",
        services: [
          {
            description: "We guide you through preparing and applying for bank accounts and payment processors that may fit your company’s characteristics.",
            qualifier: "Account opening and approval are determined exclusively by each provider.",
            title: "Banking and payment guidance",
          },
        ],
      },
      {
        image: "/images/service-technology-digital.webp",
        title: "Business tools and digital presence",
        services: [
          {
            description: "We provide and configure a domain, business email, Google Workspace, and business phone options as included in your selected service.",
            title: "Business tools",
          },
          {
            description: "We design and build your company’s initial digital system, including a domain, website, and tools that support a professional presentation.",
            title: "Digital presence",
          },
        ],
      },
      {
        image: "/images/service-annual-compliance.webp",
        title: "Ongoing business support",
        services: [
          {
            description: "After formation, we prepare and file applicable forms, state reports, and tax filings within the confirmed service scope, and organize your company documents and upcoming compliance steps.",
            title: "Ongoing business support",
          },
        ],
      },
    ],
    servicesSelect: "Select",
    servicesSelected: "Selected",
    servicesTitle: "More than registering a company",
    services: "Services",
    taxes: "Taxes",
    taxServices: "Tax Services",
    taxServicesAudience: ["U.S. companies.", "Foreign owners of U.S. companies.", "Individuals with U.S. federal filing obligations.", "Existing companies that were formed elsewhere."],
    taxServicesAudienceTitle: "Who we help",
    taxServicesBusiness: {
      description: "Business tax and informational filing support is available after intake, eligibility review, and scope confirmation.",
      services: [
        "Foreign-owned single-member LLC compliance when applicable.",
        "Form 5472 with pro forma Form 1120 when applicable.",
        "Partnership return support, including Form 1065 and related owner reporting when within approved scope.",
        "C Corporation return support, including Form 1120 when within approved scope.",
        "S Corporation return support, including Form 1120-S when the entity has a valid election and the case is within approved scope.",
        "Extensions, prior-year filings, corrections, and other business returns only after evaluation.",
        "Bookkeeping readiness and records review as separately scoped services.",
      ],
      title: "Business tax and informational filing support",
    },
    taxServicesCta: "Request an evaluation",
    taxServicesCtaBody: "Tell us about the taxpayer, records, and filing needs so we can evaluate whether the requested support fits the available scope.",
    taxServicesCtaTitle: "Start with an evaluation",
    taxServicesEngagementSteps: [
      "Initial intake.",
      "Scope and records review.",
      "Written quote or engagement confirmation.",
      "Preparation and customer review.",
      "Filing or delivery according to the approved engagement and available filing method.",
    ],
    taxServicesEngagementTitle: "How the engagement works",
    taxServicesEyebrow: "U.S. tax preparation and compliance",
    taxServicesForeignOwnerBody: "Foreign-owned U.S. entities may have federal informational filing obligations even when they do not owe federal income tax. Whether an obligation applies depends on the taxpayer’s facts, entity classification, ownership, and records. This page does not provide individualized tax advice.",
    taxServicesForeignOwnerTitle: "Foreign-owner compliance",
    taxServicesHeroBody: "Barmentech assists businesses and individuals with U.S. federal tax preparation and compliance services after intake, eligibility review, and scope confirmation. Support is available to companies formed with us and to existing companies formed elsewhere.",
    taxServicesHeroCta: "Request a tax-services evaluation",
    taxServicesHeroSecondaryCta: "Explore annual support",
    taxServicesIndividual: {
      description: "Individual tax preparation support is available after eligibility, records, and complexity review.",
      services: [
        "Individual federal return preparation when within approved scope.",
        "Nonresident and international situations only after eligibility and complexity review.",
        "Self-employed individuals and business owners.",
        "Individuals receiving business-related reporting such as Schedule K-1.",
        "Extensions, prior-year filings, or corrections only after evaluation.",
      ],
      title: "Individual tax preparation support",
    },
    taxServicesScopeFactors: ["Entity classification.", "Owner residency.", "Number of owners.", "Business activity.", "Transaction volume.", "Bookkeeping condition.", "Required federal or state filings.", "Prior-year or correction work."],
    taxServicesScopeTitle: "What affects scope and price",
    taxServicesTitle: "U.S. tax preparation and compliance support",
    terms: "Terms",
    whyBarmentechClosingBody: "We organize each service around the company’s needs and clearly identify scope, third-party costs, and next steps.",
    whyBarmentechClosingTitle: "A relationship that can continue after formation",
    whyBarmentechDifferentiators: [
      {
        description: "We work in English and Spanish so you can understand each stage, the required documents, and your company’s next steps.",
        title: "Bilingual support",
      },
      {
        description: "We understand that forming a company from outside the United States requires additional coordination across documents, providers, and operational tools.",
        title: "International-owner focus",
      },
      {
        description: "We can help connect company formation with an EIN, corporate documents, an address, business tools, and a digital presence, depending on the contracted scope.",
        title: "Formation connected to operations",
      },
      {
        description: "Our support can continue with organizing documents, renewals, state reports, and upcoming compliance steps.",
        title: "Support beyond registration",
      },
    ],
    whyBarmentechEyebrow: "Why Barmentech",
    whyBarmentechIntroduction: "Forming a company is only the beginning. We combine bilingual guidance, operational preparation, and business tools to help you move forward with a more organized foundation.",
    whyBarmentechPrimaryCta: "Talk to Barmentech",
    whyBarmentechSecondaryCta: "Client portal",
    whyBarmentechTitle: "Support designed to help you build, not only register",
  },
  es: {
    about: "Nosotros",
    annualComplianceAdditionalBody: "Los servicios adicionales de contabilidad, impuestos, correo, oficina virtual, tecnología y operación están disponibles mediante una evaluación o cotización por separado.",
    annualComplianceAdditionalTitle: "Soporte adicional, evaluado por separado",
    annualComplianceAreas: [
      {
        description: "Para los registros de la empresa y los requisitos estatales que puedan aplicar después de la formación.",
        services: [
          "Renovación del agente registrado.",
          "Preparación y apoyo para la presentación de reportes estatales anuales cuando corresponda.",
          "Calendario de cumplimiento y recordatorios de plazos.",
          "Revisión de la información de la empresa antes de la renovación.",
          "Organización de documentos corporativos.",
        ],
        title: "Mantenimiento corporativo",
      },
      {
        description: "Las necesidades de presentaciones fiscales e informativas se determinan según la clasificación de la entidad, los propietarios, su residencia y la actividad de la empresa. Estos servicios se evalúan y contratan por separado.",
        services: ["Coordinación de presentaciones federales, estatales, fiscales o informativas aplicables cuando se contraten por separado."],
        title: "Cumplimiento fiscal e informativo",
      },
    ],
    annualComplianceCta: "Hablemos de tu soporte anual",
    annualComplianceEyebrow: "Después de la formación",
    annualComplianceIntroduction: "El paquete inicial de Formación incluye el servicio de agente registrado durante el primer año. Después, el servicio anual de renovación y cumplimiento puede contratarse según las necesidades de la empresa.",
    annualCompliancePortalBody: "Cuando esté disponible, el futuro Portal de clientes permitirá a los clientes revisar sus documentos, servicios, facturas y estado de cuenta.",
    annualCompliancePortalCta: "Portal de clientes (próximamente)",
    annualComplianceScopeBody: "Las tarifas gubernamentales, sanciones, costos de terceros, renovación del agente registrado y los servicios fiscales o contables dependen del caso y del alcance confirmado.",
    annualComplianceScopeTitle: "El alcance se confirma para tu empresa",
    annualComplianceTitle: "Renovación anual y apoyo de cumplimiento",
    businessFormation: "Formación de empresas",
    businessServices: "Servicios empresariales",
    bookkeeping: "Bookkeeping",
    contact: "Contacto",
    contactBody: "Cuéntanos qué necesita tu empresa y revisaremos el siguiente paso apropiado para tu consulta de formación, servicios fiscales o apoyo operativo.",
    contactForm: {
      alternativeContactTitle: "Otras formas de contactarnos",
      companyLabel: "Empresa (opcional)",
      countryLabel: "País",
      emailInvalid: "Ingresa una dirección de correo electrónico válida.",
      emailLabel: "Correo electrónico",
      fallbackBody: "El envío del formulario en línea no está disponible en este momento. Usa WhatsApp cuando esté disponible o escríbenos a info@barmentech.com.",
      fallbackTitle: "Opciones de contacto",
      fullNameLabel: "Nombre completo",
      interestLabel: "Servicio de interés",
      interestOptions: [
        { label: "Formación de empresas", value: "company-formation" },
        { label: "Servicios fiscales", value: "tax-services" },
        { label: "Cumplimiento anual", value: "annual-compliance" },
        { label: "Soluciones de banca y pagos", value: "banking-payments" },
        { label: "Tecnología y presencia digital", value: "technology-digital" },
        { label: "Taller presencial", value: "workshop" },
        { label: "Otro", value: "other" },
      ],
      interestPlaceholder: "Selecciona un servicio",
      messageHelper: "Mantén tu mensaje en 2.000 caracteres o menos.",
      messageLabel: "¿Cómo podemos ayudarte?",
      phoneLabel: "Teléfono o WhatsApp (opcional)",
      privacyConsentEnd: "y acepto que Barmentech use mi información para responder a esta consulta.",
      privacyConsentRequired: "Confirma que has leído el aviso de privacidad.",
      privacyConsentStart: "He leído el",
      privacyLinkLabel: "Aviso de privacidad",
      providerError: "No pudimos enviar tu mensaje en este momento. Inténtalo nuevamente o usa una de las opciones de contacto a continuación.",
      requiredField: "Completa este campo.",
      responseTime: "Revisamos las consultas nuevas y respondemos mediante el canal apropiado tan pronto como sea razonablemente posible.",
      sensitiveWarning: "No envíes números de Seguro Social, ITIN, EIN, documentos de identidad, información bancaria, información de tarjetas de pago, declaraciones de impuestos, credenciales de autenticación ni otros documentos sensibles mediante este formulario público.",
      submitting: "Enviando tu mensaje…",
      submit: "Enviar consulta",
      success: "Gracias. Tu consulta se envió correctamente.",
      title: "Cuéntanos cómo podemos ayudarte",
      whatsappAlternative: "Contactar a Barmentech por WhatsApp",
    },
    contactSupportingMessage: "Enviar este formulario no crea automáticamente una relación de cliente ni una relación de servicios legales, fiscales o profesionales.",
    contactCta: "Contacto",
    division: "Servicios empresariales",
    footerNavigation: "Navegación",
    footerDescription: "Formación de empresas y servicios fiscales para emprendedores y compañías que operan en Estados Unidos. Apoyamos la constitución, organización y presentación de declaraciones según cada caso y el alcance contratado.",
    footerGeneralContact: "Contacto general",
    footerBusinessHours: "Lunes–viernes, 9:00 a. m.–6:00 p. m. ET",
    footerCostaRicaAppointment: "Atención presencial con cita previa",
    footerCostaRicaTitle: "Costa Rica",
    footerDevelopmentCredit: "Diseño y desarrollo web por Barmentech",
    footerEmailLabel: "Correo electrónico",
    footerLegalNavigation: "Legal",
    footerServicesNavigation: "Servicios",
    footerSocialNavigation: "Redes sociales",
    footerUnitedStatesTitle: "Estados Unidos",
    footerUnitedStatesCountry: "Estados Unidos",
    footerUnitedStatesPhoneLabel: "Llamar a Barmentech Estados Unidos",
    footerCostaRicaPhoneLabel: "Llamar a Barmentech Costa Rica",
    footerWhatsappLabel: "Escribir a Barmentech por WhatsApp",
    formation: "Formación",
    faq: "Preguntas frecuentes",
    faqCta: "Hablar con Barmentech",
    faqCtaBody: "Podemos revisar el servicio solicitado y explicar el siguiente paso antes de confirmar cualquier alcance.",
    faqCtaTitle: "¿Necesitas ayuda con tu situación específica?",
    faqEyebrow: "Respuestas de Barmentech",
    faqGroups: [
      {
        title: "Formación y elegibilidad",
        items: [
          { question: "¿Puedo formar una empresa en Estados Unidos si no vivo allí?", answer: "En muchos casos, sí. Los propietarios no residentes e internacionales pueden solicitar una evaluación para formar una empresa en Estados Unidos. La estructura, los documentos, los proveedores y los siguientes pasos disponibles dependen del estado, la propiedad, la residencia y los hechos de la empresa." },
          { question: "¿En qué estados brinda Barmentech apoyo para la formación?", answer: "Barmentech brinda apoyo para la formación en los 50 estados. Wyoming y Florida son ejemplos comunes, pero no son los únicos estados disponibles ni una recomendación universal." },
          { question: "¿Cuál es la diferencia entre una LLC y una Corporation?", answer: "Una LLC y una Corporation son estructuras de entidad estatales diferentes, con distintas consideraciones de propiedad, gobierno y tributación. La estructura adecuada depende de las circunstancias de la empresa, y esta información no constituye asesoramiento legal ni fiscal." },
          { question: "¿Es una S Corporation una entidad empresarial estatal independiente?", answer: "No. Una S Corporation es una elección fiscal federal que puede evaluarse posteriormente para entidades y propietarios elegibles. No es un tipo de formación estatal independiente equivalente a una LLC o una Corporation." },
          { question: "¿Puede Barmentech ayudar a una empresa formada por otro proveedor?", answer: "Sí, puede haber apoyo disponible para empresas existentes después de evaluar sus registros, necesidades y alcance solicitado. No es necesario haber formado la empresa con Barmentech para cada servicio operativo, de cumplimiento o de apoyo fiscal." },
          { question: "¿Barmentech brinda asesoramiento legal?", answer: "No. Barmentech no brinda asesoramiento legal ni se presenta como una firma de abogados. Los clientes deben consultar a un abogado calificado para preguntas legales o asesoramiento sobre sus circunstancias específicas." },
        ],
      },
      {
        title: "Precio y alcance del paquete",
        items: [
          { question: "¿Qué significa “formación de empresa desde $575”?", answer: "El precio inicial de USD 575 aplica a un caso estándar y elegible de formación. Barmentech revisa los detalles de la empresa y proporciona un precio final único de formación antes del pago." },
          { question: "¿Qué incluye el paquete inicial de formación?", answer: "El paquete incluye la presentación de formación estatal, asistencia con EIN, documentos iniciales de la empresa, servicio de agente registrado durante el primer año, asistencia con solicitudes de cuenta bancaria empresarial y configuración de procesadores de pago cuando resulte adecuado, además de orientación inicial de incorporación y formación." },
          { question: "¿Por qué varía el precio final según el estado y la estructura de la empresa?", answer: "El precio final depende del estado seleccionado, tipo de entidad, número y residencia de los propietarios, costo del proveedor de agente registrado y requisitos del caso. Las tarifas gubernamentales, los costos de terceros y el alcance confirmado también pueden variar." },
          { question: "¿Puedo solicitar una cotización personalizada antes de pagar?", answer: "Sí. Barmentech revisa los detalles de la formación y proporciona una cotización final antes del pago. La cotización refleja el alcance confirmado y los factores relevantes para el caso de la empresa." },
        ],
      },
      {
        title: "Tiempos, EIN, banca y proveedores de pago",
        items: [
          { question: "¿Cuánto tarda la formación de una empresa?", answer: "Barmentech puede preparar y presentar una solicitud estándar completa con prontitud después de recibir la información requerida. El tiempo de procesamiento estatal varía según la jurisdicción, carga de trabajo, método de presentación y disponibilidad de servicio acelerado. El procesamiento estatal acelerado puede estar disponible por un costo adicional." },
          { question: "¿Está garantizada la aprobación de la empresa en 48 horas?", answer: "No. La presentación estatal, emisión de EIN, revisión bancaria y aprobación del proveedor de pagos son procesos independientes. Barmentech no garantiza un plazo de aprobación estatal ni la entrega de una empresa operativa completa dentro de 48 horas." },
          { question: "¿Está incluido el EIN?", answer: "La asistencia con EIN está incluida en el paquete inicial de formación. La emisión del EIN se determina mediante el proceso federal aplicable y depende de la información, elegibilidad y requisitos del caso." },
          { question: "¿Barmentech garantiza la aprobación de Mercury, Relay, Stripe o PayPal?", answer: "No. Barmentech puede ayudar con solicitudes o configuración cuando resulte adecuado, pero la elegibilidad, revisión, disponibilidad y aprobación son controladas exclusivamente por cada proveedor independiente." },
        ],
      },
      {
        title: "Renovación anual y cumplimiento",
        items: [
          { question: "¿Está incluido el servicio de agente registrado?", answer: "El servicio de agente registrado durante el primer año está incluido en el paquete inicial de formación. El servicio no está incluido indefinidamente en el precio inicial de formación." },
          { question: "¿Qué sucede después del primer año?", answer: "Los clientes pueden adquirir apoyo para renovación anual y cumplimiento después del primer año. La renovación de agente registrado, reportes estatales, registros de la empresa, presentaciones fiscales o informativas y otros servicios dependen del estado, actividad de la empresa, alcance contratado y requisitos aplicables." },
        ],
      },
      {
        title: "Servicios fiscales",
        items: [
          { question: "¿La formación de la empresa incluye contabilidad o preparación de declaraciones fiscales?", answer: "No. La contabilidad y la preparación de declaraciones fiscales no se incluyen automáticamente con la formación de la empresa. Pueden estar disponibles como servicios con alcance separado después de una evaluación." },
          { question: "¿Barmentech ofrece preparación de impuestos para empresas y personas?", answer: "El apoyo para preparación y cumplimiento fiscal puede estar disponible para empresas y personas después de la admisión, revisión de elegibilidad y confirmación del alcance. La disponibilidad depende de los hechos, registros y servicio solicitado por el contribuyente." },
          { question: "¿Puede Barmentech manejar requisitos de presentación informativa para propietarios extranjeros?", answer: "El apoyo para requisitos de presentación informativa de propietarios extranjeros puede estar disponible cuando corresponda y esté dentro del alcance confirmado. Los requisitos dependen de la clasificación de la entidad, propiedad, residencia, actividad y registros; estas preguntas frecuentes no brindan asesoramiento fiscal individualizado." },
        ],
      },
      {
        title: "Portal de clientes y soporte",
        items: [
          { question: "¿Cómo funcionará el futuro Portal de clientes?", answer: "Barmentech está preparando un Portal de clientes seguro para que los clientes puedan acceder en el futuro a información, documentos, servicios, facturas y estado de cuenta. Aún no está en funcionamiento; los clientes existentes deben continuar usando el canal de comunicación que se les proporcionó." },
        ],
      },
    ],
    faqIntroduction: "Estas respuestas describen el alcance público actual de los servicios de Barmentech. El alcance final, la disponibilidad de terceros y los requisitos aplicables se confirman para cada caso.",
    faqTitle: "Preguntas frecuentes sobre formar y operar una empresa en Estados Unidos",
    coverageBody: "Ofrecemos formación de empresas en los 50 estados. Te ayudamos a evaluar dónde constituir tu compañía según tu actividad, ubicación, operaciones y planes de crecimiento.",
    coverageExamplesLabel: "Ejemplos que se consideran con frecuencia",
    coverageEyebrow: "Cobertura en todo Estados Unidos",
    disclaimer: "Descargo de responsabilidad",
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
    headerHomeLabel: "Inicio de Barmentech Formación",
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
    pricingAdditionalServices: "Los servicios complementarios pueden incluir renovación de agente registrado y cumplimiento anual, reportes estatales anuales, contabilidad, declaraciones y presentaciones federales o estatales de impuestos e información, oficina virtual y servicios CMRA/correo, sitios web empresariales, dominios, correo empresarial y otros servicios operativos o tecnológicos. Estos se definen por separado.",
    pricingCta: "Hablemos de tu formación",
    pricingEyebrow: "Oferta de formación",
    pricingFinalPriceBody: "El precio final de formación depende del estado seleccionado, la estructura de la empresa (LLC o corporación), el número de propietarios, la residencia de los propietarios, el costo del proveedor de agente registrado, la disponibilidad de proveedores y los requisitos del caso.",
    pricingFinalPriceTitle: "Un precio final de formación revisado",
    pricingIncludedTitle: "Incluido en el paquete inicial de formación",
    pricingInclusions: [
      "Presentación de formación de la empresa en el estado seleccionado.",
      "Asistencia con el EIN.",
      "Documentos iniciales de la empresa.",
      "Servicio de agente registrado durante el primer año.",
      "Asistencia para solicitar una cuenta bancaria empresarial, por lo general con proveedores como Mercury o Relay cuando resulten adecuados.",
      "Asistencia para configurar procesadores de pago como Stripe o PayPal cuando resulten adecuados.",
      "Orientación inicial para la incorporación y formación.",
    ],
    pricingIntro: "Un punto de partida claro para casos estándar que cumplen los requisitos. Revisamos los detalles de tu empresa antes de cualquier pago y te presentamos un precio final único para la formación.",
    pricingLabel: "Desde",
    pricingNavigation: "Precios",
    pricingPrice: "$575",
    pricingPriceQualifier: "Para un caso estándar que cumple los requisitos.",
    pricingProviderQualification: "Las cuentas bancarias y los procesadores de pago están sujetos a los requisitos de elegibilidad, revisión, disponibilidad y aprobación de cada proveedor independiente. Te ayudamos con solicitudes y configuración, pero no garantizamos aprobación.",
    pricingRenewalQualification: "El servicio de agente registrado está incluido durante el primer año. La renovación después del primer año y los servicios de cumplimiento anual se definen por separado.",
    pricingSecondaryCta: "Explorar servicios empresariales",
    pricingTitle: "Formación de empresa desde $575",
    portal: "Portal de clientes",
    portalBody: "Estamos construyendo un espacio seguro donde nuestros clientes podrán consultar sus servicios, documentos, facturas, estado de cuenta y próximos pasos desde un solo lugar.",
    portalCta: "Contactar a Barmentech",
    portalImageAlt: "Fundador de Barmentech desarrollando el portal de clientes",
    portalSupportingMessage: "Si ya eres cliente de Barmentech, continúa utilizando el canal de comunicación que te proporcionamos mientras preparamos el portal.",
    servicesAvailability: "Los servicios se configuran según la empresa, el estado seleccionado y el alcance contratado. Los costos gubernamentales y de terceros se identifican por separado cuando corresponda.",
    servicesCalloutBody: "Agenda una llamada inicial o contáctanos para revisar tus necesidades de formación, servicios fiscales o apoyo operativo.",
    servicesCalloutContactLabel: "Contáctanos",
    servicesCalloutScheduleLabel: "Agendar una llamada",
    servicesCalloutTitle: "Conversemos sobre lo que necesita tu empresa",
    servicesEyebrow: "Formación y soporte operativo",
    servicesIntroduction: "Te ayudamos a avanzar desde la formación de tu compañía hasta la preparación de las herramientas necesarias para comenzar a operar. Los servicios disponibles dependen de las necesidades de tu empresa y del paquete seleccionado.",
    servicesPanels: [
      {
        image: "/images/service-company-formation.webp",
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
        ],
      },
      {
        image: "/images/service-ein-documents.webp",
        title: "EIN y documentos corporativos",
        services: [
          {
            description: "Te ayudamos con la solicitud del EIN y con la preparación u organización de los documentos corporativos incluidos en tu servicio.",
            title: "EIN y documentos corporativos",
          },
        ],
      },
      {
        image: "/images/service-business-address-mail.webp",
        title: "Dirección empresarial y correspondencia",
        services: [
          {
            description: "Coordinamos opciones de dirección empresarial y manejo de correspondencia cuando son necesarias para la operación del cliente.",
            title: "Dirección empresarial y correspondencia",
          },
        ],
      },
      {
        image: "/images/service-banking-payments.webp",
        title: "Banca y procesadores de pago",
        services: [
          {
            description: "Te orientamos durante la preparación y solicitud de cuentas bancarias y procesadores de pago compatibles con las características de tu empresa.",
            qualifier: "La apertura y aprobación dependen exclusivamente de cada proveedor.",
            title: "Banca y procesadores de pago",
          },
        ],
      },
      {
        image: "/images/service-technology-digital.webp",
        title: "Herramientas empresariales y presencia digital",
        services: [
          {
            description: "Brindamos y configuramos dominio, correo corporativo, Google Workspace y opciones de telefonía empresarial según el servicio contratado.",
            title: "Herramientas empresariales",
          },
          {
            description: "Diseñamos y construimos el sistema digital inicial de tu empresa, incluido el dominio, la página web y las herramientas que apoyan una presentación profesional.",
            title: "Presencia digital",
          },
        ],
      },
      {
        image: "/images/service-annual-compliance.webp",
        title: "Continuidad empresarial",
        services: [
          {
            description: "Después de la formación, preparamos y presentamos los formularios, reportes estatales y declaraciones de impuestos aplicables dentro del alcance contratado, y organizamos los documentos y próximos pasos de cumplimiento de tu empresa.",
            title: "Continuidad empresarial",
          },
        ],
      },
    ],
    servicesSelect: "Seleccionar",
    servicesSelected: "Seleccionado",
    servicesTitle: "Más que registrar una empresa",
    services: "Servicios",
    taxes: "Impuestos",
    taxServices: "Servicios fiscales",
    taxServicesAudience: ["Empresas en Estados Unidos.", "Propietarios extranjeros de empresas en Estados Unidos.", "Personas con obligaciones de presentación federal en Estados Unidos.", "Empresas existentes que se formaron en otro lugar."],
    taxServicesAudienceTitle: "A quiénes ayudamos",
    taxServicesBusiness: {
      description: "El apoyo para presentaciones fiscales e informativas empresariales está disponible después de la admisión, revisión de elegibilidad y confirmación del alcance.",
      services: [
        "Cumplimiento de LLC de un solo miembro con propietario extranjero cuando corresponda.",
        "Form 5472 con pro forma Form 1120 cuando corresponda.",
        "Apoyo para declaraciones de sociedades, incluido Form 1065 y reportes relacionados para propietarios cuando estén dentro del alcance aprobado.",
        "Apoyo para declaraciones de C Corporation, incluido Form 1120 cuando esté dentro del alcance aprobado.",
        "Apoyo para declaraciones de S Corporation, incluido Form 1120-S cuando la entidad tenga una elección válida y el caso esté dentro del alcance aprobado.",
        "Extensiones, declaraciones de años anteriores, correcciones y otras declaraciones empresariales solo después de una evaluación.",
        "Preparación de bookkeeping y revisión de registros como servicios con alcance separado.",
      ],
      title: "Apoyo para presentaciones fiscales e informativas empresariales",
    },
    taxServicesCta: "Solicitar una evaluación",
    taxServicesCtaBody: "Cuéntanos sobre el contribuyente, los registros y las necesidades de presentación para que podamos evaluar si el apoyo solicitado encaja dentro del alcance disponible.",
    taxServicesCtaTitle: "Comienza con una evaluación",
    taxServicesEngagementSteps: [
      "Admisión inicial.",
      "Revisión del alcance y de los registros.",
      "Cotización por escrito o confirmación del encargo.",
      "Preparación y revisión del cliente.",
      "Presentación o entrega de acuerdo con el encargo aprobado y el método de presentación disponible.",
    ],
    taxServicesEngagementTitle: "Cómo funciona el encargo",
    taxServicesEyebrow: "Preparación y cumplimiento fiscal en Estados Unidos",
    taxServicesForeignOwnerBody: "Las entidades estadounidenses con propietarios extranjeros pueden tener obligaciones federales de presentación informativa incluso cuando no adeuden impuesto federal sobre la renta. La aplicación de una obligación depende de los hechos del contribuyente, la clasificación de la entidad, la propiedad y los registros. Esta página no ofrece asesoramiento fiscal individualizado.",
    taxServicesForeignOwnerTitle: "Cumplimiento para propietarios extranjeros",
    taxServicesHeroBody: "Barmentech ayuda a empresas y personas con servicios de preparación y cumplimiento fiscal federal en Estados Unidos después de la admisión, revisión de elegibilidad y confirmación del alcance. El apoyo está disponible para empresas formadas con nosotros y para empresas existentes formadas en otro lugar.",
    taxServicesHeroCta: "Solicitar una evaluación de servicios fiscales",
    taxServicesHeroSecondaryCta: "Explorar soporte anual",
    taxServicesIndividual: {
      description: "El apoyo para preparación de impuestos individuales está disponible después de revisar la elegibilidad, los registros y la complejidad.",
      services: [
        "Preparación de declaración federal individual cuando esté dentro del alcance aprobado.",
        "Situaciones de no residentes e internacionales solo después de una revisión de elegibilidad y complejidad.",
        "Personas independientes y propietarios de negocios.",
        "Personas que reciben reportes relacionados con negocios como Schedule K-1.",
        "Extensiones, declaraciones de años anteriores o correcciones solo después de una evaluación.",
      ],
      title: "Apoyo para preparación de impuestos individuales",
    },
    taxServicesScopeFactors: ["Clasificación de la entidad.", "Residencia de los propietarios.", "Número de propietarios.", "Actividad de la empresa.", "Volumen de transacciones.", "Condición de la contabilidad.", "Presentaciones federales o estatales requeridas.", "Trabajo de años anteriores o correcciones."],
    taxServicesScopeTitle: "Qué afecta el alcance y el precio",
    taxServicesTitle: "Apoyo para preparación y cumplimiento fiscal en Estados Unidos",
    terms: "Términos",
    whyBarmentechClosingBody: "Organizamos cada servicio alrededor de las necesidades de la empresa y dejamos claros el alcance, los costos de terceros y los próximos pasos.",
    whyBarmentechClosingTitle: "Una relación que puede continuar después de la formación",
    whyBarmentechDifferentiators: [
      {
        description: "Trabajamos en español e inglés para que puedas comprender cada etapa, los documentos requeridos y los próximos pasos de tu empresa.",
        title: "Atención bilingüe",
      },
      {
        description: "Entendemos que formar una empresa desde fuera de Estados Unidos requiere coordinación adicional con documentos, proveedores y herramientas operativas.",
        title: "Enfoque en propietarios internacionales",
      },
      {
        description: "Podemos ayudarte a conectar la constitución de la empresa con EIN, documentos corporativos, dirección, herramientas empresariales y presencia digital, según el alcance contratado.",
        title: "Formación y operación conectadas",
      },
      {
        description: "Nuestro acompañamiento puede continuar con la organización de documentos, renovaciones, reportes y próximos pasos de cumplimiento.",
        title: "Continuidad después del registro",
      },
    ],
    whyBarmentechEyebrow: "Por qué Barmentech",
    whyBarmentechIntroduction: "Formar una empresa es solo el comienzo. Combinamos orientación bilingüe, preparación operativa y herramientas empresariales para ayudarte a avanzar con una estructura más organizada.",
    whyBarmentechPrimaryCta: "Hablar con Barmentech",
    whyBarmentechSecondaryCta: "Portal de clientes",
    whyBarmentechTitle: "Acompañamiento pensado para construir, no solo registrar",
  },
};

const pageTitles: Record<Locale, Record<Exclude<FormationPage, "home">, string>> = {
  en: {
    about: labels.en.about,
    bookkeeping: labels.en.bookkeeping,
    "business-formation": labels.en.businessFormation,
    "business-services": labels.en.businessServices,
    contact: labels.en.contact,
    disclaimer: labels.en.disclaimer,
    faq: labels.en.faq,
    portal: labels.en.portal,
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
    disclaimer: labels.es.disclaimer,
    faq: labels.es.faq,
    portal: labels.es.portal,
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

const formationPortalDestinations: Record<Locale, string> = {
  en: "/en/portal",
  es: "/es/portal",
};

export function getFormationPortalDestination(locale: Locale) {
  return formationPortalDestinations[locale];
}

const formationTaxServicesPaths: Record<Locale, string> = {
  en: "tax-services",
  es: "servicios-fiscales",
};

const formationFaqPaths: Record<Locale, string> = {
  en: "faq",
  es: "preguntas-frecuentes",
};

export function getFormationTaxServicesPath(locale: Locale) {
  return formationTaxServicesPaths[locale];
}

export function isFormationTaxServicesPath(locale: Locale, path: string) {
  return path === formationTaxServicesPaths[locale];
}

export function getFormationFaqPath(locale: Locale) {
  return formationFaqPaths[locale];
}

export function isFormationFaqPath(locale: Locale, path: string) {
  return path === formationFaqPaths[locale];
}

export function getFormationNavigation(locale: Locale, activePage: FormationPage): NavigationItem[] {
  const copy = getFormationLabels(locale);

  return [
    { active: activePage === "home", href: `/${locale}`, id: "formation", label: copy.formation },
    { href: `/${locale}#services`, id: "services", label: copy.services },
    { active: activePage === "taxes", href: `/${locale}/${getFormationTaxServicesPath(locale)}`, id: "tax-services", label: copy.taxServices },
    { href: `/${locale}#pricing`, id: "pricing", label: copy.pricingNavigation },
    { active: activePage === "faq", href: `/${locale}/${getFormationFaqPath(locale)}`, id: "faq", label: copy.faq },
  ];
}

export function getFormationFooterNavigation(locale: Locale) {
  const copy = getFormationLabels(locale);

  return [
    { href: `/${locale}`, label: copy.home },
    { href: `/${locale}/services/business-formation`, label: copy.businessFormation },
    { href: `/${locale}/services/bookkeeping`, label: copy.bookkeeping },
    { href: `/${locale}/${getFormationTaxServicesPath(locale)}`, label: copy.taxServices },
    { href: `/${locale}/${getFormationFaqPath(locale)}`, label: copy.faq },
    { href: `/${locale}/services/business-services`, label: copy.businessServices },
    { href: `/${locale}#how-we-work`, label: copy.howWeWork },
    { href: `/${locale}/about`, label: copy.about },
    { href: `/${locale}/contact`, label: copy.contact },
    { href: getFormationPortalDestination(locale), label: copy.portal },
  ];
}
