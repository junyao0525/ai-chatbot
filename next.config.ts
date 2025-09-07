import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.monica.im" },
      { protocol: "https", hostname: "files.monica-cdn.im" },
      { protocol: "https", hostname: "www.google.com" }, // for LinkPreview favicon
    ],
  },
};

export default nextConfig;
