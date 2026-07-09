"use client";
// src/app/admin/page.tsx

import { useState } from "react";
import { approveRequest, rejectRequest, getPendingRequests } from "./actions";


export default function ActionButtons({ id, name }: { id: string, name: string }) {
  const [loading, setLoading] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const handleApprove = async () => {
    setLoading(true);
    const res = await approveRequest(id);
    if (res?.success && res.token) {
      setGeneratedToken(res.token); // Munculkan Pop-up
    }
    setLoading(false);
  };

  const handleReject = async () => {
    if (confirm(`Tolak permohonan dari ${name}?`)) {
      setLoading(true);
      await rejectRequest(id);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end space-x-3">
        <button onClick={handleReject} disabled={loading} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 disabled:opacity-50">
          Reject
        </button>
        <button onClick={handleApprove} disabled={loading} className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)] disabled:opacity-50">
          {loading ? "Processing..." : "Approve"}
        </button>
      </div>

      {/* GOD-TIER POP-UP MODAL UNTUK TOKEN */}
      {generatedToken && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020202]/90 backdrop-blur-md p-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-[#050505] border border-white/[0.1] rounded-3xl p-10 max-w-lg w-full text-center shadow-[0_0_50px_rgba(99,102,241,0.2)]">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Akses Diberikan</h3>
            <p className="text-slate-400 text-sm mb-8">Berikan Cryptographic Token ini kepada <strong className="text-white">{name}</strong> melalui jalur komunikasi aman.</p>
            
            <div className="bg-black/50 border border-white/[0.05] rounded-2xl p-6 mb-8 shadow-inner select-all">
              <code className="text-3xl font-mono font-black text-indigo-400 tracking-widest">{generatedToken}</code>
            </div>

            <button onClick={() => setGeneratedToken(null)} className="w-full px-6 py-4 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-bold rounded-2xl transition-colors">
              Tutup & Lanjutkan
            </button>
          </div>
        </div>
      )}
    </>
  );
}

