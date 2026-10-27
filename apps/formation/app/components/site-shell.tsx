import { SiteHeader } from "@barmentech/ui";
import type { ReactNode } from "react";

import { FormationFooter } from "./formation-footer";
import { FormationSocialMark, getFormationSocialLabel } from "./formation-social-mark";
import { FormationWhatsappAction } from "./formation-whatsapp-action";
import type { Locale } from "../lib/i18n";
import { getFormationPublicSettings } from "../lib/public-settings";
import { getFormationLabels, getFormationNavigation, getFormationPortalDestination, type FormationPage } from "../lib/site";

type SiteShellProps = {
  activePage: FormationPage;
  children: ReactNode;
  locale: Locale;
  localizedPaths?: Partial<Record<Locale, string>>;
  path?: string;
};

export function SiteShell({ activePage, children, locale, localizedPaths, path = "" }: SiteShellProps) {
  const copy = getFormationLabels(locale);
  const localizedPath = path ? `/${path}` : "";
  const settings = getFormationPublicSettings();

  return (
    <>
      <a className="fixed left-4 top-4 z-50 -translate-y-20 rounded-md bg-[var(--bm-text)] px-4 py-2 text-sm font-semibold text-white transition-transform focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="#main-content">
        {locale === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>
      <SiteHeader
        brand={{
          alt: "Barmentech",
          ariaLabel: copy.headerHomeLabel,
          division: copy.division,
          homeHref: `/${locale}`,
          logoClassName: "h-8 w-8 shrink-0",
          logoHeight: 500,
          logoSrc: "/images/barmentech-isotype.webp",
          logoWidth: 500,
        }}
        contact={{ href: `/${locale}/contact`, label: copy.contactCta }}
        compact
        desktopBreakpoint="wide"
        hideDivisionAtWideDesktop
        language={{
          current: locale.toUpperCase(),
          label: copy.language,
          options: [
            { href: `/en${localizedPaths?.en ?? localizedPath}`, label: "EN" },
            { href: `/es${localizedPaths?.es ?? localizedPath}`, label: "ES" },
          ],
        }}
        menu={{ closeLabel: copy.menuClose, openLabel: copy.menuOpen }}
        navigation={getFormationNavigation(locale, activePage)}
        portal={{ href: getFormationPortalDestination(locale), label: copy.portal }}
        social={settings.socialLinks.length ? {
          label: copy.footerSocialNavigation,
          links: settings.socialLinks.map((social) => ({
            href: social.url,
            icon: <FormationSocialMark className="h-5 w-5" network={social.network} useBrandColor />,
            label: getFormationSocialLabel(locale, social.network),
          })),
        } : undefined}
        sticky
        variant="formation"
      />
      {children}
      <FormationFooter locale={locale} />
      <FormationWhatsappAction locale={locale} url={settings.whatsappUrl} />
    </>
  );
}
