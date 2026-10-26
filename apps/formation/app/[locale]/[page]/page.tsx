import { Container } from "@barmentech/ui";
import { notFound } from "next/navigation";

import { SiteShell } from "../../components/site-shell";
import { isLocale } from "../../lib/i18n";
import { getFormationLabels, getFormationPageTitle, isFormationPage, type FormationPage } from "../../lib/site";

type FormationPlaceholderPageProps = Readonly<{
  params: Promise<{ locale: string; page: string }>;
}>;

export default async function FormationPlaceholderPage({ params }: FormationPlaceholderPageProps) {
  const { locale: localeParam, page } = await params;

  if (!isLocale(localeParam) || !isFormationPage(page) || page === "home" || ["bookkeeping", "business-formation", "business-services", "taxes"].includes(page)) {
    notFound();
  }

  const locale = localeParam;
  const formationPage = page as Exclude<FormationPage, "home">;
  const copy = getFormationLabels(locale);

  return (
    <SiteShell activePage={formationPage} locale={locale} path={page}>
      <main id="main-content">
        <Container className="px-5 py-16 sm:px-8 sm:py-24">
          <section className="max-w-2xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.provisionalLabel}</p>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-5xl">{getFormationPageTitle(locale, formationPage)}</h1>
            <p className="text-lg leading-8 text-[var(--bm-text-muted)]">{copy.provisionalBody}</p>
          </section>
        </Container>
      </main>
    </SiteShell>
  );
}
