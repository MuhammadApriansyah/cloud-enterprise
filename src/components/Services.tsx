import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section id="services" className="py-32 bg-black border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Built for Infrastructure Scale
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Abstraksi penyimpanan enterprise dengan efisiensi biaya mutlak dan keandalan tinggi.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <ServiceCard 
            title="Hybrid Storage Gateway" 
            description="Perutean cerdas otomatis yang membagi aliran data antara penyimpanan disk lokal secepat kilat atau dialihkan ke Google Drive 400GB fallback."
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>}
          />
          <ServiceCard 
            title="RBAC Security" 
            description="Kontrol akses berbasis peran yang ketat terintegrasi langsung dengan Supabase Policies untuk memastikan isolasi data antar penyewa bisnis."
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          />
          <ServiceCard 
            title="Real-time Analytics" 
            description="Pemantauan penggunaan memori peladen, latensi transmisi jaringan API, dan status kesehatan nodus kluster secara seketika melalui dasbor."
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          />
        </div>
      </div>
    </section>
  );
}

