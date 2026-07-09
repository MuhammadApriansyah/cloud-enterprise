"use client";

import { motion } from "framer-motion";
import InteractiveSurface from "./InteractiveSurface";
import { useState, useEffect } from "react";

export default function Architecture() {
  // Simulasi log terminal (Awwwards Data-Viz)
  const [logs, setLogs] = useState<string[]>([
    "[SYS] INITIATING SECURE HANDSHAKE...",
    "[NET] ESTABLISHING ASYMMETRIC TUNNEL...",
  ]);

  useEffect(() => {
    const newLogs = [
      "DECRYPTING NODE X-88...", "VALIDATING ZERO-KNOWLEDGE PROOF...", 
      "ISOLATION MATRIX: STABLE.", "ENCRYPTED PAYLOAD RECEIVED."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev.slice(-3), `[${new Date().toISOString().split('T')[1].slice(0,8)}] ${newLogs[i % newLogs.length]}`]);
      i++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-20">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-10"
      >
        <div className="space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400">Security Architecture</p>
          <h2 className="text-5xl md:text-7xl tracking-tighter leading-[0.9]">
            <span className="font-light text-white">Designed Around </span><br className="hidden md:block"/>
            <span className="font-black text-slate-500">Your Privacy.</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light max-w-lg">
          We operate under a zero-compromise engineering logic. By separating authentication records from primary file systems, data extraction becomes functionally impossible.
        </p>
        <div className="space-y-5 pt-4">
          {["Asymmetric Node Separation", "Zero-Knowledge Isolation Matrix", "Cryptographic Token Exclusions"].map((item, i) => (
            <motion.div key={i} whileHover={{ x: 10, color: "#fff" }} className="flex items-center space-x-5 cursor-pointer text-slate-400 group">
              <span className="text-[10px] font-mono tracking-widest text-cyan-500/50 group-hover:text-cyan-400 transition-colors">[0{i + 1}]</span>
              <span className="text-sm font-medium tracking-wide">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data-Viz Dashboard / Radar */}
      <InteractiveSurface className="w-full aspect-square md:aspect-[4/3] p-8 flex flex-col justify-between group overflow-hidden">
        {/* Animated Radar Graph */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 border border-cyan-500/10 rounded-full flex items-center justify-center opacity-30">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} className="w-full h-full border-t border-cyan-400 rounded-full" />
          <div className="absolute w-48 h-48 border border-cyan-500/20 rounded-full" />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute w-2 h-2 bg-cyan-400 rounded-full blur-[2px]" />
        </div>

        <div className="relative z-10 flex items-center space-x-4">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-xs font-mono font-bold text-cyan-400 tracking-[0.2em] uppercase">Node Status: Active</span>
        </div>

        {/* Live Terminal Panel */}
        <div className="relative z-10 bg-black/60 border border-white/[0.05] rounded-xl p-5 w-full h-40 font-mono text-[10px] text-slate-500 flex flex-col justify-end overflow-hidden shadow-inner backdrop-blur-md">
          {logs.map((log, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-2">
              <span className="text-cyan-500/50 mr-2">➜</span>{log}
            </motion.div>
          ))}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        </div>
      </InteractiveSurface>
    </div>
  );
}

