"use client";

import { useState, useEffect } from "react";
import { createSession } from "../actions";
import Link from "next/link";
import AuroraCard from "@/components/AuroraCard";
import { motion } from "framer-motion";

export default function UserLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    await createSession(formData.get("token") as string, "USER");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#010101] flex items-center justify-center p-6 selection:bg-indigo-500/30 selection:text-white relative overflow-hidden font-sans">
      
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-[float_15s_infinite_linear]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e510_1px,transparent_1px),linear-gradient(to_bottom,#4f46e510_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50"></div>

      <div className="relative z-10 w-full max-w-[420px]">
        <AuroraCard glowColor="rgba(99, 102, 241, 0.2)" className="p-10">
          
          <div className="text-center mb-10 relative z-20">
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] mb-6 shadow-[0_0_30px_rgba(79,70,229,0.1)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <svg className="w-8 h-8 text-indigo-400 drop-shadow-[0_0_10px_rgba(79,70,229,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Validasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Entitas</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
              Secure Terminal Protocol
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-20">
            <div className="space-y-2 group">
              <label htmlFor="token" className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 group-focus-within:text-indigo-400 transition-colors">
                Kredensial Akses (PAT)
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="token"
                  name="token"
                  required
                  disabled={isLoading}
                  className="w-full bg-[#020202]/50 border border-white/[0.05] rounded-2xl px-5 py-4 text-white font-mono focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/5 transition-all duration-300 disabled:opacity-50 placeholder-slate-700 hover:border-white/[0.1] peer"
                  placeholder="NX-••••••••"
                />
                <div className="absolute inset-0 -z-10 rounded-2xl bg-indigo-500/10 blur-xl opacity-0 peer-focus:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group bg-white text-[#020202] font-bold py-4 rounded-2xl transition-all duration-500 disabled:opacity-50 overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(0,0,0,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2.5s_infinite_linear] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <span className="relative z-10 flex items-center justify-center text-sm tracking-wide">
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-[#020202]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>Dekripsi Sesi...</span>
                  </span>
                ) : (
                  "Inisiasi Koneksi"
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center relative z-20">
            <p className="text-[11px] text-slate-500 font-medium">
              Tidak memiliki kunci otorisasi? <Link href="/#about" className="text-indigo-400 hover:text-cyan-400 transition-colors font-bold">Ajukan Akses Kemitraan</Link>
            </p>
          </div>
        </AuroraCard>
      </div>
    </div>
  );
}

