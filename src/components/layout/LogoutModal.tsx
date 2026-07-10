"use client";
import { motion, AnimatePresence } from "framer-motion";
import { destroySession } from "@/app/auth/actions"; // Import fungsi destroySession dari file actions Anda

export default function LogoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-3xl w-full max-w-sm shadow-2xl">
          <h2 className="text-base font-bold mb-2">Logout Session</h2>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">Anda akan mengakhiri sesi ini dan perlu autentikasi ulang untuk mengakses kembali.</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-xs">Cancel</button>
            
            {/* Menggunakan form action untuk memicu Server Action destroySession */}
            <form action={destroySession} className="flex-1">
              <button type="submit" className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-xs">
                Logout
              </button>
            </form>
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

