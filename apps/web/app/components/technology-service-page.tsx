import { ActionLink, Container } from "@barmentech/ui";
import Image from "next/image";
import type { CSSProperties } from "react";

import { AutomationCapabilityAnimations } from "./automation-capability-animations";
import { StickyShowcaseRelease } from "./sticky-showcase-release";
import { SystemWorkflowBorderAnimation } from "./system-workflow-border-animation";
import { TechnologyRelatedServices, TechnologyServiceCta } from "./technology-service-lower-sections";
import type { Locale } from "../lib/i18n";
import { getTechnologyContent, type ServicePageContent, type TechnologyRailCard, type TechnologyServiceId } from "../lib/technology-content";

export function TechnologyServicePage({ locale, service }: { locale: Locale; service: TechnologyServiceId }) {
  const content = getTechnologyContent(locale);
  const page = content.servicePages[service];
  const relatedServices = content.services.items.filter(
    (item): item is TechnologyRailCard & { serviceId: TechnologyServiceId } => item.serviceId !== undefined && item.serviceId !== service,
  );

  if (page.presentation?.variant === "editorial") {
    return <EditorialServicePresentation locale={locale} page={page} presentation={page.presentation} relatedServices={relatedServices} relatedTitle={content.services.relatedTitle} />;
  }

  if (page.presentation?.variant === "systems") {
    return <SystemServicePresentation locale={locale} page={page} presentation={page.presentation} relatedServices={relatedServices} relatedTitle={content.services.relatedTitle} />;
  }

  return (
    <main id="main-content">
      {page.heroImage ? <ServiceImageHero heroImage={page.heroImage} locale={locale} page={page} /> : <section className="border-b border-[var(--bm-border)] bg-[var(--bm-surface-subtle)]">
        <Container className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{page.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-[var(--bm-text)] sm:text-6xl sm:leading-[1.04]">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{page.intro}</p>
        </Container>
      </section>}

      <Container className={page.automationCapabilities ? "px-5 pb-16 sm:px-8 sm:pb-24 lg:pb-28" : "px-5 py-16 sm:px-8 sm:py-24 lg:py-28"}>
        {page.automationCapabilities ? <><AutomationCapabilityBridge items={page.automationCapabilities.bridge} /><AutomationCapabilitiesSection capabilities={page.automationCapabilities} /></> : page.build ? <section aria-labelledby="service-build-title" className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-build-title">{page.build.title}</h2>
          </div>
          <div>
            <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.build.intro}</p>
            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {page.build.items.map((item) => <li className="border-t border-[var(--bm-border)] py-3 text-sm leading-6 text-[var(--bm-text)]" key={item}>{item}</li>)}
            </ul>
          </div>
        </section> : null}

        {!page.automationCapabilities && page.needs ? <section aria-labelledby="service-needs-title" className="mt-20 border-y border-[var(--bm-border)] py-12 sm:mt-28 sm:py-16">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-needs-title">{page.needs.title}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.needs.items.map((item) => <li className="border-l-2 border-[var(--bm-brand)] pl-4 text-base leading-7 text-[var(--bm-text-muted)]" key={item}>{item}</li>)}
          </ul>
        </section> : null}

        {page.automationCapabilities ? <AutomationCustomerJourney journey={page.automationCapabilities.journey} /> : page.engagement ? <section aria-labelledby="service-engagement-title" className="mt-20 sm:mt-28">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-engagement-title">{page.engagement.title}</h2>
          <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.engagement.items.map((item, index) => <li className="border-t border-[var(--bm-border-strong)] pt-5" key={item}><p className="text-sm font-semibold tabular-nums text-[var(--bm-brand)]">{String(index + 1).padStart(2, "0")}</p><p className="mt-3 text-base leading-7 text-[var(--bm-text-muted)]">{item}</p></li>)}
          </ol>
        </section> : null}

        {!page.automationCapabilities && page.maintenance ? <section aria-labelledby="service-maintenance-title" className="mt-20 bg-[var(--bm-surface-subtle)] px-6 py-10 sm:mt-28 sm:px-10 sm:py-14">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-maintenance-title">{page.maintenance.title}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.maintenance.body}</p>
        </section> : null}

        <div className="mt-20 sm:mt-28">
          <TechnologyRelatedServices locale={locale} services={relatedServices} title={content.services.relatedTitle} />
        </div>
        <TechnologyServiceCta cta={page.cta} eyebrow={page.eyebrow} locale={locale} />
      </Container>
    </main>
  );
}

function ServiceImageHero({ heroImage, locale, page }: { heroImage: string; locale: Locale; page: ServicePageContent }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#31527a] bg-[#041a36] text-white">
      <Image alt="" className="object-cover object-[58%_center] sm:object-center" fill preload sizes="100vw" src={heroImage} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(2,16,36,0.96)_0%,rgba(2,16,36,0.9)_36%,rgba(2,16,36,0.5)_58%,rgba(2,16,36,0.12)_82%)] sm:bg-[linear-gradient(90deg,rgba(2,16,36,0.94)_0%,rgba(2,16,36,0.84)_34%,rgba(2,16,36,0.42)_58%,rgba(2,16,36,0.08)_82%)]" />
      <Container className="relative z-10 flex min-h-[40rem] items-start px-5 py-14 sm:min-h-[clamp(38rem,48vw,45rem)] sm:px-8 sm:py-16 lg:items-center lg:py-20">
        <div className="max-w-[36rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f3a36a]">{page.eyebrow}</p>
          <h1 className="mt-5 max-w-[36rem] text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-balance text-white sm:text-5xl lg:text-[clamp(3rem,3.4vw,4rem)]">{page.title}</h1>
          <ActionLink className="mt-8 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#041a36]" href={`/${locale}/contact`}>{page.cta.label}</ActionLink>
        </div>
      </Container>
    </section>
  );
}

function AutomationCapabilityBridge({ items }: { items: NonNullable<ServicePageContent["automationCapabilities"]>["bridge"] }) {
  return (
    <ol className="grid border-b border-[var(--bm-border-strong)] py-10 sm:grid-cols-3 sm:py-12">
      {items.map((item, index) => <li className={`flex min-w-0 gap-3 ${index > 0 ? "border-t border-[var(--bm-border)] pt-5 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0" : "sm:pr-6"} ${index === 0 ? "" : "mt-5 sm:mt-0"}`} key={item.label}>
        <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c96d3a]" />
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--bm-text-muted)]">{item.label}</p>
          <p className="mt-2 text-lg font-semibold leading-6 tracking-[-0.02em] text-[var(--bm-text)]">{item.statement}</p>
        </div>
      </li>)}
    </ol>
  );
}

function AutomationCustomerJourney({ journey }: { journey: NonNullable<ServicePageContent["automationCapabilities"]>["journey"] }) {
  return (
    <section aria-labelledby="automation-journey-title" className="mt-20 sm:mt-28">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{journey.eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl sm:leading-[1.08]" id="automation-journey-title">{journey.title}</h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{journey.introduction}</p>
      </div>

      <div aria-hidden="true" className="automation-journey-route relative mt-10 hidden lg:block">
        <span className="absolute top-3 right-[12.5%] left-[12.5%] h-px bg-[var(--bm-border-strong)]" />
        <div className="relative grid grid-cols-4">
          {journey.stages.map((stage) => <span className="flex justify-center" key={stage.title}><span className="h-6 w-6 rounded-full border border-[#c96d3a] bg-white" /></span>)}
        </div>
      </div>

      <ol className="relative mt-10 grid gap-5 before:absolute before:top-3 before:bottom-3 before:left-3 before:w-px before:bg-[var(--bm-border-strong)] sm:gap-6 lg:mt-6 lg:grid-cols-2 lg:before:hidden">
        {journey.stages.map((stage, index) => {
          const headingId = `automation-journey-stage-${index + 1}`;

          return <li className="relative pl-10 lg:pl-0" key={stage.title}>
            <span aria-hidden="true" className="absolute top-7 left-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#c96d3a] bg-white text-[0.625rem] font-semibold tabular-nums text-[#c96d3a] lg:hidden">{String(index + 1).padStart(2, "0")}</span>
            <article className="automation-journey-card h-full rounded-[1.5rem] border border-[var(--bm-border-strong)] bg-white p-6 sm:p-7 lg:min-h-[28rem] lg:p-8">
              <div className="flex items-start gap-4">
                <p className="text-4xl font-semibold leading-none tracking-[-0.05em] text-[#c96d3a] sm:text-5xl">{String(index + 1).padStart(2, "0")}</p>
                <p className="pt-1 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--bm-brand)]">{stage.label}</p>
              </div>
              <h3 className="mt-6 max-w-xl text-2xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-[1.7rem] sm:leading-[1.14]" id={headingId}>{stage.title}</h3>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--bm-text-muted)] sm:text-base sm:leading-7">{stage.explanation}</p>
              <div className="mt-6 border-t border-[var(--bm-border)] pt-5">
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--bm-text-muted)]">{stage.needsLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--bm-text)]">{stage.needs}</p>
                </div>
                <div className="mt-4 border-t border-[var(--bm-border)] pt-4">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--bm-text-muted)]">{stage.receivesLabel}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--bm-text)]">{stage.receives}</p>
                </div>
              </div>
            </article>
          </li>;
        })}
      </ol>

      <div className="automation-journey-support mt-10 grid gap-5 rounded-[var(--bm-radius-panel)] border p-6 sm:mt-12 sm:p-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16 lg:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--bm-brand)]">{journey.support.eyebrow}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-3xl">{journey.support.title}</h3>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[var(--bm-text-muted)] sm:text-base sm:leading-7">{journey.support.body}</p>
      </div>
    </section>
  );
}

function AutomationCapabilitiesSection({ capabilities }: { capabilities: NonNullable<ServicePageContent["automationCapabilities"]> }) {
  const panelStyles = [
    { accent: "bg-[#315d98]", accentHex: "#315d98", accentText: "text-[#315d98]", border: "border-[#315d98]/55", duration: "8s", surface: "bg-white", textOnRight: false, visual: "workflow" },
    { accent: "bg-[#42826c]", accentHex: "#42826c", accentText: "text-[#42826c]", border: "border-[#42826c]/55", duration: "9.5s", surface: "bg-white", textOnRight: true, visual: "messages" },
    { accent: "bg-[#a96845]", accentHex: "#a96845", accentText: "text-[#a96845]", border: "border-[#a96845]/55", duration: "10.5s", surface: "bg-white", textOnRight: false, visual: "knowledge" },
    { accent: "bg-[#7a62aa]", accentHex: "#7a62aa", accentText: "text-[#7a62aa]", border: "border-[#7a62aa]/55", duration: "8s", surface: "bg-white", textOnRight: true, visual: "integration" },
  ] as const;
  const sectionId = "automation-capabilities";

  return (
    <section aria-labelledby="automation-capabilities-title" className="-mx-5 border-b border-[var(--bm-border)] bg-white px-5 pt-12 pb-14 sm:-mx-8 sm:px-8 sm:pt-14 sm:pb-16 lg:px-12 lg:pt-16 lg:pb-20" data-automation-capabilities id={sectionId}>
      <AutomationCapabilityAnimations sectionId={sectionId} />
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{capabilities.eyebrow}</p>
        <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl sm:leading-[1.08]" id="automation-capabilities-title">{capabilities.title}</h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{capabilities.introduction}</p>
      </div>

      <ol className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
          {capabilities.blocks.map((block, index) => {
            const style = panelStyles[index] ?? panelStyles[0];
            const headingId = `automation-capability-${index + 1}`;
            const animationStyle = {
              "--automation-cycle-delay": `${index * 1.5}s`,
              "--automation-cycle-duration": style.duration,
              "--automation-entrance-delay": `${index * 90}ms`,
              "--automation-panel-accent": style.accentHex,
            } as CSSProperties;

            return <li className={`automation-capability-panel grid min-w-0 gap-8 border p-6 sm:p-8 lg:min-h-[25rem] lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,1fr)] lg:items-center lg:gap-10 lg:p-10 ${style.border} ${style.surface}`} data-automation-capability-panel data-automation-visible="false" key={block.title} style={animationStyle}>
              <div className={style.textOnRight ? "lg:order-2" : ""}>
                <div className="flex items-start justify-between gap-5">
                  <p className={`text-xs font-semibold uppercase tracking-[0.15em] ${style.accentText}`}>{block.label}</p>
                  <span aria-hidden="true" className={`mt-1 h-2 w-2 shrink-0 rounded-full ${style.accent}`} />
                </div>
                <h3 className="mt-5 max-w-xl text-2xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-[1.7rem] sm:leading-[1.14]" id={headingId}>{block.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--bm-text-muted)] sm:text-base sm:leading-7">{block.description}</p>
                <ul className="mt-6 max-w-2xl space-y-2.5 border-t border-[var(--bm-border)] pt-5 text-sm leading-6 text-[var(--bm-text)] sm:text-base">
                  {block.items.map((item) => <li className="flex gap-3" key={item}>
                    <span aria-hidden="true" className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${style.accent}`} />
                    {item}
                  </li>)}
                </ul>
              </div>
              <AutomationCapabilityVisual labels={capabilities.visualLabels[style.visual]} type={style.visual} visualFirst={style.textOnRight} />
            </li>;
          })}
      </ol>

      <div className="mt-10 grid gap-4 border-t border-[var(--bm-border-strong)] pt-7 sm:mt-12 sm:pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <h3 className="max-w-md text-2xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-3xl">{capabilities.closing.title}</h3>
        <p className="max-w-2xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{capabilities.closing.body}</p>
      </div>
    </section>
  );
}

function AutomationCapabilityVisual({ labels, type, visualFirst }: {
  labels: [string, string, string, string];
  type: "workflow" | "messages" | "knowledge" | "integration";
  visualFirst: boolean;
}) {
  return (
    <div aria-hidden="true" className={`automation-process automation-process--${type} ${visualFirst ? "lg:order-1" : ""}`}>
      <div className="automation-process__track">
        <span className="automation-process__connector" />
        {labels.map((label, index) => <div className={`automation-process__stage automation-process__stage--${index + 1}`} key={label}>
          <span className="automation-process__node">{index === 3 ? "✓" : null}</span>
          <span className="automation-process__label">{label}</span>
        </div>)}
        <span className="automation-process__signal" />
      </div>
      {type === "messages" ? <div className="automation-process__detail automation-process__detail--messages"><span /><span /><span /></div> : null}
      {type === "knowledge" ? <div className="automation-process__detail automation-process__detail--knowledge"><span className="automation-process__document"><i /><i /><i /></span><span className="automation-process__knowledge-node"><i /><i /><i /></span></div> : null}
      {type === "integration" ? <div className="automation-process__detail automation-process__detail--integration"><span /><span /><span /></div> : null}
    </div>
  );
}

function SystemServicePresentation({ locale, page, presentation, relatedServices, relatedTitle }: {
  locale: Locale;
  page: ServicePageContent;
  presentation: Extract<NonNullable<ServicePageContent["presentation"]>, { variant: "systems" }>;
  relatedServices: Array<TechnologyRailCard & { serviceId: TechnologyServiceId }>;
  relatedTitle: string;
}) {
  const build = page.build!;
  const capabilityStyles = [
    { accent: "text-[#9fc5ff]", border: "border-[#315d98]", contentOnRight: false, imagePosition: "md:object-[68%_center]", overlay: "md:bg-[linear-gradient(90deg,rgba(3,18,38,0.95)_0%,rgba(3,18,38,0.85)_38%,rgba(3,18,38,0.28)_64%,rgba(3,18,38,0.03)_100%)]" },
    { accent: "text-[#ffc19d]", border: "border-[#a96845]", contentOnRight: true, imagePosition: "object-[35%_center] md:object-[50%_center]", overlay: "md:bg-[linear-gradient(270deg,rgba(43,22,17,0.95)_0%,rgba(43,22,17,0.85)_38%,rgba(43,22,17,0.28)_64%,rgba(43,22,17,0.03)_100%)]" },
    { accent: "text-[#a8e2ca]", border: "border-[#42826c]", contentOnRight: false, imagePosition: "object-[68%_center] md:object-[50%_center]", overlay: "md:bg-[linear-gradient(90deg,rgba(3,28,29,0.95)_0%,rgba(3,28,29,0.85)_38%,rgba(3,28,29,0.28)_64%,rgba(3,28,29,0.03)_100%)]" },
    { accent: "text-[#d0bdff]", border: "border-[#7a62aa]", contentOnRight: true, imagePosition: "md:object-[35%_center]", overlay: "md:bg-[linear-gradient(270deg,rgba(26,18,46,0.95)_0%,rgba(26,18,46,0.85)_38%,rgba(26,18,46,0.28)_64%,rgba(26,18,46,0.03)_100%)]" },
  ];

  return (
    <main id="main-content">
      <StickyShowcaseRelease finalHeadingId={`service-capability-${presentation.capabilities.length}`} sectionHeadingId="service-build-title" />
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

      <Container className="px-5 pt-14 pb-8 sm:px-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-8">
        <section aria-labelledby="service-introduction-title" className="grid gap-6 border-b border-[var(--bm-border)] pb-12 sm:gap-8 sm:pb-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{page.eyebrow}</p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="service-introduction-title">{presentation.introTitle}</h2>
            <span aria-hidden="true" className="mt-7 block h-px w-12 bg-[var(--bm-brand)]" />
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[var(--bm-text-muted)] sm:text-xl sm:leading-9">{page.intro}</p>
        </section>

        <section aria-labelledby="service-build-title" className="mt-14 sm:mt-16 lg:mt-20">
          <div className="md:sticky md:top-20 md:z-[5] md:bg-white md:pb-6 md:data-[sticky-released=true]:static" data-sticky-editorial>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{page.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="service-build-title">{build.title}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{build.intro}</p>
            </div>
          </div>

          <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6 md:mt-4 md:pb-6">
            {presentation.capabilities.map((capability, index) => {
              const style = capabilityStyles[index] ?? capabilityStyles[0];
              const headingId = `service-capability-${index + 1}`;
              const contentOnRight = style.contentOnRight;
              const isFinalCapability = index === presentation.capabilities.length - 1;
              const stickyTopClass = isFinalCapability ? "md:top-20 md:-translate-y-6" : "md:top-[17rem]";
              const showcaseHeightClass = isFinalCapability ? "md:min-h-[clamp(27.5rem,35vw,31rem)]" : "md:min-h-[clamp(25rem,32vw,28.75rem)]";

              return <section aria-labelledby={headingId} className={`relative isolate min-h-[28rem] overflow-hidden rounded-[var(--bm-radius-panel)] border bg-[#071a33] md:sticky ${showcaseHeightClass} ${stickyTopClass} ${style.border}`} key={capability.title} style={{ zIndex: isFinalCapability ? 6 : index + 1 }}>
                <Image alt={capability.imageAlt} className={`object-cover object-center ${style.imagePosition}`} fill sizes="(max-width: 767px) 100vw, (max-width: 1280px) calc(100vw - 4rem), 72rem" src={capability.image} />
                <div aria-hidden="true" className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(3,18,38,0.88)_0%,rgba(3,18,38,0.8)_56%,rgba(3,18,38,0.48)_100%)] ${style.overlay}`} />
                <div className={`relative z-10 flex min-h-[28rem] items-end p-5 sm:p-8 ${showcaseHeightClass} md:items-center lg:p-10 ${contentOnRight ? "md:justify-end" : "md:justify-start"}`}>
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
      </Container>

      <SystemWorkflowSection maintenance={page.maintenance!} workflow={presentation.workflow} />

      <Container className="px-5 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20 lg:pt-16 lg:pb-24">
        <TechnologyRelatedServices locale={locale} services={relatedServices} title={relatedTitle} />
        <TechnologyServiceCta cta={page.cta} eyebrow={page.eyebrow} locale={locale} />
      </Container>
    </main>
  );
}

function SystemWorkflowSection({ maintenance, workflow }: {
  maintenance: NonNullable<ServicePageContent["maintenance"]>;
  workflow: Extract<NonNullable<ServicePageContent["presentation"]>, { variant: "systems" }>["workflow"];
}) {
  const sectionId = "system-workflow";

  return (
    <section aria-labelledby="system-workflow-title" className="bg-white" id={sectionId}>
      <SystemWorkflowBorderAnimation sectionId={sectionId} />
      <Container className="px-5 pt-12 pb-14 sm:px-8 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{workflow.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="system-workflow-title">{workflow.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{workflow.introduction}</p>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5" data-system-workflow-cards>
          {workflow.steps.map((step, index) => <li className="system-workflow-card relative overflow-hidden rounded-[var(--bm-radius-panel)] border border-[#315d98] bg-[#0d294c] p-6 shadow-[0_0.8rem_1.8rem_rgb(18_48_84_/_0.12)] sm:min-h-[15.5rem] sm:p-7" key={step.title}>
            <div className="relative z-10">
              <p className="text-sm font-semibold tabular-nums text-[#9fc5ff]">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{step.eyebrow}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">{step.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#c4d1e0] sm:text-base sm:leading-7">{step.body}</p>
            </div>
          </li>)}
        </ol>

        <div className="mt-10 grid gap-4 border-t border-[var(--bm-border-strong)] pt-7 sm:mt-12 sm:pt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{workflow.closingEyebrow}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-3xl" id="service-maintenance-title">{maintenance.title}</h3>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{maintenance.body}</p>
        </div>
      </Container>
    </section>
  );
}

function EditorialServicePresentation({ locale, page, presentation, relatedServices, relatedTitle }: {
  locale: Locale;
  page: ServicePageContent;
  presentation: Extract<NonNullable<ServicePageContent["presentation"]>, { variant: "editorial" }>;
  relatedServices: Array<TechnologyRailCard & { serviceId: TechnologyServiceId }>;
  relatedTitle: string;
}) {
  const build = page.build!;

  return (
    <main id="main-content">
      <section className="relative isolate overflow-hidden border-b border-[#31527a] bg-[#041a36] text-white">
        <Image alt="" className="object-cover object-[52%_62%] sm:object-[52%_58%] lg:object-[52%_62%]" fill preload sizes="100vw" src={presentation.heroImage} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(2,16,36,0.92)_0%,rgba(2,16,36,0.82)_36%,rgba(2,16,36,0.42)_70%,rgba(2,16,36,0.16)_100%)] sm:bg-[linear-gradient(90deg,rgba(2,16,36,0.94)_0%,rgba(2,16,36,0.84)_34%,rgba(2,16,36,0.42)_56%,rgba(2,16,36,0.08)_80%)]" />
        <Container className="relative z-10 flex min-h-[40rem] items-start px-5 py-14 sm:min-h-[clamp(38rem,48vw,45rem)] sm:px-8 sm:py-16 lg:items-center lg:py-20">
          <div className="max-w-[33rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{page.eyebrow}</p>
            <h1 className="mt-5 max-w-[33rem] text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-balance text-white sm:text-5xl lg:text-[clamp(3.25rem,4vw,4.5rem)]">{page.title}</h1>
            <ActionLink className="mt-8 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#041a36]" href={`/${locale}/contact`}>{page.cta.label}</ActionLink>
          </div>
        </Container>
      </section>

      <Container className="px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <section aria-labelledby="service-build-title">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{page.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="service-build-title">{build.title}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{build.intro}</p>
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
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="service-maintenance-title">{page.maintenance!.title}</h2>
            <p className="mt-5 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{page.maintenance!.body}</p>
          </div>
        </section>

        <div className="mt-16 sm:mt-20">
          <TechnologyRelatedServices locale={locale} services={relatedServices} title={relatedTitle} />
        </div>
        <TechnologyServiceCta cta={page.cta} eyebrow={page.eyebrow} locale={locale} />
      </Container>
    </main>
  );
}
