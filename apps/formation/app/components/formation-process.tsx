import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";

type FormationProcessProps = {
  locale: Locale;
};

export function FormationProcess({ locale }: FormationProcessProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="formation-process-title" className="bg-[var(--bm-surface-subtle)]" id="how-we-work">
      <Container className="px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="formation-process-title">
            {copy.processTitle}
          </h2>
        </div>

        <ol className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {copy.processSteps.map((step, index) => (
            <li className="border-t border-[var(--bm-border-strong)] pt-5" key={step.title}>
              <p className="text-sm font-semibold tabular-nums text-[var(--bm-brand)]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)]">{step.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--bm-text-muted)]">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-5 border-t border-[var(--bm-border-strong)] pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="max-w-xl text-base leading-7 text-[var(--bm-text-muted)]">{copy.processConsultationBody}</p>
          <ActionLink className="w-full shrink-0 sm:w-auto" href={`/${locale}/contact`}>
            {copy.processConsultationCta}
          </ActionLink>
        </div>
      </Container>
    </section>
  );
}
