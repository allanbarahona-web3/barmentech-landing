import { SiteFooter } from "@barmentech/ui";

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
  return (
    <SiteFooter
      brand={{
        ariaLabel: "Barmentech LLC",
        homeHref: `/${locale}`,
        logoSrc: "/images/barmentech-isotype.webp",
      }}
      contact={{
        appointment: copy.footerCostaRicaAppointment,
        businessHours: copy.footerBusinessHours,
        email: "info@barmentech.com",
        emailLabel: copy.footerEmailLabel,
        heading: copy.footerGeneralContact,
        whatsapp: settings.whatsappUrl ? {
          href: settings.whatsappUrl,
          label: copy.footerWhatsappLabel,
          value: "WhatsApp +1 (786) 391-8722",
        } : undefined,
      }}
      copyright={`© ${year} Barmentech LLC`}
      costaRica={{
        addressLines: ["Oficentro Momentum Pinares", "Piso 4 – Republic Workspace", "Sánchez, Curridabat", "San José 11803, Costa Rica"],
        heading: copy.footerCostaRicaTitle,
        headingId: "footer-costa-rica-title",
        phone: { href: "tel:+50670067572", label: copy.footerCostaRicaPhoneLabel, value: "+506 7006-7572" },
      }}
      description={copy.footerDescription}
      legalLinks={(["privacy", "terms", "disclaimer"] as const).map((page) => ({
        href: `/${locale}/${getFormationLegalPath(locale, page)}`,
        label: page === "privacy" ? copy.privacy : page === "terms" ? copy.terms : copy.disclaimer,
      }))}
      publicNavigation={{ label: copy.footerNavigation, links: publicNavigation }}
      servicesNavigation={{ label: copy.footerServicesNavigation, links: servicesNavigation }}
      social={settings.socialLinks.length ? {
        label: copy.footerSocialNavigation,
        links: settings.socialLinks.map((social) => ({
          href: social.url,
          icon: <FormationSocialMark network={social.network} />,
          label: getFormationSocialLabel(locale, social.network),
        })),
      } : undefined}
      technologyCredit={{
        href: "https://barmentech.com/",
        label: copy.footerDevelopmentCredit,
      }}
      unitedStates={{
        addressLines: ["1110 Brickell Ave #400K-101", "Miami, Florida 33131", copy.footerUnitedStatesCountry],
        heading: copy.footerUnitedStatesTitle,
        headingId: "footer-united-states-title",
        legalEntity: "Barmentech LLC",
        phone: { href: "tel:+17863918722", label: copy.footerUnitedStatesPhoneLabel, value: "+1 (786) 391-8722" },
      }}
      variant="formation"
    />
  );
}
