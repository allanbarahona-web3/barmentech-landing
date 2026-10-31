import { ActionLink, Container } from "@barmentech/ui";

import { TechnologyHomeMotion } from "./technology-home-motion";
import { TechnologyServiceRail } from "./technology-service-rail";
import type { Locale } from "../lib/i18n";
import { getTechnologyFormationUrl } from "../lib/public-settings";
import { getTechnologyContent } from "../lib/technology-content";

export function TechnologyHome({ locale }: { locale: Locale }) {
  const content = getTechnologyContent(locale);
  const scrollCueLabel = locale === "en" ? "Explore technology services" : "Explorar servicios de tecnología";

  return (
    <TechnologyHomeMotion>
      <main id="main-content">
      <section className="sticky top-14 z-0 isolate overflow-hidden border-b border-[#31527a] bg-[#041a36] text-white" data-technology-hero>
        <picture aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 block overflow-hidden">
          <source height="1402" media="(max-width: 639px)" srcSet="/images/barmentech-technology-digital-founder-mobile.webp" type="image/webp" width="1122" />
          <img alt="" className="technology-hero-media absolute -inset-[4%] h-[108%] w-[108%] max-w-none object-cover object-[10%_50%] sm:object-[65%_0%]" data-technology-hero-media decoding="async" fetchPriority="high" height="940" sizes="100vw" src="/images/barmentech-technology-digital-founder-desktop.webp" width="1672" />
        </picture>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(2,16,36,0.97)_0%,rgba(2,16,36,0.88)_43%,rgba(2,16,36,0.38)_72%,rgba(2,16,36,0.1)_100%)] sm:bg-[linear-gradient(90deg,rgba(2,16,36,0.96)_0%,rgba(2,16,36,0.9)_34%,rgba(2,16,36,0.48)_57%,rgba(2,16,36,0.08)_100%)]" />
        <HeroParticles />
        <Container className="relative z-10 flex min-h-[42rem] items-start px-5 py-14 sm:min-h-[44rem] sm:px-8 sm:py-20 lg:min-h-[48rem] lg:items-center lg:py-20">
          <div className="max-w-[44rem] motion-safe:animate-[technology-hero-enter_520ms_ease-out_both]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{content.hero.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl sm:leading-[1.01] lg:text-[clamp(3.8rem,4.5vw,5rem)]">{content.hero.title}</h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-10">
              <ActionLink className="focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#041a36]" href={`/${locale}/contact`}>{content.hero.primaryLabel}</ActionLink>
              <a className="inline-flex min-h-[var(--bm-control-height)] items-center justify-center gap-2 rounded-[var(--bm-radius-control)] border border-white/65 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="#services">
                {content.hero.secondaryLabel}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </Container>
        <Container className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-5 pb-5 sm:px-8 sm:pb-6">
          <a aria-label={scrollCueLabel} className="technology-hero-scroll-cue pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/55 bg-[#061d3b]/45 text-2xl leading-none text-white/95 transition-colors hover:border-white hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="#services">
            <span aria-hidden="true">↓</span>
          </a>
        </Container>
      </section>

      <div className="relative z-10 bg-white">
      <section aria-label={content.services.title} className="technology-scroll-reveal border-b border-[var(--bm-border)] bg-white" data-technology-reveal>
        <Container className="px-5 py-5 sm:px-8 sm:py-6">
          <ul className="grid gap-px overflow-hidden rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-[var(--bm-border)] sm:grid-cols-2 lg:grid-cols-4">
            {content.capabilities.map((capability) => (
              <li className="bg-white px-4 py-4 text-sm font-semibold text-[var(--bm-text)] sm:px-5" key={capability}>
                <span aria-hidden="true" className="mr-3 inline-block h-2 w-2 rounded-full bg-[var(--bm-brand)]" />
                {capability}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <section aria-labelledby="technology-value-title" className="technology-scroll-reveal grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16" data-technology-reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{content.hero.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="technology-value-title">{content.value.title}</h2>
          </div>
          <div className="border-l-2 border-[var(--bm-brand)] pl-6 sm:pl-8">
            <p className="text-lg leading-8 text-[var(--bm-text-muted)]">{content.value.body}</p>
            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {content.value.points.map((point) => <li className="border-t border-[var(--bm-border)] pt-3 text-sm leading-6 text-[var(--bm-text)]" key={point}>{point}</li>)}
            </ul>
          </div>
        </section>

        <TechnologyServiceRail
          cards={content.services.items}
          introduction={content.services.introduction}
          labels={content.services}
          locale={locale}
          title={content.services.title}
        />

        <section aria-labelledby="technology-maintenance-title" className="technology-scroll-reveal mt-20 overflow-hidden rounded-[var(--bm-radius-panel)] bg-[#0b2c58] px-6 py-10 text-white sm:mt-28 sm:px-10 sm:py-14 lg:px-14 lg:py-16" data-technology-reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{content.hero.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl" id="technology-maintenance-title">{content.maintenance.title}</h2>
            </div>
            <div>
              <p className="text-base leading-7 text-white/80 sm:text-lg">{content.maintenance.body}</p>
              <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {content.maintenance.items.map((item) => <li className="border-t border-white/20 py-3 text-sm leading-6 text-white/90" key={item}>{item}</li>)}
              </ul>
              <a className="mt-8 inline-flex min-h-[var(--bm-control-height)] items-center rounded-[var(--bm-radius-control)] border border-white/45 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-[#0b2c58] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href={`/${locale}/contact`}>
                {content.maintenance.contactLabel}<span aria-hidden="true" className="ml-2">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="how-we-work-title" className="mt-20 sm:mt-28" id="how-we-work">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="how-we-work-title">{content.process.title}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{content.process.introduction}</p>
          </div>
          <ol className="relative mt-10 grid gap-7 border-l border-[var(--bm-border-strong)] pl-6 sm:pl-8 lg:grid-cols-5 lg:gap-6 lg:border-l-0 lg:pl-0">
            <span aria-hidden="true" className="absolute left-[1.25rem] right-0 top-[1.25rem] hidden border-t border-[var(--bm-border-strong)] lg:block" />
            {content.process.steps.map((step, index) => (
              <li className="technology-scroll-reveal relative" data-technology-reveal data-technology-reveal-delay={index * 65} key={step.title}>
                <span className="relative z-10 inline-flex h-10 w-10 -translate-x-[2.25rem] items-center justify-center rounded-full bg-[var(--bm-brand)] text-sm font-semibold text-white lg:translate-x-0">{String(index + 1).padStart(2, "0")}</span>
                <div className="-mt-2 lg:mt-5">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)]">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-6 text-[var(--bm-text-muted)]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="technology-company-title" className="technology-scroll-reveal mt-20 grid gap-8 border-y border-[var(--bm-border)] py-12 sm:mt-28 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16" data-technology-reveal>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="technology-company-title">{content.company.title}</h2>
          <div>
            <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{content.company.body}</p>
            <a className="mt-6 inline-flex rounded-sm text-sm font-semibold text-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bm-focus)]" href={getTechnologyFormationUrl(locale)}>{content.company.formationLabel}<span aria-hidden="true" className="ml-2">↗</span></a>
          </div>
        </section>

        <section aria-labelledby="technology-contact-title" className="technology-scroll-reveal mt-20 overflow-hidden rounded-[var(--bm-radius-panel)] bg-[#0b2c58] px-6 py-12 text-white sm:mt-28 sm:px-10 sm:py-16 lg:px-14 lg:py-20" data-technology-reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{content.hero.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl" id="technology-contact-title">{content.finalCta.title}</h2>
            <p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">{content.finalCta.body}</p>
            <a className="mt-8 inline-flex min-h-[var(--bm-control-height)] items-center rounded-[var(--bm-radius-control)] bg-white px-4 py-2 text-sm font-semibold text-[#0b2c58] transition-colors hover:bg-[#dcecff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href={`/${locale}/contact`}>
              {content.finalCta.label}<span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>
        </section>
      </Container>
      </div>
      </main>
    </TechnologyHomeMotion>
  );
}

function HeroParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <span className="technology-hero-particle left-[46%] top-[17%] h-1.5 w-1.5" />
      <span className="technology-hero-particle left-[55%] top-[28%] h-1 w-1" />
      <span className="technology-hero-particle left-[64%] top-[14%] h-2 w-2" />
      <span className="technology-hero-particle left-[73%] top-[31%] h-1.5 w-1.5" />
      <span className="technology-hero-particle left-[82%] top-[22%] h-1 w-1" />
      <span className="technology-hero-particle left-[52%] top-[49%] h-1 w-1" />
      <span className="technology-hero-particle left-[62%] top-[57%] h-2 w-2" />
      <span className="technology-hero-particle left-[71%] top-[48%] h-1.5 w-1.5" />
      <span className="technology-hero-particle left-[86%] top-[54%] h-1 w-1" />
      <span className="technology-hero-particle left-[49%] top-[72%] h-1.5 w-1.5" />
      <span className="technology-hero-particle left-[67%] top-[76%] h-1 w-1" />
      <span className="technology-hero-particle left-[80%] top-[68%] h-2 w-2" />
    </div>
  );
}

