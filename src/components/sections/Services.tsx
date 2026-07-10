"use client";

import { motion } from "framer-motion";
import InteractiveSurface from "../ui/InteractiveSurface";

export default function Services() {
  return (
    <section id="services-section" className="w-full max-w-6xl mx-auto px-6 space-y-16 py-24 relative z-10">
      {/* PERBAIKAN: Penambahan id="services-section" dan max-w-6xl px-6 */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6 max-w-2xl"
      >
        <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-400">Core Capabilities</p>
        </div>
        <h2 className="text-5xl md:text-6xl tracking-tighter leading-[0.9]">
          <span className="font-light text-white">Ecosystem </span>
          <span className="font-black text-slate-500">Density.</span>
        </h2>
      </motion.header>

      {/* PERBAIKAN: Animasi Grid yang muncul berurutan (Staggered Reveal) */}
      <motion.div 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]"
      >

        {/* Bento 1: Feature Highlight (Large) */}
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }} className="md:col-span-8 h-full">
          <InteractiveSurface className="h-full p-10 flex flex-col justify-between group">
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Architecture</span>
            </div>
            <div className="space-y-3 relative z-10">
              <h3 className="text-2xl font-bold text-white tracking-wide">Invisible Security</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light max-w-md">
                Sophisticated data preservation protocols operate silently beneath your standard interface. Complete safety without operational friction.
              </p>
            </div>
          </InteractiveSurface>
        </motion.div>

        {/* Bento 2: Live Status / Micro Dashboard (Small) */}
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }} className="md:col-span-4 h-full">
          <InteractiveSurface className="h-full p-8 flex flex-col justify-center items-center text-center group">
            <div className="relative w-32 h-32 mb-6">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: "linear" }} className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full" />
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute inset-2 border border-blue-500/30 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">99.9%</span>
              </div>
            </div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase">System Uptime</h3>
            <p className="text-[10px] text-cyan-400/80 font-mono mt-2">METRIC_STABLE</p>
          </InteractiveSurface>
        </motion.div>

        {/* Bento 3: Trust Indicator (Medium) */}
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }} className="md:col-span-5 h-full">
          <InteractiveSurface className="h-full p-8 flex flex-col justify-between group">
            <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Privacy by Default</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                Sensitive information remains exclusively yours. Every database layer is structured around default anonymity.
              </p>
            </div>
          </InteractiveSurface>
        </motion.div>

        {/* Bento 4: Collaboration / Connection (Medium) */}
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }} className="md:col-span-7 h-full">
          <InteractiveSurface className="h-full p-8 flex flex-col justify-between group overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-full opacity-20 pointer-events-none flex items-center">
               <div className="w-full h-[1px] bg-cyan-500/50 absolute" />
               <div className="w-[1px] h-full bg-cyan-500/50 absolute left-1/2" />
               <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-[2px]" />
            </div>

            <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 mb-6 relative z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <div className="space-y-2 relative z-10 max-w-sm">
              <h3 className="text-lg font-bold text-white">Reliable by Design</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                Multi-node deployment strategy guarantees your infrastructure stays online and connected globally.
              </p>
            </div>
          </InteractiveSurface>
        </motion.div>

      </motion.div>
    </section>
  );
}

