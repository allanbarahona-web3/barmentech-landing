import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@barmentech/ui"],
  experimental: {
    useTypeScriptCli: false,
  },
};

export default nextConfig;
