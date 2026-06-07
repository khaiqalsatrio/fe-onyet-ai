import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, Terminal, PlusCircle, SlidersHorizontal, Clock, Zap, Copy, Code2, Loader2, AlertCircle } from 'lucide-react';

const API_URL = 'http://localhost:3000/api';

const ChatPage = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setCopied(false);

    try {
      const response = await axios.post(`${API_URL}/commands/generate`, { prompt });
      setResult(response.data);
    } catch (err) {
      console.error('Error generating command:', err);
      setError(err.response?.data?.message || 'Terjadi kesalahan saat menghubungi server.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result && result.answer) {
      navigator.clipboard.writeText(result.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-8 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col gap-8 pb-32">
          
          {/* User Message Example / Current Prompt Display */}
          {result && prompt && (
             <div className="self-end max-w-[80%] bg-[#26282e] rounded-xl rounded-tr-sm p-5 text-sm text-gray-300 leading-relaxed shadow-sm">
               {prompt}
               <div className="text-[10px] text-gray-500 text-right mt-3 font-mono">
                  YOU • JUST NOW
               </div>
             </div>
          )}
          
          {/* Placeholder Initial State */}
          {!result && !loading && (
            <div className="self-end max-w-[80%] bg-[#26282e] rounded-xl rounded-tr-sm p-5 text-sm text-gray-300 leading-relaxed shadow-sm mt-8">
               Generate a Python script that fetches real-time cryptocurrency prices using the CoinGecko API and displays them in a clean terminal table.
               <div className="text-[10px] text-gray-500 text-right mt-3 font-mono uppercase">
                  YOU • 09:42 AM
               </div>
             </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-md bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-400" />
               </div>
               <div className="flex-1">
                 <div className="text-xs font-bold text-red-400 tracking-wider mb-2">SYSTEM ERROR</div>
                 <div className="text-sm text-red-300/80 bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                   {error}
                 </div>
               </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-md bg-[#1e2128] border border-[#26282e] flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-[#99f6e4]" />
               </div>
               <div className="flex-1">
                 <div className="text-xs font-bold text-[#99f6e4] tracking-wider mb-2">ONYET AI ASSISTANT</div>
                 <div className="flex items-center gap-2 text-sm text-gray-400">
                   <Loader2 className="w-4 h-4 animate-spin" />
                   Generating response...
                 </div>
               </div>
            </div>
          )}

          {/* AI Response Area */}
          {(result || !result && !loading && !error) && (
            <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-8 h-8 rounded-md bg-[#1e2128] border border-[#26282e] flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-[#99f6e4]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-[#99f6e4] tracking-wider mb-3">ONYET AI ASSISTANT</div>
                
                <div className="text-sm text-gray-300 leading-relaxed mb-4">
                  {result ? (
                    result.text || result.content || "Here is the generated output based on your request."
                  ) : (
                    "Certainly. Below is a robust Python implementation using the `requests` library and `rich` for elegant terminal formatting. This script handles rate-limiting and provides a formatted dashboard view."
                  )}
                </div>

                {/* Code Block Container */}
                <div className="rounded-xl overflow-hidden bg-[#16181d] border border-[#26282e] shadow-lg">
                  {/* Code Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#1a1c23] border-b border-[#26282e]">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                      <Code2 className="w-4 h-4" />
                      crypto_tracker.py
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                      title="Copy code"
                    >
                      {copied ? <span className="text-xs text-[#99f6e4] pr-1">Copied!</span> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Code Content */}
                  <div className="p-0 overflow-x-auto custom-scrollbar">
                    <SyntaxHighlighter 
                      language="python" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1.25rem',
                        background: 'transparent',
                        fontSize: '0.85rem',
                        lineHeight: '1.6',
                      }}
                      wrapLongLines={false}
                    >
                      {result?.answer ? result.answer : `import requests\nfrom rich.console import Console\nfrom rich.table import Table\n\n# API Configuration\nBASE_URL = "https://api.coingecko.com/api/v3"\n\ndef fetch_prices(ids):\n    params = {\n        'ids': ','.join(ids),\n        'vs_currencies': 'usd'\n    }\n    response = requests.get(f"{BASE_URL}/simple/price", params=params)\n    return response.json()`}
                    </SyntaxHighlighter>
                  </div>
                </div>
                
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM INPUT AREA */}
      <div className="p-6 pt-0 bg-gradient-to-t from-[#111318] via-[#111318] to-transparent shrink-0 flex justify-center">
        <div className="w-full max-w-4xl relative">
          <form 
            onSubmit={handleSubmit}
            className="bg-[#1e2128] border border-[#33363f] rounded-2xl p-2 flex flex-col focus-within:border-[#99f6e4]/50 focus-within:shadow-[0_0_15px_rgba(153,246,228,0.05)] transition-all"
          >
            <div className="flex items-start px-2 py-2">
              <div className="w-8 h-8 rounded-md bg-[#26282e] flex items-center justify-center shrink-0 mt-0.5 text-gray-400">
                <Terminal className="w-4 h-4" />
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your generation command here..."
                className="w-full bg-transparent text-gray-200 placeholder-gray-500 px-4 py-2 min-h-[60px] max-h-[200px] resize-none focus:outline-none text-sm leading-relaxed"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            
            <div className="flex items-center justify-between px-2 pb-2 pt-2 border-t border-[#2d3038] mt-2">
              <div className="flex items-center gap-1 text-gray-400">
                <button type="button" className="p-1.5 hover:text-gray-200 hover:bg-[#2a2d35] rounded-md transition-colors">
                  <PlusCircle className="w-5 h-5" />
                </button>
                <button type="button" className="p-1.5 hover:text-gray-200 hover:bg-[#2a2d35] rounded-md transition-colors">
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
                <button type="button" className="p-1.5 hover:text-gray-200 hover:bg-[#2a2d35] rounded-md transition-colors">
                  <Clock className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-gray-500 font-mono tracking-wider">Markdown Enabled</span>
                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="bg-[#bbf7d0] hover:bg-[#86efac] text-emerald-950 disabled:bg-[#2a2d35] disabled:text-gray-500 px-4 py-2 rounded-lg text-xs font-bold tracking-wider flex items-center gap-2 transition-colors"
                >
                  GENERATE
                  <Zap className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
