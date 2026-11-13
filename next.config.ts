import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/webp"] },
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
