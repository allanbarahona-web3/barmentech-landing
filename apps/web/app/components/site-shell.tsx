import { SiteFooter, SiteHeader } from "@barmentech/ui";
import type { ReactNode } from "react";

import type { Locale } from "../lib/i18n";
import { getTechnologyFooterNavigation, getTechnologyLabels, getTechnologyNavigation, type TechnologyPage } from "../lib/site";

type SiteShellProps = {
  activePage: TechnologyPage;
  children: ReactNode;
  locale: Locale;
  path?: string;
};

export function SiteShell({ activePage, children, locale, path = "" }: SiteShellProps) {
  const copy = getTechnologyLabels(locale);
  const localizedPath = path ? `/${path}` : "";

  return (
    <>
      <a className="fixed left-4 top-4 z-50 -translate-y-20 rounded-md bg-[var(--bm-text)] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="#main-content">
        {locale === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>
      <SiteHeader
        brand={{
          alt: "Barmentech",
          division: copy.division,
          homeHref: `/${locale}`,
          logoSrc: "/images/barmentech-logo.png",
        }}
        contact={{ href: `/${locale}/contact`, label: copy.contactCta }}
        language={{
          current: locale.toUpperCase(),
          label: copy.language,
          options: [
            { href: `/en${localizedPath}`, label: "EN" },
            { href: `/es${localizedPath}`, label: "ES" },
          ],
        }}
        menu={{ closeLabel: copy.menuClose, openLabel: copy.menuOpen }}
        navigation={getTechnologyNavigation(locale, activePage)}
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
        navigation={getTechnologyFooterNavigation(locale)}
        navigationLabel={copy.footerNavigation}
      />
    </>
  );
}
