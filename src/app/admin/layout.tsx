import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#020202] relative overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 w-full relative z-10">
        {children}
      </main>
    </div>
  );
}

