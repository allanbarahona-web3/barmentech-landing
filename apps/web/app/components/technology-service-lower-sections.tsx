import { ActionLink } from "@barmentech/ui";
import type { CSSProperties } from "react";

import type { Locale } from "../lib/i18n";
import { getTechnologyServicePath, type ServicePageContent, type TechnologyRailCard, type TechnologyServiceId } from "../lib/technology-content";

type RelatedService = TechnologyRailCard & { serviceId: TechnologyServiceId };

const relatedServiceThemes: Record<TechnologyServiceId, { accent: string; border: string; surface: string }> = {
  "web-development": {
    accent: "#b96548",
    border: "#e8d5cd",
    surface: "#fffaf8",
  },
  "custom-software": {
    accent: "#315d98",
    border: "#d4e0f0",
    surface: "#f8fbff",
  },
  automation: {
    accent: "#42826c",
    border: "#d0e1da",
    surface: "#f8fcfa",
  },
};

export function TechnologyRelatedServices({ locale, services, title }: { locale: Locale; services: RelatedService[]; title: string }) {
  return (
    <section aria-labelledby="related-services-title" className="border-t border-[var(--bm-border-strong)] pt-12 sm:pt-16">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="related-services-title">{title}</h2>
      <nav aria-label={title} className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
        {services.map((service) => {
          const theme = relatedServiceThemes[service.serviceId];
          const navigation = service.relatedNavigation;

          if (!navigation) {
            return null;
          }

          const style = {
            "--related-service-accent": theme.accent,
            "--related-service-border": theme.border,
            "--related-service-surface": theme.surface,
          } as CSSProperties;

          return <a className="related-service-card group relative grid min-h-[18rem] overflow-hidden rounded-[var(--bm-radius-panel)] border bg-white p-6 transition-[background-color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bm-focus)] motion-reduce:transition-none sm:min-h-[20rem] sm:p-7 lg:grid-cols-[minmax(0,1.65fr)_minmax(9rem,0.85fr)] lg:items-center lg:gap-6 lg:p-8" href={getTechnologyServicePath(locale, service.serviceId)} key={service.id} style={style}>
            <div className="relative z-10 flex h-full flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--related-service-accent)]">{navigation.category}</p>
              <h3 className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-[1.7rem] sm:leading-[1.14]">{navigation.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-[var(--bm-text-muted)] sm:text-base sm:leading-7">{navigation.description}</p>
              <span className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-sm font-semibold text-[var(--related-service-accent)]"><span>{navigation.action}</span><span aria-hidden="true" className="related-service-card__arrow">→</span></span>
            </div>
            <RelatedServiceMotif service={service.serviceId} />
          </a>;
        })}
      </nav>
    </section>
  );
}

function RelatedServiceMotif({ service }: { service: TechnologyServiceId }) {
  if (service === "web-development") {
    return <div aria-hidden="true" className="related-service-motif related-service-motif--web">
      <span className="related-service-motif__browser" />
      <span className="related-service-motif__desktop" />
      <span className="related-service-motif__mobile" />
      <span className="related-service-motif__node" />
    </div>;
  }

  if (service === "custom-software") {
    return <div aria-hidden="true" className="related-service-motif related-service-motif--systems">
      <span className="related-service-motif__module related-service-motif__module--one" />
      <span className="related-service-motif__module related-service-motif__module--two" />
      <span className="related-service-motif__module related-service-motif__module--three" />
      <span className="related-service-motif__hub" />
    </div>;
  }

  return <div aria-hidden="true" className="related-service-motif related-service-motif--automation">
    <span className="related-service-motif__route" />
    <span className="related-service-motif__route-node related-service-motif__route-node--one" />
    <span className="related-service-motif__route-node related-service-motif__route-node--two" />
    <span className="related-service-motif__route-node related-service-motif__route-node--three" />
    <span className="related-service-motif__signal" />
  </div>;
}

export function TechnologyServiceCta({ cta, eyebrow, locale }: { cta: ServicePageContent["cta"]; eyebrow: string; locale: Locale }) {
  return (
    <section aria-labelledby="service-contact-title" className="mt-16 overflow-hidden rounded-[var(--bm-radius-panel)] bg-[#0b2c58] px-6 py-12 text-white sm:mt-20 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl" id="service-contact-title">{cta.title}</h2>
        <p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">{cta.body}</p>
        <ActionLink className="mt-8 border-white bg-white text-[#0b2c58] hover:border-[#dcecff] hover:bg-[#dcecff] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2c58]" href={`/${locale}/contact`} variant="secondary">{cta.label}</ActionLink>
      </div>
    </section>
  );
}
