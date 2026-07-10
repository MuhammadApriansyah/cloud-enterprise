"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Mendaftarkan plugin GSAP secara global
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleA11yChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleA11yChange);
    return () => mediaQuery.removeEventListener("change", handleA11yChange);
  }, []);

  // PERBAIKAN ARSITEKTUR: Matikan Lenis secara total di area Workspace/Dashboard!
  // Ini mencegah CSS Transform Trap yang menghancurkan layout dasbor.
  const isWorkspace = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  // Jika pengguna memiliki sensitivitas gerak ATAU sedang berada di Dasbor, gunakan scroll native
  if (isReducedMotion || isWorkspace) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        orientation: "vertical",
        gestureOrientation: "vertical",
        touchMultiplier: 2,
        wheelMultiplier: 1,
      }}
    >
      {children as any}
    </ReactLenis>
  );
}

