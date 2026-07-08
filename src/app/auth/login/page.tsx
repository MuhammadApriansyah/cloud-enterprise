"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { createSession } from "../actions";

export default function LoginPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('access_tokens')
        .select('*')
        .eq('token_hash', token)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        alert("Token tidak valid atau sudah kedaluwarsa.");
        setLoading(false);
        return;
      }

      await createSession(token);
      
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full filter blur-[80px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900/60 border border-slate-800/80 p-10 rounded-3xl shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tight">Gatekeeper Access</h2>
          <p className="text-sm text-slate-400">Masukkan token identitas enkripsi untuk membuka simpul.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Cryptographic Token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all duration-300 font-mono tracking-widest text-center"
              placeholder="••••••••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.99]"
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Synchronizing...</span>
              </span>
            ) : (
              "Establish Secure Connection"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

