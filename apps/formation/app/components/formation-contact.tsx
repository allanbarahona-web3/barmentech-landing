import { Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLegalPath } from "../lib/legal";
import { getFormationPublicSettings } from "../lib/public-settings";
import { getFormationLabels, getFormationPageTitle } from "../lib/site";
import { FormationContactForm } from "./formation-contact-form";

type FormationContactProps = {
  initialInterest?: string;
  locale: Locale;
};

export function FormationContact({ initialInterest, locale }: FormationContactProps) {
  const copy = getFormationLabels(locale);
  const settings = getFormationPublicSettings();
  const selectedInterest = copy.contactForm.interestOptions.some((option) => option.value === initialInterest) ? initialInterest : undefined;

  return (
    <main id="main-content">
      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.division}</p>
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-5xl" id="contact-title">{getFormationPageTitle(locale, "contact")}</h1>
          <p className="text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{copy.contactBody}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <aside className="space-y-8">
            <p className="border-l-2 border-[var(--bm-brand)] pl-5 text-base leading-7 text-[var(--bm-text)]">{copy.contactSupportingMessage}</p>
            <section aria-labelledby="contact-alternatives-title" className="rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-[var(--bm-surface-subtle)] p-6">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)]" id="contact-alternatives-title">{copy.contactForm.alternativeContactTitle}</h2>
              <div className="mt-5 space-y-5 text-sm leading-6 text-[var(--bm-text-muted)]">
                <div>
                  <p className="font-semibold text-[var(--bm-text)]">{copy.footerEmailLabel}</p>
                  <a className="rounded-sm text-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="mailto:info@barmentech.com">info@barmentech.com</a>
                </div>
                <div>
                  <p className="font-semibold text-[var(--bm-text)]">{copy.footerUnitedStatesTitle}</p>
                  <a className="rounded-sm text-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="tel:+17863918722">+1 (786) 391-8722</a>
                </div>
                <div>
                  <p className="font-semibold text-[var(--bm-text)]">{copy.footerCostaRicaTitle}</p>
                  <a className="rounded-sm text-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="tel:+50670067572">+506 7006-7572</a>
                </div>
                {settings.whatsappUrl ? <a className="inline-flex rounded-sm font-semibold text-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={settings.whatsappUrl} rel="noopener noreferrer" target="_blank">{copy.contactForm.whatsappAlternative}</a> : null}
              </div>
            </section>
            <p className="text-sm leading-6 text-[var(--bm-text-muted)]">{copy.contactForm.responseTime}</p>
          </aside>

          <FormationContactForm copy={copy.contactForm} endpoint={settings.formspreeEndpoint} initialInterest={selectedInterest} privacyHref={`/${locale}/${getFormationLegalPath(locale, "privacy")}`} whatsappUrl={settings.whatsappUrl} />
        </div>
      </Container>
    </main>
  );
}
