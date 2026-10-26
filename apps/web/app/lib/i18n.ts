export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string | null | undefined): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

const messages = {
  en: {
    applicationName: "Barmentech Technology",
    developmentStatus: "Technology website foundation in development.",
    languageLabel: "Language",
    sharedAction: "View foundation status",
  },
  es: {
    applicationName: "Barmentech Tecnología",
    developmentStatus: "Base del sitio de tecnología en desarrollo.",
    languageLabel: "Idioma",
    sharedAction: "Ver estado de la base",
  },
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
