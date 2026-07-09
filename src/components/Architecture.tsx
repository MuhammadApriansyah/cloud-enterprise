"use client";

import { motion } from "framer-motion";

export default function Architecture() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center py-20 px-4 md:px-12 transform-gpu">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Typographic Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-teal-400">
              Security Architecture
            </p>
            <h2 className="text-5xl md:text-7xl tracking-tighter leading-[0.9]">
              <span className="font-light text-white">Designed Around </span>
              <br className="hidden md:block"/>
              <span className="font-black text-slate-500">Your Privacy.</span>
            </h2>
          </div>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light max-w-lg">
            We operate under a zero-compromise engineering logic. By separating authentication records from primary file systems, data extraction becomes functionally impossible from external perimeters.
          </p>
          
          {/* Monospace Technical Indexing */}
          <div className="space-y-5 pt-4">
            {[
              "Asymmetric Node Separation", 
              "Zero-Knowledge Isolation Matrix", 
              "Cryptographic Token Exclusions"
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10, color: "#fff" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center space-x-5 cursor-pointer text-slate-400 group"
              >
                <span className="text-[10px] font-mono tracking-widest text-teal-500/50 group-hover:text-teal-400 transition-colors">
                  [0{i + 1}]
                </span>
                <span className="text-sm font-medium tracking-wide transition-colors">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Breathing Core Display (Fingerprint) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center relative aspect-square w-full max-w-[450px] mx-auto bg-white/[0.01] border border-white/[0.03] rounded-[3rem] p-8 overflow-hidden group"
        >
          <div className="relative flex items-center justify-center w-full h-full cursor-pointer">
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-blue-500/20 group-hover:border-blue-400/50 group-active:scale-90 transition-all duration-700 pointer-events-none"
            />
            
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
              className="absolute w-[60%] h-[60%] rounded-full border border-teal-500/20 group-hover:scale-110 group-active:scale-75 transition-all duration-700 pointer-events-none"
            />

            <motion.div 
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85, borderRadius: "2rem" }}
              className="w-24 h-24 bg-gradient-to-tr from-blue-500 via-indigo-400 to-teal-400 rounded-full z-10 relative flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-shadow duration-300"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.5 }}
                whileTap={{ opacity: 0.8, scale: 1.8 }}
                className="absolute inset-0 rounded-full bg-teal-400/30 blur-md -z-10"
              />
              <svg className="w-10 h-10 text-white opacity-90 relative z-20 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

