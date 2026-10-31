"use client";

import { useEffect, useRef, type ReactNode } from "react";

type TechnologyHomeMotionProps = {
  children: ReactNode;
};

export function TechnologyHomeMotion({ children }: TechnologyHomeMotionProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootElement = root.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!rootElement || reducedMotion.matches) {
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const target = entry.target as HTMLElement;
          target.style.setProperty("--technology-reveal-delay", `${target.dataset.technologyRevealDelay ?? "0"}ms`);
          target.dataset.technologyRevealed = "true";
          revealObserver.unobserve(target);
        }
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    const revealTargets = rootElement.querySelectorAll<HTMLElement>("[data-technology-reveal]");
    revealTargets.forEach((target) => revealObserver.observe(target));

    const hero = rootElement.querySelector<HTMLElement>("[data-technology-hero]");
    const heroMedia = rootElement.querySelector<HTMLElement>("[data-technology-hero-media]");
    let frameId: number | undefined;

    const updateParallax = () => {
      frameId = undefined;

      if (!hero || !heroMedia) {
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const centerOffset = (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / window.innerHeight;
      const movement = Math.max(-14, Math.min(14, centerOffset * 28));
      const scrollProgress = Math.max(0, Math.min(1, -bounds.top / bounds.height));
      heroMedia.style.setProperty("--technology-hero-parallax-y", `${movement.toFixed(2)}px`);
      heroMedia.style.setProperty("--technology-hero-scroll-scale", `${(1.065 - scrollProgress * 0.045).toFixed(3)}`);
    };

    const requestParallaxUpdate = () => {
      if (frameId === undefined) {
        frameId = window.requestAnimationFrame(updateParallax);
      }
    };

    updateParallax();
    window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestParallaxUpdate);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", requestParallaxUpdate);
      window.removeEventListener("resize", requestParallaxUpdate);

      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
