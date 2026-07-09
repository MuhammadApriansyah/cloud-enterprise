"use client";

import { motion } from "framer-motion";
import AetherBackground from "@/components/AetherBackground";
import Services from "@/components/Services";
import Architecture from "@/components/Architecture";
import About from "@/components/About";

// Refaktorisasi v5.1: Menggunakan whileInView untuk menjamin elemen 100% fokus
function TransformSection({ children, id }: { children: React.ReactNode, id?: string }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.15 }} // Animasi terpicu saat 15% elemen terlihat
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full min-h-[100vh] flex flex-col justify-center origin-center py-10 will-change-transform transform-gpu"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const handleTransitionScroll = () => {
    const targetElement = document.getElementById("services-section");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-[#070a13] text-white overflow-x-hidden min-h-screen font-sans select-none selection:bg-blue-500/20">
      
      <AetherBackground />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* HERO SECTION */}
        <TransformSection>
          <section className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl space-y-8 transform-gpu"
            >
              <div className="inline-flex items-center space-x-3 bg-white/[0.02] border border-white/[0.06] rounded-full px-5 py-2 backdrop-blur-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
                  Privacy by Default
                </span>
              </div>

              <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-400">Trust.</span>
              </h1>

              <p className="max-w-2xl text-base md:text-xl text-slate-400 tracking-[0.3em] uppercase font-light mx-auto leading-relaxed">
                Safe. Simple. Reliable.
              </p>

              <div className="pt-10">
                <motion.button
                  onClick={handleTransitionScroll}
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.95)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="px-14 py-5 bg-white text-[#070a13] font-bold text-xs uppercase tracking-[0.3em] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all"
                >
                  Explore Our Architecture
                </motion.button>
              </div>
            </motion.div>

            <div className="absolute bottom-16 flex flex-col items-center opacity-30">
              <motion.div
                animate={{ height: [0, 50, 0], opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="w-[1.5px] bg-gradient-to-b from-blue-400 to-transparent"
              />
            </div>
          </section>
        </TransformSection>

        {/* ECOSYSTEM SECTIONS */}
        <div className="w-full max-w-7xl px-6 pb-32">
          <TransformSection id="services-section">
            <div className="bg-[#0f1422]/40 backdrop-blur-3xl border border-white/[0.04] rounded-[3.5rem] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <Services />
            </div>
          </TransformSection>

          <TransformSection id="architecture-section">
            <div className="bg-[#0f1422]/40 backdrop-blur-3xl border border-white/[0.04] rounded-[3.5rem] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <Architecture />
            </div>
          </TransformSection>

          <TransformSection id="about-section">
            <div className="bg-[#0f1422]/40 backdrop-blur-3xl border border-white/[0.04] rounded-[3.5rem] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <About />
            </div>
          </TransformSection>
        </div>

      </div>
    </div>
  );
}

