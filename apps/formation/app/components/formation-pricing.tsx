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
      <Container className="px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(16rem,0.72fr)_minmax(0,1.28fr)] lg:gap-14">
          <div className="max-w-xl space-y-5">
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
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{copy.pricingIncludedTitle}</h3>
              <ul className="mt-7 divide-y divide-[var(--bm-border)] border-y border-[var(--bm-border)]">
                {copy.pricingInclusions.map((inclusion, index) => (
                  <li className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 py-5 text-base leading-7 text-[var(--bm-text-muted)]" key={inclusion}>
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--bm-brand)]" />
                    <div>
                      <p>{inclusion}</p>
                      {index === 3 ? <p className="mt-2 text-sm leading-6 text-[var(--bm-text-muted)]">{copy.pricingRenewalQualification}</p> : null}
                      {index === 5 ? <p className="mt-3 text-sm leading-6 text-[var(--bm-text-muted)]">{copy.pricingProviderQualification}</p> : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--bm-border-strong)] pt-7">
          <ActionLink className="w-full sm:w-auto" href={`/${locale}/contact?interest=company-formation`}>
              {copy.pricingCta}
          </ActionLink>
        </div>
      </Container>
    </section>
  );
}
