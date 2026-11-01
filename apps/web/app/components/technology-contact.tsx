import { Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getTechnologyContent } from "../lib/technology-content";
import { getTechnologyApiBaseUrl } from "../lib/public-settings";
import { TechnologyContactForm } from "./technology-contact-form";

export function TechnologyContact({ locale }: { locale: Locale }) {
  const content = getTechnologyContent(locale);
  const apiBaseUrl = getTechnologyApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);

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

      <Container className="px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <aside className="self-start lg:sticky lg:top-24">
            <p className="border-l-2 border-[var(--bm-brand)] pl-5 text-base leading-7 text-[var(--bm-text)] sm:text-lg">{content.contact.supporting}</p>
          </aside>
          <TechnologyContactForm apiBaseUrl={apiBaseUrl} copy={content.contact.form} locale={locale} privacyHref={`/${locale}/privacy`} />
        </div>
      </Container>
    </main>
  );
}
