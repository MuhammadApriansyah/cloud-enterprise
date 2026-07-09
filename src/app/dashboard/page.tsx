"use client";

import { motion } from "framer-motion";
import StorageAnalytics from "@/components/StorageAnalytics";
import FileExplorer from "@/components/FileExplorer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 md:p-16 pt-28 md:pt-28">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">

        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 ml-14 md:ml-0" 
        >
          <div className="inline-flex items-center space-x-3 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">Akses Diotorisasi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vault</span>
          </h1>
          <p className="text-sm font-mono text-slate-500 tracking-widest uppercase">KEY_EXCHANGE: SECURE</p>
        </motion.header>

        {/* Grid Ekosistem Terintegrasi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 h-full">
            <StorageAnalytics />
          </div>
          <div className="md:col-span-2">
            {/* Dibungkus InteractiveSurface di dalam komponennya */}
            <FileExplorer />
          </div>
        </div>

      </div>
    </div>
  );
}

