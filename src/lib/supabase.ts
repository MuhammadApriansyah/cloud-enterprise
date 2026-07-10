import { createClient } from '@supabase/supabase-js';

// Debugging: Kita log dulu ke terminal untuk melihat apa yang terbaca

// Jika kosong, kita berikan nilai "fallback" agar aplikasi tidak crash
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fqrzihsknvqgrpfvtsax.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "isi_anon_key_anda_di_sini";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "isi_service_key_anda_di_sini";

if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
  throw new Error("[FATAL] Supabase environment variables are missing!");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const createIsolatedClient = (customAccessToken?: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
    global: {
      headers: customAccessToken ? { Authorization: `Bearer ${customAccessToken}` } : {},
    },
  });
};

