import type { Locale } from "./i18n";

type PublicLeadInterest =
  | "ANNUAL_COMPLIANCE"
  | "BANKING_AND_PAYMENTS"
  | "COMPANY_FORMATION"
  | "IN_PERSON_WORKSHOP"
  | "OTHER"
  | "TAX_SERVICES"
  | "TECHNOLOGY_AND_DIGITAL";

const formationInterestMap: Record<string, PublicLeadInterest> = {
  "annual-compliance": "ANNUAL_COMPLIANCE",
  "banking-payments": "BANKING_AND_PAYMENTS",
  "company-formation": "COMPANY_FORMATION",
  other: "OTHER",
  "tax-services": "TAX_SERVICES",
  "technology-digital": "TECHNOLOGY_AND_DIGITAL",
  workshop: "IN_PERSON_WORKSHOP",
};

export function getPublicLeadInterest(
  value: string | undefined,
): PublicLeadInterest | undefined {
  return value ? formationInterestMap[value] : undefined;
}

export function getPublicLeadEndpoint(apiBaseUrl: string): string {
  return `${apiBaseUrl}/v1/public/leads`;
}

export function getPublicLeadLocale(locale: Locale): "EN" | "ES" {
  return locale === "es" ? "ES" : "EN";
}

export const FORMATION_LEAD_SOURCE_SITE = "FORMATION";

export function isPublicLeadSuccessResponse(
  value: unknown,
): value is { success: true; leadId: string | null } {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as { leadId?: unknown; success?: unknown };
  return (
    response.success === true &&
    (typeof response.leadId === "string" || response.leadId === null)
  );
}
