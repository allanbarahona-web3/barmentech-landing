import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getTechnologyContent, getTechnologyServicePath, type TechnologyRailCard, type TechnologyServiceId } from "../lib/technology-content";

export function TechnologyServicePage({ locale, service }: { locale: Locale; service: TechnologyServiceId }) {
  const content = getTechnologyContent(locale);
  const page = content.servicePages[service];
  const relatedServices = content.services.items.filter(
    (item): item is TechnologyRailCard & { serviceId: TechnologyServiceId } => item.serviceId !== undefined && item.serviceId !== service,
  );

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

        <section aria-labelledby="service-needs-title" className="mt-20 border-y border-[var(--bm-border)] py-12 sm:mt-28 sm:py-16">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-needs-title">{page.needs.title}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.needs.items.map((item) => <li className="border-l-2 border-[var(--bm-brand)] pl-4 text-base leading-7 text-[var(--bm-text-muted)]" key={item}>{item}</li>)}
          </ul>
        </section>

        <section aria-labelledby="service-engagement-title" className="mt-20 sm:mt-28">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-4xl" id="service-engagement-title">{page.engagement.title}</h2>
          <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.engagement.items.map((item, index) => <li className="border-t border-[var(--bm-border-strong)] pt-5" key={item}><p className="text-sm font-semibold tabular-nums text-[var(--bm-brand)]">{String(index + 1).padStart(2, "0")}</p><p className="mt-3 text-base leading-7 text-[var(--bm-text-muted)]">{item}</p></li>)}
          </ol>
        </section>

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
