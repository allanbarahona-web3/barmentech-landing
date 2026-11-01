"use client";

import { Container } from "@barmentech/ui";
import { useEffect, useRef, useState } from "react";

type ProcessStep = {
  body: string;
  title: string;
};

type TechnologyProcessCycleProps = {
  eyebrow: string;
  introduction: string;
  steps: ProcessStep[];
  title: string;
};

const rotationInterval = 4800;

export function TechnologyProcessCycle({ eyebrow, introduction, steps, title }: TechnologyProcessCycleProps) {
  const section = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const sectionElement = section.current;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(motionQuery.matches);

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    if (!sectionElement) {
      return () => motionQuery.removeEventListener("change", updateMotionPreference);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!hasEntered || reducedMotion || steps.length < 2) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveStep((currentStep) => (currentStep + 1) % steps.length);
    }, rotationInterval);

    return () => window.clearTimeout(timeoutId);
  }, [activeStep, hasEntered, reducedMotion, steps.length]);

  return (
    <section aria-labelledby="how-we-work-title" className="technology-process-band mt-16 bg-[#0b2c58] text-white sm:mt-20" data-technology-process={hasEntered ? "entered" : undefined} ref={section}>
      <Container className="px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9fc5ff]">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl" id="how-we-work-title">{title}</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg">{introduction}</p>
            <span aria-hidden="true" className="mt-8 block h-px w-12 bg-[#9fc5ff]" />
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="technology-process-viewport relative aspect-square w-full max-w-[28rem] text-[var(--bm-text)]">
              <div className="h-full">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;

                  return (
                    <article aria-hidden={!isActive} className="technology-process-stage flex h-full flex-col justify-center rounded-[var(--bm-radius-panel)] border border-white/20 bg-white p-6 shadow-[0_1.25rem_3.5rem_rgb(1_19_42_/_0.2)] sm:p-8" data-active={isActive || undefined} key={step.title}>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--bm-text)] sm:text-3xl">{step.title}</h3>
                      <p className="mt-4 text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg">{step.body}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
