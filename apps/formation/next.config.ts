import type { NextConfig } from "next";

import { getFormationApiBaseUrl } from "./app/lib/public-settings";

const isProduction = process.env.NODE_ENV === "production";
const apiBaseUrl = getFormationApiBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL,
  process.env.NODE_ENV,
);
const apiConnectOrigin = apiBaseUrl ? new URL(apiBaseUrl).origin : undefined;
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  `connect-src 'self'${apiConnectOrigin ? ` ${apiConnectOrigin}` : ""}${isProduction ? "" : " ws:"}`,
  "object-src 'none'",
  "worker-src 'self' blob:",
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  async headers() {
    const headers = [
      { key: "Content-Security-Policy", value: contentSecurityPolicy },
      { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
    ];

    if (isProduction) {
      headers.push({ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" });
    }

    return [
      {
        headers,
        source: "/:path*",
      },
    ];
  },
  transpilePackages: ["@barmentech/ui"],
  experimental: {
    useTypeScriptCli: false,
  },
};

export default nextConfig;
