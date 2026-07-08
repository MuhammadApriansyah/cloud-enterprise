import Link from "next/link";
import Services from "@/components/Services";
import Architecture from "@/components/Architecture";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* HERO SECTION WITH DYNAMIC GRADIENT AND GLOW */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black">
        
        {/* Animated Ambient Light Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full filter blur-[120px] animate-[pulse_6s_infinite]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-[100px] animate-[pulse_8s_infinite]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge Alert Interaktif */}
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-md hover:border-indigo-400/50 transition-all duration-300 cursor-pointer group">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">Next-Gen Storage Architecture v3.2 Active</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-none">
            Secure Storage <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-sm">
              Without Constraints
            </span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-slate-400 mx-auto leading-relaxed">
            Arsitektur penyimpanan hibrida cerdas skala besar. Kecepatan komputasi edge lokal berpadu sempurna dengan kapasitas tak terbatas penyimpanan awan terdistribusi.
          </p>
          
          {/* Interactive CTA Buttons - Minimalist Ultra-Premium */}
          <div className="flex justify-center items-center pt-4 animate-[slideUp_1s_ease-out_0.5s_both]">
            <Link href="#architecture" className="px-10 py-4 text-sm uppercase tracking-widest font-bold rounded-full text-white bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-500 text-center backdrop-blur-md">
              Explore Architecture
            </Link>
          </div>
        </div>
      </section>

      <Services />
      <Architecture />
    </div>
  );
}

