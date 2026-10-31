import { notFound } from "next/navigation";

import { SiteShell } from "../../../components/site-shell";
import { TechnologyServicePage as TechnologyServiceContent } from "../../../components/technology-service-page";
import { isLocale } from "../../../lib/i18n";
import { isTechnologyServiceId } from "../../../lib/technology-content";
import type { TechnologyPage } from "../../../lib/site";

type TechnologyServicePageProps = Readonly<{
  params: Promise<{ locale: string; service: string }>;
}>;

export default async function TechnologyServicePage({ params }: TechnologyServicePageProps) {
  const { locale: localeParam, service } = await params;

  if (!isLocale(localeParam) || !isTechnologyServiceId(service)) {
    notFound();
  }

  const locale = localeParam;
  const technologyPage = service as Extract<TechnologyPage, "automation" | "custom-software" | "web-development">;

  return (
    <SiteShell activePage={technologyPage} locale={locale} path={`services/${service}`}>
      <TechnologyServiceContent locale={locale} service={service} />
    </SiteShell>
  );
}
