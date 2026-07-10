import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import ClickEffect from "@/components/ui/ClickEffect";
import OrganicEnvironment from "@/components/ui/OrganicEnvironment";
import SmoothScroll from "@/components/ui/SmoothScroll";

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
      <body className={`${inter.className} bg-[#030303] text-slate-300 antialiased selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden`}>

        {/* Sumber Kebenaran Tunggal WebGL - Dilarang dipanggil ulang di tempat lain! */}
        <OrganicEnvironment />

        <ClickEffect />

        <div className="relative z-10 w-full">
          <Navbar />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </div>

      </body>
    </html>
  );
}

