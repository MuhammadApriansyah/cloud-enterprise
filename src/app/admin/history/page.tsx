// src/app/admin/page.tsx
import { getPendingRequests } from "./actions";
import ActionButtons from "./ActionButtons";
import { supabase } from "@/lib/supabase";

export default async function HistoryPage() {
  const { data: approvedRequests } = await supabase
    .from("access_requests")
    .select("*")
    .eq("status", "APPROVED")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-light text-slate-300 tracking-tight">Access <span className="font-black text-white">Registry</span></h2>
        <p className="text-slate-500 text-sm">Daftar entitas yang telah memiliki otorisasi ke dalam node.</p>
      </div>

      <div className="bg-[#030303] border border-white/[0.05] rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs uppercase bg-white/[0.02] border-b border-white/[0.05] text-slate-500 tracking-widest">
              <tr>
                <th className="px-6 py-5 font-bold">Identitas</th>
                <th className="px-6 py-5 font-bold">Waktu Otorisasi</th>
                <th className="px-6 py-5 font-bold text-right">Cryptographic Token</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {!approvedRequests || approvedRequests.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-600 font-medium">Data registri kosong.</td>
                </tr>
              ) : (
                approvedRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-bold text-white text-base">{req.name}</div>
                      <div className="text-xs text-indigo-400 font-mono mt-1">{req.email}</div>
                    </td>
                    <td className="px-6 py-5 font-mono text-xs">
                      {new Date(req.created_at).toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <code className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg font-mono font-bold select-all">
                        {req.access_token}
                      </code>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

