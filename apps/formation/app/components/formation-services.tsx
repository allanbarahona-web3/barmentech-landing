import { Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";
import { FormationServicePanels } from "./formation-service-panels";

type FormationServicesProps = {
  locale: Locale;
};

export function FormationServices({ locale }: FormationServicesProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="formation-services-title" id="services">
      <Container className="px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:items-end lg:gap-12 xl:gap-16">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.servicesEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="formation-services-title">
              {copy.servicesTitle}
            </h2>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8 lg:mt-0">{copy.servicesIntroduction}</p>
        </div>

        <div className="mt-10 sm:mt-12">
          <FormationServicePanels panels={copy.servicesPanels} selectLabel={copy.servicesSelect} selectedLabel={copy.servicesSelected} />
        </div>
      </Container>
    </section>
  );
}
