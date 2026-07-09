import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! PERINGATAN !!
    // Ini memungkinkan *build* produksi tetap sukses meskipun ada error TypeScript.
    ignoreBuildErrors: true,
  },
  reactCompiler: true,
};

export default nextConfig;
