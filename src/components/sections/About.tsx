"use client";

import { motion } from "framer-motion";
import InteractiveSurface from "../ui/InteractiveSurface";

export default function About() {
  return (
    <section id="about-section" className="w-full max-w-6xl mx-auto px-6 space-y-20 py-24 relative z-10">
      {/* PERBAIKAN: Penambahan id="about-section" dan max-w-6xl px-6 */}
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-500">Enterprise Standards</p>
        <h2 className="text-5xl md:text-7xl tracking-tighter leading-[0.9]">
          <span className="font-light text-white">Protection </span>
          <span className="font-black text-slate-500">You Can Trust.</span>
        </h2>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <InteractiveSurface className="p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,211,238,0.05)_0%,_transparent_50%)]" />

          <div className="flex-1 space-y-6 relative z-10">
            <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight">Trusted <span className="font-bold">Every Day</span></h3>
            <p className="text-sm md:text-base text-slate-400 leading-loose font-light max-w-lg">
              Digital security shouldn't require complex configurations. Join global innovators who rely on our decoupled node ecosystems to safeguard operations daily.
            </p>
          </div>

          <div className="flex-1 w-full relative z-10">
            <div className="bg-[#030508]/80 border border-white/[0.05] p-8 rounded-3xl w-full space-y-6 shadow-2xl backdrop-blur-xl">
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-4">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-slate-500">Telemetry</span>
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span></span>
                  <span className="text-[10px] text-cyan-400 font-bold font-mono">UPTIME: 99.99%</span>
                </div>
              </div>

              <div className="h-24 w-full relative flex items-end overflow-hidden">
                <svg className="absolute w-[200%] h-full left-0 bottom-0" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <motion.path
                    animate={{ x: [-50, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    d="M0,10 Q5,5 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10"
                    fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5"
                  />
                  <motion.path
                    animate={{ x: [-50, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    d="M0,15 Q5,10 10,15 T20,15 T30,15 T40,15 T50,15 T60,15 T70,15 T80,15 T90,15 T100,15"
                    fill="none" stroke="rgba(34,211,238,0.8)" strokeWidth="1"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent mix-blend-screen" />
              </div>

              <div className="flex justify-between text-[9px] font-mono text-slate-600 pt-2">
                <span>LATENCY: 12ms</span>
                <span>PACKET LOSS: 0.0%</span>
              </div>
            </div>
          </div>
        </InteractiveSurface>
      </motion.div>
    </section>
  );
}

