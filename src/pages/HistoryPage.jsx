import React from 'react';
import { Bell, TerminalSquare, Plus, Search, Filter } from 'lucide-react';

const HistoryPage = ({ onViewDetail }) => {
  const logs = [
    { 
      id: 1, 
      date: '2023.10.24 14:32', 
      prompt: 'Optimize the following React hook for performance in a ...', 
      category: 'OPTIMIZATION TASK',
      categoryColor: 'text-[#34d399]', 
      model: 'GPT-4-Turbo', 
      modelColor: 'bg-[#60a5fa]' 
    },
    { 
      id: 2, 
      date: '2023.10.24 12:15', 
      prompt: 'Generate a documentation template for a REST API using...', 
      category: 'DOCUMENTATION', 
      categoryColor: 'text-[#e879f9]',
      model: 'Claude-3-Opus', 
      modelColor: 'bg-[#34d399]' 
    },
    { 
      id: 3, 
      date: '2023.10.23 21:05', 
      prompt: 'Refactor this monolith Java service into a microservices-...', 
      category: 'REFACTORING', 
      categoryColor: 'text-[#38bdf8]',
      model: 'Codex-v2', 
      modelColor: 'bg-[#3b82f6]' 
    },
    { 
      id: 4, 
      date: '2023.10.23 18:40', 
      prompt: 'Explain the architectural differences between Event-Sour...', 
      category: 'EXPLAINER', 
      categoryColor: 'text-[#c084fc]',
      model: 'GPT-4-Turbo', 
      modelColor: 'bg-[#60a5fa]' 
    },
    { 
      id: 5, 
      date: '2023.10.23 09:12', 
      prompt: 'Write a shell script to automate the deployment of a Doc...', 
      category: 'DEVOPS', 
      categoryColor: 'text-[#34d399]',
      model: 'Gemini-Pro', 
      modelColor: 'bg-[#34d399]' 
    },
  ];

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
      {/* Topbar */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-gray-800/50 sticky top-0 bg-[#0f1115]/90 backdrop-blur z-10 shrink-0">
        <div className="text-xs text-gray-400 font-medium tracking-wide uppercase">
          LOGS <span className="mx-2">/</span> <span className="text-white font-bold">INTERACTION HISTORY</span>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          <TerminalSquare className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          <div className="w-px h-6 bg-gray-800/50 mx-2"></div>
          <button className="flex items-center gap-2 border border-gray-700/50 hover:border-gray-500 text-gray-300 hover:text-white px-3 py-1.5 rounded text-xs font-semibold tracking-wider uppercase transition-colors bg-[#13151a]">
            <Plus className="w-3.5 h-3.5" />
            NEW SESSION
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">Interaction History</h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
              Monitor and manage all AI generations and logs across your project ecosystem.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Filter interactions..." 
                className="bg-[#13151a] border border-gray-800 rounded text-sm text-gray-300 pl-9 pr-4 py-2 w-72 focus:outline-none focus:border-gray-600 font-mono transition-colors"
              />
            </div>
            <button className="p-2 border border-gray-800 rounded bg-[#13151a] hover:border-gray-600 text-gray-400 hover:text-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="border border-gray-800/60 rounded-xl overflow-hidden bg-[#13151a]/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#13151a] border-b border-gray-800/60 text-xs font-bold tracking-widest text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-5 font-semibold w-48">DATE</th>
                  <th className="px-6 py-5 font-semibold">PROMPT</th>
                  <th className="px-6 py-5 font-semibold w-48">MODEL</th>
                  <th className="px-6 py-5 text-right font-semibold w-32">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {logs.map((log) => (
                  <tr 
                    key={log.id} 
                    onClick={() => onViewDetail && onViewDetail(log.id)}
                    className="hover:bg-gray-800/30 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap text-gray-400 font-mono text-xs">
                      {log.date}
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-gray-200 text-[15px] mb-2 font-medium">{log.prompt}</div>
                      <div className={`text-[10px] font-bold tracking-widest uppercase ${log.categoryColor}`}>
                        {log.category}
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2 h-2 rounded-full ${log.modelColor}`}></div>
                        <span className="text-gray-300 text-xs font-mono font-medium">{log.model}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      {/* Empty actions column for now, could add icons on hover */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 bg-[#13151a] gap-4">
            <div>Showing 5 of 1,248 logs</div>
            <div className="flex items-center gap-1 font-mono text-sm">
              <button className="w-8 h-8 flex items-center justify-center hover:text-white hover:bg-gray-800 rounded transition-colors">&lt;</button>
              <button className="w-8 h-8 flex items-center justify-center text-cyan-400 font-bold bg-gray-800/50 rounded">1</button>
              <button className="w-8 h-8 flex items-center justify-center hover:text-white hover:bg-gray-800 rounded transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center hover:text-white hover:bg-gray-800 rounded transition-colors">3</button>
              <div className="w-8 h-8 flex items-center justify-center">...</div>
              <button className="w-8 h-8 flex items-center justify-center hover:text-white hover:bg-gray-800 rounded transition-colors">&gt;</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HistoryPage;
