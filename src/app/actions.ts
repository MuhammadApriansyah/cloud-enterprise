"use server";

import { createIsolatedClient } from "@/lib/supabase";
import { encrypt, decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// --- MUTATION ACTIONS ---

export async function createSession(pat: string, role: "USER" | "ADMIN") {
  // PERBAIKAN 5: Enkripsi payload nyata, bukan sekadar menyimpan string mentah.
  const sessionToken = await encrypt({ pat, role });
  
  const cookieStore = await cookies();
  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 12, // Selaraskan dengan 12 jam pada session.ts
    path: "/",
  });

  console.log(`[AUTH] Sesi terenkripsi berhasil disuntikkan untuk Role: ${role}`);
  
  // Arahkan ke rute yang tepat berdasarkan otorisasi
  if (role === "ADMIN") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

// --- QUERY ACTIONS ---

export async function getPendingRequests() {
  try {
    // PERBAIKAN 6: ZERO TRUST ARCHITECTURE (EFSER Vol IX Ch 2).
    // Dilarang melakukan kueri sebelum identitas divalidasi mutlak.
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    
    if (!token) {
      throw new Error("Akses ditolak: Tidak ada kredensial sesi.");
    }

    const session = await decrypt(token);
    if (!session || session.role !== "ADMIN") {
      throw new Error("Akses ditolak: Privilese entitas tidak mencukupi.");
    }

    // PERBAIKAN 7: Inisialisasi Klien Terisolasi (Isolated Client)
    // Jika kita menggunakan RLS (Row Level Security) di Postgres, kita lemparkan token ini
    const supabase = createIsolatedClient(); 

    const { data, error } = await supabase
      .from("requests") 
      .select("*")
      .eq("status", "pending");

    if (error) {
      console.error("[DB_ERROR] Anomali pengambilan data pending requests:", error.message);
      return []; 
    }

    return data || [];
  } catch (err: any) {
    // Penanganan error eksplisit, tidak memutus runtime tapi memberikan log keamanan
    console.error(`[SEC_VIOLATION] getPendingRequests ditolak. Alasan: ${err.message}`);
    return [];
  }
}

