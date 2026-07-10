"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import ExplorerToolbar from "./ExplorerToolbar";
import ExplorerList from "./ExplorerList";
import ExplorerModals from "./ExplorerModals";
import type { AssetItem } from "@/app/dashboard/page";

interface FileExplorerProps {
  isFetching: boolean;
  assets: AssetItem[];
  onRefetchNeeded?: () => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FileExplorer({ isFetching, assets, onRefetchNeeded, activeFilter, setActiveFilter }: FileExplorerProps) {
  const [activeAsset, setActiveAsset] = useState<AssetItem | null>(null);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000); 
  };

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const ext = asset.type.toLowerCase();
      let category = "Lainnya";
      
      if (["pdf", "doc", "docx", "txt", "rtf", "xls", "xlsx"].includes(ext)) category = "Dokumen";
      else if (["jpg", "jpeg", "png", "gif", "svg"].includes(ext)) category = "Gambar";
      else if (["mp4", "mov", "avi", "mkv"].includes(ext)) category = "Video";
      else if (["mp3", "wav", "ogg"].includes(ext)) category = "Audio";

      const matchesFilter = activeFilter === "Semua" || category === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [assets, searchQuery, activeFilter]);

  const closeModals = () => {
    setIsRenameModalOpen(false);
    setIsDeleteModalOpen(false);
    setTimeout(() => setActiveAsset(null), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
      // AUDIT FIX: Memastikan container secara penuh menyesuaikan 1fr dari Grid Parent
      className="border border-white/[0.08] rounded-[2rem] p-4 md:p-6 relative bg-[#050505]/60 backdrop-blur-md shadow-2xl flex flex-col w-full h-full min-h-0 overflow-hidden select-none [&_*]:outline-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`absolute top-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-xl border ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}
          >
            {toast.type === "success" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
            <span className="text-sm font-bold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <ExplorerModals
        activeAsset={activeAsset} isRenameOpen={isRenameModalOpen} isDeleteOpen={isDeleteModalOpen}
        isProcessing={isProcessing} setIsProcessing={setIsProcessing} onClose={closeModals} onSuccess={onRefetchNeeded}
        showToast={showToast}
      />

      <ExplorerToolbar
        isProcessing={isProcessing} setIsProcessing={setIsProcessing} onSuccess={onRefetchNeeded} showToast={showToast}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} 
        activeFilter={activeFilter} setActiveFilter={setActiveFilter} 
      />

      <ExplorerList
        isFetching={isFetching} assets={filteredAssets}
        onRename={(a) => { setActiveAsset(a); setIsRenameModalOpen(true); }}
        onDelete={(a) => { setActiveAsset(a); setIsDeleteModalOpen(true); }}
      />
    </motion.div>
  );
}

