"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase"; // Memanggil koneksi Supabase kita

// Tipe Data Sementara
type FileItem = {
  id: string;
  name: string;
  type: "folder" | "image" | "document" | "video";
  size: string;
  updatedAt: string;
};

const MOCK_FILES: FileItem[] = [
  { id: "1", name: "Corporate_Assets", type: "folder", size: "--", updatedAt: "Oct 24, 2025" },
  { id: "2", name: "Q3_Financial_Report.pdf", type: "document", size: "4.2 MB", updatedAt: "Nov 02, 2025" },
];

export default function FileExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false); // State untuk efek loading
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = MOCK_FILES.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderIcon = (type: string) => {
    switch (type) {
      case "folder": return <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>;
      case "document": return <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
      default: return <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    }
  };

  // FUNGSI 1: Memicu klik pada input file yang tersembunyi
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // FUNGSI 2: Memproses berkas dan mengirim ke Supabase
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Membuat nama unik agar tidak terjadi tabrakan jika ada file bernama sama
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${uniqueFileName}`;

      // Eksekusi API Supabase Storage
      const { data, error } = await supabase.storage
        .from('enterprise_vault')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false // Jangan timpa file jika sudah ada
        });

      if (error) throw error;

      alert(`Berhasil mengamankan berkas: ${file.name}`);
      
    } catch (error: any) {
      console.error(error);
      alert(`Gagal mengunggah: ${error.message}`);
    } finally {
      setIsUploading(false);
      // Bersihkan memori input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 relative">
      
      {/* Input File Tersembunyi (The Hidden Engine) */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input
            type="text"
            placeholder="Search network assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all duration-300 shadow-inner"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Tombol Upload Interaktif */}
          <button 
            onClick={handleUploadClick}
            disabled={isUploading}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            )}
            <span>{isUploading ? "Encrypting..." : "Upload File"}</span>
          </button>
        </div>
      </div>

      {/* DATA TABLE (Sama seperti sebelumnya) */}
      <div className="w-full bg-white/[0.01] border border-white/[0.05] rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Modified</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-white/[0.03] transition-colors group cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white/[0.05] rounded-xl group-hover:scale-110 transition-transform">
                        {renderIcon(file.type)}
                      </div>
                      <span className="text-sm font-medium text-slate-300">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{file.updatedAt}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

