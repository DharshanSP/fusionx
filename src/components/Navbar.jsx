import React from 'react';
import { Sparkles, Cpu } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="glass-header shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-indigo-500 blur-md opacity-40 group-hover:opacity-70 transition-opacity rounded-full duration-500"></div>
            <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-2.5 rounded-2xl text-white relative flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <Sparkles size={20} className="drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
            Multimodal <span className="gradient-text font-semibold">AI Assistant</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-slate-400 bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-full border border-white/10 cursor-default">
          <Cpu size={16} className="text-purple-400" />
          <span className="hidden leading-none md:block mt-0.5">AWS Serverless Powered</span>
          <span className="md:hidden top-0.5 relative leading-none">AWS</span>
        </div>
      </div>
    </header>
  );
}
