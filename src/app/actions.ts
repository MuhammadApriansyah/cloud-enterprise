"use server";

import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(token: string) {
  const cookieStore = await cookies();
  
  cookieStore.set("session_token", token, {
    httpOnly: true,
    // UBAH INI: Jika di localhost, secure HARUS false kecuali Anda pakai HTTPS lokal
    secure: process.env.NODE_ENV === "production", 
    // SAME SITE LAX sangat penting agar cookie dikirim saat redirect
    sameSite: "lax", 
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  
  console.log("Cookie berhasil diset untuk session:", token);
  redirect("/dashboard");
}

export async function getPendingRequests() {
  try {
    // Logika: Mengambil data dari tabel 'requests' dengan status 'pending'
    const { data, error } = await supabase
      .from("requests") // Sesuaikan dengan nama tabel di database Anda
      .select("*")
      .eq("status", "pending");

    if (error) {
      console.error("Error fetching pending requests:", error);
      return []; // Return array kosong jika error
    }

    return data || [];
  } catch (err) {
    console.error("Unexpected error:", err);
    return [];
  }
}

