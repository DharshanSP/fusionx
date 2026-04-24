import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

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
      if (droppedFile.type.startsWith('image/')) {
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
          className={`relative overflow-hidden group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ease-in-out cursor-pointer ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50'
              : 'border-slate-300 hover:border-indigo-400 bg-white/50 hover:bg-slate-50/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`p-4 rounded-full transition-colors duration-300 ${isDragging ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
              <UploadCloud size={32} />
            </div>
            <div>
              <p className="text-base font-medium text-slate-700">
                Click to upload <span className="text-slate-400 font-normal">or drag and drop</span>
              </p>
              <p className="text-sm text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
            <img 
              src={URL.createObjectURL(file)} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button 
            type="button"
            onClick={clearFile}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
