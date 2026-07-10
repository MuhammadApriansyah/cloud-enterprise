import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Menggunakan min-h-screen dan bg-transparent agar tetap selaras dengan desain organik keseluruhan aplikasi
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-indigo-500/30">
      
      {/* 
        Sidebar kini bersifat floating dan fixed (diatur di dalam komponen Sidebar).
        Ia melayang di atas konten utama, sehingga tidak memerlukan pengaturan tata letak 
        khusus pada layout ini untuk berbagi ruang horizontal.
      */}
      <Sidebar />
      
      {/* 
        Main content memenuhi lebar penuh (w-full). 
        Padding diberikan untuk memastikan konten utama memiliki ruang napas 
        dan tidak tertutup oleh navigasi floating di sisi kiri bawah.
      */}
      <main className="w-full h-screen overflow-y-auto p-4 md:p-8 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto h-full">
          {children}
        </div>
      </main>

    </div>
  );
}

