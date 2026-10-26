import { Container } from "@barmentech/ui";
import { notFound } from "next/navigation";

import { SiteShell } from "../../../components/site-shell";
import { isLocale } from "../../../lib/i18n";
import { getTechnologyLabels, getTechnologyPageTitle, isTechnologyPage, type TechnologyPage } from "../../../lib/site";

type TechnologyServicePageProps = Readonly<{
  params: Promise<{ locale: string; service: string }>;
}>;

export default async function TechnologyServicePage({ params }: TechnologyServicePageProps) {
  const { locale: localeParam, service } = await params;

  if (!isLocale(localeParam) || !isTechnologyPage(service) || !["automation", "custom-software", "web-development"].includes(service)) {
    notFound();
  }

  const locale = localeParam;
  const technologyPage = service as Extract<TechnologyPage, "automation" | "custom-software" | "web-development">;
  const copy = getTechnologyLabels(locale);

  return (
    <SiteShell activePage={technologyPage} locale={locale} path={`services/${service}`}>
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
