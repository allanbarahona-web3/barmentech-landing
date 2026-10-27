import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";

type FormationPricingProps = {
  locale: Locale;
};

export function FormationPricing({ locale }: FormationPricingProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="formation-pricing-title" id="pricing">
      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(16rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div className="max-w-xl space-y-6 lg:sticky lg:top-10 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.pricingEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="formation-pricing-title">
              {copy.pricingTitle}
            </h2>
            <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{copy.pricingIntro}</p>

            <div className="border-y border-[var(--bm-border-strong)] py-7 sm:py-9">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-text-muted)]">{copy.pricingLabel}</p>
              <p className="mt-3 text-6xl font-semibold leading-none tracking-[-0.065em] text-[var(--bm-brand)] sm:text-7xl">{copy.pricingPrice}</p>
              <p className="mt-4 text-sm leading-6 text-[var(--bm-text-muted)]">{copy.pricingPriceQualifier}</p>
            </div>
          </div>

          <div>
            <div className="border-t border-[var(--bm-border-strong)] pt-7 sm:pt-9">
              <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{copy.pricingIncludedTitle}</h3>
              <ul className="mt-7 divide-y divide-[var(--bm-border)] border-y border-[var(--bm-border)]">
                {copy.pricingInclusions.map((inclusion) => (
                  <li className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 py-5 text-base leading-7 text-[var(--bm-text-muted)]" key={inclusion}>
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--bm-brand)]" />
                    {inclusion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 space-y-5 border-t border-[var(--bm-border-strong)] pt-8 sm:mt-12 sm:pt-10">
              <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{copy.pricingFinalPriceTitle}</h3>
              <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.pricingFinalPriceBody}</p>
              <p className="text-sm leading-6 text-[var(--bm-text)]">{copy.pricingProviderQualification}</p>
              <p className="text-sm leading-6 text-[var(--bm-text)]">{copy.pricingRenewalQualification}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-7 border-t border-[var(--bm-border-strong)] pt-10 sm:mt-20 xl:flex-row xl:items-end xl:justify-between xl:gap-12">
          <p className="max-w-2xl text-base leading-7 text-[var(--bm-text-muted)]">{copy.pricingAdditionalServices}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
            <ActionLink className="w-full shrink-0 sm:w-auto" href={`/${locale}/contact`}>
              {copy.pricingCta}
            </ActionLink>
            <ActionLink className="w-full shrink-0 sm:w-auto" href={`/${locale}#services`} variant="secondary">
              {copy.pricingSecondaryCta}
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
