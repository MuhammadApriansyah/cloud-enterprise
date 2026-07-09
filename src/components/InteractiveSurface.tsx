"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

const TOKENS = {
  surfaceBg: "rgba(5, 11, 20, 0.4)", 
  borderDefault: "rgba(255, 255, 255, 0.03)",
  borderHover: "rgba(34, 211, 238, 0.2)", // Cyan border on hover
  glowColor: "rgba(34, 211, 238, 0.15)", 
};

interface InteractiveSurfaceProps {
  children: ReactNode;
  className?: string;
  glowOverride?: string;
}

export default function InteractiveSurface({
  children,
  className = "",
  glowOverride = TOKENS.glowColor,
}: InteractiveSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Fisika Kursor untuk Glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fisika Spring untuk Transformasi 3D (FR-03: Spatial Transition)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Hitung posisi kursor relatif (untuk Glow)
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // Hitung persentase posisi kursor dari tengah elemen (untuk Rotasi 3D)
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        backgroundColor: TOKENS.surfaceBg,
        borderColor: TOKENS.borderDefault,
      }}
      whileHover={{ borderColor: TOKENS.borderHover }}
      className={`relative group rounded-3xl border backdrop-blur-2xl shadow-2xl transition-colors duration-500 overflow-hidden ${className}`}
    >
      {/* Dynamic 3D Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowOverride}, transparent 40%)`,
        }}
      />
      
      {/* Konten diangkat sedikit pada sumbu Z untuk ilusi kedalaman */}
      <div className="relative z-10 h-full w-full" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

