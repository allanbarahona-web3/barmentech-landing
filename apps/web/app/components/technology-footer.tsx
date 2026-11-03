import { SiteFooter } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import type { TechnologyPublicSettings, TechnologySocialNetwork } from "../lib/public-settings";
import { getTechnologyLabels } from "../lib/site";

type TechnologyFooterProps = {
  formationHref: string;
  locale: Locale;
  settings: TechnologyPublicSettings;
};

const socialNames: Record<TechnologySocialNetwork, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X",
  youtube: "YouTube",
};

export function TechnologyFooter({ formationHref, locale, settings }: TechnologyFooterProps) {
  const copy = getTechnologyLabels(locale);
  const year = new Date().getFullYear();

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
      legalLinks={[
        { href: `/${locale}/privacy`, label: copy.privacy },
        { href: `/${locale}/terms`, label: copy.terms },
        { href: `/${locale}/disclaimer`, label: copy.disclaimer },
      ]}
      publicNavigation={{
        label: copy.footerNavigation,
        links: [
          { href: `/${locale}`, label: copy.home },
          { href: `/${locale}#how-we-work`, label: copy.howWeWork },
          { href: `/${locale}/about`, label: copy.about },
          { href: `/${locale}/contact`, label: copy.contact },
        ],
      }}
      servicesNavigation={{
        label: copy.footerServicesNavigation,
        links: [
          { href: `/${locale}/services/web-development`, label: copy.webDevelopment },
          { href: `/${locale}/services/custom-software`, label: copy.customSoftware },
          { href: `/${locale}/services/automation`, label: copy.automation },
          { href: formationHref, label: copy.formation },
        ],
      }}
      social={settings.socialLinks.length ? {
        label: copy.footerSocialNavigation,
        links: settings.socialLinks.map((social) => ({
          href: social.url,
          icon: <TechnologySocialMark network={social.network} />,
          label: locale === "en" ? `Follow Barmentech on ${socialNames[social.network]}` : `Seguir a Barmentech en ${socialNames[social.network]}`,
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

function TechnologySocialMark({ network }: { network: TechnologySocialNetwork }) {
  const marks: Record<TechnologySocialNetwork, string> = {
    facebook: "f",
    instagram: "◎",
    linkedin: "in",
    x: "X",
    youtube: "▶",
  };

  return (
    <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24">
      <text fill="currentColor" fontFamily="Arial, sans-serif" fontSize={network === "linkedin" ? "11" : "15"} fontWeight="700" textAnchor="middle" x="12" y="17">
        {marks[network]}
      </text>
    </svg>
  );
}
