"use server";
// src/app/admin/page.tsx
import ActionButtons from "./ActionButtons";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";


// 1. Ambil semua permohonan yang masih PENDING
export async function getPendingRequests() {
  const { data, error } = await supabase
    .from("access_requests")
    .select("*")
    .eq("status", "PENDING")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil data:", error);
    return [];
  }
  return data;
}

// 2. Setujui dan terbitkan Token Enkripsi
export async function approveRequest(id: string) {
  const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
  const generatedToken = `NX-${randomHex}`;

  const { error } = await supabase
    .from("access_requests")
    .update({ 
      status: "APPROVED", 
      access_token: generatedToken 
    })
    .eq("id", id);

  if (!error) {
    revalidatePath("/admin");
    revalidatePath("/admin/history");
    // KEMBALIKAN TOKEN KE FRONTEND
    return { success: true, token: generatedToken }; 
  }
  return { success: false };
}

// 3. Tolak permohonan
export async function rejectRequest(id: string) {
  const { error } = await supabase
    .from("access_requests")
    .update({ status: "REJECTED" })
    .eq("id", id);

  if (!error) {
    revalidatePath("/admin");
  }
}

