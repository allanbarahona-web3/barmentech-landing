import { NextResponse, type NextRequest } from "next/server";

import { isLocale, type Locale } from "./app/lib/i18n";

function preferredLocale(request: NextRequest): Locale {
  const acceptedLanguages = request.headers.get("accept-language")?.toLowerCase() ?? "";

  return acceptedLanguages.startsWith("es") ? "es" : "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${preferredLocale(request)}`, request.url));
  }

  const locale = pathname.split("/")[1];
  const requestHeaders = new Headers(request.headers);

  if (isLocale(locale)) {
    requestHeaders.set("x-barmentech-locale", locale);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/", "/en/:path*", "/es/:path*"],
};
