import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use an absolute path for turbopack.root to avoid root/directory resolution issues
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
    ],
  },
};

export default nextConfig;
