import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "10.10.20.16",
      "http://10.10.20.16:3054/",
      "h64cf9fw-3054.inc1.devtunnels.ms",
      "walls-port-thought-rj.trycloudflare.com",
    ],
  },
};

export default nextConfig;
