import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";

import "./globals.css";
import { isLocale } from "./lib/i18n";
import { formationSiteOrigin } from "./lib/seo";

export const metadata: Metadata = {
  metadataBase: formationSiteOrigin,
  title: {
    default: "Barmentech Formation",
    template: "%s | Barmentech Formation",
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-barmentech-locale");
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
