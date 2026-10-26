import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";

type FormationServicesProps = {
  locale: Locale;
};

export function FormationServices({ locale }: FormationServicesProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="formation-services-title" id="services">
      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.servicesEyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="formation-services-title">
            {copy.servicesTitle}
          </h2>
          <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{copy.servicesIntroduction}</p>
        </div>

        <div className="mt-14 border-t border-[var(--bm-border)] sm:mt-20">
          {copy.servicesStages.map((stage) => (
            <section className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(13rem,0.55fr)_minmax(0,1fr)] lg:gap-16" key={stage.title}>
              <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{stage.title}</h3>
              <div className="divide-y divide-[var(--bm-border)] border-y border-[var(--bm-border)]">
                {stage.services.map((service) => (
                  <article className="py-6 first:pt-0 last:pb-0" key={service.title}>
                    <h4 className="text-lg font-semibold tracking-[-0.015em] text-[var(--bm-text)] sm:text-xl">{service.title}</h4>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--bm-text-muted)]">{service.description}</p>
                    {service.qualifier ? <p className="mt-3 text-sm font-medium leading-6 text-[var(--bm-text)]">{service.qualifier}</p> : null}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="max-w-3xl border-t border-[var(--bm-border)] pt-8 text-base leading-7 text-[var(--bm-text-muted)] sm:pt-10">{copy.servicesAvailability}</p>

        <div className="mt-14 flex flex-col gap-6 border-t border-[var(--bm-border-strong)] pt-10 sm:mt-20 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-xl space-y-3">
            <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{copy.servicesCtaTitle}</h3>
            <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.servicesCtaBody}</p>
          </div>
          <ActionLink className="w-full shrink-0 sm:w-auto" href={`/${locale}/contact`}>
            {copy.servicesCtaLabel}
          </ActionLink>
        </div>
      </Container>
    </section>
  );
}
