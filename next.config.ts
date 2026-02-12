import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    domains: [],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
