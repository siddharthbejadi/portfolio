import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Enable edge runtime globally (this works on Cloudflare Pages)
  runtime: "edge",

  // ✅ Enable Server Actions
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // ✅ Your existing image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
