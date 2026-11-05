import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Load the file reader from node_modules at runtime instead of bundling it.
  serverExternalPackages: ["officeparser"],
};

export default nextConfig;
