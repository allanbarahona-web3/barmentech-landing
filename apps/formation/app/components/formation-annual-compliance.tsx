import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";

type FormationAnnualComplianceProps = {
  locale: Locale;
};

export function FormationAnnualCompliance({ locale }: FormationAnnualComplianceProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="annual-compliance-title" className="border-t border-[var(--bm-border)]" id="annual-compliance">
      <Container className="px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.annualComplianceEyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="annual-compliance-title">
            {copy.annualComplianceTitle}
          </h2>
          <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{copy.annualComplianceIntroduction}</p>
        </div>

        <div className="mt-10 grid border-t border-[var(--bm-border-strong)] md:grid-cols-2">
          {copy.annualComplianceAreas.map((area, index) => (
            <article className={`border-b border-[var(--bm-border)] py-7 md:border-b-0 md:py-8 ${index === 0 ? "md:border-r md:pr-8" : "md:pl-8"}`} key={area.title}>
              <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-2xl">{area.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--bm-text-muted)]">{area.description}</p>
              <ul className="mt-5 space-y-3 border-t border-[var(--bm-border)] pt-5">
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

        <div className="mt-8 flex flex-col gap-5 border-t border-[var(--bm-border-strong)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-6 text-[var(--bm-text-muted)]">{copy.annualComplianceScopeBody}</p>
          <ActionLink className="w-full shrink-0 sm:w-auto" href={`/${locale}/contact?interest=annual-compliance`}>{copy.annualComplianceCta}</ActionLink>
        </div>
      </Container>
    </section>
  );
}
