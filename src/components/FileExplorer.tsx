"use client";

import { useState } from "react";

// Tipe Data Standar untuk Berkas
type FileItem = {
  id: string;
  name: string;
  type: "folder" | "image" | "document" | "video";
  size: string;
  updatedAt: string;
};

// Data Tiruan (Mock Data) untuk visualisasi awal
const MOCK_FILES: FileItem[] = [
  { id: "1", name: "Corporate_Assets", type: "folder", size: "--", updatedAt: "Oct 24, 2025" },
  { id: "2", name: "Q3_Financial_Report.pdf", type: "document", size: "4.2 MB", updatedAt: "Nov 02, 2025" },
  { id: "3", name: "Architecture_Diagram.png", type: "image", size: "1.8 MB", updatedAt: "Nov 15, 2025" },
  { id: "4", name: "Client_Presentation.mp4", type: "video", size: "124.5 MB", updatedAt: "Dec 01, 2025" },
  { id: "5", name: "Encrypted_Keys", type: "folder", size: "--", updatedAt: "Jan 10, 2026" },
];

export default function FileExplorer() {
  const [searchQuery, setSearchQuery] = useState("");

  // Logika Pencarian Sederhana
  const filteredFiles = MOCK_FILES.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper untuk merender ikon berdasarkan tipe berkas
  const renderIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>;
      case "image":
        return <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
      case "video":
        return <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
      default:
        return <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      
      {/* TOOLBAR: Search & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Search Bar */}
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

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] px-5 py-3 rounded-2xl text-sm font-medium text-slate-200 transition-all duration-300 shadow-lg">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            <span>Filter</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 px-5 py-3 rounded-2xl text-sm font-bold text-white transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="w-full bg-white/[0.01] border border-white/[0.05] rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Date Modified</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Size</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-white/[0.03] transition-colors group cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white/[0.05] rounded-xl group-hover:scale-110 transition-transform">
                          {renderIcon(file.type)}
                        </div>
                        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{file.updatedAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{file.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-2 text-slate-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-sm">
                    No files found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

