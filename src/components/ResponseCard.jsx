import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

export default function ResponseCard({ response, isLoading }) {
  if (!response && !isLoading) return null;

  return (
    <div className="w-full mt-6 animate-fade-in relative z-10">
      <div className="relative glass-panel p-6 sm:p-8 overflow-visible premium-glow bg-[#121214]/90">
        
        {/* Core response container with a subtle shimmer effect */}
        <div className="relative z-10 flex gap-5">
          <div className="hidden sm:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <Sparkles size={22} className="text-white drop-shadow-md" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 sm:hidden">
                <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <Sparkles size={18} className="text-white" />
                </div>
                <h3 className="text-base font-semibold text-slate-200">AI Assistant</h3>
            </div>
            
            {isLoading ? (
              <div className="space-y-5 pt-1">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </div>
                  <p className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
                    Analyzing file with Bedrock...
                  </p>
                </div>
                <div className="space-y-3 mt-4 max-w-2xl px-1">
                  <div className="h-2.5 bg-slate-800/80 rounded-md w-3/4 overflow-hidden relative">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  </div>
                  <div className="h-2.5 bg-slate-800/80 rounded-md w-full overflow-hidden relative">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <div className="h-2.5 bg-slate-800/80 rounded-md w-5/6 overflow-hidden relative">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#1a1a1f]/80 rounded-2xl rounded-tl-none sm:rounded-tl-2xl border border-white/5 p-5 md:p-6 shadow-inner relative">
                {typeof response === 'string' ? (
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap font-sans text-[15px] sm:text-base selection:bg-indigo-500/30 selection:text-white">
                    {response}
                  </p>
                ) : response?.error ? (
                  <p className="text-red-400">{response.error}</p>
                ) : (
                  <div className="space-y-6">
                    {response?.labels && response.labels.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-3">Detected Objects</h3>
                        <div className="flex flex-wrap gap-2">
                          {response.labels.map((label, i) => (
                            <span key={i} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-200 shadow-sm">
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {response?.answer && (
                      <div>
                        <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-3">AI Answer</h3>
                        <p className="text-slate-200 leading-relaxed whitespace-pre-wrap font-sans text-[15px] sm:text-base selection:bg-indigo-500/30 selection:text-white">
                          {response.answer}
                        </p>
                      </div>
                    )}
                    {(!response?.labels && !response?.answer && response) && (
                       <p className="text-slate-200 break-words">{JSON.stringify(response)}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
