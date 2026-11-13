import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://svtourstravel.com";
  return ["", "/services", "/fleet", "/booking", "/contact", "/terms", "/privacy", "/refund"].map((p) => ({
    url: base + p,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/booking" ? 0.9 : 0.7,
  }));
}
