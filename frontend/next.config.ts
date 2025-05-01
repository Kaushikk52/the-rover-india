import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ["healthcarenation.in"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mjs$/,
      type: "javascript/auto",
    });
    return config;
  },
};

export default nextConfig;
