"use client";

import { useEffect, useState } from "react";

interface ClickCircle {
  id: number;
  x: number;
  y: number;
}

export default function ClickEffect() {
  const [ripples, setRipples] = useState<ClickCircle[]>([]);

  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      // Mengakomodasi koordinat baik dari Mouse klik maupun sentuhan layar HP
      let clientX = 0;
      let clientY = 0;

      if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }

      const newRipple = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Hapus elemen dari DOM setelah animasi selesai agar menghemat RAM perangkat
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <>
      {/* Inject Keyframe Animasi Premium Secara Dinamis */}
      <style>{`
        @keyframes premiumRippleOut {
          0% {
            transform: translate(-50%, -50%) scale(0.2);
            opacity: 0.8;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
            filter: blur(4px);
          }
        }
        @keyframes premiumCorePulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }
      `}</style>

      {/* Layer Kanvas Interaksi */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute"
            style={{ left: ripple.x, top: ripple.y }}
          >
            {/* Gelombang Riak 1 (Indigo Wave) */}
            <div 
              className="absolute rounded-full border border-indigo-500/40 bg-indigo-500/5 w-16 h-16"
              style={{ animation: "premiumRippleOut 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards" }}
            />
            
            {/* Gelombang Riak 2 (Cyan Wave - Delay Tipis untuk Efek Cairan) */}
            <div 
              className="absolute rounded-full border border-cyan-400/30 w-16 h-16"
              style={{ animation: "premiumRippleOut 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) 0.1s forwards" }}
            />

            {/* Titik Inti Sentuhan (Core Flash) */}
            <div 
              className="absolute bg-gradient-to-tr from-white to-indigo-400 w-2 h-2 rounded-full shadow-[0_0_10px_#6366f1]"
              style={{ animation: "premiumCorePulse 0.4s ease-out forwards" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

