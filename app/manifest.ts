import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SV Tours & Travels",
    short_name: "SV Tours",
    description: "Cab service in Pune: local, outstation, airport transfers and tour packages.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8faf4",
    theme_color: "#06425c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
