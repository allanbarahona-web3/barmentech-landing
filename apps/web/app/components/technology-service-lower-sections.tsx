import { ActionLink } from "@barmentech/ui";
import type { CSSProperties } from "react";

import type { Locale } from "../lib/i18n";
import { getTechnologyPublicSettings } from "../lib/public-settings";
import { getTechnologyContent, getTechnologyServicePath, type ServicePageContent, type TechnologyRailCard, type TechnologyServiceId } from "../lib/technology-content";

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
  const gridClassName = services.length > 2 ? "mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" : "mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6";
  const cardSpanClassName = services.length > 2 ? "sm:last:col-span-2 lg:last:col-span-1" : "";

  return (
    <section aria-labelledby="related-services-title" className="border-t border-[var(--bm-border-strong)] pt-12 sm:pt-16">
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="related-services-title">{title}</h2>
      <nav aria-label={title} className={gridClassName}>
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

          return <a className={`related-service-card group relative flex min-h-60 flex-col overflow-hidden rounded-[var(--bm-radius-panel)] border bg-white p-6 transition-[background-color,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bm-focus)] motion-reduce:transition-none sm:p-7 ${cardSpanClassName}`} href={getTechnologyServicePath(locale, service.serviceId)} key={service.id} style={style}>
            <div className="relative z-10 flex h-full max-w-[20rem] flex-col pr-10 sm:pr-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--related-service-accent)]">{navigation.category}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-[1.65rem] sm:leading-[1.14]">{navigation.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--bm-text-muted)]">{navigation.description}</p>
              <span className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-[var(--related-service-accent)]"><span>{navigation.action}</span><span aria-hidden="true" className="related-service-card__arrow">→</span></span>
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
      <span className="related-service-motif__frame" />
      <span className="related-service-motif__small-frame" />
    </div>;
  }

  if (service === "custom-software") {
    return <div aria-hidden="true" className="related-service-motif related-service-motif--systems">
      <span className="related-service-motif__module" />
      <span className="related-service-motif__module" />
      <span className="related-service-motif__module" />
      <span className="related-service-motif__hub" />
    </div>;
  }

  return <div aria-hidden="true" className="related-service-motif related-service-motif--automation">
    <span className="related-service-motif__route" />
    <span className="related-service-motif__route-node" />
    <span className="related-service-motif__route-node" />
    <span className="related-service-motif__route-node" />
    <span className="related-service-motif__signal" />
  </div>;
}

export function TechnologyServiceCta({ cta, eyebrow, locale }: { cta: ServicePageContent["cta"]; eyebrow: string; locale: Locale }) {
  const contact = getTechnologyContent(locale).contact;
  const bookingUrl = getTechnologyPublicSettings().bookingUrl;
  const callAction = contact.form.callRequest.action;
  const callHref = bookingUrl ?? `/${locale}/contact?intent=call`;

  return (
    <section aria-labelledby="service-contact-title" className="mt-16 overflow-hidden rounded-[var(--bm-radius-panel)] bg-[#0b2c58] px-6 py-12 text-white sm:mt-20 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl" id="service-contact-title">{cta.title}</h2>
        <p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">{cta.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ActionLink className="w-full border-white bg-white !text-[#0b2c58] hover:border-[#dcecff] hover:bg-[#dcecff] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2c58] sm:w-auto" href={`/${locale}/contact`} variant="secondary">{cta.label}</ActionLink>
          <ActionLink aria-label={bookingUrl ? `${callAction} (${contact.booking.newTab})` : callAction} className="w-full border-[#e4edf7] !bg-[#e4edf7] !text-[#0b2c58] hover:border-white hover:!bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2c58] sm:w-auto" href={callHref} rel={bookingUrl ? "noopener noreferrer" : undefined} target={bookingUrl ? "_blank" : undefined} variant="secondary">{callAction}</ActionLink>
        </div>
      </div>
    </section>
  );
}
