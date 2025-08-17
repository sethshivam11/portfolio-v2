import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dv3qbj0bn/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/sethshivam11/**"
      },
      {
        protocol: "https",
        hostname: "cdn.buymeacoffee.com",
        pathname: "/buttons/v2/default-yellow.png"
      },
    ],
  },
};

export default nextConfig;
