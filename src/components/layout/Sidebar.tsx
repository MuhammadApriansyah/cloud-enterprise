"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Home, Menu, Shield, Zap, Key, LogOut, X } from "lucide-react";
import LogoutModal from "./LogoutModal";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
  { name: "Security", path: "/dashboard/security", icon: <Shield size={18} /> },
  { name: "Automations", path: "/dashboard/automation", icon: <Zap size={18} /> },
  { name: "API Gateway", path: "/dashboard/developer", icon: <Key size={18} /> },
];

export default function Sidebar() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isDesktop) {
    return (
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col gap-1 shadow-2xl">
        {NAV_ITEMS.map((item) => (
          <Link href={item.path} key={item.name} title={item.name}>
            <motion.div className={`p-3 rounded-xl transition-all ${pathname === item.path ? "bg-indigo-500/20 text-indigo-300" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
              {item.icon}
            </motion.div>
          </Link>
        ))}
        <div className="w-full h-px bg-white/10 my-1" />
        <button onClick={() => setShowLogout(true)} className="p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"><LogOut size={18} /></button>
        <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
      </aside>
    );
  }

  return (
    <>
      {/* MASTER CONTAINER (FR-NAV-025/026) - Expansion dari titik tengah */}
      <motion.div 
        layout
        initial={{ width: "160px", height: "56px" }}
        animate={{ 
          width: isOpen ? "210px" : "160px",
          height: isOpen ? "auto" : "56px"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#050505]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between h-[56px] px-4 shrink-0">
          <Search size={18} className="cursor-pointer hover:text-indigo-400" />
          <Link href="/dashboard"><Home size={18} /></Link>
          <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>

        {/* FR-NAV-024: Progressive Reveal setelah container stabil */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col px-4 pb-6 gap-3"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.05) }}
                >
                  <Link href={item.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 text-xs font-bold ${pathname === item.path ? "text-indigo-300" : "text-slate-300"}`}>
                    {item.icon} {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => setShowLogout(true)} className="flex items-center gap-3 text-xs font-bold text-red-400">
                <LogOut size={18} /> Logout
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
    </>
  );
}

