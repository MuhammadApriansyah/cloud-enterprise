"use client";

import { useState, useEffect } from "react";
import { createSession } from "../actions";
import AuroraCard from "@/components/AuroraCard";
import { motion } from "framer-motion";

export default function RootAccessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    await createSession(formData.get("token") as string, "ADMIN"); 
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 selection:bg-red-500/30 selection:text-white relative overflow-hidden font-sans">
      
      {/* Crimson Alert Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_6s_infinite]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

      <div className="relative z-10 w-full max-w-[420px]">
        <AuroraCard glowColor="rgba(239, 68, 68, 0.2)" className="p-10 border-red-500/10">
          
          <div className="text-center mb-10 relative z-20">
            <motion.div 
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/5 border border-red-500/20 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <svg className="w-7 h-7 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
              ROOT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700">ACCESS</span>
            </h1>
            <p className="text-[10px] text-red-500/70 uppercase tracking-[0.3em] font-bold">
              Restricted Subsystem
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
            <div className="space-y-2 group">
              <input
                type="password"
                id="token"
                name="token"
                required
                disabled={isLoading}
                className="w-full bg-[#020202]/80 border border-red-500/20 rounded-2xl px-5 py-4 text-red-400 text-center tracking-[0.5em] font-mono focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/30 transition-all duration-300 disabled:opacity-50 placeholder-red-950/80 hover:border-red-500/40 hover:bg-black/90 peer"
                placeholder="MASTER KEY"
              />
              <div className="absolute inset-0 -z-10 rounded-2xl bg-red-500/10 blur-xl opacity-0 peer-focus:opacity-100 transition-opacity duration-500"></div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group bg-red-950/50 hover:bg-red-900/80 border border-red-500/30 text-red-400 hover:text-white font-bold py-4 rounded-2xl transition-all duration-500 disabled:opacity-50 overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.1)] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(239,68,68,0.2)_50%,transparent_75%)] bg-[length:250%_250%] opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_2s_infinite_linear] transition-opacity"></div>
              <span className="relative z-10 flex items-center justify-center text-sm tracking-widest uppercase">
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Bypassing...</span>
                  </span>
                ) : (
                  "Override Protocol"
                )}
              </span>
            </button>
          </form>
        </AuroraCard>
      </div>
    </div>
  );
}

