import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export static HTML for all pages so Pages can deploy static output
  output: 'export',
  reactStrictMode: true,

  // Server Actions are disabled to allow static export (output: 'export')
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
