import type { Metadata } from "next";

import { FormationCoverage } from "../components/formation-coverage";
import { FormationAnnualCompliance } from "../components/formation-annual-compliance";
import { FormationHero } from "../components/formation-hero";
import { FormationProcess } from "../components/formation-process";
import { FormationPricing } from "../components/formation-pricing";
import { FormationServices } from "../components/formation-services";
import { FormationStructuredData } from "../components/formation-structured-data";
import { FormationWhyBarmentech } from "../components/formation-why-barmentech";
import { SiteShell } from "../components/site-shell";
import { isLocale } from "../lib/i18n";
import { getFormationHomepageMetadata } from "../lib/seo";

type FormationHomePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({ params }: FormationHomePageProps): Promise<Metadata> {
  const { locale } = await params;

  return isLocale(locale) ? getFormationHomepageMetadata(locale) : {};
}

export default async function FormationHomePage({ params }: FormationHomePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return null;
  }

  const locale = localeParam;
  return (
    <SiteShell activePage="home" locale={locale}>
      <main id="main-content">
        <FormationStructuredData locale={locale} />
        <FormationHero locale={locale} />
        <FormationCoverage locale={locale} />
        <FormationProcess locale={locale} />
        <FormationPricing locale={locale} />
        <FormationServices locale={locale} />
        <FormationAnnualCompliance locale={locale} />
        <FormationWhyBarmentech locale={locale} />
      </main>
    </SiteShell>
  );
}
