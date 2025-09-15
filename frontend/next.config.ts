import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains:[
      "framerusercontent.com",
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
