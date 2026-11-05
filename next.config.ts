import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  reactCompiler: true,
  rewrites() {
    return [
      {
        source: "/api/studios",
        destination: "http://localhost:8000/api/studios",
      },
      {
        source: "/api/studios/:path+",
        destination: "http://localhost:8000/api/studios/:path+",
      },
      {
        source: "/api/bookings",
        destination: "http://localhost:8000/api/bookings",
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
