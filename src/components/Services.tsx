"use client";

import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      num: "01",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      title: "Privacy by Default",
      desc: "We ensure your sensitive information remains exclusively yours. Every database layer is structured around default anonymity.",
    },
    {
      num: "02",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Invisible Security",
      desc: "Sophisticated data preservation protocols operate silently beneath your standard interface. Complete safety without friction.",
    },
    {
      num: "03",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      title: "Reliable by Design",
      desc: "Engineered for absolute continuity. Our multi-node deployment strategy guarantees your infrastructure stays online.",
    }
  ];

  return (
    <section className="w-full min-h-screen flex flex-col justify-center py-20 px-4 md:px-12 transform-gpu">
      <div className="max-w-6xl mx-auto w-full space-y-20">
        
        {/* Typographic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-blue-400">
            Core Capabilities
          </p>
          <h2 className="text-5xl md:text-7xl tracking-tighter leading-[0.9]">
            <span className="font-light text-white">Your Data. </span>
            <span className="font-black text-slate-500">Your Control.</span>
          </h2>
        </motion.div>

        {/* Services Grid with Decorative Typography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, border: "1px solid rgba(255,255,255,0.1)" }}
              className="group relative bg-[#0f1422]/30 backdrop-blur-3xl border border-white/[0.04] p-10 md:p-12 rounded-[2rem] overflow-hidden flex flex-col justify-between min-h-[380px] transition-all duration-500 hover:bg-[#0f1422]/80"
            >
              {/* Giant Decorative Number */}
              <div className="absolute -bottom-8 -right-4 text-[150px] font-black text-white/[0.02] group-hover:text-blue-400/[0.05] transition-colors duration-700 pointer-events-none select-none tracking-tighter leading-none">
                {srv.num}
              </div>

              <div className="relative z-10 space-y-8">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-500">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={srv.icon} />
                  </svg>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors duration-500">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors duration-500">
                    {srv.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

