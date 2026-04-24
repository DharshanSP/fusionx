import React from 'react';
import { Sparkles, Cloud } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="glass-header">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <Sparkles size={20} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 font-sans tracking-tight">
            Multimodal AI
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-full border border-slate-200/50 backdrop-blur-sm">
          <Cloud size={16} className="text-indigo-500" />
          <span>AWS Serverless</span>
        </div>
      </div>
    </header>
  );
}
