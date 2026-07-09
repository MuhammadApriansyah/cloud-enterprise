"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, useSpring, useTransform } from "framer-motion";

export default function StorageAnalytics() {
  const [totalBytes, setTotalBytes] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Menggunakan spring physics untuk animasi angka yang halus
  const springBytes = useSpring(0, { stiffness: 100, damping: 20 });
  const springCount = useSpring(0, { stiffness: 100, damping: 20 });
  
  // Transformasi nilai spring menjadi string angka
  const displayBytes = useTransform(springBytes, (latest) => (latest / (1024 * 1024)).toFixed(1));
  const displayCount = useTransform(springCount, (latest) => Math.floor(latest));

  useEffect(() => {
    const fetchStorageStats = async () => {
      try {
        const { data, error } = await supabase.storage.from('enterprise_vault').list('uploads');
        if (error) throw error;
        if (data) {
          const validFiles = data.filter(f => f.name !== '.emptyFolderPlaceholder');
          const totalSize = validFiles.reduce((acc, file) => acc + (file.metadata?.size || 0), 0);
          
          setTotalBytes(totalSize);
          setFileCount(validFiles.length);
          
          // Memicu animasi spring
          springBytes.set(totalSize);
          springCount.set(validFiles.length);
        }
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };
    fetchStorageStats();
  }, [springBytes, springCount]);

  return (
    <div className="relative group rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8 overflow-hidden backdrop-blur-xl transition-all hover:bg-white/[0.03]">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-light text-slate-300 tracking-tight">Active <span className="font-bold text-white">Node</span></h2>
          <p className="text-slate-500 text-sm tracking-wide">
            {isLoading ? "Menghitung..." : (
              <motion.span>
                <motion.span>{displayCount}</motion.span> aset terenkripsi tersinkronisasi.
              </motion.span>
            )}
          </p>
        </div>

        <div className="flex items-end space-x-6">
          <div className="flex flex-col text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Encrypted Storage</span>
            <div className="flex items-baseline space-x-1 justify-end">
              <motion.span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 tracking-tighter">
                {displayBytes}
              </motion.span>
              <span className="text-lg text-slate-500 font-medium">MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

