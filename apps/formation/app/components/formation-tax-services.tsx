import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels, type FormationTaxServiceGroup } from "../lib/site";
import { FormationTaxServicesStructuredData } from "./formation-tax-services-structured-data";

type FormationTaxServicesProps = {
  locale: Locale;
};

export function FormationTaxServices({ locale }: FormationTaxServicesProps) {
  const copy = getFormationLabels(locale);
  const contactHref = `/${locale}/contact?interest=tax-services`;

  return (
    <main id="main-content">
      <FormationTaxServicesStructuredData locale={locale} />

      <section aria-labelledby="tax-services-title" className="relative flex flex-col overflow-hidden border-b border-[var(--bm-border)] lg:block lg:min-h-[calc(100svh-5rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[62%] bg-[linear-gradient(90deg,rgb(255_255_255/0.92)_0%,rgb(255_255_255/0.76)_54%,rgb(255_255_255/0)_100%)] lg:block"
        />
        <Container className="relative z-20 order-1 flex w-full flex-col bg-white px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[calc(100svh-5rem)] lg:justify-center lg:bg-transparent lg:py-16">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.taxServicesEyebrow}</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-5xl xl:text-6xl" id="tax-services-title">
              {copy.taxServicesTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{copy.taxServicesHeroBody}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <ActionLink className="w-full sm:w-auto" href={contactHref}>
                {copy.taxServicesHeroCta}
              </ActionLink>
              <ActionLink className="w-full sm:w-auto" href={`/${locale}#annual-compliance`} variant="secondary">
                {copy.taxServicesHeroSecondaryCta}
              </ActionLink>
            </div>
          </div>
        </Container>
        <picture className="relative z-0 order-2 block aspect-[941/1672] w-full overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
          <source media="(max-width: 1023px)" srcSet="/images/tax-services-hero-mobile-v2.webp" type="image/webp" />
          <img
            alt=""
            className="h-full w-full object-cover object-center lg:object-[58%_center]"
            decoding="async"
            fetchPriority="high"
            height={887}
            loading="eager"
            src="/images/tax-services-hero-desktop-v2.webp"
            width={1774}
          />
        </picture>
      </section>

      <section aria-labelledby="tax-services-audience-title" className="bg-[var(--bm-surface-subtle)]">
        <Container className="px-5 py-12 sm:px-8 sm:py-14 lg:py-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <h2 className="max-w-md text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="tax-services-audience-title">
              {copy.taxServicesAudienceTitle}
            </h2>
            <ul className="grid w-full gap-px overflow-hidden rounded-[var(--bm-radius-panel)] border border-[var(--bm-border-strong)] bg-[var(--bm-border)] sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-4">
              {copy.taxServicesAudience.map((audience, index) => (
                <li className="min-h-28 bg-white px-5 py-4 text-sm leading-6 text-[var(--bm-text-muted)]" key={audience}>
                  <span aria-hidden="true" className="mb-3 block text-xs font-semibold tracking-[0.12em] text-[var(--bm-brand)]">{String(index + 1).padStart(2, "0")}</span>
                  {audience}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="tax-services-categories-title">
        <Container className="px-5 py-12 sm:px-8 sm:py-14 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="tax-services-categories-title">
              {copy.taxServicesCategoriesTitle}
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {copy.taxServicesCategories.map((category) => (
              <TaxServiceCategory category={category} key={category.title} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="tax-services-engagement-title" className="bg-[var(--bm-surface-subtle)]">
        <Container className="px-5 py-12 sm:px-8 sm:py-14 lg:py-16">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="tax-services-engagement-title">
            {copy.taxServicesEngagementTitle}
          </h2>
          <ol className="mt-7 grid gap-px overflow-hidden rounded-[var(--bm-radius-panel)] border border-[var(--bm-border-strong)] bg-[var(--bm-border)] sm:grid-cols-2 lg:grid-cols-4">
            {copy.taxServicesEngagementSteps.map((step, index) => (
              <li className="grid min-h-36 grid-cols-[2rem_minmax(0,1fr)] gap-3 bg-white px-5 py-5 text-sm leading-6 text-[var(--bm-text-muted)]" key={step}>
                <span aria-hidden="true" className="font-semibold tabular-nums text-[var(--bm-brand)]">{String(index + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="tax-services-scope-title">
        <Container className="px-5 py-12 sm:px-8 sm:py-14 lg:py-16">
          <div className="grid gap-7 lg:grid-cols-[minmax(15rem,0.68fr)_minmax(0,1.32fr)] lg:gap-16">
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="tax-services-scope-title">
                {copy.taxServicesScopeTitle}
              </h2>
              <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.taxServicesScopeBody}</p>
            </div>
            <ul className="grid content-start gap-x-8 gap-y-3 border-t border-[var(--bm-border-strong)] pt-5 sm:grid-cols-2">
              {copy.taxServicesScopeFactors.map((factor) => (
                <li className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3 text-sm leading-6 text-[var(--bm-text-muted)]" key={factor}>
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--bm-brand)]" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <section aria-labelledby="tax-services-cta-title" className="mt-10 rounded-[var(--bm-radius-panel)] border border-[var(--bm-border-strong)] bg-[var(--bm-surface-subtle)] px-6 py-7 sm:mt-12 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl" id="tax-services-cta-title">
                  {copy.taxServicesCtaTitle}
                </h2>
                <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.taxServicesCtaBody}</p>
              </div>
              <ActionLink className="w-full shrink-0 sm:w-auto" href={contactHref}>
                {copy.taxServicesCta}
              </ActionLink>
            </div>
          </section>
        </Container>
      </section>
    </main>
  );
}

type TaxServiceCategoryProps = {
  category: FormationTaxServiceGroup;
};

function TaxServiceCategory({ category }: TaxServiceCategoryProps) {
  return (
    <article className="rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-white p-6 sm:p-7">
      <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)]">{category.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--bm-text-muted)]">{category.description}</p>
      <ul className="mt-5 space-y-3 border-t border-[var(--bm-border)] pt-4">
        {category.services.map((service) => (
          <li className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3 text-sm leading-6 text-[var(--bm-text-muted)]" key={service}>
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--bm-brand)]" />
            {service}
          </li>
        ))}
      </ul>
    </article>
  );
}
