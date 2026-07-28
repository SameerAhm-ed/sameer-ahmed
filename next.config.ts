import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from your local network. Dev-only — this has
  // no effect on a production build. Add whichever LAN address this machine
  // currently has; it changes when the network does.
  allowedDevOrigins: ["100.113.49.42", "100.127.44.110"],
  // Pin the workspace root so Turbopack doesn't pick a parent lockfile.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
