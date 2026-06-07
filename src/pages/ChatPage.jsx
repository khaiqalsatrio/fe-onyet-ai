import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Bot, Terminal, PlusCircle, SlidersHorizontal, Clock, Zap, Copy, Code2, Loader2, AlertCircle } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const ChatPage = () => {
  const {
    prompt,
    setPrompt,
    loading,
    messages,
    generateCommand,
  } = useChat();

  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderMessageContent = (content, msgId) => {
    if (!content.includes('```')) {
      return (
        <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      );
    }

    const parts = content.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return part.trim() ? (
          <div key={index} className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap my-4 first:mt-0 last:mb-0">
            {part}
          </div>
        ) : null;
      } else {
        const lines = part.split('\n');
        const lang = lines[0].trim();
        const code = lines.slice(1).join('\n').trim();

        return (
          <div key={index} className="rounded-xl overflow-hidden bg-[#16181d] border border-[#26282e] shadow-lg my-4 first:mt-0 last:mb-0">
            <div className="flex items-center justify-between px-4 py-3 bg-[#1a1c23] border-b border-[#26282e]">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <Code2 className="w-4 h-4" />
                {lang || 'Code'}
              </div>
              <button 
                onClick={() => handleCopy(`${msgId}-${index}`, code)}
                className="text-gray-500 hover:text-gray-300 transition-colors p-1"
                title="Copy code"
              >
                {copiedId === `${msgId}-${index}` ? <span className="text-xs text-[#99f6e4] pr-1">Copied!</span> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="p-0 overflow-x-auto custom-scrollbar">
              <SyntaxHighlighter 
                language={lang || 'javascript'} 
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
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-8 flex justify-center min-h-0">
        <div className="w-full max-w-4xl flex flex-col gap-8 pb-32">
          
          {/* Welcome Message / Initial State */}
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center text-center mt-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Glowing Logo Box */}
              <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-[#99f6e4] opacity-20 blur-[30px] rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-[#0f1115] flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-gray-700/50">
                  <img src="/logo512.png" alt="Onyet AI Logo" className="w-14 h-14 object-contain drop-shadow-[0_0_8px_rgba(153,246,228,0.5)]" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
                  <Bot className="w-10 h-10 text-[#99f6e4] hidden drop-shadow-[0_0_8px_rgba(153,246,228,0.5)]" />
                </div>
              </div>
              
              {/* Two-tone Heading */}
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
                <span className="text-gray-100">Halo, </span>
                <span className="text-[#99f6e4] drop-shadow-[0_0_15px_rgba(153,246,228,0.3)]">Selamat Datang!</span>
              </h1>
              
              {/* Description */}
              <p className="text-gray-400 max-w-sm leading-relaxed text-[15px]">
                Ada yang bisa Onyet bantu hari ini? Ketikkan instruksi atau <br />
                <span className="text-[#99f6e4] italic font-medium">*prompt*</span> di bawah untuk mulai membuat perintah.
              </p>
            </div>
          )}

          {/* Messages Loop */}
          {messages.map((msg) => {
            if (msg.role === 'user') {
              return (
                <div key={msg.id} className="self-end max-w-[80%] bg-[#26282e] rounded-xl rounded-tr-sm p-5 text-sm text-gray-300 leading-relaxed shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {msg.content}
                  <div className="text-[10px] text-gray-500 text-right mt-3 font-mono">
                    YOU • JUST NOW
                  </div>
                </div>
              );
            } else if (msg.isError) {
              return (
                <div key={msg.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <div className="w-8 h-8 rounded-md bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                   </div>
                   <div className="flex-1">
                     <div className="text-xs font-bold text-red-400 tracking-wider mb-2">SYSTEM ERROR</div>
                     <div className="text-sm text-red-300/80 bg-red-500/5 p-4 rounded-lg border border-red-500/10">
                       {msg.content}
                     </div>
                   </div>
                </div>
              );
            } else {
              return (
                <div key={msg.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-8 h-8 rounded-md bg-[#1e2128] border border-[#26282e] flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-[#99f6e4]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#99f6e4] tracking-wider mb-3">ONYET AI ASSISTANT</div>
                    
                    {renderMessageContent(msg.content, msg.id)}
                  </div>
                </div>
              );
            }
          })}

          {/* Loading State */}
          {loading && (
             <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
        </div>
      </div>

      {/* BOTTOM INPUT AREA */}
      <div className="p-6 pt-0 bg-gradient-to-t from-[#111318] via-[#111318] to-transparent shrink-0 flex justify-center">
        <div className="w-full max-w-4xl relative">
          <form 
            onSubmit={generateCommand}
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
                    generateCommand(e);
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
