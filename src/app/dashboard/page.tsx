import FileExplorer from "@/components/FileExplorer"; // <--- Import Komponen Baru
import SpotlightCard from "@/components/SpotlightCard";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
      
      {/* Kartu Status Premium */}
      <div className="relative group rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8 overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-light text-slate-300 tracking-tight">Active <span className="font-bold text-white">Node</span></h2>
            <p className="text-slate-500 text-sm tracking-wide">Secure connection established with regional servers.</p>
          </div>
          
          <div className="flex items-end space-x-6">
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Encrypted Storage</span>
              <div className="flex items-baseline space-x-1 justify-end">
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 tracking-tighter">142.5</span>
                <span className="text-lg text-slate-500 font-medium">GB</span>
              </div>
            </div>
            
            <div className="w-1.5 h-12 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="w-full h-[35%] bg-gradient-to-t from-indigo-600 to-blue-400 rounded-full animate-[slideUp_1.5s_ease-out]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Eksekusi File Explorer yang dibungkus SpotlightCard */}
      <SpotlightCard>
        <div className="p-8">
          <FileExplorer />
        </div>
      </SpotlightCard>

    </div>
  );
}

