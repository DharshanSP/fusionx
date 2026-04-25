import React from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function QueryInput({ query, setQuery, onSubmit, isLoading, disabled, files = [] }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if(!disabled) {
        onSubmit();
      }
    }
  };

  const hasFiles = files.length > 0;
  
  let isImage = false;
  let isDoc = false;
  if (hasFiles) {
    if (files[0].type.startsWith('image/')) isImage = true;
    else isDoc = true;
  }

  const suggestions = files.length > 1 
    ? ["Compare these documents", "Find the key differences", "Summarize all files"]
    : isImage 
      ? ["Describe this image in detail", "Extract any text from this image", "Write an Instagram caption"]
      : isDoc 
        ? ["Summarize this document", "Extract key action items", "What are the main conclusions?"]
        : ["Write a Python script", "Explain quantum physics", "How do I center a div?"];

  return (
    <div className="w-full relative animate-slide-up space-y-3" style={{ animationDelay: '100ms' }}>
      
      {/* Smart Prompts */}
      <div className="flex flex-wrap gap-2 px-1">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => setQuery(suggestion)}
            className="text-xs sm:text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-indigo-500/20 hover:text-indigo-200 hover:border-indigo-500/30 transition-all duration-300 whitespace-nowrap"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className={`relative flex items-start bg-[#1a1a1f]/80 backdrop-blur-xl rounded-[2rem] premium-glow transition-all duration-500 border border-white/5 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_40px_rgba(99,102,241,0.2)] ${!disabled ? 'shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_40px_rgba(99,102,241,0.15)] hover:border-white/10' : ''}`}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What would you like to know about this file? Type your prompt here..."
          className="w-full bg-transparent border-0 rounded-[2rem] py-6 pl-8 pr-20 text-base text-slate-100 placeholder:text-slate-500 focus:ring-0 resize-none min-h-[140px] md:text-lg outline-none disabled:opacity-50 font-light leading-relaxed"
          disabled={disabled}
        />
        <div className="absolute right-4 bottom-4">
          <button
            type="button"
            onClick={onSubmit}
            disabled={disabled || (!query.trim() && !hasFiles && !isLoading)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              disabled || (!query.trim() && !hasFiles && !isLoading)
                ? 'bg-white/5 text-slate-600 cursor-not-allowed scale-95 opacity-50'
                : 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:scale-110 active:scale-95'
            }`}
          >
            {isLoading ? (
              <Loader2 size={22} className="animate-spin" />
            ) : (
              <Send size={22} className="ml-1" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
