import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadBox from './components/UploadBox';
import QueryInput from './components/QueryInput';
import ResponseCard from './components/ResponseCard';

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = () => {
    if (!file) return;

    setIsLoading(true);
    setResponse(null);

    // Simulate API call to AWS Serverless / AI Endpoint
    setTimeout(() => {
      setIsLoading(false);
      setResponse(
        `Based on the file provided, it appears to contain structured content. Here are some details${query.trim() ? ` related to your query "${query}"` : ''}:\n\nThe extracted insights suggest the document/image holds context matching our multimodal support. If you were looking for specific architectural features or text extraction, our AWS Serverless architecture aggregates it successfully.`
      );
    }, 2500); // 2.5s delay to simulate cloud processing
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Core dark gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
        {/* Animated glowing blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />
      
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 sm:py-20 flex flex-col items-center relative z-10">
        
        {/* Main Content Container */}
        <div className="w-full space-y-8">
          <div className="text-center mb-14 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wide text-indigo-300 uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              System Online
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-5 font-display drop-shadow-sm leading-tight pb-2 pt-2">
              Process <span className="gradient-text">Anything</span>
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Upload documents, presentations, or images. Let our serverless intelligence extract the insights instantly.
            </p>
          </div>

          <div className="flex flex-col gap-6 relative">
            {/* Subtle glow behind the main interactive area */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-50 rounded-[3rem] -z-10"></div>
            
            <UploadBox file={file} setFile={setFile} />
            <QueryInput 
              query={query} 
              setQuery={setQuery} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              disabled={!file} 
            />
          </div>

          <ResponseCard response={response} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}

export default App;
