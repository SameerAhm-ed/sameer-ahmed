import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from your local network
  allowedDevOrigins: ["100.127.44.110"],
  // Pin the workspace root so Turbopack doesn't pick a parent lockfile.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
