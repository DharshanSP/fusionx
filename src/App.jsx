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
    <div className="min-h-screen flex flex-col font-sans bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white">
      <Navbar />
      
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        
        {/* Main Content Card Container */}
        <div className="w-full space-y-6">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Analyze Files Instantly
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Upload a file, ask an optional question, and let our serverless AI process your request in seconds.
            </p>
          </div>

          <div className="flex flex-col gap-4">
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
