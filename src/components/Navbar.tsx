"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const navigateToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b ${
        /* Jika digulir ATAU menu seluler terbuka, nyalakan KACA UTAMA yang membungkus seluruh elemen */
        isScrolled || isMobileMenuOpen
          ? "bg-[#030303]/40 backdrop-blur-3xl border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? "py-3" : "py-5"}`}>
        <div className="flex justify-between items-center">
          
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-medium text-slate-200 tracking-tight drop-shadow-md">
              Nexa<span className="font-black text-white">Cloud</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1 border border-white/[0.05] bg-white/[0.02] rounded-full px-2 py-1 backdrop-blur-xl shadow-inner">
            <button onClick={() => navigateToSection("services")} className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-300">Services</button>
            <button onClick={() => navigateToSection("architecture")} className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.08] rounded-full transition-all duration-300">Architecture</button>
          </div>

          <div className="hidden md:flex">
            <Link href="/auth/login" className="group relative px-6 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-full text-sm font-bold text-white hover:bg-white/[0.1] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center space-x-2">
                <span>Access</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* REVISI: Kontainer Seluler Transparan (Menyatu dengan Navbar) */}
      <div 
        className={`md:hidden w-full transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Tidak ada lagi background terpisah di sini, murni tembus pandang mengikuti induk nav */}
        <div className="flex flex-col space-y-3 px-4 pb-6 pt-2">
          <button onClick={() => navigateToSection("services")} className="text-left px-5 py-3.5 text-slate-200 font-medium hover:bg-white/[0.08] rounded-2xl transition-colors border border-transparent hover:border-white/[0.05]">Services</button>
          <button onClick={() => navigateToSection("architecture")} className="text-left px-5 py-3.5 text-slate-200 font-medium hover:bg-white/[0.08] rounded-2xl transition-colors border border-transparent hover:border-white/[0.05]">Architecture</button>
          
          <Link href="/auth/login" className="mt-4 px-5 py-4 bg-white/[0.08] border border-white/[0.15] rounded-2xl text-white font-bold text-center hover:bg-white/[0.15] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

