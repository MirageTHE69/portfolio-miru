import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/services", priority: 0.9 },
    { path: "/ai-automation", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
  ];

  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.path}`,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
