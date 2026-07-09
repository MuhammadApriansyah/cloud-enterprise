"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { destroySession } from "@/app/auth/actions";

export default function UserSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed top-6 left-6 z-[40] p-3.5 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all shadow-2xl ${isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100"}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" /></svg>
      </button>

      <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[45] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

      <aside className={`fixed top-0 left-0 h-screen w-[320px] bg-[#030303] border-r border-white/[0.05] z-[50] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.5)] ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-24 px-8 flex items-center justify-between border-b border-white/[0.04]">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-black text-white tracking-wide">NexaCloud</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white bg-white/[0.02] hover:bg-white/[0.08] rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="flex-1 py-8 px-5 flex flex-col space-y-2 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Workspace</p>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className={`flex items-center space-x-4 py-4 px-4 rounded-2xl font-medium transition-all ${pathname === "/dashboard" ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20" : "text-slate-400 hover:text-white hover:bg-white/[0.02] border border-transparent"}`}>
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" /></svg>
            <span className="tracking-wide">File Explorer</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-white/[0.04] space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">U</div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-200">Tenant User</span>
              <span className="text-[10px] text-cyan-400 tracking-wider">SECURED</span>
            </div>
          </div>
          <form action={destroySession}>
            <button type="submit" className="w-full flex items-center justify-center space-x-3 py-4 bg-white/[0.02] hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-transparent hover:border-red-500/20 rounded-2xl transition-all group">
              <svg className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span className="font-bold text-sm tracking-wide">Disconnect</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

