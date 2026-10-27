import type { Locale } from "../lib/i18n";
import { getFormationTaxServicesJsonLd, serializeJsonLd } from "../lib/seo";

type FormationTaxServicesStructuredDataProps = {
  locale: Locale;
};

export function FormationTaxServicesStructuredData({ locale }: FormationTaxServicesStructuredDataProps) {
  return <script dangerouslySetInnerHTML={{ __html: serializeJsonLd(getFormationTaxServicesJsonLd(locale)) }} type="application/ld+json" />;
}
