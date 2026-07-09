"use client";

import { useState } from "react";
import Link from "next/link";
import { requestAccess } from "../actions";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await requestAccess(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result.success) {
      setMessage({ type: "success", text: "Permohonan terkirim. Menunggu persetujuan Administrator." });
      (e.target as HTMLFormElement).reset();
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Ambient Orbs */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] animate-[pulse_10s_infinite] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="absolute -inset-[1px] bg-gradient-to-b from-indigo-500/30 to-transparent rounded-[2rem] opacity-50 blur-[2px]"></div>
        
        <div className="relative bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tighter mb-3">
              Request <span className="text-indigo-400">Access</span>
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold">
              Registrasi Kredensial Baru
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group space-y-2">
              <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1 group-focus-within:text-indigo-400 transition-colors">
                Legal Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={isLoading}
                className="w-full bg-black/50 border border-white/[0.05] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all disabled:opacity-50 placeholder-slate-700 shadow-inner"
                placeholder="John Doe"
              />
            </div>

            <div className="group space-y-2">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1 group-focus-within:text-indigo-400 transition-colors">
                Corporate Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isLoading}
                className="w-full bg-black/50 border border-white/[0.05] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all disabled:opacity-50 placeholder-slate-700 shadow-inner"
                placeholder="john@enterprise.com"
              />
            </div>

            {message && (
              <div className={`p-4 rounded-xl text-xs text-center border font-medium ${
                message.type === "success" 
                  ? "bg-green-500/5 border-green-500/20 text-green-400" 
                  : "bg-red-500/5 border-red-500/20 text-red-400"
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 overflow-hidden mt-6 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
            >
              <span className="relative z-10 flex items-center justify-center text-sm tracking-wide">
                {isLoading ? "Transmitting..." : "Submit Request"}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/[0.05] pt-6">
            <p className="text-xs text-slate-500">
              Sudah memiliki token? <Link href="/auth/login" className="text-slate-300 hover:text-white border-b border-indigo-500/30 hover:border-indigo-500 transition-colors pb-0.5 ml-1">Masuk ke Node</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

