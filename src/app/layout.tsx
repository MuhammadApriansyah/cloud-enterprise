import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClickEffect from "@/components/ClickEffect";
import PremiumBackground from "@/components/PremiumBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexaCloud | Enterprise Hybrid Storage",
  description: "Arsitektur penyimpanan hibrida cerdas skala besar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#030303] text-slate-300 antialiased selection:bg-indigo-500/30 selection:text-white relative`}>
        
        {/* Layer Paling Bawah: Noise & Grid */}
        <PremiumBackground />
        
        {/* Layer Interaksi */}
        <ClickEffect /> 
        
        {/* Layer Navigasi & Konten Berada di Atas (z-index relatif) */}
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
        
      </body>
    </html>
  );
}

