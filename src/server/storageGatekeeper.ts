"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

// --- MIDDLEWARE KEAMANAN INTERNAL ---
async function validateGatekeeper() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) throw new Error("Akses Ditolak: Sesi tidak ditemukan.");
  
  const session = await decrypt(token);
  if (!session) throw new Error("Akses Ditolak: Sesi tidak valid atau kedaluwarsa.");
  
  // PERBAIKAN ARSITEKTUR: Gunakan Service Role Key untuk operasi mutasi di Server (Bypass RLS dengan aman)
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) throw new Error("[FATAL] SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di env.");

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey);
}

// --- READ: Mengambil Data dari Supabase ---
export async function getVaultAssetsAction() {
  try {
    const supabase = await validateGatekeeper();
    // Mengambil data dan mengurutkan dari yang terbaru
    const { data, error } = await supabase.from("vault_assets").select("*").order("created_at", { ascending: false });
    
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- CREATE: Mengunggah file ---
export async function uploadAssetAction(formData: FormData) {
  try {
    const supabase = await validateGatekeeper();
    const file = formData.get("file") as File;
    if (!file) throw new Error("File tidak valid.");

    const filePath = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`; // Sanitasi nama file

    // 1. Upload ke Storage
    const { error: storageError } = await supabase.storage.from("vault").upload(filePath, file);
    if (storageError) throw storageError;

    // 2. Simpan metadata ke DB
    const { error: dbError } = await supabase.from("vault_assets").insert({
      file_name: file.name,
      file_size: file.size,
      file_type: file.name.split('.').pop()?.toUpperCase() || "UNKNOWN",
      storage_path: filePath,
    });
    
    if (dbError) throw dbError;

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- UPDATE: Mengubah nama file ---
export async function renameAssetAction(id: string, newName: string) {
  try {
    const supabase = await validateGatekeeper();
    const { error } = await supabase.from("vault_assets").update({ file_name: newName }).eq("id", id);
    if (error) throw error;
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// --- DELETE: Menghapus file ---
export async function deleteAssetAction(id: string, storagePath: string) {
  try {
    const supabase = await validateGatekeeper();
    await supabase.storage.from("vault").remove([storagePath]);
    const { error } = await supabase.from("vault_assets").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

