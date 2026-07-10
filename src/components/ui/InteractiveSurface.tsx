"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

const TOKENS = {
  surfaceBg: "rgba(5, 11, 20, 0.4)",
  borderDefault: "rgba(255, 255, 255, 0.03)",
  borderHover: "rgba(34, 211, 238, 0.2)", 
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    // Hindari perhitungan 3D di layar sentuh (mobile) karena tidak ada mouse berkelanjutan
    if (window.matchMedia("(max-width: 768px)").matches) return;
    
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

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
      /* PERFORMANCE FIX 5: Matikan backdrop-blur sepenuhnya di mobile (backdrop-blur-none).
        Terapkan hanya di desktop (md:backdrop-blur-md).
        Karena layar mobile sudah sangat kecil, blur di atas 3D canvas akan membunuh baterai dan FPS.
      */
      className={`relative group rounded-3xl border backdrop-blur-none md:backdrop-blur-md shadow-lg transition-colors duration-500 overflow-hidden transform-gpu will-change-transform ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0 hidden md:block" // Sembunyikan spotlight di mobile
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${glowOverride}, transparent 40%)`,
        }}
      />

      {/* PERFORMANCE FIX 6: Matikan translateZ di mobile untuk menghindari compositing layer ekstra */}
      <div className="relative z-10 h-full w-full md:[transform:translateZ(20px)]">
        {children}
      </div>
    </motion.div>
  );
}

