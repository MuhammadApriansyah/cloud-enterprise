"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import InteractiveSurface from "./InteractiveSurface";
import { motion } from "framer-motion";

type FileItem = { id: string; name: string; type: string; size: string; updatedAt: string; };

const formatToWIB = (isoString: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta", year: "numeric", month: "short", day: "2-digit",
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  }).format(new Date(isoString));
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024, dm = decimals < 0 ? 0 : decimals, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [processingFileId, setProcessingFileId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage.from('enterprise_vault').list('uploads', {
        limit: 100, offset: 0, sortBy: { column: 'created_at', order: 'desc' },
      });
      if (error) throw error;
      if (data) {
        setFiles(data.filter((f) => f.name !== '.emptyFolderPlaceholder').map((file) => ({
          id: file.id ?? file.name,
          name: file.name,
          type: file.metadata?.mimetype?.split('/')[0] || 'document',
          size: formatBytes(file.metadata?.size || 0),
          updatedAt: formatToWIB(file.created_at || new Date().toISOString()),
        })));
      }
    } catch (error) { console.error("Gagal mengambil data:", error); } 
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleDownload = async (fileName: string, fileId: string) => {
    try {
      setProcessingFileId(fileId);
      const { data, error } = await supabase.storage.from('enterprise_vault').download(`uploads/${fileName}`);
      if (error) throw error;
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url; a.download = fileName; document.body.appendChild(a); a.click();
      window.URL.revokeObjectURL(url); document.body.removeChild(a);
    } catch (error: any) { alert(`Gagal mengunduh: ${error.message}`); } 
    finally { setProcessingFileId(null); }
  };

  const handleDelete = async (fileName: string, fileId: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus berkas "${fileName}" dari brankas aman?`)) return;
    try {
      setProcessingFileId(fileId);
      const { error } = await supabase.storage.from('enterprise_vault').remove([`uploads/${fileName}`]);
      if (error) throw error;
      await fetchFiles();
    } catch (error: any) { alert(`Gagal menghapus: ${error.message}`); } 
    finally { setProcessingFileId(null); }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `${file.name.replace(`.${fileExt}`, '')}_${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('enterprise_vault').upload(`uploads/${uniqueFileName}`, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;
      await fetchFiles();
    } catch (error: any) { alert(`Gagal mengunggah: ${error.message}`); } 
    finally { setIsUploading(false); if (fileInputRef.current) fileInputRef.current.value = ""; }
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderIcon = (type: string) => {
    if (type === "image") return <svg className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    if (type === "video") return <svg className="w-5 h-5 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
    return <svg className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
  };

  return (
    <InteractiveSurface className="p-8 space-y-8" glowOverride="rgba(14, 116, 144, 0.15)">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">
        <div className="relative w-full md:w-auto flex-1 group">
          <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search network assets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black/50 border border-white/[0.05] rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/[0.02] transition-colors shadow-inner" />
        </div>
        
        <motion.button
          onClick={() => fileInputRef.current?.click()} disabled={isUploading}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="w-full md:w-auto px-6 py-3 bg-white text-[#050B14] hover:bg-cyan-50 font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          {isUploading ? (
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          )}
          <span>{isUploading ? "Encrypting..." : "Upload Asset"}</span>
        </motion.button>
      </div>

      {/* File List */}
      <div className="space-y-3 relative z-10 min-h-[300px]">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-transparent z-10">
            <div className="w-8 h-8 border-2 border-t-cyan-400 border-r-transparent border-b-cyan-400/30 border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <div key={file.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-black/40 border border-white/[0.03] hover:border-cyan-500/30 rounded-2xl transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 flex items-center justify-center shrink-0 transition-all">
                  {renderIcon(file.type)}
                </div>
                <div className="truncate pr-4">
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">{file.name}</h4>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-[10px] text-cyan-400/80 font-mono tracking-wider uppercase">{file.type}</span>
                    <span className="text-[10px] text-slate-600 font-mono">•</span>
                    <span className="text-[10px] text-slate-500 font-mono">{file.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end space-x-6 border-t border-white/[0.05] md:border-none pt-4 md:pt-0">
                <span className="text-xs font-mono text-slate-500">{file.updatedAt}</span>
                <div className="flex items-center space-x-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  {processingFileId === file.id ? (
                    <div className="w-8 h-8 flex items-center justify-center"><div className="w-4 h-4 border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div></div>
                  ) : (
                    <>
                      <button onClick={() => handleDownload(file.name, file.id)} className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all" title="Download Asset"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
                      <button onClick={() => handleDelete(file.name, file.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete Asset"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border border-white/[0.02] rounded-2xl border-dashed">
            <svg className="w-8 h-8 text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <span className="text-slate-300 text-sm font-bold">Node Penyimpanan Kosong</span>
          </div>
        )}
      </div>
    </InteractiveSurface>
  );
}

