import { ActionLink, Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";

type FormationHeroProps = {
  locale: Locale;
};

export function FormationHero({ locale }: FormationHeroProps) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-labelledby="formation-hero-title" className="relative flex flex-col overflow-hidden border-b border-[var(--bm-border)] lg:block lg:min-h-[calc(100svh-5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[62%] bg-[linear-gradient(90deg,rgb(255_255_255/0.88)_0%,rgb(255_255_255/0.72)_52%,rgb(255_255_255/0)_100%)] lg:block"
      />
      <Container className="relative z-20 order-1 flex w-full flex-col px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[calc(100svh-5rem)] lg:justify-center lg:py-16">
        <div className="max-w-xl space-y-6 lg:max-w-md xl:max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{copy.heroEyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-[var(--bm-text)] sm:text-5xl xl:text-[3.25rem] xl:leading-[1.04]" id="formation-hero-title">
            {copy.heroTitle}
          </h1>
          <p className="text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8 lg:text-base lg:leading-7">{copy.heroDescription}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-start">
            <ActionLink className="w-full sm:w-auto" href={`/${locale}/contact`}>
              {copy.heroPrimaryCta}
            </ActionLink>
            <ActionLink className="w-full sm:w-auto" href="#services" variant="secondary">
              {copy.heroSecondaryCta}
            </ActionLink>
          </div>
        </div>
      </Container>
      <picture className="relative z-0 order-2 block w-full lg:absolute lg:inset-0">
        <source media="(max-width: 1023px)" srcSet="/images/hero/formation-mobile.webp" type="image/webp" />
        <img
          alt={copy.heroAlt}
          className="h-auto w-full lg:h-full lg:object-cover lg:object-[58%_center]"
          decoding="async"
          fetchPriority="high"
          height={941}
          loading="eager"
          src="/images/hero/formation-desktop.webp"
          width={1672}
        />
      </picture>
    </section>
  );
}
