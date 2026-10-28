export type FormationSocialNetwork = "facebook" | "instagram" | "linkedin" | "x" | "youtube";

export type FormationPublicSettings = {
  apiBaseUrl?: string;
  bookingUrl?: string;
  socialLinks: Array<{
    network: FormationSocialNetwork;
    url: string;
  }>;
  whatsappUrl?: string;
  technologyUrl?: string;
};

function getHttpsUrl(value: string | undefined) {
  if (!value?.trim()) {
    return undefined;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

const formationWhatsappUrl = "https://wa.me/17863918722";

function getFormationWhatsappUrl(value: string | undefined) {
  return getHttpsUrl(value) === formationWhatsappUrl ? formationWhatsappUrl : undefined;
}

export function getFormationApiBaseUrl(
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
    if (
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      !isAllowedApiBasePath
    ) {
      return undefined;
    }

    const normalizedBaseUrl =
      url.pathname === "/" ? url.origin : `${url.origin}/api`;

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

export function getFormationPublicSettings(environment: NodeJS.ProcessEnv = process.env): FormationPublicSettings {
  const socialEntries: Array<[FormationSocialNetwork, string | undefined]> = [
    ["facebook", environment.NEXT_PUBLIC_FACEBOOK_URL],
    ["instagram", environment.NEXT_PUBLIC_INSTAGRAM_URL],
    ["linkedin", environment.NEXT_PUBLIC_LINKEDIN_URL],
    ["youtube", environment.NEXT_PUBLIC_YOUTUBE_URL],
    ["x", environment.NEXT_PUBLIC_X_URL],
  ];

  return {
    apiBaseUrl: getFormationApiBaseUrl(
      environment.NEXT_PUBLIC_API_BASE_URL,
      environment.NODE_ENV,
    ),
    bookingUrl: getHttpsUrl(environment.NEXT_PUBLIC_BOOKING_URL),
    socialLinks: socialEntries.flatMap(([network, value]) => {
      const url = getHttpsUrl(value);
      return url ? [{ network, url }] : [];
    }),
    technologyUrl: getHttpsUrl(environment.NEXT_PUBLIC_TECHNOLOGY_URL),
    whatsappUrl: getFormationWhatsappUrl(environment.NEXT_PUBLIC_WHATSAPP_URL),
  };
}
