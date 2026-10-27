import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels, type FormationTaxServiceGroup } from "../lib/site";
import { FormationTaxServicesStructuredData } from "./formation-tax-services-structured-data";

type FormationTaxServicesProps = {
  locale: Locale;
};

export function FormationTaxServices({ locale }: FormationTaxServicesProps) {
  const copy = getFormationLabels(locale);

  return (
    <main id="main-content">
      <FormationTaxServicesStructuredData locale={locale} />
      <section aria-labelledby="tax-services-title" className="relative flex flex-col overflow-hidden border-b border-[var(--bm-border)] lg:block lg:min-h-[calc(100svh-5rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[62%] bg-[linear-gradient(90deg,rgb(255_255_255/0.92)_0%,rgb(255_255_255/0.76)_54%,rgb(255_255_255/0)_100%)] lg:block"
        />
        <Container className="relative z-20 order-1 flex w-full flex-col bg-white px-5 py-16 sm:px-8 sm:py-24 lg:min-h-[calc(100svh-5rem)] lg:justify-center lg:bg-transparent lg:py-16">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.taxServicesEyebrow}</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-5xl xl:text-6xl" id="tax-services-title">
              {copy.taxServicesTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{copy.taxServicesHeroBody}</p>
            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <ActionLink className="w-full sm:w-auto" href={`/${locale}/contact`}>
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
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="tax-services-audience-title">
              {copy.taxServicesAudienceTitle}
            </h2>
            <ul className="grid gap-x-12 gap-y-6 border-t border-[var(--bm-border-strong)] pt-6 sm:grid-cols-2 sm:pt-8">
              {copy.taxServicesAudience.map((audience) => (
                <li className="border-t border-[var(--bm-border)] pt-4 text-base leading-7 text-[var(--bm-text-muted)]" key={audience}>
                  {audience}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="tax-services-business-title">
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <TaxServiceGroup group={copy.taxServicesBusiness} id="tax-services-business-title" />
        </Container>
      </section>

      <section aria-labelledby="tax-services-individual-title" className="bg-[var(--bm-surface-subtle)]">
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <TaxServiceGroup group={copy.taxServicesIndividual} id="tax-services-individual-title" />
        </Container>
      </section>

      <section aria-labelledby="tax-services-foreign-owner-title">
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <div className="max-w-3xl border-l-2 border-[var(--bm-brand)] pl-6 sm:pl-8">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="tax-services-foreign-owner-title">
              {copy.taxServicesForeignOwnerTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--bm-text-muted)] sm:text-lg">{copy.taxServicesForeignOwnerBody}</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="tax-services-engagement-title" className="bg-[var(--bm-surface-subtle)]">
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="tax-services-engagement-title">
            {copy.taxServicesEngagementTitle}
          </h2>
          <ol className="mt-12 grid gap-x-12 gap-y-8 border-t border-[var(--bm-border-strong)] pt-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-16">
            {copy.taxServicesEngagementSteps.map((step, index) => (
              <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 text-base leading-7 text-[var(--bm-text-muted)]" key={step}>
                <span aria-hidden="true" className="font-semibold tabular-nums text-[var(--bm-brand)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="tax-services-scope-title">
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="tax-services-scope-title">
              {copy.taxServicesScopeTitle}
            </h2>
            <ul className="grid gap-x-12 gap-y-4 border-t border-[var(--bm-border-strong)] pt-6 sm:grid-cols-2 sm:pt-8">
              {copy.taxServicesScopeFactors.map((factor) => (
                <li className="text-base leading-7 text-[var(--bm-text-muted)]" key={factor}>
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-[var(--bm-border-strong)] pt-10 sm:mt-20 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div className="max-w-xl space-y-3">
              <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{copy.taxServicesCtaTitle}</h2>
              <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.taxServicesCtaBody}</p>
            </div>
            <ActionLink className="w-full shrink-0 sm:w-auto" href={`/${locale}/contact`}>
              {copy.taxServicesCta}
            </ActionLink>
          </div>
        </Container>
      </section>
    </main>
  );
}

type TaxServiceGroupProps = {
  group: FormationTaxServiceGroup;
  id: string;
};

function TaxServiceGroup({ group, id }: TaxServiceGroupProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
      <div className="max-w-xl space-y-5">
        <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id={id}>
          {group.title}
        </h2>
        <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{group.description}</p>
      </div>
      <ul className="divide-y divide-[var(--bm-border)] border-y border-[var(--bm-border-strong)]">
        {group.services.map((service) => (
          <li className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 py-5 text-base leading-7 text-[var(--bm-text-muted)]" key={service}>
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--bm-brand)]" />
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}
