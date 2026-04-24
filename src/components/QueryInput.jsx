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
      <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something about your file (optional)..."
          className="w-full bg-transparent border-0 rounded-2xl py-4 pl-5 pr-14 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-0 resize-none h-14"
          rows={1}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={onSubmit}
            disabled={disabled}
            className={`p-2 rounded-xl flex items-center justify-center transition-all duration-300 ${
              disabled
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} className={!disabled ? 'ml-0.5' : ''} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
