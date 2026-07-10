"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { AssetItem } from "./FileExplorer";

interface ExplorerListProps {
  isFetching: boolean;
  assets: AssetItem[];
  onRename: (asset: AssetItem) => void;
  onDelete: (asset: AssetItem) => void;
}

export default function ExplorerList({ isFetching, assets, onRename, onDelete }: ExplorerListProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  if (isFetching) {
    return (
      <div className="flex-1 overflow-y-auto pr-2 space-y-2 pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-3 border border-white/[0.02] rounded-xl animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05]" />
            <div className="h-2 w-1/3 bg-white/[0.05] rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-3">
         <p className="text-xs font-bold uppercase tracking-widest">Vault Kosong</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-2 space-y-2 pb-4 relative">
      {assets.map((file, idx) => (
        <motion.div
          key={file.id}
          className="flex items-center justify-between p-3 bg-black/20 border border-white/[0.02] hover:border-indigo-500/30 rounded-xl transition-all group relative z-10"
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-200 truncate">{file.name}</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{file.type} • {file.size}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-2">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest hidden md:block">{file.date}</div>
            
            {/* Tombol Titik Tiga dengan z-index tinggi agar selalu di atas */}
            <button 
              onClick={() => toggleDropdown(file.id)} 
              className="text-slate-500 hover:text-indigo-400 p-2 rounded-md hover:bg-indigo-500/10 relative z-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
          </div>

          {/* Dropdown Menu yang dipastikan muncul di atas elemen lain */}
          <AnimatePresence>
            {openDropdownId === file.id && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-4 top-12 w-40 bg-[#0a0a0a] border border-white/[0.1] rounded-xl shadow-2xl z-[100] overflow-hidden flex flex-col"
              >
                <button onClick={async () => { toggleDropdown(file.id); const res = await getDownloadUrlAction(file.storage_path || "");if (res.success && res.url) { const link = document.createElement("a"); link.href = res.url; link.setAttribute("download", file.name); document.body.appendChild(link); link.click(); link.remove(); } else { alert("Gagal mengambil akses unduh: " + res.error); } }} className="px-4 py-3 text-xs font-bold text-slate-300 hover:bg-indigo-500/10 text-left border-b border-white/[0.05] w-full">Unduh File</button>
                <button onClick={() => { toggleDropdown(file.id); onRename(file); }} className="px-4 py-3 text-xs font-bold text-slate-300 hover:bg-indigo-500/10 text-left border-b border-white/[0.05]">Ubah Nama</button>
                <button onClick={() => { toggleDropdown(file.id); onDelete(file); }} className="px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 text-left">Hapus Aset</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

