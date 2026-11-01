import type { Locale } from "./i18n";

export const TECHNOLOGY_LEAD_SOURCE_SITE = "TECHNOLOGY";
export const TECHNOLOGY_LEAD_INTEREST = "TECHNOLOGY_AND_DIGITAL";

const technologyTopics = new Set([
  "automation-integrations",
  "custom-systems-saas",
  "data-applied-ai",
  "digital-product-experience",
  "maintenance-modernization",
  "other",
  "websites-ecommerce",
]);

export function getTechnologyLeadTopic(value: string | undefined) {
  return value && technologyTopics.has(value) ? value : undefined;
}

export function getPublicLeadEndpoint(apiBaseUrl: string): string {
  return `${apiBaseUrl}/v1/public/leads`;
}

export function getPublicLeadLocale(locale: Locale): "EN" | "ES" {
  return locale === "es" ? "ES" : "EN";
}

export function isPublicLeadSuccessResponse(
  value: unknown,
): value is { success: true; leadId: string | null } {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as { leadId?: unknown; success?: unknown };
  return response.success === true && (typeof response.leadId === "string" || response.leadId === null);
}
