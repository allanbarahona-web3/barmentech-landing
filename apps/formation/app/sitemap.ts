import type { MetadataRoute } from "next";

import { formationUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: formationUrl("/en") },
    { url: formationUrl("/es") },
  ];
}
