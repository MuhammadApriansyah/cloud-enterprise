"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { createSession } from "../actions";

export default function LoginPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Token yang dicoba:", token);

  // Perhatikan kata kunci 'async' di sini
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sekarang 'await' di bawah ini sah karena berada dalam fungsi 'async'
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

      // Memanggil Server Action untuk membuat cookie aman
        console.log("Login sukses, data:", data);
        await createSession(token);
      
    } catch (err) {
      console.error("Login Error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Secure Access</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Access Token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Enter your unique token"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Connect to Server"}
          </button>
        </form>
      </div>
    </div>
  );
}

