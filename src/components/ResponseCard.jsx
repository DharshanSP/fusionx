import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, Download, Copy } from 'lucide-react';

const renderMarkdown = (rawText) => {
  const parts = rawText.split(/(```[\w]*\n[\s\S]*?(?:```|$))/g);
  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      const match = part.match(/```([\w]*)\n([\s\S]*?)(?:```|$)/);
      if (match) {
        const lang = match[1];
        const code = match[2];
        const isComplete = part.endsWith('```');
        return (
          <div key={index} className="relative bg-[#000000]/60 backdrop-blur-md rounded-xl p-4 my-4 font-mono text-sm border border-white/10 group shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
             {isComplete && (
                <button 
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="absolute top-3 right-3 p-1.5 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-500/30 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 border border-white/5"
                    title="Copy code"
                >
                    <Copy size={14} /> Copy
                </button>
             )}
             {lang && <div className="text-[10px] font-bold tracking-widest text-indigo-400/70 mb-3 uppercase">{lang}</div>}
             <pre className="overflow-x-auto text-indigo-100 whitespace-pre-wrap leading-relaxed">{code}</pre>
          </div>
        );
      }
    }
    return <span key={index}>{part}</span>;
  });
};

const TypewriterText = ({ text, speed = 10 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    if (!text) return;
    
    const timer = setInterval(() => {
      setDisplayedText((prev) => text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return <>{renderMarkdown(displayedText)}</>;
};

export default function ResponseCard({ response, isLoading }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadAloud = (text) => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const handleDownload = (text) => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "FusionX_AI_Report.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!response && !isLoading) return null;

  return (
    <div className="w-full mt-6 animate-fade-in relative z-10">
      <div className="relative glass-panel p-6 sm:p-8 overflow-visible premium-glow bg-[#121214]/90">
        
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
                    Analyzing with Bedrock Nova...
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
              <div className="bg-[#1a1a1f]/80 rounded-2xl rounded-tl-none sm:rounded-tl-2xl border border-white/5 p-5 md:p-6 shadow-inner relative group">
                {typeof response === 'string' ? (
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap font-sans text-[15px] sm:text-base selection:bg-indigo-500/30 selection:text-white">
                    <TypewriterText text={response} />
                  </p>
                ) : response?.error ? (
                  <p className="text-red-400">{response.error}</p>
                ) : (
                  <div className="space-y-6 relative">
                    {response?.labels && response.labels.length > 0 && (
                      <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-3">Detected Objects</h3>
                        <div className="flex flex-wrap gap-2">
                          {response.labels.map((label, i) => (
                            <span key={i} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-200 shadow-sm animate-slide-up" style={{ animationDelay: `${i * 100 + 300}ms` }}>
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {response?.answer && (
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider">AI Analysis</h3>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleDownload(response.answer)}
                              className="flex items-center justify-center p-2 rounded-full transition-all duration-300 bg-white/5 text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                              title="Download Report"
                            >
                              <Download size={16} />
                            </button>
                            {/* Text to Speech Button */}
                            <button 
                              onClick={() => handleReadAloud(response.answer)}
                              className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${isPlaying ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-white/5 text-slate-400 hover:text-indigo-300 hover:bg-white/10'}`}
                              title={isPlaying ? "Stop reading" : "Read aloud"}
                            >
                              {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                          </div>
                        </div>
                        <p className="text-slate-200 leading-relaxed whitespace-pre-wrap font-sans text-[15px] sm:text-base selection:bg-indigo-500/30 selection:text-white">
                          <TypewriterText text={response.answer} />
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
