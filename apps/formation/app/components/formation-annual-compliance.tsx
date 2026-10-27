import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels, getFormationPortalDestination } from "../lib/site";

type FormationAnnualComplianceProps = {
  locale: Locale;
};

export function FormationAnnualCompliance({ locale }: FormationAnnualComplianceProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="annual-compliance-title" className="border-t border-[var(--bm-border)]" id="annual-compliance">
      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.annualComplianceEyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="annual-compliance-title">
            {copy.annualComplianceTitle}
          </h2>
          <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{copy.annualComplianceIntroduction}</p>
        </div>

        <div className="mt-12 grid border-t border-[var(--bm-border-strong)] md:mt-16 md:grid-cols-2">
          {copy.annualComplianceAreas.map((area, index) => (
            <article className={`border-b border-[var(--bm-border)] py-8 md:border-b-0 md:py-10 ${index === 0 ? "md:border-r md:pr-10" : "md:pl-10"}`} key={area.title}>
              <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{area.title}</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-[var(--bm-text-muted)]">{area.description}</p>
              <ul className="mt-7 space-y-4 border-t border-[var(--bm-border)] pt-6">
                {area.services.map((service) => (
                  <li className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 text-base leading-7 text-[var(--bm-text-muted)]" key={service}>
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--bm-brand)]" />
                    {service}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-8 border-t border-[var(--bm-border-strong)] pt-8 sm:mt-16 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:gap-16">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{copy.annualComplianceScopeTitle}</h3>
              <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.annualComplianceScopeBody}</p>
            </div>
            <div className="space-y-3 border-t border-[var(--bm-border)] pt-6">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)] sm:text-2xl">{copy.annualComplianceAdditionalTitle}</h3>
              <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.annualComplianceAdditionalBody}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:justify-end">
            <ActionLink className="w-full sm:w-auto lg:w-full" href={`/${locale}/contact`}>
              {copy.annualComplianceCta}
            </ActionLink>
            <p className="text-sm leading-6 text-[var(--bm-text-muted)]">{copy.annualCompliancePortalBody}</p>
            <ActionLink className="w-full sm:w-auto lg:w-full" href={getFormationPortalDestination(locale)} variant="secondary">
              {copy.annualCompliancePortalCta}
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
