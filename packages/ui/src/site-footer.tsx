type FooterLink = {
  href: string;
  label: string;
};

type SiteFooterProps = {
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

export function SiteFooter({ brand, copyright, legalLinks, navigation, navigationLabel }: SiteFooterProps) {
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
