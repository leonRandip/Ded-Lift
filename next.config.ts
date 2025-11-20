import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.spoonacular.com",
      },
    ],
    unoptimized: false,
  },
  // Disable static optimization for API routes to prevent compilation issues
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
