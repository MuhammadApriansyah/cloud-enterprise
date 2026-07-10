"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// PERBAIKAN 1: OrganicEnvironment DIHAPUS dari sini untuk mencegah WebGL ganda (DRY Principle)
import Architecture from "@/components/sections/Architecture";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";

export default function LandingPage() {
  return (
    <div className="bg-transparent text-white selection:bg-cyan-500/30 selection:text-white relative font-sans">
    {/* PERBAIKAN 2: Hapus bg-[#020202] menjadi bg-transparent agar kanvas dari layout.tsx terlihat. 
        Hapus overflow-hidden agar elemen tidak terpotong kasar. */}
      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto mt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center space-x-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500/80">Privacy by Default</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Trust.</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center space-x-3 text-xs md:text-sm text-slate-500 uppercase tracking-[0.3em] font-semibold mb-12">
            <span>Safe.</span><span className="text-slate-700">•</span><span>Simple.</span><span className="text-slate-700">•</span><span>Reliable.</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Link href="#services-section">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 text-white font-bold py-4 px-8 rounded-full transition-all duration-500 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(6,182,212,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <span className="relative z-10 text-[11px] uppercase tracking-[0.2em]">Explore Architecture</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- MODULAR COMPONENTS --- */}
      <div className="relative z-10">
        <Services />
        <Architecture />
        <About />
      </div>

    </div>
  );
}

