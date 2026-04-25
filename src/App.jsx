import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadBox from './components/UploadBox';
import QueryInput from './components/QueryInput';
import ResponseCard from './components/ResponseCard';
import { API_URL, BUCKET_NAME } from './config';

function App() {
  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    if (files.length === 0 && !query.trim()) return;

    setIsLoading(true);
    setResponse(null);

    try {
      let uploadedFileNames = [];
      
      if (files.length > 0) {
        // 1. Upload multiple files to S3
        for (const f of files) {
          const uploadUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${f.name}`;
          
          const s3Response = await fetch(uploadUrl, {
            method: "PUT",
            body: f,
          });

          if (!s3Response.ok) {
            throw new Error(`S3 Upload Failed for ${f.name}: ${s3Response.status}`);
          }
          uploadedFileNames.push(f.name);
        }
      }

      // 2. Call your API
      const apiRes = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "qd6HlZLrBF5DLDnwDBTgZ75y9GBh0hg7JxoM41a9"
        },
        body: JSON.stringify({
          bucket: BUCKET_NAME,
          files: uploadedFileNames, // Sending array of files
          query: query,
        }),
      });

      if (!apiRes.ok) {
        throw new Error(`Lambda API Failed: ${apiRes.status} ${apiRes.statusText}`);
      }

      const data = await apiRes.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ error: err.message || "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Core dark gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
        {/* Animated glowing blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-pink-600/10 blur-[100px] animate-blob" style={{ animationDelay: '4s' }}></div>
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
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6 font-display drop-shadow-2xl leading-tight pb-2 pt-2">
              Process <span className="gradient-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400 animate-gradient-x">Anything</span>
            </h2>
            <p className="text-slate-300 text-lg sm:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
              Upload documents, presentations, or images. Let our serverless intelligence extract the insights instantly.
            </p>
          </div>

          <div className="flex flex-col gap-6 relative">
            {/* Subtle glow behind the main interactive area */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-50 rounded-[3rem] -z-10"></div>
            
            <UploadBox files={files} setFiles={setFiles} />
            <QueryInput 
              query={query} 
              setQuery={setQuery} 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              disabled={isLoading} 
              files={files}
            />
          </div>

          <ResponseCard response={response} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}

export default App;
