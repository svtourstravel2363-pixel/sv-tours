import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/account", "/login"] }, sitemap: "https://www.svtourstravel.com/sitemap.xml" };
}
