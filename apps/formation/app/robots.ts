import type { MetadataRoute } from "next";

import { formationSiteOrigin, formationUrl } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    host: formationSiteOrigin.origin,
    rules: [
      {
        allow: "/",
        userAgent: "*",
      },
      {
        allow: "/",
        userAgent: "OAI-SearchBot",
      },
    ],
    sitemap: formationUrl("/sitemap.xml"),
  };
}
