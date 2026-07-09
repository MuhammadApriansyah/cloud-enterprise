"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface AuroraCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string; // Format: "rgba(99, 102, 241, 0.15)" (Indigo default)
}

export default function AuroraCard({ 
  children, 
  className = "", 
  glowColor = "rgba(99, 102, 241, 0.15)" 
}: AuroraCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`relative group rounded-[2rem] border border-white/[0.04] bg-[#050507]/40 backdrop-blur-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.01, translateY: -5 }}
    >
      {/* Dynamic Mouse-Tracking Glow Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Noise/Grain Texture Layer untuk Realisme Kaca */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay z-0"></div>
      
      {/* Konten Utama */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

