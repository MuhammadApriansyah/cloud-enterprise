"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Fungsi untuk masuk (Login)
export async function createSession(token: string) {
  // TUNGGU (await) balang kuki dibuka terlebih dahulu
  const cookieStore = await cookies();
  
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 hari
    path: "/",
  });
  
  redirect("/dashboard");
}

// Fungsi untuk keluar (Logout)
export async function destroySession() {
  // TUNGGU (await) balang kuki dibuka terlebih dahulu
  const cookieStore = await cookies();
  
  // Sekarang kita boleh menggunakan fungsi delete() dengan selamat
  cookieStore.delete("session");
  
  redirect("/");
}

