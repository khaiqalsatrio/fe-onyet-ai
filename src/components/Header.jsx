import React from 'react';
import { Terminal, Bell, Monitor } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 border-b border-[#26282e] flex items-center justify-between px-8 shrink-0">
      <div className="flex gap-6 text-xs font-semibold tracking-wider">
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-[#1a1c23] px-3 py-1.5 rounded-md border border-[#26282e] text-xs font-mono text-gray-400">
          <Terminal className="w-4 h-4 text-gray-500" />
          onyet compute --active
        </div>
        <button className="text-gray-400 hover:text-gray-200 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-200 transition-colors">
          <Monitor className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
