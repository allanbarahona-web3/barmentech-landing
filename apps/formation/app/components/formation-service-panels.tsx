"use client";

import { useEffect, useState } from "react";

type FormationService = {
  description: string;
  qualifier?: string;
  title: string;
};

type FormationServicePanel = {
  image: string;
  services: FormationService[];
  title: string;
};

type FormationServicePanelsProps = {
  panels: FormationServicePanel[];
  selectLabel: string;
  selectedLabel: string;
};

export function FormationServicePanels({ panels, selectLabel, selectedLabel }: FormationServicePanelsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (leavingIndex === null) {
      return;
    }

    const timeout = window.setTimeout(() => setLeavingIndex(null), 240);
    return () => window.clearTimeout(timeout);
  }, [leavingIndex]);

  function selectPanel(panelIndex: number) {
    if (panelIndex === activeIndex) {
      return;
    }

    setLeavingIndex(activeIndex);
    setActiveIndex(panelIndex);
  }

  return (
    <div className="lg:grid lg:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)] lg:items-stretch lg:gap-12 xl:gap-16">
      <div className="relative lg:min-h-[28rem]">
        {panels.map((panel, panelIndex) => {
          const isActive = activeIndex === panelIndex;
          const isLeaving = leavingIndex === panelIndex;
          const controlId = `formation-services-panel-control-${panelIndex}`;
          const contentId = `formation-services-panel-content-${panelIndex}`;

          return (
            <section aria-hidden={!isActive} aria-labelledby={controlId} className={`rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-white p-6 shadow-[0_12px_34px_rgb(18_32_51/8%)] transition-[clip-path,opacity,transform] duration-300 ease-out motion-reduce:transition-none sm:p-8 lg:absolute lg:inset-0 ${isActive ? "relative translate-x-0 opacity-100 [clip-path:inset(0)]" : isLeaving ? "absolute inset-0 pointer-events-none -translate-x-3 opacity-0 [clip-path:inset(0_100%_0_0)]" : "absolute inset-0 pointer-events-none invisible translate-x-3 opacity-0 [clip-path:inset(0_0_0_100%)]"}`} id={contentId} key={panel.title}>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bm-brand)]">{String(panelIndex + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] sm:text-3xl">{panel.title}</h3>
              <div className="mt-6 space-y-5">
                {panel.services.map((service) => (
                  <article key={service.title}>
                    <h4 className="text-base font-semibold text-[var(--bm-text)]">{service.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[var(--bm-text-muted)] sm:text-base sm:leading-7">{service.description}</p>
                    {service.qualifier ? <p className="mt-3 border-l-2 border-[var(--bm-brand)] pl-4 text-sm font-medium leading-6 text-[var(--bm-text)]">{service.qualifier}</p> : null}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-2 lg:mt-0 lg:h-[28rem] lg:flex-row lg:overflow-hidden" role="group">
        {panels.map((panel, panelIndex) => {
          const isActive = activeIndex === panelIndex;
          const controlId = `formation-services-panel-control-${panelIndex}`;
          const contentId = `formation-services-panel-content-${panelIndex}`;

          return (
            <button
              aria-controls={contentId}
              aria-expanded={isActive}
              className={`group relative flex min-h-20 w-full origin-left overflow-hidden rounded-[var(--bm-radius-panel)] border text-left transition-[flex-basis,flex-grow,border-color,min-height] duration-500 ease-in-out focus-visible:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] motion-reduce:transition-none lg:min-h-0 lg:min-w-0 lg:w-auto ${isActive ? "min-h-64 basis-0 grow border-[var(--bm-brand)] lg:min-h-0" : "basis-16 grow-0 border-[var(--bm-border)] hover:border-[var(--bm-brand)]"}`}
              id={controlId}
              key={panel.title}
              onClick={() => selectPanel(panelIndex)}
              type="button"
            >
              <img alt="" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out motion-reduce:transition-none ${isActive ? "scale-100" : "scale-110 grayscale-[15%]"}`} height={1402} loading={panelIndex === 0 ? "eager" : "lazy"} src={panel.image} width={1122} />
              <span className={`absolute inset-0 transition-colors duration-300 motion-reduce:transition-none ${isActive ? "bg-[linear-gradient(180deg,rgb(10_31_59/10%)_20%,rgb(10_31_59/82%)_100%)]" : "bg-[rgb(10_31_59/48%)] group-hover:bg-[rgb(10_31_59/34%)]"}`} />
              <span className="relative flex h-full w-full flex-col justify-between p-4 text-white">
                <span className="text-xs font-semibold tracking-[0.16em] text-white/85">{String(panelIndex + 1).padStart(2, "0")}</span>
                <span className={`text-sm font-semibold leading-5 transition-[opacity,transform] duration-200 motion-reduce:transition-none ${isActive ? "translate-y-0 opacity-100 sm:text-base" : "[writing-mode:vertical-rl] rotate-180 opacity-100"}`}>{panel.title}</span>
                <span className="sr-only">{isActive ? selectedLabel : selectLabel}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
