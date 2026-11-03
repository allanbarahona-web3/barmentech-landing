import { Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getTechnologyContent } from "../lib/technology-content";
import { buildTechnologyWhatsappUrl, getTechnologyApiBaseUrl, getTechnologyPublicSettings } from "../lib/public-settings";
import { TechnologyContactForm } from "./technology-contact-form";

export function TechnologyContact({ callRequest = false, locale }: { callRequest?: boolean; locale: Locale }) {
  const content = getTechnologyContent(locale);
  const apiBaseUrl = getTechnologyApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);
  const settings = getTechnologyPublicSettings();
  const directWhatsappUrl = buildTechnologyWhatsappUrl(
    settings.whatsappUrl,
    locale === "en"
      ? "Hello Barmentech, I would like to discuss a Technology project."
      : "Hola Barmentech, me gustaría conversar sobre un proyecto de Tecnología.",
  );

  return (
    <main id="main-content">
      <section className="border-b border-[#31527a] bg-[#041a36] text-white">
        <Container className="grid gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{content.hero.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl sm:leading-[1.04]">{content.contact.title}</h1>
            <p className="mt-6 text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">{content.contact.body}</p>
          </div>
          <picture aria-hidden="true" className="block overflow-hidden rounded-[var(--bm-radius-panel)] border border-white/15 bg-[#0b2c58] shadow-[0_1.5rem_3.5rem_rgb(1_14_32_/_0.3)]">
            <source height="1402" media="(max-width: 639px)" srcSet="/images/barmentech-contact-founder-mobile.webp" type="image/webp" width="1122" />
            <img alt="" className="aspect-[4/5] h-full w-full object-cover object-center sm:aspect-[16/10]" decoding="async" fetchPriority="high" height="941" sizes="(min-width: 1024px) 50vw, 100vw" src="/images/barmentech-contact-founder-desktop.webp" width="1672" />
          </picture>
        </Container>
      </section>

      <Container className="px-5 py-14 pb-28 sm:px-8 sm:py-20 sm:pb-32 lg:py-24 lg:pb-36">
        <div className="grid gap-10 lg:grid-cols-[minmax(17rem,0.38fr)_minmax(0,0.62fr)] lg:gap-12 xl:gap-16">
          <aside className="self-start space-y-8 lg:sticky lg:top-24">
            {settings.bookingUrl ? (
              <section aria-labelledby="technology-contact-booking-title" className="rounded-[var(--bm-radius-panel)] border border-[#c9dcf6] bg-[#f4f9ff] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{content.contact.booking.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)]" id="technology-contact-booking-title">{content.contact.booking.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--bm-text-muted)]">{content.contact.booking.body}</p>
                <a aria-label={`${content.contact.booking.action} (${content.contact.booking.newTab})`} className="mt-5 inline-flex min-h-[var(--bm-control-height)] w-full items-center justify-center gap-2 rounded-[var(--bm-radius-control)] bg-[var(--bm-brand)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] sm:w-auto" href={settings.bookingUrl} rel="noopener noreferrer" target="_blank">
                  {content.contact.booking.action}
                  <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
                    <rect height="15" rx="2" stroke="currentColor" strokeWidth="1.75" width="16" x="4" y="5" />
                    <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
                  </svg>
                </a>
                <p className="mt-4 text-sm font-medium text-[var(--bm-text-muted)]">{content.contact.booking.supportingNote}</p>
              </section>
            ) : null}
            <section aria-labelledby="technology-contact-guidance-title" className="border-l-2 border-[var(--bm-brand)] pl-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{content.contact.guidance.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)]" id="technology-contact-guidance-title">{content.contact.guidance.title}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)]">{content.contact.guidance.intro}</p>
              <div className="mt-8 border-t border-[var(--bm-border)] pt-6">
                <h3 className="text-sm font-semibold text-[var(--bm-text)]">{content.contact.guidance.listTitle}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--bm-text-muted)]">
                  {content.contact.guidance.items.map((item) => <li className="flex gap-3" key={item}><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bm-brand)]" />{item}</li>)}
                </ul>
              </div>
              <div className="mt-8 border-t border-[var(--bm-border)] pt-6">
                <h3 className="text-sm font-semibold text-[var(--bm-text)]">{content.contact.guidance.directTitle}</h3>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  {directWhatsappUrl ? <a aria-label={content.contact.guidance.whatsappAction} className="inline-flex min-h-[var(--bm-control-height)] items-center justify-center rounded-[var(--bm-radius-control)] bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={directWhatsappUrl} rel="noopener noreferrer" target="_blank">{content.contact.guidance.whatsappAction}</a> : null}
                  <a aria-label={content.contact.guidance.emailAction} className="inline-flex min-h-[var(--bm-control-height)] items-center justify-center rounded-[var(--bm-radius-control)] border border-[var(--bm-border-strong)] px-4 py-2 text-sm font-semibold text-[var(--bm-text)] transition-colors hover:border-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="mailto:support@barmentech.com">{content.contact.guidance.emailAction}</a>
                </div>
              </div>
              <p className="mt-8 text-sm leading-6 text-[var(--bm-text-muted)]">{content.contact.guidance.closing}</p>
            </section>
          </aside>
          <TechnologyContactForm apiBaseUrl={apiBaseUrl} callRequest={callRequest} copy={content.contact.form} locale={locale} privacyHref={`/${locale}/privacy`} whatsappUrl={settings.whatsappUrl} />
        </div>
      </Container>
    </main>
  );
}
