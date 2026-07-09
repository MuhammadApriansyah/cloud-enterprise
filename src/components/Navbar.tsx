"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isHome = pathname === "/";
  // Deteksi rute di mana Navbar HARUS musnah total
  const isDashboardOrAdmin = pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname === "/auth/root-access";
  
  const navLinks = ["Services", "Architecture", "About"];

  useEffect(() => {
    // 1. Jika di Dashboard/Admin, matikan Navbar
    if (isDashboardOrAdmin) {
      setShowNavbar(false);
      return;
    }

    // 2. Jika di halaman publik (Login/Register), paksa tampilkan ikon Home
    if (!isHome) {
      setShowNavbar(true);
      return;
    }

    // 3. Logika gulir khusus Landing Page
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      setShowNavbar(currentScroll > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome, isDashboardOrAdmin]);

  // Tutup menu mobile otomatis jika state berubah
  useEffect(() => {
    if (!showNavbar || !isHome) {
      setMobileMenuOpen(false);
    }
  }, [pathname, showNavbar, isHome]);

  // Eksekusi Pemusnahan: Jangan render apapun di Dashboard & Admin
  if (isDashboardOrAdmin) return null;

  return (
    <>
      <AnimatePresence>
        {showNavbar && (
          <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 24, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-[60] flex justify-center pointer-events-none px-4 md:px-6 transform-gpu"
          >
            {isHome ? (
              /* NAVBAR UTAMA (Landing Page) */
              <div className="bg-[#0f1422]/70 backdrop-blur-3xl border border-white/[0.06] rounded-full px-6 md:px-8 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto w-full max-w-fit gap-4 md:gap-10">
                
                <AnimatePresence mode="wait">
                  {scrollY > 800 && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="overflow-hidden whitespace-nowrap border-r border-white/10 pr-4 md:pr-6"
                    >
                      <span className="font-black text-sm tracking-tighter text-white">NexaCloud</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <nav className="hidden md:flex items-center space-x-8">
                  {navLinks.map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase()}-section`} 
                      className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </a>
                  ))}
                </nav>

                <div className="flex items-center gap-3">
                  <Link 
                    href="/auth/login" 
                    className="bg-white text-[#070a13] px-5 md:px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
                  >
                    Try
                  </Link>

                  <button 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] active:scale-95 transition-transform"
                  >
                    <span className={`block w-3 h-[1.5px] bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[1.5px]' : '-translate-y-0.5'}`} />
                    <span className={`block w-3 h-[1.5px] bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[1.5px]' : 'translate-y-0.5'}`} />
                  </button>
                </div>
              </div>
            ) : (
              /* NAVBAR LOGIN / REGISTER (Ikon Home Mungil) */
              <Link 
                href="/"
                className="w-12 h-12 bg-[#0f1422]/60 backdrop-blur-3xl border border-white/[0.06] rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto hover:bg-white/[0.05] hover:scale-110 active:scale-95 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            )}
          </motion.header>
        )}
      </AnimatePresence>

      {/* Menu Overlay Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && isHome && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-24 z-[55] bg-[#0f1422]/95 backdrop-blur-3xl border border-white/[0.08] rounded-3xl p-6 flex flex-col space-y-6 md:hidden pointer-events-auto shadow-2xl"
          >
            {navLinks.map((item, i) => (
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={item}
                href={`#${item.toLowerCase()}-section`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300 hover:text-white transition-colors border-b border-white/[0.05] pb-4"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

