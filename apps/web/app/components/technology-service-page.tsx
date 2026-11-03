import { ActionLink, Container } from "@barmentech/ui";
import Image from "next/image";

import type { Locale } from "../lib/i18n";
import { getTechnologyContent, getTechnologyServicePath, type ServicePageContent, type TechnologyRailCard, type TechnologyServiceId } from "../lib/technology-content";

export function TechnologyServicePage({ locale, service }: { locale: Locale; service: TechnologyServiceId }) {
  const content = getTechnologyContent(locale);
  const page = content.servicePages[service];
  const relatedServices = content.services.items.filter(
    (item): item is TechnologyRailCard & { serviceId: TechnologyServiceId } => item.serviceId !== undefined && item.serviceId !== service,
  );

  if (page.presentation?.variant === "editorial") {
    return <EditorialServicePresentation locale={locale} page={page} presentation={page.presentation} relatedServices={relatedServices} relatedTitle={content.services.title} />;
  }

  if (page.presentation?.variant === "systems") {
    return <SystemServicePresentation locale={locale} page={page} presentation={page.presentation} relatedServices={relatedServices} relatedTitle={content.services.title} />;
  }

  return (
    <main id="main-content">
      <section className="border-b border-[var(--bm-border)] bg-[var(--bm-surface-subtle)]">
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{page.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-[var(--bm-text)] sm:text-6xl sm:leading-[1.04]">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{page.intro}</p>
        </Container>
      </section>

      <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <section aria-labelledby="service-build-title" className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-build-title">{page.build.title}</h2>
          </div>
          <div>
            <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.build.intro}</p>
            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {page.build.items.map((item) => <li className="border-t border-[var(--bm-border)] py-3 text-sm leading-6 text-[var(--bm-text)]" key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        {page.needs ? <section aria-labelledby="service-needs-title" className="mt-20 border-y border-[var(--bm-border)] py-12 sm:mt-28 sm:py-16">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-needs-title">{page.needs.title}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.needs.items.map((item) => <li className="border-l-2 border-[var(--bm-brand)] pl-4 text-base leading-7 text-[var(--bm-text-muted)]" key={item}>{item}</li>)}
          </ul>
        </section> : null}

        {page.engagement ? <section aria-labelledby="service-engagement-title" className="mt-20 sm:mt-28">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-engagement-title">{page.engagement.title}</h2>
          <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.engagement.items.map((item, index) => <li className="border-t border-[var(--bm-border-strong)] pt-5" key={item}><p className="text-sm font-semibold tabular-nums text-[var(--bm-brand)]">{String(index + 1).padStart(2, "0")}</p><p className="mt-3 text-base leading-7 text-[var(--bm-text-muted)]">{item}</p></li>)}
          </ol>
        </section> : null}

        <section aria-labelledby="service-maintenance-title" className="mt-20 bg-[var(--bm-surface-subtle)] px-6 py-10 sm:mt-28 sm:px-10 sm:py-14">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-maintenance-title">{page.maintenance.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.maintenance.body}</p>
        </section>

        <section aria-labelledby="related-services-title" className="mt-20 border-t border-[var(--bm-border)] pt-12 sm:mt-28 sm:pt-16">
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl" id="related-services-title">{content.services.title}</h2>
          <nav aria-label={content.services.title} className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {relatedServices.map((related) => <a className="rounded-sm text-sm font-semibold text-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bm-focus)]" href={getTechnologyServicePath(locale, related.serviceId)} key={related.id}>{related.title}</a>)}
          </nav>
        </section>

        <section aria-labelledby="service-contact-title" className="mt-20 border-l-2 border-[var(--bm-brand)] px-6 py-4 sm:mt-28 sm:px-8">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-contact-title">{page.cta.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.cta.body}</p>
          <ActionLink className="mt-7" href={`/${locale}/contact`}>{page.cta.label}</ActionLink>
        </section>
      </Container>
    </main>
  );
}

function SystemServicePresentation({ locale, page, presentation, relatedServices, relatedTitle }: {
  locale: Locale;
  page: ServicePageContent;
  presentation: Extract<NonNullable<ServicePageContent["presentation"]>, { variant: "systems" }>;
  relatedServices: Array<TechnologyRailCard & { serviceId: TechnologyServiceId }>;
  relatedTitle: string;
}) {
  const capabilityStyles = [
    { accent: "text-[#9fc5ff]", border: "border-[#315d98]", contentOnRight: false, imagePosition: "md:object-[68%_center]", overlay: "md:bg-[linear-gradient(90deg,rgba(3,18,38,0.95)_0%,rgba(3,18,38,0.85)_38%,rgba(3,18,38,0.28)_64%,rgba(3,18,38,0.03)_100%)]" },
    { accent: "text-[#ffc19d]", border: "border-[#a96845]", contentOnRight: true, imagePosition: "object-[35%_center] md:object-[50%_center]", overlay: "md:bg-[linear-gradient(270deg,rgba(43,22,17,0.95)_0%,rgba(43,22,17,0.85)_38%,rgba(43,22,17,0.28)_64%,rgba(43,22,17,0.03)_100%)]" },
    { accent: "text-[#a8e2ca]", border: "border-[#42826c]", contentOnRight: false, imagePosition: "object-[68%_center] md:object-[50%_center]", overlay: "md:bg-[linear-gradient(90deg,rgba(3,28,29,0.95)_0%,rgba(3,28,29,0.85)_38%,rgba(3,28,29,0.28)_64%,rgba(3,28,29,0.03)_100%)]" },
    { accent: "text-[#d0bdff]", border: "border-[#7a62aa]", contentOnRight: true, imagePosition: "md:object-[35%_center]", overlay: "md:bg-[linear-gradient(270deg,rgba(26,18,46,0.95)_0%,rgba(26,18,46,0.85)_38%,rgba(26,18,46,0.28)_64%,rgba(26,18,46,0.03)_100%)]" },
  ];

  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden border-b border-[#31527a] bg-[#041a36] text-white">
        <picture aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 block overflow-hidden">
          <source height="1402" media="(max-width: 639px)" srcSet="/images/barmentech-technology-motion-poster-mobile.webp" type="image/webp" width="1122" />
          <img alt="" className="h-full w-full object-cover object-center sm:object-[68%_50%]" decoding="async" fetchPriority="high" height="941" sizes="100vw" src="/images/barmentech-technology-motion-poster-desktop.webp" width="1672" />
        </picture>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(2,16,36,0.9)_0%,rgba(2,16,36,0.72)_38%,rgba(2,16,36,0.12)_76%)] sm:bg-[linear-gradient(90deg,rgba(2,16,36,0.9)_0%,rgba(2,16,36,0.74)_35%,rgba(2,16,36,0.32)_57%,rgba(2,16,36,0.04)_78%)]" />
        <Container className="relative z-10 flex min-h-[40rem] items-start px-5 py-14 sm:min-h-[clamp(38rem,48vw,45rem)] sm:px-8 sm:py-16 lg:items-center lg:py-20">
          <div className="max-w-[37rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{page.eyebrow}</p>
            <h1 className="mt-5 max-w-[37rem] text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-balance text-white sm:text-5xl lg:text-[clamp(3.25rem,4vw,4.5rem)]">{page.title}</h1>
            <ActionLink className="mt-8 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#041a36]" href={`/${locale}/contact`}>{presentation.heroCtaLabel}</ActionLink>
          </div>
        </Container>
      </section>

      <Container className="px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <section aria-labelledby="service-introduction-title" className="grid gap-6 border-b border-[var(--bm-border)] pb-12 sm:gap-8 sm:pb-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{page.eyebrow}</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="service-introduction-title">{presentation.introTitle}</h2>
            <span aria-hidden="true" className="mt-7 block h-px w-12 bg-[var(--bm-brand)]" />
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{page.intro}</p>
        </section>

        <section aria-labelledby="service-build-title" className="mt-14 sm:mt-16 lg:mt-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{page.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="service-build-title">{page.build.title}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{page.build.intro}</p>
          </div>

          <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
            {presentation.capabilities.map((capability, index) => {
              const style = capabilityStyles[index] ?? capabilityStyles[0];
              const headingId = `service-capability-${index + 1}`;
              const contentOnRight = style.contentOnRight;

              return <section aria-labelledby={headingId} className={`relative isolate min-h-[28rem] overflow-hidden rounded-[var(--bm-radius-panel)] border bg-[#071a33] md:min-h-[clamp(25rem,32vw,28.75rem)] ${style.border}`} key={capability.title}>
                <Image alt={capability.imageAlt} className={`object-cover object-center ${style.imagePosition}`} fill sizes="(max-width: 767px) 100vw, (max-width: 1280px) calc(100vw - 4rem), 72rem" src={capability.image} />
                <div aria-hidden="true" className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(3,18,38,0.88)_0%,rgba(3,18,38,0.8)_56%,rgba(3,18,38,0.48)_100%)] ${style.overlay}`} />
                <div className={`relative z-10 flex min-h-[28rem] items-end p-5 sm:p-8 md:min-h-[clamp(25rem,32vw,28.75rem)] md:items-center lg:p-10 ${contentOnRight ? "md:justify-end" : "md:justify-start"}`}>
                  <div className="max-w-xl">
                    <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${style.accent}`}>{capability.label}</p>
                    <span aria-hidden="true" className={`mt-3 block h-px w-10 bg-current sm:mt-4 ${style.accent}`} />
                    <h3 className="mt-4 max-w-lg text-[1.375rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:mt-5 sm:text-3xl sm:leading-normal" id={headingId}>{capability.title}</h3>
                    <p className="mt-3 max-w-xl text-[0.9375rem] leading-6 text-white/85 sm:mt-4 sm:text-lg sm:leading-8">{capability.body}</p>
                    <ul className="mt-5 space-y-2 border-t border-white/25 pt-4 text-sm leading-5 text-white/90 sm:mt-6 sm:space-y-2.5 sm:pt-5 sm:text-base sm:leading-6">
                      {capability.items.map((item) => <li className="flex gap-3" key={item}>
                        <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${style.accent}`} />
                        {item}
                      </li>)}
                    </ul>
                  </div>
                </div>
              </section>;
            })}
          </div>
        </section>

        {page.needs ? <section aria-labelledby="service-needs-title" className="mt-20 border-y border-[var(--bm-border)] py-12 sm:mt-28 sm:py-16">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-needs-title">{page.needs.title}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.needs.items.map((item) => <li className="border-l-2 border-[var(--bm-brand)] pl-4 text-base leading-7 text-[var(--bm-text-muted)]" key={item}>{item}</li>)}
          </ul>
        </section> : null}

        {page.engagement ? <section aria-labelledby="service-engagement-title" className="mt-20 sm:mt-28">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-engagement-title">{page.engagement.title}</h2>
          <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.engagement.items.map((item, index) => <li className="border-t border-[var(--bm-border-strong)] pt-5" key={item}><p className="text-sm font-semibold tabular-nums text-[var(--bm-brand)]">{String(index + 1).padStart(2, "0")}</p><p className="mt-3 text-base leading-7 text-[var(--bm-text-muted)]">{item}</p></li>)}
          </ol>
        </section> : null}

        <section aria-labelledby="service-maintenance-title" className="mt-20 bg-[var(--bm-surface-subtle)] px-6 py-10 sm:mt-28 sm:px-10 sm:py-14">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-maintenance-title">{page.maintenance.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.maintenance.body}</p>
        </section>

        <section aria-labelledby="related-services-title" className="mt-20 border-t border-[var(--bm-border)] pt-12 sm:mt-28 sm:pt-16">
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl" id="related-services-title">{relatedTitle}</h2>
          <nav aria-label={relatedTitle} className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {relatedServices.map((related) => <a className="rounded-sm text-sm font-semibold text-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bm-focus)]" href={getTechnologyServicePath(locale, related.serviceId)} key={related.id}>{related.title}</a>)}
          </nav>
        </section>

        <section aria-labelledby="service-contact-title" className="mt-20 border-l-2 border-[var(--bm-brand)] px-6 py-4 sm:mt-28 sm:px-8">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-contact-title">{page.cta.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.cta.body}</p>
          <ActionLink className="mt-7" href={`/${locale}/contact`}>{page.cta.label}</ActionLink>
        </section>
      </Container>
    </main>
  );
}

function EditorialServicePresentation({ locale, page, presentation, relatedServices, relatedTitle }: {
  locale: Locale;
  page: ServicePageContent;
  presentation: Extract<NonNullable<ServicePageContent["presentation"]>, { variant: "editorial" }>;
  relatedServices: Array<TechnologyRailCard & { serviceId: TechnologyServiceId }>;
  relatedTitle: string;
}) {
  return (
    <main id="main-content">
      <section className="border-b border-[#31527a] bg-[#041a36] text-white">
        <Container className="grid gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{page.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl sm:leading-[1.04]">{page.title}</h1>
            <ActionLink className="mt-8 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#041a36]" href={`/${locale}/contact`}>{page.cta.label}</ActionLink>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--bm-radius-panel)] border border-white/15 bg-[#0b2c58] shadow-[0_1.5rem_3.5rem_rgb(1_14_32_/_0.3)] sm:aspect-[16/11]">
            <Image alt="" className="object-cover object-center" fill preload sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1280px) 48vw, 34rem" src={presentation.heroImage} />
          </div>
        </Container>
      </section>

      <Container className="px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <section aria-labelledby="service-build-title">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{page.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="service-build-title">{page.build.title}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.build.intro}</p>
          </div>
          <div className="mt-14 space-y-16 sm:mt-16 sm:space-y-20 lg:mt-20 lg:space-y-24">
            {presentation.blocks.map((block, index) => {
              const imageOnRight = index % 2 === 1;
              const headingId = `service-build-block-${index + 1}`;

              return (
                <section aria-labelledby={headingId} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20" key={block.title}>
                  <div className={`relative aspect-[4/3] overflow-hidden rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-[var(--bm-surface-subtle)] sm:aspect-[16/10] ${imageOnRight ? "lg:order-2" : ""}`}>
                    <Image alt={block.imageAlt} className="object-cover" fill sizes="(max-width: 1023px) calc(100vw - 2.5rem), (max-width: 1280px) 42vw, 34rem" src={block.image} />
                  </div>
                  <div className="lg:px-2 xl:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{block.eyebrow}</p>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-3xl" id={headingId}>{block.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{block.body}</p>
                    <ul className="mt-7 border-t border-[var(--bm-border)]">
                      {block.items.map((item) => <li className="flex gap-3 border-b border-[var(--bm-border)] py-3 text-sm leading-6 text-[var(--bm-text)] sm:text-base" key={item}>
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bm-brand)]" />
                        {item}
                      </li>)}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section aria-labelledby="service-engagement-title" className="mt-20 border-t border-[var(--bm-border-strong)] pt-12 sm:mt-24 sm:pt-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="service-engagement-title">{presentation.process.title}</h2>
            {presentation.process.introduction ? <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{presentation.process.introduction}</p> : null}
          </div>
          <div className="relative mt-10">
            <div aria-hidden="true" className="absolute top-1.5 right-0 left-0 hidden border-t border-[var(--bm-border-strong)] lg:block" />
            <ol className="grid gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-8">
              {presentation.process.stages.map((stage, index) => <li className="relative border-l border-[var(--bm-border-strong)] pl-5 lg:border-l-0 lg:pl-0 lg:pt-8" key={stage.title}>
                <p className="relative z-10 w-fit bg-white pr-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--bm-brand)]"><span aria-hidden="true" className="mr-2 tabular-nums text-[var(--bm-text-muted)]">{String(index + 1).padStart(2, "0")}</span>{stage.eyebrow}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em] text-[var(--bm-text)]">{stage.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--bm-text-muted)] sm:text-base sm:leading-7">{stage.body}</p>
              </li>)}
            </ol>
          </div>
        </section>

        <section aria-labelledby="service-maintenance-title" className="mt-16 border border-[#ceddf0] bg-[#f4f8fd] px-6 py-10 sm:mt-20 sm:px-10 sm:py-14 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{page.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="service-maintenance-title">{page.maintenance.title}</h2>
            <p className="mt-5 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.maintenance.body}</p>
          </div>
        </section>

        <section aria-labelledby="related-services-title" className="mt-16 border-t border-[var(--bm-border-strong)] pt-12 sm:mt-20 sm:pt-16">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="related-services-title">{relatedTitle}</h2>
          <nav aria-label={relatedTitle} className="mt-8 grid gap-4 sm:grid-cols-2">
            {relatedServices.map((related) => {
              const isAutomation = related.serviceId === "automation";
              const cardClasses = isAutomation
                ? "border-[#c7e4dc] bg-[#f3fbf8] hover:border-[#53a58f] hover:bg-[#edf9f5]"
                : "border-[#c9dcf6] bg-[#f4f9ff] hover:border-[#6ba2e7] hover:bg-[#eef6ff]";
              const accentClasses = isAutomation ? "bg-[#157347]" : "bg-[var(--bm-brand)]";
              const arrowClasses = isAutomation ? "text-[#157347]" : "text-[var(--bm-brand)]";

              return <a className={`group flex min-h-full flex-col border p-6 transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:[transform:translateY(-2px)] hover:[box-shadow:0_0.5rem_1.25rem_rgb(18_32_51/8%)] active:[transform:translateY(0)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] motion-reduce:transform-none motion-reduce:transition-none ${cardClasses}`} href={getTechnologyServicePath(locale, related.serviceId)} key={related.id}>
                <h3 className="text-xl font-semibold tracking-[-0.025em] text-[var(--bm-text)]">{related.title}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--bm-text-muted)]">
                  {related.capabilities.slice(0, 2).map((capability) => <li className="flex gap-3" key={capability}><span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accentClasses}`} />{capability}</li>)}
                </ul>
                <span aria-hidden="true" className={`mt-auto pt-6 text-sm font-semibold transition-transform duration-200 ease-out group-hover:[transform:translateX(4px)] motion-reduce:transition-none ${arrowClasses}`}>↗</span>
              </a>;
            })}
          </nav>
        </section>

        <section aria-labelledby="service-contact-title" className="mt-16 overflow-hidden rounded-[var(--bm-radius-panel)] bg-[#0b2c58] px-6 py-12 text-white sm:mt-20 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{page.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl" id="service-contact-title">{page.cta.title}</h2>
            <p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">{page.cta.body}</p>
            <ActionLink className="mt-8 border-white bg-white text-[#0b2c58] hover:border-[#dcecff] hover:bg-[#dcecff] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2c58]" href={`/${locale}/contact`} variant="secondary">{page.cta.label}</ActionLink>
          </div>
        </section>
      </Container>
    </main>
  );
}
