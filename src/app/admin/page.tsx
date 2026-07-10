"use client";

import { motion } from "framer-motion";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-16 pt-28 md:pt-28">
       {/* PERFORMANCE FIX: Radial Gradient Kanan Atas Statis */}
       <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-[#020202]/0 to-transparent" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 ml-14 md:ml-0"
        >
          <div className="inline-flex items-center space-x-3 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">Root Command Active</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            Oversight <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Analytics</span>
          </h1>
          <p className="text-sm text-slate-500 max-w-xl">Sistem pemantauan kluster tingkat dewa dan kendali otorisasi absolut.</p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="md:col-span-1 border border-white/[0.08] hover:border-red-500/30 rounded-[2rem] p-8 space-y-8 relative overflow-hidden group bg-[#050505]/80 transition-all duration-300 shadow-xl"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">Alokasi Memori Global</h3>
             <div className="space-y-6 relative z-10">
               <div>
                 <div className="flex justify-between text-sm mb-2">
                   <span className="text-slate-300">Node Primer Aliansi</span>
                   <span className="text-red-400 font-mono">142.5 GB</span>
                 </div>
                 <div className="w-full h-1.5 bg-black rounded-full overflow-hidden shadow-inner">
                   <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 1.5, delay: 0.2 }} className="h-full bg-red-500 rounded-full" />
                 </div>
               </div>
               <div>
                 <div className="flex justify-between text-sm mb-2">
                   <span className="text-slate-400">Kapasitas Redundan</span>
                   <span className="text-teal-400 font-mono">257.5 GB</span>
                 </div>
                 <div className="w-full h-1.5 bg-black rounded-full overflow-hidden shadow-inner">
                   <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, delay: 0.4 }} className="h-full bg-teal-400 rounded-full" />
                 </div>
               </div>
             </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="border border-white/[0.08] hover:border-red-500/30 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group bg-[#050505]/80 transition-all duration-300 shadow-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 text-red-500 border border-red-500/20 relative z-10 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div className="text-6xl font-black text-white mb-2 relative z-10 group-hover:text-red-100 transition-colors">24</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">Total Penyewa Valid</div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            className="border border-white/[0.08] hover:border-red-500/30 rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group bg-[#050505]/80 transition-all duration-300 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">Integritas Infrastruktur</h3>
            <div className="space-y-1 relative z-10">
              <div className="text-5xl font-black text-teal-400 group-hover:text-teal-300 transition-colors">99.9%</div>
              <div className="text-sm font-bold text-slate-400">UPTIME STABIL</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/50 rounded-xl border border-white/[0.05] relative z-10 mt-6">
              <span className="text-xs text-slate-500">Latensi Transmisi</span>
              <span className="text-xs font-mono text-teal-400">42ms</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

