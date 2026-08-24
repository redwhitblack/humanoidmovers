import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/fleet", "/operations", "/live", "/coverage", "/company", "/dispatch"];
  return routes.map((path) => ({
    url: `https://humanoidmovers.com${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
