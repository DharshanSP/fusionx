import React, { useState, useRef } from 'react';
import { UploadCloud, X, FileText } from 'lucide-react';

export default function UploadBox({ file, setFile }) {
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
      const droppedFile = e.dataTransfer.files[0];
      const validTypes = ['.jpg', '.jpeg', '.png', '.pdf', '.docx', '.pptx', '.txt'];
      if (validTypes.some(ext => droppedFile.name.toLowerCase().endsWith(ext))) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full relative animate-slide-up">
      {!file ? (
        <div
          className={`relative overflow-hidden group rounded-3xl p-10 text-center transition-all duration-300 ease-out cursor-pointer ${
            isDragging
              ? 'bg-indigo-500/10 border-indigo-500/50'
              : 'bg-[#1a1a1f]/60 hover:bg-[#202026]/80 border-white/5 hover:border-indigo-500/30'
          } border border-dashed`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {/* Subtle background glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-700 pointer-events-none"></div>

          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf,.docx,.pptx,.txt"
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-5 relative z-10">
            <div className={`p-5 rounded-2xl transition-all duration-500 ${isDragging ? 'bg-indigo-500/20 text-indigo-300 scale-110 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-indigo-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:-translate-y-1'}`}>
              <UploadCloud size={36} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-200">
                Click to select <span className="text-slate-500 font-normal">or drop a file</span>
              </p>
              <p className="text-xs font-semibold tracking-wider text-slate-600 mt-2 uppercase">Supported: Images, PDF, Word, PPTX, TXT</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group premium-glow bg-[#1a1a1f] rounded-3xl overflow-hidden p-5 flex items-center gap-5 layout-card">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black/40 flex-shrink-0 relative flex items-center justify-center border border-white/5 shadow-inner">
            {file.type.startsWith('image/') ? (
              <img 
                src={URL.createObjectURL(file)} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <FileText size={28} className="text-indigo-400 opacity-80" strokeWidth={1.5} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">{file.name}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.name.split('.').pop()}
            </p>
          </div>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clearFile();
            }}
            className="p-3 text-slate-400 hover:text-white hover:bg-red-500/20 rounded-full transition-all focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
