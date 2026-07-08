"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection("hero")}>
            <span className="text-2xl font-bold text-indigo-600">NexaCloud</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => scrollToSection("services")} className="text-slate-600 hover:text-indigo-600 font-medium transition">Services</button>
            <button onClick={() => scrollToSection("architecture")} className="text-slate-600 hover:text-indigo-600 font-medium transition">Architecture</button>
            <div className="h-6 w-px bg-slate-300"></div>
            <Link href="/auth/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold transition">
              Client Login
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-4 py-4 space-y-2 bg-white border-b">
          <button onClick={() => scrollToSection("services")} className="block w-full text-left font-medium text-slate-700">Services</button>
          <button onClick={() => scrollToSection("architecture")} className="block w-full text-left font-medium text-slate-700">Architecture</button>
          <Link href="/auth/login" className="block w-full text-center mt-4 px-3 py-3 font-bold text-white bg-indigo-600 rounded-lg">Client Login</Link>
        </div>
      </div>
    </nav>
  );
}

