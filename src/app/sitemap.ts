import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { works } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    ...works.map((w) => ({ url: `${site.url}/work/${w.slug}` })),
  ];
}
