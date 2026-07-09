"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, useSpring, useTransform } from "framer-motion";
import InteractiveSurface from "./InteractiveSurface";

export default function StorageAnalytics() {
  const [totalBytes, setTotalBytes] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const springBytes = useSpring(0, { stiffness: 100, damping: 20 });
  const springCount = useSpring(0, { stiffness: 100, damping: 20 });

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

          springBytes.set(totalSize);
          springCount.set(validFiles.length);
        }
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };
    fetchStorageStats();
  }, [springBytes, springCount]);

  return (
    <InteractiveSurface className="p-8 h-full flex flex-col justify-between min-h-[250px]" glowOverride="rgba(14, 116, 144, 0.2)">
      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
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

        <div className="flex flex-col text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Encrypted Storage</span>
          <div className="flex items-baseline space-x-1">
            <motion.span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tighter">
              {displayBytes}
            </motion.span>
            <span className="text-lg text-slate-500 font-medium">MB</span>
          </div>
        </div>
      </div>
    </InteractiveSurface>
  );
}

