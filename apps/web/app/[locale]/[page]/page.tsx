import { Container } from "@barmentech/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteShell } from "../../components/site-shell";
import { TechnologyAboutPage } from "../../components/technology-about-page";
import { TechnologyContact } from "../../components/technology-contact";
import { TechnologyLegalPage } from "../../components/technology-legal-page";
import { isLocale } from "../../lib/i18n";
import { isTechnologyLegalPage } from "../../lib/legal";
import { getTechnologyAboutMetadata, getTechnologyContactMetadata, getTechnologyLegalMetadata } from "../../lib/seo";
import { getTechnologyLabels, getTechnologyPageTitle, isTechnologyPage, type TechnologyPage } from "../../lib/site";

type TechnologyPlaceholderPageProps = Readonly<{
  params: Promise<{ locale: string; page: string }>;
  searchParams: Promise<{ intent?: string }>;
}>;

export async function generateMetadata({ params }: TechnologyPlaceholderPageProps): Promise<Metadata> {
  const { locale, page } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  if (page === "contact") {
    return getTechnologyContactMetadata(locale);
  }

  if (isTechnologyLegalPage(page)) {
    return getTechnologyLegalMetadata(locale, page);
  }

  return page === "about" ? getTechnologyAboutMetadata(locale) : {};
}

export default async function TechnologyPlaceholderPage({ params, searchParams }: TechnologyPlaceholderPageProps) {
  const { locale: localeParam, page } = await params;

  if (!isLocale(localeParam) || !isTechnologyPage(page) || page === "home" || ["automation", "custom-software", "web-development"].includes(page)) {
    notFound();
  }

  const locale = localeParam;
  const technologyPage = page as Exclude<TechnologyPage, "home">;

  if (technologyPage === "contact") {
    const { intent } = await searchParams;

    return (
      <SiteShell activePage="contact" locale={locale} path={page}>
        <TechnologyContact callRequest={intent === "call"} locale={locale} />
      </SiteShell>
    );
  }

  if (technologyPage === "about") {
    return (
      <SiteShell activePage="about" locale={locale} path={page}>
        <TechnologyAboutPage locale={locale} />
      </SiteShell>
    );
  }

  if (isTechnologyLegalPage(technologyPage)) {
    return (
      <SiteShell activePage={technologyPage} locale={locale} path={page}>
        <TechnologyLegalPage locale={locale} page={technologyPage} />
      </SiteShell>
    );
  }

  const copy = getTechnologyLabels(locale);

  return (
    <SiteShell activePage={technologyPage} locale={locale} path={page}>
      <main id="main-content">
        <Container className="px-5 py-16 sm:px-8 sm:py-24">
          <section className="max-w-2xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.provisionalLabel}</p>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-5xl">{getTechnologyPageTitle(locale, technologyPage)}</h1>
            <p className="text-lg leading-8 text-[var(--bm-text-muted)]">{copy.provisionalBody}</p>
          </section>
        </Container>
      </main>
    </SiteShell>
  );
}
