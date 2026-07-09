"use client";

import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-16 pt-28 md:pt-28">
      
      {/* PERBAIKAN: Radial Gradient murni menggantikan CSS Blur yang nge-bug */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/25 via-[#020202]/0 to-transparent" />
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 ml-14 md:ml-0" // Memberi ruang untuk hamburger di mobile
        >
          <div className="inline-flex items-center space-x-3 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Akses Diotorisasi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Vault</span>
          </h1>
          <p className="text-sm font-mono text-slate-500 tracking-widest uppercase">KEY_EXCHANGE: SECURE</p>
        </motion.header>

        {/* Bento Grid with Aurora Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Storage Metric Card (Aurora Edition) */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-1 border border-white/[0.08] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden group bg-[#050505]/60 backdrop-blur-xl"
          >
            {/* Animated Aurora Background */}
            <div className="absolute -inset-[150%] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 animate-[spin_8s_linear_infinite]" />
            
            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-bold">Active Node</h3>
              <p className="text-sm text-slate-400">2 aset terenkripsi tersinkronisasi.</p>
            </div>
            <div className="mt-12 relative z-10">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Encrypted Storage</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-5xl font-black text-white group-hover:text-indigo-300 transition-colors duration-500">1.0</span>
                <span className="text-lg font-bold text-slate-400">MB</span>
              </div>
            </div>
          </motion.div>

          {/* File Explorer Window (Aurora Edition) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-2 border border-white/[0.08] rounded-[2rem] p-8 space-y-8 relative overflow-hidden group bg-[#050505]/60 backdrop-blur-xl"
          >
             {/* Animated Aurora Background */}
             <div className="absolute -inset-[100%] bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 opacity-50 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">
              <div className="relative w-full md:w-auto flex-1">
                <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="Search network assets..." className="w-full bg-black/50 border border-white/[0.05] rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors shadow-inner" />
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-6 py-3 bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span>Upload Asset</span>
              </motion.button>
            </div>

            <div className="space-y-3 relative z-10">
              {[1, 2].map((i) => (
                <motion.div 
                  whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                  key={i} 
                  className="flex items-center justify-between p-4 bg-black/40 border border-white/[0.03] hover:border-indigo-500/30 rounded-2xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">log_1783528{i}64038.txt</h4>
                      <p className="text-xs text-slate-500">TEXT • 524.23 KB</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 hidden md:block">08 Jul 2026, 23:32 WIB</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

