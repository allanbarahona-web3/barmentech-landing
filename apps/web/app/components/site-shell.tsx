import { SiteFooter, SiteHeader } from "@barmentech/ui";
import type { ReactNode } from "react";

import { TechnologyHeaderSurface } from "./technology-header-surface";
import type { Locale } from "../lib/i18n";
import { getTechnologyFormationUrl } from "../lib/public-settings";
import { getTechnologyFooterNavigation, getTechnologyLabels, getTechnologyNavigation, type TechnologyPage } from "../lib/site";

type SiteShellProps = {
  activePage: TechnologyPage;
  children: ReactNode;
  locale: Locale;
  path?: string;
};

export function SiteShell({ activePage, children, locale, path = "" }: SiteShellProps) {
  const copy = getTechnologyLabels(locale);
  const formationHref = getTechnologyFormationUrl(locale);
  const localizedPath = path ? `/${path}` : "";

  return (
    <div data-technology-shell>
      <TechnologyHeaderSurface />
      <a className="fixed left-4 top-4 z-50 -translate-y-20 rounded-md bg-[var(--bm-text)] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="#main-content">
        {locale === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>
      <SiteHeader
        brand={{
          alt: "Barmentech",
          ariaLabel: locale === "en" ? "Barmentech Technology" : "Barmentech Tecnología",
          division: copy.division,
          homeHref: `/${locale}`,
          logoClassName: "h-8 w-8 shrink-0",
          logoHeight: 500,
          logoSrc: "/images/barmentech-isotype.webp",
          logoWidth: 500,
          showDivision: true,
        }}
        contact={{ href: `/${locale}/contact`, label: copy.contactCta }}
        contactPulse={false}
        compact
        desktopBreakpoint="wide"
        language={{
          current: locale.toUpperCase(),
          label: copy.language,
          options: [
            { href: `/en${localizedPath}`, label: "EN" },
            { href: `/es${localizedPath}`, label: "ES" },
          ],
        }}
        menu={{ closeLabel: copy.menuClose, openLabel: copy.menuOpen }}
        navigation={getTechnologyNavigation(locale, activePage, formationHref)}
        sticky
        variant="formation"
      />
      {children}
      <SiteFooter
        brand={{
          alt: "Barmentech",
          division: copy.division,
          homeHref: `/${locale}`,
          logoSrc: "/images/barmentech-logo.png",
        }}
        copyright="Barmentech LLC"
        legalLinks={[
          { href: `/${locale}/privacy`, label: copy.privacy },
          { href: `/${locale}/terms`, label: copy.terms },
        ]}
        navigation={getTechnologyFooterNavigation(locale, formationHref)}
        navigationLabel={copy.footerNavigation}
      />
    </div>
  );
}
