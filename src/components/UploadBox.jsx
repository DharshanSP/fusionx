import React, { useState, useRef } from 'react';
import { UploadCloud, X, FileText } from 'lucide-react';

export default function UploadBox({ files, setFiles }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validTypes = ['.jpg', '.jpeg', '.png', '.pdf', '.docx', '.pptx', '.txt'];
      const validFiles = droppedFiles.filter(f => validTypes.some(ext => f.name.toLowerCase().endsWith(ext)));
      if (validFiles.length > 0) {
        setFiles(prev => [...prev, ...validFiles]);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full relative animate-slide-up space-y-4">
      {/* Dropzone */}
      <div
        className={`relative overflow-hidden group rounded-[2.5rem] ${files.length > 0 ? 'p-8 md:p-10' : 'p-16 md:p-20'} text-center transition-all duration-500 ease-out cursor-pointer ${
          isDragging
            ? 'bg-indigo-500/20 border-indigo-400 scale-[1.02] shadow-[0_0_50px_rgba(99,102,241,0.2)]'
            : 'bg-[#1a1a1f]/40 hover:bg-[#1a1a1f]/80 backdrop-blur-xl border-white/10 hover:border-indigo-400/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)]'
        } border-2 border-dashed`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-700 pointer-events-none"></div>

        <input
          type="file"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf,.docx,.pptx,.txt"
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
          <div className={`p-4 rounded-3xl transition-all duration-500 ${isDragging ? 'bg-indigo-500/20 text-indigo-300 scale-110 shadow-[0_0_40px_rgba(99,102,241,0.4)]' : 'bg-white/5 text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover:-translate-y-1'}`}>
            <UploadCloud size={files.length > 0 ? 32 : 48} strokeWidth={1.5} />
          </div>
          <div>
            <p className={`${files.length > 0 ? 'text-base' : 'text-lg'} font-medium text-slate-200`}>
              {files.length > 0 ? "Add more files" : "Click to select"} <span className="text-slate-500 font-normal">or drop them here</span>
            </p>
            {files.length === 0 && (
              <p className="text-xs font-semibold tracking-wider text-slate-600 mt-2 uppercase">Supported: Images, PDF, Word, PPTX, TXT</p>
            )}
          </div>
        </div>
      </div>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {files.map((f, i) => (
            <div key={i} className="relative group premium-glow bg-[#1a1a1f]/80 backdrop-blur-xl rounded-[1.5rem] overflow-hidden p-4 flex items-center gap-4 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/50 flex-shrink-0 relative flex items-center justify-center border border-white/10 shadow-inner group-hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all">
                {f.type.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(f)} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileText size={24} className="text-indigo-400 opacity-80" strokeWidth={1.5} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-200 truncate">{f.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider font-medium">
                  {(f.size / 1024 / 1024).toFixed(2)} MB • {f.name.split('.').pop()}
                </p>
              </div>
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-red-500/20 rounded-full transition-all focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
