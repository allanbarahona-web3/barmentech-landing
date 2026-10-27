import type { MetadataRoute } from "next";

import { getFormationLegalPath } from "./lib/legal";
import { getFormationFaqPath, getFormationTaxServicesPath } from "./lib/site";
import { formationUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: formationUrl("/en") },
    { url: formationUrl("/es") },
    { url: formationUrl(`/en/${getFormationTaxServicesPath("en")}`) },
    { url: formationUrl(`/es/${getFormationTaxServicesPath("es")}`) },
    { url: formationUrl(`/en/${getFormationFaqPath("en")}`) },
    { url: formationUrl(`/es/${getFormationFaqPath("es")}`) },
    { url: formationUrl("/en/contact") },
    { url: formationUrl("/es/contact") },
    { url: formationUrl(`/en/${getFormationLegalPath("en", "privacy")}`) },
    { url: formationUrl(`/es/${getFormationLegalPath("es", "privacy")}`) },
    { url: formationUrl(`/en/${getFormationLegalPath("en", "terms")}`) },
    { url: formationUrl(`/es/${getFormationLegalPath("es", "terms")}`) },
    { url: formationUrl(`/en/${getFormationLegalPath("en", "disclaimer")}`) },
    { url: formationUrl(`/es/${getFormationLegalPath("es", "disclaimer")}`) },
  ];
}
