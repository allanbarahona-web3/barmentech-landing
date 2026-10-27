import { ActionLink, Container } from "@barmentech/ui";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { FormationFaq } from "../../components/formation-faq";
import { FormationLegalPage } from "../../components/formation-legal-page";
import { SiteShell } from "../../components/site-shell";
import { FormationTaxServices } from "../../components/formation-tax-services";
import { isLocale } from "../../lib/i18n";
import { getFormationLegalPage, getFormationLegalPath } from "../../lib/legal";
import { getFormationFaqPath, getFormationLabels, getFormationPageTitle, getFormationTaxServicesPath, isFormationFaqPath, isFormationPage, isFormationTaxServicesPath, type FormationPage } from "../../lib/site";
import { getFormationContactMetadata, getFormationFaqMetadata, getFormationLegalMetadata, getFormationPortalMetadata, getFormationTaxServicesMetadata } from "../../lib/seo";

type FormationPlaceholderPageProps = Readonly<{
  params: Promise<{ locale: string; page: string }>;
}>;

const placeholderMetadata: Metadata = {
  robots: {
    follow: true,
    index: false,
  },
};

export async function generateMetadata({ params }: FormationPlaceholderPageProps): Promise<Metadata> {
  const { locale, page } = await params;

  if (isLocale(locale) && page === "portal") {
    return getFormationPortalMetadata(locale);
  }

  if (isLocale(locale) && page === "contact") {
    return getFormationContactMetadata(locale);
  }

  if (isLocale(locale) && isFormationTaxServicesPath(locale, page)) {
    return getFormationTaxServicesMetadata(locale);
  }

  if (isLocale(locale) && isFormationFaqPath(locale, page)) {
    return getFormationFaqMetadata(locale);
  }

  if (isLocale(locale)) {
    const legalPage = getFormationLegalPage(locale, page);
    if (legalPage) {
      return getFormationLegalMetadata(locale, legalPage);
    }
  }

  return placeholderMetadata;
}

export default async function FormationPlaceholderPage({ params }: FormationPlaceholderPageProps) {
  const { locale: localeParam, page } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;

  if (locale === "es" && page === "privacy") {
    redirect(`/es/${getFormationLegalPath("es", "privacy")}`);
  }

  if (locale === "es" && page === "terms") {
    redirect(`/es/${getFormationLegalPath("es", "terms")}`);
  }

  const legalPage = getFormationLegalPage(locale, page);
  if (legalPage) {
    return (
      <SiteShell
        activePage={legalPage}
        locale={locale}
        localizedPaths={{
          en: `/${getFormationLegalPath("en", legalPage)}`,
          es: `/${getFormationLegalPath("es", legalPage)}`,
        }}
        path={page}
      >
        <FormationLegalPage locale={locale} page={legalPage} />
      </SiteShell>
    );
  }

  if (isFormationTaxServicesPath(locale, page)) {
    return (
      <SiteShell
        activePage="taxes"
        locale={locale}
        localizedPaths={{
          en: `/${getFormationTaxServicesPath("en")}`,
          es: `/${getFormationTaxServicesPath("es")}`,
        }}
        path={page}
      >
        <FormationTaxServices locale={locale} />
      </SiteShell>
    );
  }

  if (isFormationFaqPath(locale, page)) {
    return (
      <SiteShell
        activePage="faq"
        locale={locale}
        localizedPaths={{
          en: `/${getFormationFaqPath("en")}`,
          es: `/${getFormationFaqPath("es")}`,
        }}
        path={page}
      >
        <FormationFaq locale={locale} />
      </SiteShell>
    );
  }

  if (!isFormationPage(page) || page === "home" || ["bookkeeping", "business-formation", "business-services", "disclaimer", "faq", "privacy", "taxes", "terms"].includes(page)) {
    notFound();
  }

  const formationPage = page as Exclude<FormationPage, "home">;
  const copy = getFormationLabels(locale);

  if (formationPage === "contact") {
    return (
      <SiteShell activePage={formationPage} locale={locale} path={page}>
        <main id="main-content">
          <Container className="px-5 py-16 sm:px-8 sm:py-24">
            <section className="max-w-2xl space-y-5" aria-labelledby="contact-title">
              <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-5xl" id="contact-title">
                {getFormationPageTitle(locale, formationPage)}
              </h1>
              <p className="text-lg leading-8 text-[var(--bm-text-muted)]">{copy.contactBody}</p>
              <p className="border-t border-[var(--bm-border)] pt-5 text-base leading-7 text-[var(--bm-text)]">{copy.contactSupportingMessage}</p>
            </section>
          </Container>
        </main>
      </SiteShell>
    );
  }

  if (formationPage === "portal") {
    return (
      <SiteShell activePage={formationPage} locale={locale} path={page}>
        <main id="main-content">
          <section aria-labelledby="portal-title" className="border-b border-[var(--bm-border)] bg-[var(--bm-surface-subtle)]">
            <Container className="grid px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-12 lg:py-16 xl:gap-16">
              <div className="order-1 max-w-xl space-y-6 lg:py-8">
                <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-5xl xl:text-6xl" id="portal-title">
                  {getFormationPageTitle(locale, formationPage)}
                </h1>
                <p className="text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{copy.portalBody}</p>
                <p className="border-t border-[var(--bm-border-strong)] pt-5 text-base leading-7 text-[var(--bm-text)]">{copy.portalSupportingMessage}</p>
                <ActionLink className="w-full sm:w-auto" href={`/${locale}/contact`}>
                  {copy.portalCta}
                </ActionLink>
              </div>
              <picture className="order-2 mt-10 block aspect-[941/1672] w-full overflow-hidden rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-white lg:mt-0 lg:aspect-[1859/846]">
                <source media="(max-width: 1023px)" srcSet="/images/client-portal-founder-office-logo-mobile.webp" type="image/webp" />
                <img
                  alt={copy.portalImageAlt}
                  className="h-full w-full object-cover"
                  decoding="async"
                  fetchPriority="high"
                  height={846}
                  loading="eager"
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  src="/images/client-portal-founder-office-logo-desktop.webp"
                  width={1859}
                />
              </picture>
            </Container>
          </section>
        </main>
      </SiteShell>
    );
  }

  return (
    <SiteShell activePage={formationPage} locale={locale} path={page}>
      <main id="main-content">
        <Container className="px-5 py-16 sm:px-8 sm:py-24">
          <section className="max-w-2xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.provisionalLabel}</p>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-5xl">{getFormationPageTitle(locale, formationPage)}</h1>
            <p className="text-lg leading-8 text-[var(--bm-text-muted)]">{copy.provisionalBody}</p>
          </section>
        </Container>
      </main>
    </SiteShell>
  );
}
