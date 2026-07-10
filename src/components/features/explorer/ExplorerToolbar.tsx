"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { uploadAssetAction } from "@/server/storageGatekeeper";

interface ExplorerToolbarProps {
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  onSuccess?: () => void;
  showToast: (msg: string, type: "success" | "error") => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  activeFilter: string;
  setActiveFilter: (val: string) => void;
}

export default function ExplorerToolbar({ isProcessing, setIsProcessing, onSuccess, showToast, searchQuery, setSearchQuery, activeFilter, setActiveFilter }: ExplorerToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const filters = ["Semua", "Dokumen", "Gambar", "Video", "Audio", "Lainnya"];
  
  // State untuk Opsi 4 (Advanced Explorer Utilities)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState<"terbaru" | "terlama" | "terbesar">("terbaru");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    showToast(`Mengunggah ${file.name}...`, "success");

    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadAssetAction(formData);
    setIsProcessing(false);

    if (res.success) {
      showToast("Aset berhasil diamankan di Vault.", "success");
      if (onSuccess) onSuccess();
    } else {
      showToast("Kegagalan enkripsi: " + res.error, "error");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="shrink-0 flex flex-col gap-4 mb-6 z-10 relative">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      {/* Baris Atas: Pencarian & Tombol Aksi */}
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
        <div className="relative w-full xl:max-w-xs flex-1">
          <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari aset dalam vault..."
            className="w-full bg-black/40 border border-white/[0.05] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full xl:w-auto">
          {/* ADVANCED UTILITY: Sort & View Toggle */}
          <div className="flex items-center bg-black/40 border border-white/[0.05] rounded-xl p-1 shrink-0">
             <select 
               value={sortBy} 
               onChange={(e) => setSortBy(e.target.value as any)}
               className="bg-transparent text-xs text-slate-400 font-medium px-2 py-1.5 focus:outline-none appearance-none cursor-pointer"
             >
               <option value="terbaru">Terbaru</option>
               <option value="terlama">Terlama</option>
               <option value="terbesar">Terbesar</option>
             </select>
             <div className="w-px h-4 bg-white/10 mx-2" />
             <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
             </button>
             <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
             </button>
          </div>

          <motion.button onClick={() => fileInputRef.current?.click()} disabled={isProcessing} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="shrink-0 ml-auto px-5 py-2.5 bg-indigo-600/80 border border-indigo-500/30 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
            {isProcessing ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
            <span className="text-xs tracking-wide">{isProcessing ? "Memproses..." : "Unggah"}</span>
          </motion.button>
        </div>
      </div>

      {/* Baris Bawah: Kategori Filter */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
         {filters.map(option => (
           <button
             key={option}
             onClick={() => setActiveFilter(option)}
             className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeFilter === option ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-transparent hover:bg-white/5 text-slate-500 hover:text-slate-300 border border-transparent'}`}
           >
             {option}
           </button>
         ))}
      </div>
    </div>
  );
}

