import { Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";

type FormationCoverageProps = {
  locale: Locale;
};

export function FormationCoverage({ locale }: FormationCoverageProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="formation-coverage-title" id="nationwide-coverage">
      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)] lg:items-end lg:gap-20">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.coverageEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="formation-coverage-title">
              {copy.coverageTitle}
            </h2>
            <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{copy.coverageBody}</p>
            <p className="border-l-2 border-[var(--bm-brand)] pl-5 text-lg font-medium leading-8 text-[var(--bm-text)]">{copy.coverageHighlightedStatement}</p>
          </div>
          <div className="border-y border-[var(--bm-border)] py-8 sm:py-10 lg:justify-self-end lg:pl-10">
            <p className="text-7xl font-semibold leading-none tracking-[-0.07em] text-[var(--bm-brand)] sm:text-8xl">50</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--bm-text)]">{copy.coverageStateLabel}</p>
            <p className="mt-1 text-sm text-[var(--bm-text-muted)]">{copy.coverageVisualLabel}</p>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--bm-border)] pt-8 sm:mt-20 sm:pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-text-muted)]">{copy.coverageExamplesLabel}</p>
          <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
            <article className="border-t border-[var(--bm-border-strong)] pt-5">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)]">Wyoming</h3>
              <p className="mt-3 max-w-md text-base leading-7 text-[var(--bm-text-muted)]">{copy.coverageWyomingDescription}</p>
            </article>
            <article className="border-t border-[var(--bm-border-strong)] pt-5">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)]">Florida</h3>
              <p className="mt-3 max-w-md text-base leading-7 text-[var(--bm-text-muted)]">{copy.coverageFloridaDescription}</p>
            </article>
          </div>
          <p className="mt-10 max-w-2xl text-base font-medium leading-7 text-[var(--bm-text)]">{copy.coverageMessage}</p>
        </div>
      </Container>
    </section>
  );
}
