"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSession(token: string) {
  // Menyetel cookie HttpOnly
  // Masa berlaku 7 hari (60 * 60 * 24 * 7)
  (await cookies()).set("session_token", token, {
    httpOnly: true, // Kunci utama: Tidak bisa diakses JS
    secure: process.env.NODE_ENV === "production", // Hanya via HTTPS di produksi
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, 
    path: "/",
  });
  console.log("Cookie disetel, mengalihkan ke dashboard...");
  redirect("/dashboard");
}

