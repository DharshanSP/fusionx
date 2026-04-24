import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

export default function ResponseCard({ response, isLoading }) {
  if (!response && !isLoading) return null;

  return (
    <div className="w-full mt-8 animate-fade-in">
      <div className="relative overflow-hidden glass-panel p-6 sm:p-8">
        
        {/* Decorative background blur */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex gap-4">
          <div className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 items-center justify-center shadow-md">
            <Sparkles size={20} className="text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 sm:hidden">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-sm">
                    <Sparkles size={16} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800">AI Assistant</h3>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-indigo-500 animate-pulse"></div>
                  <p className="text-sm font-medium text-indigo-600 animate-pulse">
                    Processing image with AI...
                  </p>
                </div>
                <div className="space-y-2 mt-4 max-w-2xl">
                  <div className="h-4 bg-slate-200/60 rounded-md w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-200/60 rounded-md w-full animate-pulse"></div>
                  <div className="h-4 bg-slate-200/60 rounded-md w-5/6 animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl rounded-tl-none sm:rounded-tl-2xl border border-white/50 p-4 shadow-sm prose prose-slate prose-sm max-w-none">
                <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {response}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
