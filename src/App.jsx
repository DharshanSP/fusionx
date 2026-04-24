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
    if (!file || !query.trim()) return;

    setIsLoading(true);
    setResponse(null);

    // Simulate API call to AWS Serverless / AI Endpoint
    setTimeout(() => {
      setIsLoading(false);
      setResponse(
        `Based on the image provided, it appears to be a landscape with mountains in the background and a lake in the foreground. Here are some details related to your query "${query}":\n\nThe lighting suggests it might be early morning or late afternoon. If you were looking for specific architectural features, there don't appear to be any prominent structures visible in this frame.`
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
              Analyze Images Instantly
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Upload an image, ask a question, and let our serverless AI compute the answer in seconds.
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
