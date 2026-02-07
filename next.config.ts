import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
