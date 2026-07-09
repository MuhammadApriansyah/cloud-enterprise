"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encrypt } from "@/lib/session";

export async function createSession(token: string, context: "USER" | "ADMIN" = "USER") {
  // Simulasi database kredensial (Di dunia nyata, ini dicocokkan dengan Supabase/Database)
  const masterKey = process.env.ADMIN_MASTER_KEY || "CLOUDENTER-ROOT-ACCESS-617";
  const userAccessKey = process.env.USER_ACCESS_KEY || "NX-CLOUDENTER13"; 
  
  const isAdminToken = token === masterKey;
  const isUserToken = token === userAccessKey;

  // 1. Validasi Zero-Trust
  if (context === "USER" && isAdminToken) {
    return { error: "Otorisasi ditolak: Kredensial Root tidak diizinkan pada gerbang publik." };
  }
  if (context === "USER" && !isUserToken) {
    return { error: "Otorisasi Gagal: Personal Access Token (PAT) tidak valid." };
  }
  if (context === "ADMIN" && !isAdminToken) {
    return { error: "Otorisasi Gagal: Protokol keamanan dilanggar." };
  }

  // 2. Pembuatan Payload Sesi
  const expires = new Date(Date.now() + 12 * 60 * 60 * 1000); // Masa berlaku: 12 Jam
  const sessionPayload = {
    role: isAdminToken ? "ADMIN" : "USER",
    node: isAdminToken ? "Root Command" : "Client Node",
    expires,
  };

  // 3. Enkripsi Payload menjadi JWT
  const encryptedSession = await encrypt(sessionPayload);

  // 4. Injeksi Cookie Aman (Anti-XSS & Anti-CSRF)
  const cookieStore = await cookies();
  cookieStore.set("session_token", encryptedSession, {
    httpOnly: true, // Tidak bisa dibaca oleh JavaScript peramban (Aman dari pencurian token)
    secure: process.env.NODE_ENV === "production", // Wajib HTTPS di mode production
    sameSite: "lax", 
    expires: expires,
    path: "/", 
  });
  
  // 5. Pengalihan Rute Adaptif
  if (isAdminToken) {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function requestAccess(formData: FormData) {
  // Simulasi jeda waktu untuk proses pendaftaran ke database (1.5 detik)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const name = formData.get("name");
  const email = formData.get("email");

  // Validasi sederhana
  if (!name || !email) {
    return { error: "Semua data otorisasi wajib diisi." };
  }

  // Jika Anda ingin menambahkan logika penyimpanan database betulan, letakkan di sini nanti.
  
  // Mengembalikan sinyal sukses ke antarmuka klien
  return { success: true };
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
  redirect("/auth/login");
}

