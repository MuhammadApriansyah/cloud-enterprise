"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import InteractiveSurface from "@/components/ui/InteractiveSurface";
import { createSession } from "../actions";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const pat = formData.get("pat") as string;

    if (!pat) {
      setErrorMessage("Kredensial tidak boleh kosong.");
      setIsLoading(false);
      return;
    }

    try {
      // Mengirim tipe "USER" sebagai role
      const result = await createSession(pat, "USER");
      
      // Jika createSession mengembalikan error alih-alih melakukan redirect
      if (result && result.error) {
        setErrorMessage(result.error);
      }
    } catch (err) {
      setErrorMessage("Terjadi anomali pada transmisi jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#020202]">
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu will-change-transform opacity-70 md:opacity-100">
         <InteractiveSurface />
      </div>

      <div className="relative z-10 w-full max-w-[400px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          <div className="relative bg-[#050505]/85 md:bg-[#050505]/60 md:backdrop-blur-md border border-white/[0.08] rounded-[2rem] p-10 transform-gpu shadow-xl">

            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 bg-teal-500/10 rounded-2xl border border-teal-500/20 flex items-center justify-center mb-6 text-teal-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tighter mb-2">
                Validasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Entitas</span>
              </h1>
              <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold">Secure Terminal Protocol</p>
            </div>

            {/* Error Feedback Panel */}
            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center"
              >
                <p className="text-xs font-semibold text-red-400 tracking-wide">{errorMessage}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="pat" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Kredensial Akses (PAT)</label>
                <input
                  type="password"
                  id="pat"
                  name="pat"
                  required
                  disabled={isLoading}
                  placeholder="NX-••••••••"
                  className="w-full bg-black/60 md:bg-black/40 border border-white/[0.05] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-teal-500/50 transition-colors shadow-inner text-sm tracking-widest disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full group bg-white text-black hover:bg-slate-200 font-bold py-4 rounded-2xl transition-all duration-300 text-sm tracking-wide disabled:opacity-50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4 text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      <span>Validating...</span>
                    </span>
                  ) : (
                    "Inisiasi Koneksi"
                  )}
                </span>
              </button>
            </form>

            <div className="mt-8 text-center border-t border-white/[0.05] pt-6">
              <p className="text-xs text-slate-500">
                Tidak memiliki kunci otorisasi? <span className="text-teal-400 hover:text-teal-300 transition-colors cursor-pointer font-medium">Ajukan Akses Kemitraan</span>
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

