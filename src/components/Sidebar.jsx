import React from 'react';
import { Bot, History, Settings, FileText, HelpCircle } from 'lucide-react';

const Sidebar = ({ view, setView }) => {
  return (
    <aside className="w-[240px] flex flex-col border-r border-[#26282e] bg-[#111318] shrink-0 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center gap-2 text-[#99f6e4] mb-1">
          <Bot className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-wide text-white">Onyet AI</h1>
        </div>
        <p className="text-[10px] text-gray-500 font-mono tracking-wider">V2.0.4-STABLE</p>
      </div>

      <nav className="flex-1 mt-2 flex flex-col gap-1 px-3">
        <button
          onClick={() => setView('chat')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors relative ${view === 'chat' ? 'bg-[#1e2128] text-[#99f6e4]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1d24]'}`}
        >
          <Bot className="w-[18px] h-[18px]" />
          New Chat
          {view === 'chat' && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#99f6e4] rounded-l-full"></div>
          )}
        </button>

        <button
          onClick={() => setView('history')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors relative ${view === 'history' || view === 'history-detail' ? 'bg-[#1e2128] text-[#99f6e4]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1d24]'}`}
        >
          <History className="w-[18px] h-[18px]" />
          History
          {(view === 'history' || view === 'history-detail') && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#99f6e4] rounded-l-full"></div>
          )}
        </button>

        <button
          onClick={() => setView('settings')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors relative ${view === 'settings' ? 'bg-[#1e2128] text-[#99f6e4]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1d24]'}`}
        >
          <Settings className="w-[18px] h-[18px]" />
          Settings
          {view === 'settings' && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#99f6e4] rounded-l-full"></div>
          )}
        </button>
      </nav>

      <div className="p-4 border-t border-[#26282e] flex flex-col gap-1.5">
        <button className="flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-400 hover:text-gray-200 transition-colors">
          <FileText className="w-4 h-4" />
          Docs
        </button>
        <button className="flex items-center gap-3 px-2 py-1.5 text-[13px] text-gray-400 hover:text-gray-200 transition-colors">
          <HelpCircle className="w-4 h-4" />
          Help
        </button>

        <div className="mt-3 flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 overflow-hidden shrink-0">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Developer&backgroundColor=1f2937" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[13px] font-medium text-gray-200 truncate">Developer</span>
            <span className="text-[10px] text-gray-500 font-mono">PRO PLAN</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
