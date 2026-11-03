"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "../lib/i18n";
import { getTechnologyServicePath, type TechnologyRailCard } from "../lib/technology-content";

type ServiceRailLabels = {
  backLabel: string;
  discussNeedLabel: string;
  exploreServiceLabel: string;
  nextLabel: string;
  previousLabel: string;
  viewDetailsLabel: string;
};

type TechnologyServiceRailProps = {
  cards: TechnologyRailCard[];
  introduction: string;
  labels: ServiceRailLabels;
  locale: Locale;
  title: string;
};

const headerOffset = 56;

export function TechnologyServiceRail({ cards, introduction, labels, locale, title }: TechnologyServiceRailProps) {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const syncingFromPage = useRef(false);
  const controlState = useRef({ activeCard: 0, canGoNext: true, canGoPrevious: false });
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [canGoPrevious, setCanGoPrevious] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  useEffect(() => {
    const sectionElement = section.current;
    const viewportElement = viewport.current;
    const trackElement = track.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let frameId: number | undefined;

    if (!sectionElement || !viewportElement || !trackElement) {
      return;
    }

    const getMaximumOffset = () => Math.max(0, viewportElement.scrollWidth - viewportElement.clientWidth);

    const updateControls = () => {
      const maximumOffset = getMaximumOffset();
      const nextActiveCard = Math.min(
        cards.length - 1,
        Math.max(0, Math.round(viewportElement.scrollLeft / getCardStep(trackElement))),
      );

      const nextCanGoPrevious = viewportElement.scrollLeft > 2;
      const nextCanGoNext = viewportElement.scrollLeft < maximumOffset - 2;
      const currentState = controlState.current;

      if (currentState.canGoPrevious !== nextCanGoPrevious) {
        currentState.canGoPrevious = nextCanGoPrevious;
        setCanGoPrevious(nextCanGoPrevious);
      }

      if (currentState.canGoNext !== nextCanGoNext) {
        currentState.canGoNext = nextCanGoNext;
        setCanGoNext(nextCanGoNext);
      }

      if (currentState.activeCard !== nextActiveCard) {
        currentState.activeCard = nextActiveCard;
        setActiveCard(nextActiveCard);
      }
    };

    const updateFromPage = () => {
      frameId = undefined;

      if (!desktop.matches || reducedMotion.matches) {
        return;
      }

      const maximumOffset = getMaximumOffset();
      const stickyHeight = Math.max(1, window.innerHeight - headerOffset);
      const availableTravel = Math.max(1, sectionElement.offsetHeight - stickyHeight);
      const sectionStart = window.scrollY + sectionElement.getBoundingClientRect().top;
      const progress = clamp((window.scrollY - (sectionStart - headerOffset)) / availableTravel, 0, 1);

      syncingFromPage.current = true;
      viewportElement.scrollLeft = maximumOffset * progress;
      updateControls();
      window.requestAnimationFrame(() => {
        syncingFromPage.current = false;
      });
    };

    const requestPageUpdate = () => {
      if (frameId === undefined) {
        frameId = window.requestAnimationFrame(updateFromPage);
      }
    };

    const updateLayout = () => {
      const shouldPin = desktop.matches && !reducedMotion.matches && getMaximumOffset() > 0;
      sectionElement.toggleAttribute("data-technology-rail-pinned", shouldPin);
      sectionElement.style.setProperty("--technology-rail-travel", `${Math.ceil(shouldPin ? getMaximumOffset() : 0)}px`);
      updateControls();
      requestPageUpdate();
    };

    const onRailScroll = () => {
      updateControls();

      if (!desktop.matches || reducedMotion.matches || syncingFromPage.current) {
        return;
      }

      const maximumOffset = getMaximumOffset();
      const stickyHeight = Math.max(1, window.innerHeight - headerOffset);
      const availableTravel = Math.max(1, sectionElement.offsetHeight - stickyHeight);
      const sectionStart = window.scrollY + sectionElement.getBoundingClientRect().top;
      const targetScroll = sectionStart - headerOffset + availableTravel * (viewportElement.scrollLeft / maximumOffset);

      window.scrollTo({ top: targetScroll, behavior: "auto" });
    };

    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(viewportElement);
    resizeObserver.observe(trackElement);
    viewportElement.addEventListener("scroll", onRailScroll, { passive: true });
    window.addEventListener("scroll", requestPageUpdate, { passive: true });
    window.addEventListener("resize", updateLayout);
    desktop.addEventListener("change", updateLayout);
    reducedMotion.addEventListener("change", updateLayout);

    updateLayout();

    return () => {
      resizeObserver.disconnect();
      viewportElement.removeEventListener("scroll", onRailScroll);
      window.removeEventListener("scroll", requestPageUpdate);
      window.removeEventListener("resize", updateLayout);
      desktop.removeEventListener("change", updateLayout);
      reducedMotion.removeEventListener("change", updateLayout);

      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [cards.length]);

  const moveByCard = (direction: -1 | 1) => {
    const sectionElement = section.current;
    const viewportElement = viewport.current;
    const trackElement = track.current;

    if (!sectionElement || !viewportElement || !trackElement) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches && !reducedMotion;
    const maximumOffset = Math.max(0, viewportElement.scrollWidth - viewportElement.clientWidth);
    const targetOffset = clamp(
      Math.round(viewportElement.scrollLeft / getCardStep(trackElement) + direction) * getCardStep(trackElement),
      0,
      maximumOffset,
    );

    if (!desktop) {
      viewportElement.scrollTo({ left: targetOffset, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }

    const stickyHeight = Math.max(1, window.innerHeight - headerOffset);
    const availableTravel = Math.max(1, sectionElement.offsetHeight - stickyHeight);
    const sectionStart = window.scrollY + sectionElement.getBoundingClientRect().top;
    const targetScroll = sectionStart - headerOffset + availableTravel * (targetOffset / maximumOffset);

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const closeCard = (cardId: string, restoreFocus = false) => {
    setOpenCard((currentCard) => currentCard === cardId ? null : currentCard);

    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRefs.current.get(cardId)?.focus());
    }
  };

  return (
    <section aria-labelledby="technology-services-title" className="technology-service-rail-section mt-10 sm:mt-12" id="services" ref={section}>
      <div className="technology-service-rail-sticky">
        <div className="technology-scroll-reveal flex flex-wrap items-end justify-between gap-6" data-technology-reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id="technology-services-title">{title}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{introduction}</p>
          </div>
          <div className="flex items-center gap-2" role="group">
            <button aria-label={labels.previousLabel} className="technology-service-rail-control" disabled={!canGoPrevious} onClick={() => moveByCard(-1)} type="button">
              <span aria-hidden="true">←</span>
            </button>
            <span aria-live="polite" className="sr-only">{activeCard + 1} / {cards.length}</span>
            <button aria-label={labels.nextLabel} className="technology-service-rail-control" disabled={!canGoNext} onClick={() => moveByCard(1)} type="button">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="technology-service-rail-viewport mt-10" ref={viewport}>
          <div className="technology-service-rail-track" ref={track}>
            {cards.map((card) => {
              const isOpen = openCard === card.id;
              const href = card.serviceId ? getTechnologyServicePath(locale, card.serviceId) : `/${locale}/contact`;
              const ctaLabel = card.serviceId ? labels.exploreServiceLabel : labels.discussNeedLabel;
              const detailsId = `technology-service-${card.id}-details`;

              return (
                <article className="technology-service-rail-card" data-flipped={isOpen || undefined} key={card.id} onKeyDown={(event) => {
                  if (event.key === "Escape" && isOpen) {
                    event.preventDefault();
                    closeCard(card.id, true);
                  }
                }}>
                  <div className="technology-service-rail-card-inner">
                    <div aria-hidden={isOpen || undefined} className="technology-service-rail-face technology-service-rail-front" inert={isOpen || undefined}>
                      <div className="technology-service-rail-image relative overflow-hidden bg-[#dcecff]">
                        <Image alt="" className="h-full w-full object-cover" fill sizes="(min-width: 1280px) 19rem, (min-width: 768px) 36vw, 82vw" src={card.image} />
                      </div>
                      <div className="flex flex-1 flex-col bg-white px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
                        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--bm-text)]">{card.title}</h3>
                        <button aria-controls={detailsId} aria-expanded={isOpen} className="technology-service-details-button mt-auto pt-6" onClick={() => setOpenCard(card.id)} ref={(element) => {
                          if (element) {
                            triggerRefs.current.set(card.id, element);
                          }
                        }} type="button">
                          {labels.viewDetailsLabel}<span aria-hidden="true">↗</span>
                        </button>
                      </div>
                    </div>

                    <div aria-hidden={!isOpen} className="technology-service-rail-face technology-service-rail-back" id={detailsId} inert={!isOpen || undefined}>
                      <div className="flex h-full flex-col bg-[#082a55] p-6 text-white sm:p-7">
                        <p className="text-2xl font-semibold tracking-[-0.03em]">{card.title}</p>
                        <ul className="mt-6 space-y-3 text-sm leading-6 text-white/85">
                          {card.capabilities.map((capability) => <li className="flex gap-3" key={capability}><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9fc5ff]" />{capability}</li>)}
                        </ul>
                        <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                          <button className="technology-service-back-button" onClick={() => closeCard(card.id, true)} type="button">{labels.backLabel}</button>
                          <a className="technology-service-back-link" href={href}>{ctaLabel}<span aria-hidden="true">↗</span></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <noscript>
                    <div className="technology-service-rail-noscript">
                      <p className="font-semibold">{card.title}</p>
                      <ul>{card.capabilities.map((capability) => <li key={capability}>{capability}</li>)}</ul>
                      <a href={href}>{ctaLabel}</a>
                    </div>
                  </noscript>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function getCardStep(track: HTMLDivElement) {
  const firstCard = track.firstElementChild as HTMLElement | null;
  const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || "0");

  return Math.max(1, (firstCard?.getBoundingClientRect().width ?? 1) + gap);
}
