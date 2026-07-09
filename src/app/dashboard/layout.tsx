import UserSidebar from "./Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#020202] relative overflow-hidden">
      <UserSidebar />
      {/* Tidak ada lagi padding/margin kiri paksa, tidak ada header mobile bawaan */}
      <main className="flex-1 w-full relative z-10">
        {children}
      </main>
    </div>
  );
}

