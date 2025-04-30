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
        hostname: "sociial.vercel.app",
        pathname: "/hero-light.png",
      },
      {
        protocol: "https",
        hostname: "cdn.buymeacoffee.com",
        pathname: "/buttons/v2/default-yellow.png"
      }
    ],
  },
};

export default nextConfig;
