import type { ReactNode } from "react";

export type FooterLink = {
  href: string;
  label: string;
};

type StandardSiteFooterProps = {
  brand: {
    alt: string;
    division: string;
    homeHref: string;
    logoSrc: string;
  };
  copyright: string;
  legalLinks: FooterLink[];
  navigation: FooterLink[];
  navigationLabel: string;
};

type FormationFooterAddress = {
  addressLines: string[];
  heading: string;
  headingId: string;
  phone: {
    href: string;
    label: string;
    value: string;
  };
};

export type FormationSiteFooterProps = {
  brand: {
    ariaLabel: string;
    homeHref: string;
    logoSrc: string;
  };
  contact: {
    appointment: string;
    businessHours: string;
    email: string;
    emailLabel: string;
    heading: string;
    whatsapp?: {
      href: string;
      label: string;
      value: string;
    };
  };
  copyright: string;
  description: string;
  legalLinks: FooterLink[];
  publicNavigation: {
    label: string;
    links: FooterLink[];
  };
  servicesNavigation: {
    label: string;
    links: FooterLink[];
  };
  social?: {
    label: string;
    links: Array<{
      href: string;
      icon: ReactNode;
      label: string;
    }>;
  };
  technologyCredit: {
    href?: string;
    label: string;
  };
  unitedStates: FormationFooterAddress & {
    legalEntity: string;
  };
  variant: "formation";
  costaRica: FormationFooterAddress;
};

type SiteFooterProps = StandardSiteFooterProps | FormationSiteFooterProps;

export function SiteFooter(props: SiteFooterProps) {
  if ("variant" in props) {
    return <FormationSiteFooter {...props} />;
  }

  return <StandardSiteFooter {...props} />;
}

function StandardSiteFooter({ brand, copyright, legalLinks, navigation, navigationLabel }: StandardSiteFooterProps) {
  return (
    <footer className="border-t border-[var(--bm-border)] bg-[var(--bm-surface-subtle)]">
      <div className="mx-auto grid w-full max-w-[var(--bm-content-width)] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:py-14">
        <div className="space-y-4">
          <a className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bm-focus)]" href={brand.homeHref}>
            <img alt={brand.alt} className="h-auto w-36" src={brand.logoSrc} />
          </a>
          <p className="text-sm font-medium text-[var(--bm-text)]">{brand.division}</p>
          <p className="text-sm text-[var(--bm-text-muted)]">Barmentech LLC</p>
        </div>
        <nav aria-label={navigationLabel} className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
          {navigation.map((link) => (
            <a className="rounded-md py-1 text-sm text-[var(--bm-text-muted)] hover:text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-[var(--bm-border)]">
        <div className="mx-auto flex w-full max-w-[var(--bm-content-width)] flex-col gap-3 px-5 py-5 text-xs text-[var(--bm-text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>{copyright}</span>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <a className="rounded-md hover:text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FormationSiteFooter({
  brand,
  contact,
  copyright,
  costaRica,
  description,
  legalLinks,
  publicNavigation,
  servicesNavigation,
  social,
  technologyCredit,
  unitedStates,
}: FormationSiteFooterProps) {
  const linkClass = "rounded-sm text-sm leading-6 text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <footer className="border-t border-[#1c4274] bg-[#071a33] text-white">
      <div className="mx-auto grid w-full max-w-[var(--bm-content-width)] gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:py-14 xl:grid-cols-[1.5fr_0.7fr_0.85fr_1fr_1.55fr] xl:gap-8">
        <div className="space-y-4 xl:max-w-sm">
          <a aria-label={brand.ariaLabel} className="inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href={brand.homeHref}>
            <img alt="" className="h-9 w-9" height={500} src={brand.logoSrc} width={500} />
            <span className="text-base font-semibold tracking-[-0.02em] text-white">{brand.ariaLabel}</span>
          </a>
          <p className="text-sm leading-6 text-white/70">{description}</p>
          {social?.links.length ? (
            <nav aria-label={social.label} className="flex flex-wrap gap-2">
              {social.links.map((link) => (
                <a
                  aria-label={link.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/75 transition-colors hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
                  href={link.href}
                  key={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.icon}
                </a>
              ))}
            </nav>
          ) : null}
        </div>

        <FooterNavigation label={publicNavigation.label} links={publicNavigation.links} linkClass={linkClass} />
        <FooterNavigation label={servicesNavigation.label} links={servicesNavigation.links} linkClass={linkClass} />

        <section aria-labelledby={unitedStates.headingId} className="space-y-3">
          <h2 className="text-sm font-semibold text-white" id={unitedStates.headingId}>{unitedStates.heading}</h2>
          <address className="space-y-1 text-sm leading-6 not-italic text-white/70">
            <p className="font-medium text-white">{unitedStates.legalEntity}</p>
            {unitedStates.addressLines.map((line) => <p key={line}>{line}</p>)}
            <a aria-label={unitedStates.phone.label} className={linkClass} href={unitedStates.phone.href}>{unitedStates.phone.value}</a>
          </address>
        </section>

        <section aria-labelledby={costaRica.headingId} className="space-y-3">
          <h2 className="text-sm font-semibold text-white" id={costaRica.headingId}>{costaRica.heading}</h2>
          <address className="space-y-1 text-sm leading-6 not-italic text-white/70">
            {costaRica.addressLines.map((line) => <p key={line}>{line}</p>)}
            <a aria-label={costaRica.phone.label} className={linkClass} href={costaRica.phone.href}>{costaRica.phone.value}</a>
          </address>
          <div className="space-y-1 text-sm leading-6 text-white/70">
            <h3 className="pt-1 text-sm font-semibold text-white">{contact.heading}</h3>
            <a aria-label={`${contact.emailLabel}: ${contact.email}`} className={linkClass} href={`mailto:${contact.email}`}>{contact.email}</a>
            <p>{contact.businessHours}</p>
            <p>{contact.appointment}</p>
            {contact.whatsapp ? (
              <a aria-label={contact.whatsapp.label} className={linkClass} href={contact.whatsapp.href} rel="noopener noreferrer" target="_blank">
                {contact.whatsapp.value}
              </a>
            ) : null}
          </div>
        </section>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-[var(--bm-content-width)] flex-col gap-2 px-5 py-5 text-xs leading-5 text-white/60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:px-8">
          <span>{copyright}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          {legalLinks.map((link) => (
            <a className="rounded-sm text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          {technologyCredit.href ? (
            <a className="rounded-sm text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href={technologyCredit.href} rel="noopener noreferrer" target="_blank">
              {technologyCredit.label}
            </a>
          ) : (
            <span className="text-white/70">{technologyCredit.label}</span>
          )}
        </div>
      </div>
    </footer>
  );
}

function FooterNavigation({ label, linkClass, links }: { label: string; linkClass: string; links: FooterLink[] }) {
  return (
    <nav aria-label={label} className="space-y-3">
      <h2 className="text-sm font-semibold text-white">{label}</h2>
      <div className="flex flex-col items-start gap-2">
        {links.map((link) => (
          <a className={linkClass} href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
