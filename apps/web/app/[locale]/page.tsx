import { ActionLink, Container } from "@barmentech/ui";

import { SiteShell } from "../components/site-shell";
import { isLocale } from "../lib/i18n";
import { getTechnologyLabels } from "../lib/site";

type TechnologyHomePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function TechnologyHomePage({ params }: TechnologyHomePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return null;
  }

  const locale = localeParam;
  const copy = getTechnologyLabels(locale);

  return (
    <SiteShell activePage="home" locale={locale}>
      <main id="main-content">
        <Container className="px-5 py-16 sm:px-8 sm:py-24">
          <section className="max-w-3xl space-y-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.developmentLabel}</p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-5xl">{copy.previewTitle}</h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--bm-text-muted)]">{copy.previewBody}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ActionLink href={`/${locale}/contact`}>{copy.previewPrimary}</ActionLink>
              <ActionLink href="#how-we-work" variant="secondary">{copy.previewSecondary}</ActionLink>
            </div>
          </section>
          <section className="mt-20 border-t border-[var(--bm-border)] pt-10 sm:mt-28 sm:pt-14" id="how-we-work">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.developmentLabel}</p>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--bm-text)] sm:text-3xl">{copy.howWeWorkTitle}</h2>
              <p className="text-base leading-7 text-[var(--bm-text-muted)]">{copy.howWeWorkBody}</p>
            </div>
          </section>
        </Container>
      </main>
    </SiteShell>
  );
}
