import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.svtourstravel.com";
  return ["", "/services", "/fleet", "/booking", "/car-rental", ...LOCATIONS.map((l) => `/car-rental/${l.slug}`), "/contact", "/terms", "/privacy", "/refund"].map((p) => ({
    url: base + p,
    lastModified: new Date(),
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/booking" || p === "/car-rental" ? 0.9 : p.startsWith("/car-rental/") ? 0.8 : 0.7,
  }));
}
