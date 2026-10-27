import type { Locale } from "../lib/i18n";
import { getFormationFaqJsonLd, serializeJsonLd } from "../lib/seo";

type FormationFaqStructuredDataProps = {
  locale: Locale;
};

export function FormationFaqStructuredData({ locale }: FormationFaqStructuredDataProps) {
  return <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(getFormationFaqJsonLd(locale)) }} type="application/ld+json" />;
}
