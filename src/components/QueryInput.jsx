import React from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function QueryInput({ query, setQuery, onSubmit, isLoading, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if(!disabled) {
        onSubmit();
      }
    }
  };

  return (
    <div className="w-full relative animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className={`relative flex items-center bg-[#1a1a1f] rounded-3xl premium-glow transition-all duration-300 ${!disabled ? 'shadow-[0_8px_30px_rgba(99,102,241,0.1)]' : ''}`}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about the file (optional)..."
          className="w-full bg-transparent border-0 rounded-3xl py-4 pl-6 pr-16 text-sm text-slate-200 placeholder:text-slate-600 focus:ring-0 resize-none h-14 md:text-base outline-none disabled:opacity-50"
          rows={1}
          disabled={disabled}
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={onSubmit}
            disabled={disabled}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              disabled
                ? 'bg-white/5 text-slate-600 cursor-not-allowed hidden'
                : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} className="ml-0.5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
