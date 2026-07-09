"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center py-20 px-4 md:px-12 transform-gpu">
      <div className="max-w-6xl mx-auto w-full space-y-20">
        
        {/* Typographic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-500">
            Enterprise Standards
          </p>
          <h2 className="text-5xl md:text-7xl tracking-tighter leading-[0.9]">
            <span className="font-light text-white">Protection </span>
            <span className="font-black text-slate-500">You Can Trust.</span>
          </h2>
        </motion.div>

        {/* Editorial Layout Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[3rem] bg-[#0f1422]/20 border border-white/[0.04] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-16 group hover:bg-[#0f1422]/40 transition-colors duration-700 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-[2.5s] ease-in-out pointer-events-none -z-10" />

          {/* Text Content */}
          <div className="flex-1 space-y-6 relative z-10">
            <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight">
              Trusted <span className="font-bold">Every Day</span>
            </h3>
            <p className="text-sm md:text-base text-slate-400 leading-loose font-light max-w-lg">
              Digital security shouldn't require complex configurations. Join global innovators who rely on our decoupled node ecosystems to safeguard operations daily, knowing their data layers remain isolated, automated, and strictly private.
            </p>
          </div>
          
          <div className="hidden lg:block w-px h-32 bg-white/[0.06] relative z-10" />
          
          {/* Tech Metric Badge */}
          <div className="flex-1 flex flex-col lg:items-end text-left lg:text-right relative z-10 w-full">
            <div className="bg-black/30 border border-white/[0.04] p-8 rounded-[2rem] w-full lg:w-auto space-y-5 shadow-inner group-hover:border-white/[0.08] transition-colors duration-500">
              <div className="text-sm font-bold text-white flex items-center lg:justify-end space-x-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
                </span>
                <span className="tracking-widest uppercase text-[11px]">System Operational</span>
              </div>
              
              <div className="text-[10px] font-mono text-slate-500 lg:justify-end flex items-center gap-4 tracking-[0.2em] uppercase">
                <span className="text-teal-400/80 font-bold">UPTIME: 99.99%</span>
                <span className="text-slate-700">|</span>
                <span>METRIC_OK</span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

