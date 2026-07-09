"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { destroySession } from "@/app/auth/actions";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-6 left-6 z-[40] p-3.5 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all shadow-2xl ${isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100"}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
        </svg>
      </button>

      <div onClick={() => setIsOpen(false)} className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[45] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

      <aside className={`fixed top-0 left-0 h-screen w-[320px] bg-[#050303] border-r border-red-900/20 z-[50] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col shadow-[20px_0_50px_rgba(220,38,38,0.1)] ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-24 px-8 flex items-center justify-between border-b border-red-900/30">
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                 <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
               </div>
               <span className="font-bold text-xl tracking-tight text-white">Nexa<span className="text-red-500">Admin</span></span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-red-400 bg-white/[0.02] hover:bg-red-500/10 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        
        <nav className="flex-1 py-8 px-5 flex flex-col space-y-2 overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-widest text-red-500/60 mb-4 px-3">Command Modules</div>
            <Link href="/admin" onClick={() => setIsOpen(false)} className={`flex items-center space-x-4 py-4 px-4 rounded-2xl transition-all ${pathname === "/admin" ? "bg-red-500/10 text-red-400 border border-red-500/30 shadow-inner" : "text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent"}`}>
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <span className="font-semibold text-sm">Analytics & Core</span>
            </Link>
            <Link href="/admin/history" onClick={() => setIsOpen(false)} className={`flex items-center space-x-4 py-4 px-4 rounded-2xl transition-all ${pathname === "/admin/history" ? "bg-red-500/10 text-red-400 border border-red-500/30 shadow-inner" : "text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent"}`}>
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-semibold text-sm">Access Registry</span>
            </Link>
        </nav>
        
        <div className="p-6 border-t border-red-900/30">
            <form action={destroySession}>
              <button type="submit" className="w-full flex items-center justify-center space-x-3 py-4 bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 rounded-2xl transition-all group">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span className="font-bold text-sm tracking-wide">Terminate Session</span>
              </button>
            </form>
        </div>
      </aside>
    </>
  );
}

