"use client";

import Link from "next/link";
import { useState } from "react";
import { destroySession } from "@/app/actions"; // Mengambil fungsi logout

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#030303] overflow-hidden text-slate-300 selection:bg-indigo-500/30 font-sans relative">
      
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR RESPONSIVE */}
      <aside 
        className={`fixed md:relative z-30 w-72 h-full bg-[#050505]/95 md:bg-white/[0.01] border-r border-white/[0.05] backdrop-blur-3xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-xl font-black text-white tracking-wide">NexaCloud</span>
            </div>
            <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <nav className="space-y-1.5 flex-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Workspace</p>
            <Link href="/dashboard" className="group flex items-center space-x-3 px-3 py-2.5 bg-white/[0.06] border border-white/[0.05] rounded-xl text-white font-medium transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <svg className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" /></svg>
              <span className="tracking-wide">File Explorer</span>
            </Link>

            {/* Tombol Logout Memanggil Server Action */}
            <form action={destroySession} className="mt-4 border-t border-white/[0.05] pt-4">
              <button type="submit" className="w-full group flex items-center space-x-3 px-3 py-2.5 hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-400 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span className="tracking-wide">Disconnect</span>
              </button>
            </form>
          </nav>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.02] flex items-center space-x-3 hover:bg-white/[0.05] transition-colors cursor-pointer mt-auto">
          <div className="w-9 h-9 rounded-full bg-indigo-900/50 flex items-center justify-center border border-indigo-500/30 text-indigo-300 font-bold text-sm">
            MA
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-200">Muhammad A.</span>
            <span className="text-[10px] text-slate-500 tracking-wider truncate max-w-[140px]">PT. Abacus Dana Pensiuntama</span>
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10 w-full">
        <header className="h-20 bg-transparent border-b border-white/[0.05] flex items-center justify-between px-6 md:px-10 z-10 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <button className="md:hidden text-slate-300 hover:text-white transition-colors" onClick={() => setIsSidebarOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="text-xl font-medium text-slate-200 tracking-tight">Enterprise <span className="font-bold text-white">Vault</span></h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full border border-[#030303]"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}

