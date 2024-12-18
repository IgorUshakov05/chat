import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    client: "http://localhost:3000",
    server: "http://localhost:4000",
  },
};

export default nextConfig;
