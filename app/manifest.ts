import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SV Tours & Travels",
    short_name: "SV Tours",
    description: "Cab service in Pune: local, outstation, airport transfers and tour packages.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#0d2255",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/og-logo.png", sizes: "1024x1024", type: "image/png" }],
  };
}
