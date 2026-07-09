import UserSidebar from "./Sidebar";
import OrganicEnvironment from "@/components/OrganicEnvironment";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen text-white relative overflow-hidden font-sans selection:bg-cyan-500/30">
      {/* Fondasi Spasial Enterprise */}
      <OrganicEnvironment />
      
      <UserSidebar />
      <main className="flex-1 w-full relative z-10">
        {children}
      </main>
    </div>
  );
}

