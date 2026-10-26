import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";

import "./globals.css";
import { isLocale } from "./lib/i18n";

export const metadata: Metadata = {
  title: "Barmentech Technology",
  description: "Barmentech Technology is under development.",
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
