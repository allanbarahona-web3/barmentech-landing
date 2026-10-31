import { SiteShell } from "../components/site-shell";
import { TechnologyHome } from "../components/technology-home";
import { isLocale } from "../lib/i18n";

type TechnologyHomePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function TechnologyHomePage({ params }: TechnologyHomePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return null;
  }

  const locale = localeParam;

  return (
    <SiteShell activePage="home" locale={locale}>
      <TechnologyHome locale={locale} />
    </SiteShell>
  );
}
