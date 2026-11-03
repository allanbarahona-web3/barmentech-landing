import { ActionLink, Container } from "@barmentech/ui";
import Image from "next/image";

import { TechnologyFaq } from "./technology-faq";
import { TechnologyRelatedServices, TechnologyServiceCta } from "./technology-service-lower-sections";
import type { Locale } from "../lib/i18n";
import { getTechnologyContent, type TechnologyRailCard, type TechnologyServiceId } from "../lib/technology-content";

export function TechnologyAboutPage({ locale }: { locale: Locale }) {
  const content = getTechnologyContent(locale);
  const about = content.about;
  const services = content.services.items.filter(
    (item): item is TechnologyRailCard & { serviceId: TechnologyServiceId } => item.serviceId !== undefined,
  );

  return (
    <main id="main-content">
      <section className="border-b border-[var(--bm-border)] bg-[var(--bm-surface-subtle)]">
        <Container className="grid gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end lg:gap-16 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{about.hero.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-balance text-[var(--bm-text)] sm:text-6xl lg:text-[clamp(3.5rem,5vw,5.2rem)]">{about.hero.title}</h1>
            <p className="mt-6 max-w-[62ch] text-pretty text-lg leading-8 text-[var(--bm-text-muted)] sm:text-justify sm:text-xl sm:leading-9">{about.hero.body}</p>
            <ActionLink className="mt-8" href={`/${locale}/contact`}>{about.hero.label}</ActionLink>
            <p className="mt-8 max-w-[68ch] border-t border-[var(--bm-border-strong)] pt-4 text-pretty text-sm leading-6 text-[var(--bm-text-muted)] sm:text-base">{about.hero.trustLine}</p>
          </div>
          <div aria-hidden="true" className="hidden h-32 self-end lg:grid lg:grid-cols-4 lg:items-end lg:gap-3">
            {["bottom-[20%]", "bottom-[40%]", "bottom-[58%]", "top-3"].map((position) => <span className="relative block h-full border-l border-[var(--bm-border-strong)]" key={position}><span className={`absolute left-[-0.35rem] h-2.5 w-2.5 rounded-full border border-[var(--bm-brand)] bg-[var(--bm-surface-subtle)] ${position}`} /></span>)}
          </div>
        </Container>
      </section>

      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <section aria-labelledby="about-perspective-title" className="grid gap-10 border-b border-[var(--bm-border-strong)] pb-16 sm:pb-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{about.perspective.eyebrow}</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] text-balance text-[var(--bm-text)] sm:text-4xl sm:leading-[1.08]" id="about-perspective-title">{about.perspective.title}</h2>
          </div>
          <div className="max-w-[62ch] space-y-6 text-pretty text-base leading-7 text-[var(--bm-text-muted)] sm:text-justify sm:text-lg sm:leading-8">
            <p>{about.perspective.body}</p>
            <p className="border-l-2 border-[var(--bm-brand)] pl-5 text-[var(--bm-text)]">{about.perspective.detail}</p>
          </div>
        </section>

        <section aria-labelledby="about-founder-title" className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(18rem,5fr)_minmax(0,6fr)] lg:items-center lg:gap-20 lg:py-28">
          <div className="relative aspect-[2/3] overflow-hidden rounded-[var(--bm-radius-panel)] border border-[var(--bm-border-strong)] bg-[var(--bm-surface-subtle)]">
            <Image alt={about.founder.alt} className="object-cover object-[50%_top]" fill sizes="(min-width: 1024px) 38vw, (min-width: 640px) 68vw, calc(100vw - 2.5rem)" src="/images/barmentech-founder-allan-barahona.webp" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{about.founder.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-balance text-[var(--bm-text)] sm:text-4xl sm:leading-[1.08]" id="about-founder-title">{about.founder.title}</h2>
            <div className="mt-7 border-l-2 border-[var(--bm-brand)] pl-5">
              <p className="text-lg font-semibold text-[var(--bm-text)]">{about.founder.name}</p>
              <p className="mt-1 text-sm text-[var(--bm-text-muted)]">{about.founder.role}</p>
            </div>
            <div className="mt-8 max-w-[62ch] space-y-5 text-pretty text-base leading-7 text-[var(--bm-text-muted)] sm:text-justify sm:text-lg sm:leading-8">
              {about.founder.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section aria-labelledby="about-method-title" className="border-y border-[var(--bm-border-strong)] py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{about.method.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-balance text-[var(--bm-text)] sm:text-4xl sm:leading-[1.08]" id="about-method-title">{about.method.title}</h2>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {about.method.stages.map((stage, index) => <li className="min-w-0 border border-[var(--bm-border-strong)] bg-white p-6 sm:p-7" key={stage.title}>
              <p className="text-3xl font-semibold tracking-[-0.05em] text-[var(--bm-brand)]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-pretty text-[var(--bm-text)]">{stage.title}</h3>
              <p className="mt-4 text-pretty text-sm leading-6 text-[var(--bm-text-muted)]">{stage.body}</p>
            </li>)}
          </ol>
        </section>

        <section aria-labelledby="about-presence-title" className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{about.presence.eyebrow}</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] text-balance text-[var(--bm-text)] sm:text-4xl sm:leading-[1.08]" id="about-presence-title">{about.presence.title}</h2>
          </div>
          <div className="max-w-[62ch]">
            <p className="text-pretty text-base leading-7 text-[var(--bm-text-muted)] sm:text-justify sm:text-lg sm:leading-8">{about.presence.body}</p>
            <ul className="mt-8 grid border-t border-[var(--bm-border-strong)] sm:grid-cols-2" role="list">
              {about.presence.details.map((detail) => <li className="border-b border-[var(--bm-border)] py-4 pr-5 text-sm font-medium leading-6 text-[var(--bm-text)]" key={detail}>{detail}</li>)}
            </ul>
          </div>
        </section>

        <section aria-labelledby="about-business-context-title" className="border-y border-[var(--bm-border)] bg-[var(--bm-surface-subtle)] px-6 py-10 sm:px-10 sm:py-12 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-12">
          <h2 className="max-w-md text-2xl font-semibold tracking-[-0.035em] text-balance text-[var(--bm-text)] sm:text-3xl" id="about-business-context-title">{about.broaderBusiness.title}</h2>
          <p className="mt-5 max-w-[62ch] text-pretty text-base leading-7 text-[var(--bm-text-muted)] sm:text-justify lg:mt-0 sm:text-lg sm:leading-8">{about.broaderBusiness.body}</p>
        </section>

        <div className="mt-16 sm:mt-24">
          <TechnologyRelatedServices locale={locale} services={services} title={about.servicesTitle} />
        </div>
        <div className="mt-16 sm:mt-24">
          <TechnologyFaq items={about.faq.items} title={about.faq.title} />
        </div>
        <TechnologyServiceCta cta={about.cta} eyebrow={about.cta.eyebrow} locale={locale} />
      </Container>
    </main>
  );
}
