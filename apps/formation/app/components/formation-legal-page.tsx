import { Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLegalContent, type FormationLegalPage } from "../lib/legal";

type FormationLegalPageProps = {
  locale: Locale;
  page: FormationLegalPage;
};

export function FormationLegalPage({ locale, page }: FormationLegalPageProps) {
  const content = getFormationLegalContent(locale, page);

  return (
    <main id="main-content">
      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <article className="max-w-3xl">
          <header className="border-b border-[var(--bm-border-strong)] pb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{content.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-5xl">{content.title}</h1>
            <p className="mt-5 text-lg leading-8 text-[var(--bm-text-muted)]">{content.description}</p>
            <p className="mt-6 text-sm text-[var(--bm-text-muted)]">
              {content.lastUpdatedLabel}: {content.lastUpdated}
            </p>
          </header>
          <div className="divide-y divide-[var(--bm-border)]">
            {content.sections.map((section) => (
              <section className="py-10" key={section.title}>
                <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{section.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-[var(--bm-text-muted)]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </Container>
    </main>
  );
}
