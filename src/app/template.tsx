"use client";

import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        @keyframes cinematicEnter {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.99);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
      `}</style>
      
      {/* Menerapkan kurva kubik (cubic-bezier) agar gerakan lambat di akhir (ease-out) */}
      <div 
        className="w-full h-full"
        style={{ 
          animation: "cinematicEnter 0.7s cubic-bezier(0.1, 0.8, 0.3, 1) forwards" 
        }}
      >
        {children}
      </div>
    </>
  );
}

