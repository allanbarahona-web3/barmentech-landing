import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels, type FormationFaqGroup } from "../lib/site";
import { FormationFaqStructuredData } from "./formation-faq-structured-data";

type FormationFaqProps = {
  locale: Locale;
};

export function FormationFaq({ locale }: FormationFaqProps) {
  const copy = getFormationLabels(locale);

  return (
    <main id="main-content">
      <FormationFaqStructuredData locale={locale} />
      <section aria-labelledby="faq-title">
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.faqEyebrow}</p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-5xl xl:text-6xl" id="faq-title">
              {copy.faqTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{copy.faqIntroduction}</p>
          </div>
        </Container>
      </section>

      {copy.faqGroups.map((group, index) => (
        <section aria-labelledby={`faq-group-${index}`} className={index % 2 === 0 ? "bg-[var(--bm-surface-subtle)]" : undefined} key={group.title}>
          <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
            <FaqGroup group={group} id={`faq-group-${index}`} />
          </Container>
        </section>
      ))}

      <section aria-labelledby="faq-cta-title">
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <div className="flex flex-col gap-6 border-t border-[var(--bm-border-strong)] pt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div className="max-w-xl space-y-3">
              <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl" id="faq-cta-title">
                {copy.faqCtaTitle}
              </h2>
              <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.faqCtaBody}</p>
            </div>
            <ActionLink className="w-full shrink-0 sm:w-auto" href={`/${locale}/contact`}>
              {copy.faqCta}
            </ActionLink>
          </div>
        </Container>
      </section>
    </main>
  );
}

type FaqGroupProps = {
  group: FormationFaqGroup;
  id: string;
};

function FaqGroup({ group, id }: FaqGroupProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
      <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id={id}>
        {group.title}
      </h2>
      <div className="border-y border-[var(--bm-border-strong)]">
        {group.items.map((item) => (
          <details className="group border-b border-[var(--bm-border)] last:border-b-0" key={item.question}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-base font-semibold leading-7 text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--bm-focus)] [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span aria-hidden="true" className="mt-1 shrink-0 text-xl font-normal leading-6 text-[var(--bm-brand)] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="max-w-2xl pb-6 text-base leading-7 text-[var(--bm-text-muted)]">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
