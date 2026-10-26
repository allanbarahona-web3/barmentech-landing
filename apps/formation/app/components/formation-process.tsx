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
      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl xl:text-5xl" id="formation-process-title">
            {copy.processTitle}
          </h2>
        </div>

        <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:mt-16 lg:gap-x-16 lg:gap-y-14">
          {copy.processSteps.map((step, index) => (
            <li className="border-t border-[var(--bm-border-strong)] pt-5" key={step.title}>
              <p className="text-sm font-semibold tabular-nums text-[var(--bm-brand)]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)] sm:text-2xl">{step.title}</h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-[var(--bm-text-muted)]">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-6 border-t border-[var(--bm-border-strong)] pt-10 sm:mt-20 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-xl space-y-3">
            <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{copy.processConsultationTitle}</h3>
            <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.processConsultationBody}</p>
          </div>
          <ActionLink className="w-full shrink-0 sm:w-auto" href={`/${locale}/contact`}>
            {copy.processConsultationCta}
          </ActionLink>
        </div>
      </Container>
    </section>
  );
}
