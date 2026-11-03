"use client";

import { useId, useState } from "react";

type FaqItem = {
  answer: string;
  question: string;
};

export function TechnologyFaq({ items, title }: { items: FaqItem[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idPrefix = useId();

  return (
    <section aria-labelledby={`${idPrefix}-title`} className="border-t border-[var(--bm-border-strong)] pt-12 sm:pt-16">
      <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[var(--bm-text)] sm:text-4xl" id={`${idPrefix}-title`}>{title}</h2>
      <div className="mt-8 border-t border-[var(--bm-border)]">
        {items.map((item, index) => {
          const panelId = `${idPrefix}-panel-${index}`;
          const triggerId = `${idPrefix}-trigger-${index}`;
          const isOpen = openIndex === index;

          return (
            <div className="border-b border-[var(--bm-border)]" key={item.question}>
              <h3>
                <button aria-controls={panelId} aria-expanded={isOpen} className="group flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold tracking-[-0.02em] text-[var(--bm-text)] outline-none transition-colors duration-150 hover:text-[var(--bm-brand)] focus-visible:ring-2 focus-visible:ring-[var(--bm-focus)] focus-visible:ring-inset motion-reduce:transition-none sm:py-6 sm:text-xl" id={triggerId} onClick={() => setOpenIndex(isOpen ? null : index)} type="button">
                  <span>{item.question}</span>
                  <span aria-hidden="true" className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--bm-border-strong)] text-[var(--bm-brand)] transition-transform duration-150 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}>
                    <span className="absolute h-px w-3 bg-current" />
                    <span className="absolute h-3 w-px bg-current" />
                  </span>
                </button>
              </h3>
              <div aria-labelledby={triggerId} className={isOpen ? "block pb-6 pr-12 sm:pb-7" : "hidden"} id={panelId} role="region">
                <p className="max-w-3xl text-base leading-7 text-[var(--bm-text-muted)] sm:text-lg sm:leading-8">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
