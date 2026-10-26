import Link from "next/link";
import { ActionLink, Container } from "@barmentech/ui";

import { getMessages, isLocale, locales } from "../lib/i18n";

type FormationHomePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function FormationHomePage({ params }: FormationHomePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return null;
  }

  const locale = localeParam;
  const messages = getMessages(locale);

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-slate-900 sm:py-24">
      <Container>
        <section className="mx-auto max-w-2xl space-y-8 text-center" id="development-status">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            {messages.applicationName}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {messages.applicationName}
          </h1>
          <p className="text-lg leading-8 text-slate-600">{messages.developmentStatus}</p>
          <nav aria-label={messages.languageLabel} className="flex justify-center gap-3 text-sm font-medium">
            {locales.map((supportedLocale) => (
              <Link
                aria-current={locale === supportedLocale ? "page" : undefined}
                className={locale === supportedLocale ? "text-blue-700 underline underline-offset-4" : "text-slate-600 hover:text-slate-950"}
                href={`/${supportedLocale}`}
                key={supportedLocale}
              >
                {supportedLocale.toUpperCase()}
              </Link>
            ))}
          </nav>
          <div>
            <ActionLink href="#development-status">{messages.sharedAction}</ActionLink>
          </div>
        </section>
      </Container>
    </main>
  );
}
