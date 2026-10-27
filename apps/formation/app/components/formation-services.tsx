import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationPublicSettings } from "../lib/public-settings";
import { getFormationLabels } from "../lib/site";
import { FormationServicePanels } from "./formation-service-panels";

type FormationServicesProps = {
  locale: Locale;
};

export function FormationServices({ locale }: FormationServicesProps) {
  const copy = getFormationLabels(locale);
  const settings = getFormationPublicSettings();

  return (
    <section aria-labelledby="formation-services-title" id="services">
      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="lg:grid lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:items-end lg:gap-12 xl:gap-16">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.servicesEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="formation-services-title">
              {copy.servicesTitle}
            </h2>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8 lg:mt-0">{copy.servicesIntroduction}</p>
        </div>

        <div className="mt-12 sm:mt-16">
          <FormationServicePanels panels={copy.servicesPanels} selectLabel={copy.servicesSelect} selectedLabel={copy.servicesSelected} />
        </div>

        <div className="mt-10 rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_100%)] p-6 sm:mt-14 sm:p-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
          <div className="max-w-3xl space-y-3">
            <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{copy.servicesCalloutTitle}</h3>
            <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.servicesCalloutBody}</p>
          </div>
          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:mt-0">
            {settings.bookingUrl ? (
              <ActionLink className="w-full sm:w-auto" href={settings.bookingUrl} rel="noopener noreferrer" target="_blank">
                {copy.servicesCalloutScheduleLabel}
              </ActionLink>
            ) : null}
            <ActionLink className="w-full sm:w-auto" href={`/${locale}/contact`} variant={settings.bookingUrl ? "secondary" : "primary"}>
              {copy.servicesCalloutContactLabel}
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
