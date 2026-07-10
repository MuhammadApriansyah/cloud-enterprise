"use client";

import { useState } from "react";
import Link from "next/link";
import { requestAccess } from "../actions";
import OrganicEnvironment from "@/components/ui/OrganicEnvironment";
import InteractiveSurface from "@/components/ui/InteractiveSurface";

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
    <div className="min-h-screen flex items-center justify-center p-6 selection:bg-cyan-500/30 selection:text-white relative overflow-hidden font-sans">

      <OrganicEnvironment />

      <div className="relative z-10 w-full max-w-[420px]">
        <InteractiveSurface className="p-10" glowOverride="rgba(14, 116, 144, 0.15)">
          
          <div className="text-center mb-10 relative z-20">
            <h1 className="text-3xl font-black text-white tracking-tight mb-3">
              Request <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">Access</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
              Registrasi Kredensial Baru
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-20">
            <div className="group space-y-2">
              <label htmlFor="name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-cyan-400 transition-colors">
                Legal Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={isLoading}
                  className="w-full bg-[#020202]/50 border border-white/[0.05] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all duration-300 disabled:opacity-50 placeholder-slate-700 hover:border-white/[0.1] peer"
                  placeholder="John Doe"
                />
                <div className="absolute inset-0 -z-10 rounded-2xl bg-cyan-500/10 blur-xl opacity-0 peer-focus:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            <div className="group space-y-2">
              <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-cyan-400 transition-colors">
                Corporate Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isLoading}
                  className="w-full bg-[#020202]/50 border border-white/[0.05] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all duration-300 disabled:opacity-50 placeholder-slate-700 hover:border-white/[0.1] peer"
                  placeholder="john@enterprise.com"
                />
                <div className="absolute inset-0 -z-10 rounded-2xl bg-cyan-500/10 blur-xl opacity-0 peer-focus:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-xl text-[11px] font-medium text-center border mt-4 ${
                message.type === "success"
                  ? "bg-teal-500/10 border-teal-500/30 text-teal-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group bg-white text-[#050B14] font-bold py-4 rounded-2xl transition-all duration-500 disabled:opacity-50 overflow-hidden mt-8 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center text-sm tracking-wide">
                {isLoading ? "Transmitting..." : "Submit Request"}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/[0.05] pt-6 relative z-20">
            <p className="text-[11px] text-slate-500 font-medium">
              Sudah memiliki token? <Link href="/auth/login" className="text-cyan-400 hover:text-white transition-colors font-bold ml-1">Masuk ke Node</Link>
            </p>
          </div>
        </InteractiveSurface>
      </div>
    </div>
  );
}

