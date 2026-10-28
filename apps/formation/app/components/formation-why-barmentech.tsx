import { Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";

type FormationWhyBarmentechProps = {
  locale: Locale;
};

export function FormationWhyBarmentech({ locale }: FormationWhyBarmentechProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="why-barmentech-title" className="bg-[var(--bm-surface-subtle)]" id="why-barmentech">
      <Container className="px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="max-w-2xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.whyBarmentechEyebrow}</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="why-barmentech-title">
              {copy.whyBarmentechTitle}
            </h2>
            <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{copy.whyBarmentechIntroduction}</p>
        </div>
          <div className="mt-10 grid border-t border-[var(--bm-border-strong)] sm:grid-cols-2">
            {copy.whyBarmentechDifferentiators.map((differentiator, index) => (
              <article className="grid gap-3 border-b border-[var(--bm-border)] py-6 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-4 sm:px-6 even:sm:border-l" key={differentiator.title}>
                <p aria-hidden="true" className="text-sm font-semibold tabular-nums text-[var(--bm-brand)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--bm-text)]">{differentiator.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--bm-text-muted)]">{differentiator.description}</p>
                </div>
              </article>
            ))}
          </div>
      </Container>
    </section>
  );
}
