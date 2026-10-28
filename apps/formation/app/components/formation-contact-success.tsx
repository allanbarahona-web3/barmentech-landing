import { ActionLink } from "@barmentech/ui";
import type { RefObject } from "react";

import type { FormationContactContent } from "../lib/site";

type FormationContactSuccessProps = {
  copy: FormationContactContent["successPanel"];
  headingRef: RefObject<HTMLHeadingElement | null>;
  homeHref: string;
  whatsappUrl?: string;
};

export function FormationContactSuccess({
  copy,
  headingRef,
  homeHref,
  whatsappUrl,
}: FormationContactSuccessProps) {
  return (
    <section
      aria-labelledby="contact-success-title"
      className="self-start rounded-[var(--bm-radius-panel)] border border-[#c9dcf6] bg-white p-5 shadow-[0_10px_28px_rgb(18_32_51/7%)] sm:p-6"
      role="status"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 animate-[contact-success-breathe_2.7s_ease-in-out_infinite] items-center justify-center rounded-full bg-[#e6f5ea] text-[#157347] shadow-[0_2px_8px_rgb(21_115_71/18%)] motion-reduce:animate-none">
          <svg fill="none" height="20" viewBox="0 0 24 24" width="20">
            <path d="m7.5 12 3 3 6-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)] focus:outline-none sm:text-2xl" id="contact-success-title" ref={headingRef} tabIndex={-1}>
            {copy.heading}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--bm-text-muted)]">{copy.introduction}</p>
        </div>
      </div>

      <div className="mt-5 border-t border-[var(--bm-border)] pt-4">
        <h3 className="text-base font-semibold text-[var(--bm-text)]">{copy.nextStepsHeading}</h3>
        <ol className="mt-3 space-y-2 pl-5 text-sm leading-6 text-[var(--bm-text-muted)] marker:font-semibold marker:text-[var(--bm-brand)]">
          {copy.nextSteps.map((step) => (
            <li className="pl-1" key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <p className="mt-5 border-l-2 border-[#157347] pl-3 text-sm leading-5 text-[var(--bm-text-muted)]">{copy.supportingNote}</p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <ActionLink className="w-full sm:w-auto" href={homeHref}>
          {copy.homeAction}
        </ActionLink>
        {whatsappUrl ? (
          <ActionLink className="w-full sm:w-auto" href={whatsappUrl} rel="noopener noreferrer" target="_blank" variant="secondary">
            {copy.whatsappAction}
          </ActionLink>
        ) : null}
      </div>
    </section>
  );
}
