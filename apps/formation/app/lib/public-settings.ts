export type FormationSocialNetwork = "facebook" | "instagram" | "linkedin" | "x" | "youtube";

export type FormationPublicSettings = {
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

export function getFormationPublicSettings(environment: NodeJS.ProcessEnv = process.env): FormationPublicSettings {
  const socialEntries: Array<[FormationSocialNetwork, string | undefined]> = [
    ["facebook", environment.NEXT_PUBLIC_FACEBOOK_URL],
    ["instagram", environment.NEXT_PUBLIC_INSTAGRAM_URL],
    ["linkedin", environment.NEXT_PUBLIC_LINKEDIN_URL],
    ["youtube", environment.NEXT_PUBLIC_YOUTUBE_URL],
    ["x", environment.NEXT_PUBLIC_X_URL],
  ];

  return {
    bookingUrl: getHttpsUrl(environment.NEXT_PUBLIC_BOOKING_URL),
    socialLinks: socialEntries.flatMap(([network, value]) => {
      const url = getHttpsUrl(value);
      return url ? [{ network, url }] : [];
    }),
    technologyUrl: getHttpsUrl(environment.NEXT_PUBLIC_TECHNOLOGY_URL),
    whatsappUrl: getFormationWhatsappUrl(environment.NEXT_PUBLIC_WHATSAPP_URL),
  };
}
