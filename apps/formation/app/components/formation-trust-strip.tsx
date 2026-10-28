import { Container } from "@barmentech/ui";

import type { Locale } from "../lib/i18n";
import { getFormationLabels } from "../lib/site";

export function FormationTrustStrip({ locale }: { locale: Locale }) {
  const copy = getFormationLabels(locale);

  return (
    <section aria-label={copy.trustStripLabel} className="border-b border-[var(--bm-border)] bg-white">
      <Container className="px-5 py-5 sm:px-8 lg:py-6">
        <ul className="grid gap-x-6 gap-y-3 text-sm font-medium text-[var(--bm-text)] sm:grid-cols-2 lg:grid-cols-4">
          {copy.trustStripItems.map((item, index) => (
            <li className="flex items-center gap-3" key={item}>
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bm-brand)]" />
              {index === 3 ? <a className="rounded-sm underline decoration-[var(--bm-border-strong)] underline-offset-4 hover:text-[var(--bm-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="#pricing">{item}</a> : item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
