import type { Locale } from "../lib/i18n";
import { getFormationHomepageJsonLd, serializeJsonLd } from "../lib/seo";

type FormationStructuredDataProps = {
  locale: Locale;
};

export function FormationStructuredData({ locale }: FormationStructuredDataProps) {
  return <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(getFormationHomepageJsonLd(locale)) }} type="application/ld+json" />;
}
