"use client";

import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import StorageAnalytics from "@/components/features/StorageAnalytics";                                       
import FileExplorer from "@/components/features/explorer/FileExplorer";
import { getVaultAssetsAction } from "@/server/storageGatekeeper";

export interface AssetItem {
  id: string;
  name: string;
  size: string;
  rawSize: number;
  date: string;
  type: string;
  storage_path?: string;
}

export default function DashboardPage() {
  const [isFetching, setIsFetching] = useState(true);
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("Semua");

  const loadAssets = useCallback(async () => {
    setIsFetching(true);
    const res = await getVaultAssetsAction();

    if (res.success && res.data) {
      const formatBytes = (bytes: number, decimals = 2) => {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
      };

      const formattedAssets: AssetItem[] = res.data.map((item: any) => ({
        id: item.id,
        name: item.file_name,
        size: formatBytes(Number(item.file_size)),
        rawSize: Number(item.file_size),
        date: new Date(item.created_at).toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' }),
        type: item.file_type,
        storage_path: item.storage_path
      }));
      setAssets(formattedAssets);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    loadAssets();
    const channel = supabase
      .channel('realtime:vault_assets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vault_assets' }, () => {
          loadAssets();
      }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [loadAssets]);

  const handleCategoryClick = (category: string) => {
    setActiveFilter(prev => prev === category ? "Semua" : category);
  };

  return (
    <div className="w-full flex-1 p-4 md:p-8 pt-20 md:pt-8 flex flex-col overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-[500px] pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(79,70,229,0.15),_transparent_50%)]" />

      <div className="w-full flex flex-col flex-1 relative z-10 gap-6 min-h-0">
        <motion.header initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="shrink-0 space-y-3">
          <div className="inline-flex items-center space-x-3 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Koneksi Enkripsi Aktif</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter">Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Vault</span></h1>
        </motion.header>

        {/* AUDIT FIX: grid-rows-[auto_1fr] mematikan keruntuhan grid di seluler */}
        <div className="grid grid-cols-1 grid-rows-[auto_1fr] xl:grid-cols-3 xl:grid-rows-1 gap-6 flex-1 min-h-0 h-full">
          <div className="xl:col-span-1 h-full min-h-0">
             <StorageAnalytics 
               assets={assets} 
               activeCategory={activeFilter}
               onCategoryClick={handleCategoryClick}
             />
          </div>
          <div className="xl:col-span-2 h-full min-h-0 flex flex-col">
             <FileExplorer 
               isFetching={isFetching} 
               assets={assets} 
               onRefetchNeeded={loadAssets}
               activeFilter={activeFilter}
               setActiveFilter={setActiveFilter}
             />
          </div>
        </div>
      </div>
    </div>
  );
}

