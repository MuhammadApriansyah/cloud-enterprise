export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303]/50 backdrop-blur-md">
      <div className="relative flex flex-col items-center space-y-4">
        {/* Lingkaran Pendar Berputar */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-blue-400 animate-[spin_1.5s_reverse_infinite]"></div>
          <div className="absolute inset-4 rounded-full border-b-2 border-purple-500 animate-spin"></div>
        </div>
        
        {/* Teks dengan efek Pulse */}
        <div className="text-sm font-medium tracking-[0.2em] text-indigo-400/80 uppercase animate-pulse">
          Establishing Link
        </div>
      </div>
    </div>
  );
}

