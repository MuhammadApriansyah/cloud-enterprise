"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import type { AssetItem } from "@/app/dashboard/page";

interface StorageAnalyticsProps {
  assets?: AssetItem[];
  onCategoryClick?: (category: string) => void;
  activeCategory?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Dokumen: "#6366f1",
  Gambar: "#22d3ee",
  Video: "#f43f5e",
  Audio: "#a855f7",
  Lainnya: "#475569"
};

export default function StorageAnalytics({ assets = [], onCategoryClick, activeCategory }: StorageAnalyticsProps) {
  const getCategory = (type: string) => {
    const ext = type.toLowerCase();
    if (["pdf", "doc", "docx", "txt", "rtf", "xls", "xlsx"].includes(ext)) return "Dokumen";
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(ext)) return "Gambar";
    if (["mp4", "mov", "avi", "mkv"].includes(ext)) return "Video";
    if (["mp3", "wav", "ogg"].includes(ext)) return "Audio";
    return "Lainnya";
  };

  const safeAssets = Array.isArray(assets) ? assets : [];
  
  const categoryCounts = safeAssets.reduce((acc, curr) => {
    const cat = getCategory(curr.type);
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, { Dokumen: 0, Gambar: 0, Video: 0, Audio: 0, Lainnya: 0 } as Record<string, number>);

  const data = Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
      // AUDIT FIX: Deep selectors [&_*] memastikan seluruh layer SVG bebas outline
      className="border border-white/[0.08] rounded-[2rem] p-6 bg-[#050505]/60 backdrop-blur-md shadow-2xl flex flex-col w-full h-full select-none [&_*]:outline-none [&_*]:focus:outline-none [&_*]:focus-visible:outline-none"
      style={{ WebkitTapHighlightColor: 'transparent', touchAction: 'pan-y' }}
    >
      <div className="flex flex-col space-y-1.5 mb-4 shrink-0">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Statistik Penyimpanan</h3>
      </div>
      
      <div className="w-full flex-1 min-h-[100px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-xl mb-6">
         <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest text-center px-4">
           Slot Kosong Utilitas<br/>(Volume III Chapter 16)
         </span>
      </div>

      <div className="w-full h-[210px] shrink-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} stroke="#64748b" />
            
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]} 
              activeBar={false} 
              isAnimationActive={false} 
              className="outline-none"
              onClick={(dataContext) => {
                if (dataContext?.name && onCategoryClick) {
                  onCategoryClick(dataContext.name);
                }
              }}
            >
              {data.map((entry, index) => {
                const isActive = activeCategory ? activeCategory === entry.name : true;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.value > 0 ? CATEGORY_COLORS[entry.name] : "#1e293b"} 
                    opacity={isActive ? 1 : 0.3}
                    className="transition-opacity duration-300 cursor-pointer outline-none focus:outline-none"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

