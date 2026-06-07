import React, { useState } from 'react';
import { Bot, History, Settings, FileText, HelpCircle, PanelLeftClose, PanelLeft } from 'lucide-react';

const Sidebar = ({ view, setView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${isCollapsed ? 'w-[72px]' : 'w-[240px]'} flex flex-col border-r border-[#26282e] bg-[#111318] shrink-0 transition-all duration-300 relative group`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-0 translate-x-1/2 top-6 bg-[#1a1d24] border border-[#26282e] text-gray-400 hover:text-white p-1.5 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg hover:bg-[#26282e]"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
      </button>

      <div className={`p-5 flex flex-col ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`flex items-center text-[#99f6e4] mb-1 ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
          <Bot className="w-6 h-6 shrink-0" />
          {!isCollapsed && <h1 className="text-xl font-bold tracking-wide text-white whitespace-nowrap overflow-hidden transition-all duration-300">Onyet AI</h1>}
        </div>
        {!isCollapsed && <p className="text-[10px] text-gray-500 font-mono tracking-wider whitespace-nowrap overflow-hidden transition-all duration-300">V2.0.4-STABLE</p>}
      </div>

      <nav className={`flex-1 mt-2 flex flex-col gap-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
        <button
          onClick={() => setView('chat')}
          title={isCollapsed ? "New Chat" : ""}
          className={`flex items-center gap-3 py-2.5 rounded-md text-[13px] font-medium transition-colors relative ${isCollapsed ? 'px-0 justify-center' : 'px-3'} ${view === 'chat' ? 'bg-[#1e2128] text-[#99f6e4]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1d24]'}`}
        >
          <Bot className="w-[18px] h-[18px] shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">New Chat</span>}
          {view === 'chat' && !isCollapsed && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#99f6e4] rounded-l-full"></div>
          )}
        </button>

        <button
          onClick={() => setView('history')}
          title={isCollapsed ? "History" : ""}
          className={`flex items-center gap-3 py-2.5 rounded-md text-[13px] font-medium transition-colors relative ${isCollapsed ? 'px-0 justify-center' : 'px-3'} ${view === 'history' || view === 'history-detail' ? 'bg-[#1e2128] text-[#99f6e4]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1d24]'}`}
        >
          <History className="w-[18px] h-[18px] shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">History</span>}
          {(view === 'history' || view === 'history-detail') && !isCollapsed && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#99f6e4] rounded-l-full"></div>
          )}
        </button>

        <button
          onClick={() => setView('settings')}
          title={isCollapsed ? "Settings" : ""}
          className={`flex items-center gap-3 py-2.5 rounded-md text-[13px] font-medium transition-colors relative ${isCollapsed ? 'px-0 justify-center' : 'px-3'} ${view === 'settings' ? 'bg-[#1e2128] text-[#99f6e4]' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1d24]'}`}
        >
          <Settings className="w-[18px] h-[18px] shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Settings</span>}
          {view === 'settings' && !isCollapsed && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#99f6e4] rounded-l-full"></div>
          )}
        </button>
      </nav>

      <div className={`p-4 border-t border-[#26282e] flex flex-col gap-1.5 ${isCollapsed ? 'items-center px-2' : ''}`}>
        <button 
          title={isCollapsed ? "Docs" : ""}
          className={`flex items-center gap-3 py-1.5 text-[13px] text-gray-400 hover:text-gray-200 transition-colors ${isCollapsed ? 'px-0 justify-center w-full' : 'px-2'}`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Docs</span>}
        </button>
        <button 
          title={isCollapsed ? "Help" : ""}
          className={`flex items-center gap-3 py-1.5 text-[13px] text-gray-400 hover:text-gray-200 transition-colors ${isCollapsed ? 'px-0 justify-center w-full' : 'px-2'}`}
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">Help</span>}
        </button>

        <div className={`mt-3 flex items-center gap-3 ${isCollapsed ? 'px-0 justify-center' : 'px-2'}`}>
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 overflow-hidden shrink-0">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Developer&backgroundColor=1f2937" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden whitespace-nowrap">
              <span className="text-[13px] font-medium text-gray-200 truncate">Developer</span>
              <span className="text-[10px] text-gray-500 font-mono">PRO PLAN</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
