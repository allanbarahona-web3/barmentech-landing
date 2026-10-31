import type { Locale } from "./i18n";

const DEFAULT_FORMATION_URL = "https://formation.barmentech.com";

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
