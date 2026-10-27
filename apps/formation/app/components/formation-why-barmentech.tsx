import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels, getFormationPortalDestination } from "../lib/site";

type FormationWhyBarmentechProps = {
  locale: Locale;
};

export function FormationWhyBarmentech({ locale }: FormationWhyBarmentechProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="why-barmentech-title" className="bg-[var(--bm-surface-subtle)]" id="why-barmentech">
      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.1fr)] lg:gap-20">
          <div className="max-w-2xl space-y-6 lg:sticky lg:top-10 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.whyBarmentechEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="why-barmentech-title">
              {copy.whyBarmentechTitle}
            </h2>
            <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{copy.whyBarmentechIntroduction}</p>
          </div>

          <div className="border-t border-[var(--bm-border-strong)]">
            {copy.whyBarmentechDifferentiators.map((differentiator, index) => (
              <article className="grid gap-4 border-b border-[var(--bm-border)] py-8 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 sm:py-10" key={differentiator.title}>
                <p aria-hidden="true" className="text-sm font-semibold tabular-nums text-[var(--bm-brand)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)] sm:text-2xl">{differentiator.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-[var(--bm-text-muted)]">{differentiator.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-7 border-t border-[var(--bm-border-strong)] pt-10 sm:mt-20 xl:flex-row xl:items-end xl:justify-between xl:gap-12">
          <div className="max-w-2xl space-y-3">
            <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{copy.whyBarmentechClosingTitle}</h3>
            <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.whyBarmentechClosingBody}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ActionLink className="w-full shrink-0 sm:w-auto" href={`/${locale}/contact`}>
              {copy.whyBarmentechPrimaryCta}
            </ActionLink>
            <ActionLink className="w-full shrink-0 sm:w-auto" href={getFormationPortalDestination(locale)} variant="secondary">
              {copy.whyBarmentechSecondaryCta}
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
