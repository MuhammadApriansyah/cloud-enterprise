import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. React Compiler sekarang berada di tingkat root, bukan di dalam experimental
  reactCompiler: true,

  // 2. Konfigurasi Experimental untuk Server Actions
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },

  typescript: {
    // Sebagai catatan arsitektural (EFSER Vol VI): 
    // Mengabaikan error build adalah "Technical Debt". 
    // Segera jadikan ini false setelah sistem stabil.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

