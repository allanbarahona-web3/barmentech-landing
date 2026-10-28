import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";

type FormationCoverageProps = {
  locale: Locale;
};

export function FormationCoverage({ locale }: FormationCoverageProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="formation-coverage-title" id="nationwide-coverage">
      <Container className="px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)] lg:items-center lg:gap-14">
          <div className="max-w-2xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.coverageEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="formation-coverage-title">
              {copy.coverageTitle}
            </h2>
            <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{copy.coverageBody}</p>
            <p className="border-l-2 border-[var(--bm-brand)] pl-4 text-base font-medium leading-7 text-[var(--bm-text)]">{copy.coverageHighlightedStatement}</p>
            <ActionLink className="w-full sm:w-auto" href={`/${locale}/contact?interest=company-formation`} variant="secondary">{copy.coverageCta}</ActionLink>
          </div>
          <div className="relative isolate flex min-h-44 items-center justify-center overflow-hidden border-y border-[var(--bm-border)] py-6 sm:min-h-52 sm:py-8 lg:justify-self-end lg:min-w-80">
            <img alt="" aria-hidden="true" className="pointer-events-none absolute right-[-12%] top-1/2 w-[130%] max-w-none -translate-y-1/2 animate-[coverage-map-reveal_1.2s_ease-out_forwards] opacity-20 motion-reduce:animate-none" height={593} src="/images/us-map-states.svg" width={959} />
            <div className="relative z-10 text-center">
              <p className="text-7xl font-semibold leading-none tracking-[-0.07em] text-[var(--bm-brand)] sm:text-8xl">50</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--bm-text)]">{copy.coverageStateLabel}</p>
              <p className="mt-1 text-sm text-[var(--bm-text-muted)]">{copy.coverageVisualLabel}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--bm-border)] pt-6 sm:mt-12 sm:pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-text-muted)]">{copy.coverageExamplesLabel}</p>
          <div className="mt-5 grid gap-6 md:grid-cols-2 md:gap-8">
            <article className="border-t border-[var(--bm-border-strong)] pt-5">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)]">Wyoming</h3>
              <p className="mt-3 max-w-md text-base leading-7 text-[var(--bm-text-muted)]">{copy.coverageWyomingDescription}</p>
            </article>
            <article className="border-t border-[var(--bm-border-strong)] pt-5">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)]">Florida</h3>
              <p className="mt-3 max-w-md text-base leading-7 text-[var(--bm-text-muted)]">{copy.coverageFloridaDescription}</p>
            </article>
          </div>
          <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-[var(--bm-text)]">{copy.coverageMessage}</p>
        </div>
      </Container>
    </section>
  );
}
