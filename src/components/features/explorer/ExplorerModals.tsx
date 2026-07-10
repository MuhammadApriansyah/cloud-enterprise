"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { renameAssetAction, deleteAssetAction } from "@/server/storageGatekeeper";
import type { AssetItem } from "./FileExplorer";

interface ExplorerModalsProps {
  activeAsset: AssetItem | null;
  isRenameOpen: boolean;
  isDeleteOpen: boolean;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  onClose: () => void;
  onSuccess?: () => void;
  showToast: (msg: string, type: "success" | "error") => void;
}

export default function ExplorerModals({ activeAsset, isRenameOpen, isDeleteOpen, isProcessing, setIsProcessing, onClose, onSuccess, showToast }: ExplorerModalsProps) {
  const [newFileName, setNewFileName] = useState("");

  useEffect(() => {
    if (activeAsset && isRenameOpen) setNewFileName(activeAsset.name);
  }, [activeAsset, isRenameOpen]);

  const handleRenameSubmit = async () => {
    if (!activeAsset || !newFileName.trim()) return onClose();
    setIsProcessing(true);
    const res = await renameAssetAction(activeAsset.id, newFileName);
    setIsProcessing(false);
    
    if (res.success) {
      showToast("Nama aset berhasil diperbarui.", "success");
      if (onSuccess) onSuccess();
      onClose();
    } else {
      showToast("Gagal mengubah nama: " + res.error, "error");
    }
  };

  const handleDeleteSubmit = async () => {
    if (!activeAsset) return;
    setIsProcessing(true);
    const res = await deleteAssetAction(activeAsset.id, activeAsset.storage_path || "");
    setIsProcessing(false);
    
    if (res.success) {
      showToast("Aset berhasil dihapus.", "success");
      if (onSuccess) onSuccess();
      onClose();
    } else {
      showToast("Gagal menghapus: " + res.error, "error");
    }
  };

  if (!activeAsset) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#111] border border-white/10 p-6 rounded-2xl w-full max-w-sm">
        {isRenameOpen && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Ubah Nama File</h2>
            <input value={newFileName} onChange={(e) => setNewFileName(e.target.value)} className="w-full bg-black border border-white/10 p-2 rounded" />
            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2 bg-white/5 rounded">Batal</button>
              <button onClick={handleRenameSubmit} className="px-4 py-2 bg-indigo-600 rounded">Simpan</button>
            </div>
          </div>
        )}
        {isDeleteOpen && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Hapus File?</h2>
            <p className="text-sm text-slate-400">Aset "{activeAsset.name}" akan hilang selamanya.</p>
            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2 bg-white/5 rounded">Batal</button>
              <button onClick={handleDeleteSubmit} className="px-4 py-2 bg-red-600 rounded">Hapus Permanen</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

