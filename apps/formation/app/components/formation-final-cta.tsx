import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels, getFormationPortalDestination } from "../lib/site";

export function FormationFinalCta({ locale }: { locale: Locale }) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="formation-final-cta-title" className="bg-[var(--bm-surface-subtle)]">
      <Container className="px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="border-l-2 border-[var(--bm-brand)] pl-6 sm:flex sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="formation-final-cta-title">{copy.whyBarmentechClosingTitle}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)]">{copy.whyBarmentechClosingBody}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:mt-0 sm:w-auto sm:flex-row">
            <ActionLink className="w-full sm:w-auto" href={`/${locale}/contact?interest=company-formation`}>{copy.whyBarmentechPrimaryCta}</ActionLink>
            <ActionLink className="w-full sm:w-auto" href={getFormationPortalDestination(locale)} variant="secondary">{copy.whyBarmentechSecondaryCta}</ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
