import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { works } from "@/lib/work";

const pages = ["", "/about", "/projects", "/experience", "/skills", "/certifications", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...works.map((w) => ({ url: `${site.url}/projects/${w.slug}` })),
  ];
}
