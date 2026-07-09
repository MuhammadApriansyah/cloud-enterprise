"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Mendaftarkan plugin GSAP secara global
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // FR-08: Accessibility-Aware Motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleA11yChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleA11yChange);
    return () => mediaQuery.removeEventListener("change", handleA11yChange);
  }, []);

  // Jika pengguna memiliki sensitivitas gerak, kembalikan skrol standar tanpa Lenis
  if (isReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // Tingkat kelancaran (semakin kecil = semakin berat/mulus)
        duration: 1.2, 
        smoothWheel: true,
        orientation: "vertical",
        gestureOrientation: "vertical",
        touchMultiplier: 2, // Merespons sentuhan HP agar tidak terasa lambat
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}

