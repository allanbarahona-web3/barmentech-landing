import { Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLegalPath } from "../lib/legal";
import { getPublicLeadInterest } from "../lib/public-lead-contract";
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
  const selectedInterest = getPublicLeadInterest(initialInterest)
    ? initialInterest
    : undefined;

  return (
    <main id="main-content">
      <Container className="px-5 py-14 pb-28 sm:px-8 sm:py-20 sm:pb-32 lg:py-24 lg:pb-36">
        <div className="max-w-3xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.division}</p>
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-5xl" id="contact-title">{getFormationPageTitle(locale, "contact")}</h1>
          <p className="text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{copy.contactBody}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(17rem,0.38fr)_minmax(0,0.62fr)] lg:gap-12 xl:gap-16">
          <aside className="self-start space-y-8 lg:sticky lg:top-24">
            {settings.bookingUrl ? (
              <section aria-labelledby="formation-contact-booking-title" className="rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-[var(--bm-surface-subtle)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.contactBooking.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)]" id="formation-contact-booking-title">{copy.contactBooking.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--bm-text-muted)]">{copy.contactBooking.body}</p>
                <a aria-label={`${copy.contactBooking.action} (${copy.contactBooking.newTab})`} className="mt-5 inline-flex min-h-[var(--bm-control-height)] w-full items-center justify-center gap-2 rounded-[var(--bm-radius-control)] bg-[var(--bm-brand)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] sm:w-auto" href={settings.bookingUrl} rel="noopener noreferrer" target="_blank">
                  {copy.contactBooking.action}
                  <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
                    <rect height="15" rx="2" stroke="currentColor" strokeWidth="1.75" width="16" x="4" y="5" />
                    <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
                  </svg>
                </a>
                <p className="mt-4 text-sm font-medium text-[var(--bm-text-muted)]">{copy.contactBooking.supportingNote}</p>
              </section>
            ) : null}
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

          <FormationContactForm apiBaseUrl={settings.apiBaseUrl} copy={copy.contactForm} initialInterest={selectedInterest} locale={locale} privacyHref={`/${locale}/${getFormationLegalPath(locale, "privacy")}`} whatsappUrl={settings.whatsappUrl} />
        </div>
      </Container>
    </main>
  );
}
