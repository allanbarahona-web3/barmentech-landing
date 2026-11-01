import type { Locale } from "./i18n";

const DEFAULT_FORMATION_URL = "https://formation.barmentech.com";
const SHARED_WHATSAPP_URL = "https://wa.me/17863918722";

export type TechnologySocialNetwork = "facebook" | "instagram" | "linkedin" | "x" | "youtube";

export type TechnologyPublicSettings = {
  socialLinks: Array<{
    network: TechnologySocialNetwork;
    url: string;
  }>;
  whatsappUrl?: string;
};

function getHttpsUrl(value: string | undefined) {
  if (!value?.trim()) {
    return undefined;
  }

  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function getTechnologyWhatsappUrl(value: string | undefined) {
  return getHttpsUrl(value) === SHARED_WHATSAPP_URL ? SHARED_WHATSAPP_URL : undefined;
}

export function getTechnologyApiBaseUrl(
  value: string | undefined,
  nodeEnv: string | undefined = process.env.NODE_ENV,
) {
  if (!value?.trim()) {
    return undefined;
  }

  try {
    const normalizedValue = value.trim();
    if (
      /[\u0000-\u001F\u007F]/u.test(normalizedValue) ||
      normalizedValue.includes("?") ||
      normalizedValue.includes("#")
    ) {
      return undefined;
    }

    const url = new URL(normalizedValue);
    const isAllowedApiBasePath =
      url.pathname === "/" || url.pathname === "/api" || url.pathname === "/api/";
    if (url.username || url.password || url.search || url.hash || !isAllowedApiBasePath) {
      return undefined;
    }

    const normalizedBaseUrl = url.pathname === "/" ? url.origin : `${url.origin}/api`;
    if (url.protocol === "https:") {
      return normalizedBaseUrl;
    }

    const isDevelopmentLocalhost =
      nodeEnv === "development" &&
      url.protocol === "http:" &&
      url.port !== "" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");
    return isDevelopmentLocalhost ? normalizedBaseUrl : undefined;
  } catch {
    return undefined;
  }
}

function getFormationBaseUrl(value: string | undefined, nodeEnv: string | undefined = process.env.NODE_ENV): string {
  if (!value?.trim()) {
    return DEFAULT_FORMATION_URL;
  }

  try {
    const url = new URL(value.trim());
    const isDevelopmentLocalhost =
      nodeEnv === "development" &&
      url.protocol === "http:" &&
      url.port !== "" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");

    if (
      (url.protocol !== "https:" && !isDevelopmentLocalhost) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return DEFAULT_FORMATION_URL;
    }

    return url.origin;
  } catch {
    return DEFAULT_FORMATION_URL;
  }
}

export function getTechnologyFormationUrl(locale: Locale, environment: NodeJS.ProcessEnv = process.env): string {
  const url = new URL(getFormationBaseUrl(environment.NEXT_PUBLIC_FORMATION_URL, environment.NODE_ENV));
  url.pathname = `/${locale}`;
  return url.toString();
}

export function getTechnologyPublicSettings(environment: NodeJS.ProcessEnv = process.env): TechnologyPublicSettings {
  const socialEntries: Array<[TechnologySocialNetwork, string | undefined]> = [
    ["facebook", environment.NEXT_PUBLIC_FACEBOOK_URL],
    ["instagram", environment.NEXT_PUBLIC_INSTAGRAM_URL],
    ["linkedin", environment.NEXT_PUBLIC_LINKEDIN_URL],
    ["youtube", environment.NEXT_PUBLIC_YOUTUBE_URL],
    ["x", environment.NEXT_PUBLIC_X_URL],
  ];

  return {
    socialLinks: socialEntries.flatMap(([network, value]) => {
      const url = getHttpsUrl(value);
      return url ? [{ network, url }] : [];
    }),
    whatsappUrl: getTechnologyWhatsappUrl(environment.NEXT_PUBLIC_WHATSAPP_URL),
  };
}
