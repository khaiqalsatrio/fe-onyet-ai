import React, { useState } from 'react';
import { 
  Bell, TerminalSquare, User, Save, 
  Settings as SettingsIcon, Key, Palette, 
  CreditCard, Shield, Database, Monitor, Cpu
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'models', label: 'Model Configuration', icon: Database },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
  ];

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      {/* Topbar */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-gray-800/50 sticky top-0 bg-[#0f1115]/90 backdrop-blur z-10 shrink-0">
        <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">
          SETTINGS <span className="mx-2">/</span> <span className="text-white font-bold">PREFERENCES</span>
        </div>
        <div className="flex items-center gap-5 text-gray-400">
          <Bell className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
          <TerminalSquare className="w-6 h-6 hover:text-white cursor-pointer transition-colors" />
          <div className="w-8 h-8 rounded bg-[#1e2128] flex items-center justify-center border border-[#26282e]">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 max-w-5xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-12">
        
        {/* Settings Sidebar */}
        <aside className="w-full md:w-56 shrink-0">
          <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
          <nav className="flex flex-col gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-[#1e2128] text-white' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1c23]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#00e5ff]' : 'text-gray-500'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Settings Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Main Card */}
          <div className="bg-[#13151a] border border-[#26282e] rounded-xl p-8">
            {activeTab === 'general' && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-white mb-2">General Settings</h2>
                  <p className="text-sm text-gray-400">Manage your basic account configurations and preferences.</p>
                </div>

                <div className="space-y-8">
                  {/* Profile Section */}
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase whitespace-nowrap">Profile Information</span>
                      <div className="h-px bg-[#26282e] flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="text-xs font-mono text-gray-400 tracking-wide">Display Name</span>
                        <input 
                          type="text" 
                          defaultValue="Senior Engineer"
                          className="w-full bg-[#111318] border border-[#26282e] rounded-md px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-[#00e5ff] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs font-mono text-gray-400 tracking-wide">Email Address</span>
                        <input 
                          type="email" 
                          defaultValue="dev@onyet.ai"
                          className="w-full bg-[#111318] border border-[#26282e] rounded-md px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-[#00e5ff] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preferences Section */}
                  <div className="pt-2">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase whitespace-nowrap">System Preferences</span>
                      <div className="h-px bg-[#26282e] flex-1"></div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-5 bg-[#111318] border border-[#26282e] rounded-xl">
                        <div className="flex items-center gap-5">
                          <div className="w-10 h-10 rounded bg-[#1e2128] flex items-center justify-center border border-[#26282e]">
                            <Monitor className="w-5 h-5 text-[#00e5ff]" />
                          </div>
                          <div>
                            <div className="text-[15px] font-bold text-gray-200 mb-0.5">Hardware Acceleration</div>
                            <div className="text-xs text-gray-500">Enable GPU acceleration for faster rendering in UI.</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-12 h-6 bg-[#26282e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-[#00e5ff]"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-5 bg-[#111318] border border-[#26282e] rounded-xl">
                        <div className="flex items-center gap-5">
                          <div className="w-10 h-10 rounded bg-[#1e2128] flex items-center justify-center border border-[#26282e]">
                            <Bell className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-[15px] font-bold text-gray-200 mb-0.5">Desktop Notifications</div>
                            <div className="text-xs text-gray-500">Receive alerts when long-running generations complete.</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-12 h-6 bg-[#26282e] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-gray-300 after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-[#00e5ff]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button className="flex items-center gap-2 bg-[#00e5ff] hover:bg-[#00c9e0] text-[#0f1115] font-bold text-xs tracking-wide uppercase px-6 py-3 rounded shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'general' && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-500 animate-in zoom-in-95 duration-300">
                <SettingsIcon className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-lg font-medium text-gray-400">Section Under Construction</p>
                <p className="text-sm mt-2 max-w-sm text-center">The {tabs.find(t => t.id === activeTab)?.label} configuration module will be available in the next update.</p>
              </div>
            )}
          </div>

          {/* Bottom decorative boxes */}
          <div className="grid grid-cols-3 gap-6">
            <div className="h-32 bg-[#13151a] border border-[#26282e] rounded-xl flex items-center justify-center">
              <TerminalSquare className="w-12 h-12 text-[#26282e]" />
            </div>
            <div className="h-32 bg-[#13151a] border border-[#26282e] rounded-xl flex items-center justify-center">
              <Cpu className="w-12 h-12 text-[#26282e]" />
            </div>
            <div className="h-32 bg-[#13151a] border border-[#26282e] rounded-xl flex items-center justify-center">
              <Shield className="w-12 h-12 text-[#26282e]" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
