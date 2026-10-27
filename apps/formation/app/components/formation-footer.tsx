import type { Locale } from "../lib/i18n";
import { getFormationLegalPath } from "../lib/legal";
import { getFormationPublicSettings } from "../lib/public-settings";
import { getFormationFaqPath, getFormationLabels, getFormationTaxServicesPath } from "../lib/site";
import { FormationSocialMark, getFormationSocialLabel } from "./formation-social-mark";

type FormationFooterProps = {
  locale: Locale;
};

export function FormationFooter({ locale }: FormationFooterProps) {
  const copy = getFormationLabels(locale);
  const settings = getFormationPublicSettings();
  const year = new Date().getFullYear();
  const publicNavigation = [
    { href: `/${locale}`, label: copy.home },
    { href: `/${locale}#how-we-work`, label: copy.howWeWork },
    { href: `/${locale}#pricing`, label: copy.pricingNavigation },
    { href: `/${locale}/${getFormationFaqPath(locale)}`, label: copy.faq },
  ];
  const servicesNavigation = [
    { href: `/${locale}#services`, label: copy.businessFormation },
    { href: `/${locale}/${getFormationTaxServicesPath(locale)}`, label: copy.taxServices },
    { href: `/${locale}#annual-compliance`, label: copy.annualComplianceTitle },
    { href: `/${locale}/portal`, label: copy.portal },
  ];
  const linkClass = "rounded-sm text-sm leading-6 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <footer className="border-t border-[#1c4274] bg-[#071a33] text-white">
      <div className="mx-auto grid w-full max-w-[var(--bm-content-width)] gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:py-14 xl:grid-cols-[1.5fr_0.7fr_0.85fr_1fr_1.55fr] xl:gap-8">
        <div className="space-y-4 xl:max-w-sm">
          <a aria-label="Barmentech LLC" className="inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href={`/${locale}`}>
            <img alt="" className="h-9 w-9" height={500} src="/images/barmentech-isotype.webp" width={500} />
            <span className="text-base font-semibold tracking-[-0.02em] text-white">Barmentech LLC</span>
          </a>
          <p className="text-sm leading-6 text-white/70">{copy.footerDescription}</p>
          {settings.socialLinks.length ? (
            <nav aria-label={copy.footerSocialNavigation} className="flex flex-wrap gap-2">
              {settings.socialLinks.map((social) => (
                <a
                  aria-label={getFormationSocialLabel(locale, social.network)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/75 transition-colors hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
                  href={social.url}
                  key={social.network}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FormationSocialMark network={social.network} />
                </a>
              ))}
            </nav>
          ) : null}
        </div>

        <nav aria-label={copy.footerNavigation} className="space-y-3">
          <h2 className="text-sm font-semibold text-white">{copy.footerNavigation}</h2>
          <div className="flex flex-col items-start gap-2">
            {publicNavigation.map((link) => (
              <a className={linkClass} href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <nav aria-label={copy.footerServicesNavigation} className="space-y-3">
          <h2 className="text-sm font-semibold text-white">{copy.footerServicesNavigation}</h2>
          <div className="flex flex-col items-start gap-2">
            {servicesNavigation.map((link) => (
              <a className={linkClass} href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <section aria-labelledby="footer-united-states-title" className="space-y-3">
          <h2 className="text-sm font-semibold text-white" id="footer-united-states-title">{copy.footerUnitedStatesTitle}</h2>
          <address className="space-y-1 text-sm leading-6 not-italic text-white/70">
            <p className="font-medium text-white">Barmentech LLC</p>
            <p>1110 Brickell Ave #400K-101</p>
            <p>Miami, Florida 33131</p>
            <p>{copy.footerUnitedStatesCountry}</p>
            <a aria-label={copy.footerUnitedStatesPhoneLabel} className={linkClass} href="tel:+17863918722">+1 (786) 391-8722</a>
          </address>
        </section>

        <section aria-labelledby="footer-costa-rica-title" className="space-y-3">
          <h2 className="text-sm font-semibold text-white" id="footer-costa-rica-title">{copy.footerCostaRicaTitle}</h2>
          <address className="space-y-1 text-sm leading-6 not-italic text-white/70">
            <p>Oficentro Momentum Pinares</p>
            <p>Piso 4 – Republic Workspace</p>
            <p>Sánchez, Curridabat</p>
            <p>San José 11803, Costa Rica</p>
            <a aria-label={copy.footerCostaRicaPhoneLabel} className={linkClass} href="tel:+50670067572">+506 7006-7572</a>
          </address>
          <div className="space-y-1 text-sm leading-6 text-white/70">
            <h3 className="pt-1 text-sm font-semibold text-white">{copy.footerGeneralContact}</h3>
            <a aria-label={`${copy.footerEmailLabel}: info@barmentech.com`} className={linkClass} href="mailto:info@barmentech.com">info@barmentech.com</a>
            <p>{copy.footerBusinessHours}</p>
            <p>{copy.footerCostaRicaAppointment}</p>
            {settings.whatsappUrl ? (
              <a aria-label={copy.footerWhatsappLabel} className={linkClass} href={settings.whatsappUrl} rel="noopener noreferrer" target="_blank">
                WhatsApp +1 (786) 391-8722
              </a>
            ) : null}
          </div>
        </section>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-[var(--bm-content-width)] flex-col gap-2 px-5 py-5 text-xs leading-5 text-white/60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:px-8">
          <span>© {year} Barmentech LLC</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          {(["privacy", "terms", "disclaimer"] as const).map((page) => (
            <a className="rounded-sm text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href={`/${locale}/${getFormationLegalPath(locale, page)}`} key={page}>
              {page === "privacy" ? copy.privacy : page === "terms" ? copy.terms : copy.disclaimer}
            </a>
          ))}
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          {settings.technologyUrl ? (
            <a className="rounded-sm text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href={settings.technologyUrl} rel="noopener noreferrer" target="_blank">
              {copy.footerDevelopmentCredit}
            </a>
          ) : (
            <span className="text-white/70">{copy.footerDevelopmentCredit}</span>
          )}
        </div>
      </div>
    </footer>
  );
}
