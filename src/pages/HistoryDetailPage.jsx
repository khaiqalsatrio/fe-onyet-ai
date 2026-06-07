import React from 'react';
import {
  ArrowLeft, Bell, TerminalSquare, User, Copy, Share2,
  Archive, Trash2, MessageSquare, History, Settings,
  FileText, HelpCircle, Zap, Activity
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const HistoryDetail = ({ onBack }) => {
  const queryCode = `SELECT 
    region_id, 
    AVG(unit_price) AS avg_price, 
    COUNT(*) AS total_transactions
FROM 
    transactions
WHERE 
    created_at >= NOW() - INTERVAL '30 days'
    AND volume > 1000
GROUP BY 
    region_id
ORDER BY 
    avg_price DESC;

-- Result ID: onyx_7721_tx_agg`;

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

      {/* Topbar */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-gray-800/50 sticky top-0 bg-[#0f1115]/90 backdrop-blur z-10">
        <button onClick={() => onBack('chat')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors font-medium tracking-wide uppercase">
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </button>
        <div className="flex items-center gap-4 text-gray-400">
          <Bell className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          <TerminalSquare className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          <div className="w-6 h-6 rounded bg-cyan-900/50 flex items-center justify-center border border-cyan-800">
            <User className="w-4 h-4 text-cyan-500" />
          </div>
        </div>
      </header>

      <div className="p-8 max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-8">

        {/* Left Column (Content) */}
        <div className="flex-1 space-y-6">
          <div className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4 flex items-center gap-2">
            History <span className="text-gray-700">&gt;</span> <span className="text-cyan-500">Detail #ID-12345</span>
          </div>

          {/* Original Request */}
          <div className="border border-gray-800 rounded-xl p-6 bg-[#13151a]">
            <div className="flex justify-between items-center mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-500" />
                Original Request
              </div>
              <div className="text-gray-500">Oct 27, 2023 • 14:22</div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              "I need a SQL query that retrieves all transactions from the last 30 days where the volume exceeds 1,000 units. Group the results by 'region_id' and show the average price per region. Sort the output by the highest average price first. Can you also explain how the indexing on 'created_at' affects this query's performance?"
            </p>
          </div>

          {/* AI Generation Response Title */}
          <div className="flex items-center gap-2 mt-8 mb-4">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <TerminalSquare className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">AI Generation Response</h2>
          </div>

          {/* Code Block */}
          <div className="border border-gray-800 rounded-xl overflow-hidden bg-[#0d0e12]">
            <div className="flex justify-between items-center px-4 py-2 bg-[#13151a] border-b border-gray-800 text-xs text-gray-400">
              <div className="flex items-center gap-2 font-mono">
                <FileText className="w-3.5 h-3.5" />
                PostgreSQL Query
              </div>
              <button className="flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-wider font-semibold text-[10px]">
                <Copy className="w-3 h-3" />
                Copy Code
              </button>
            </div>
            <div className="p-0 text-sm">
              <SyntaxHighlighter
                language="sql"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: 'transparent',
                  fontSize: '0.85rem',
                }}
              >
                {queryCode}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Technical Explanation */}
          <div className="border border-gray-800 rounded-xl p-6 bg-[#13151a] mt-6">
            <h3 className="text-lg font-bold text-white mb-4">Technical Explanation</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              The query above utilizes an aggregate function to calculate the mean price across regional clusters. By filtering for <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-300 font-mono text-xs">volume &gt; 1000</code> before grouping, we reduce the working set significantly, improving execution speed.
            </p>

            <div className="bg-cyan-950/20 border-l-2 border-cyan-500 p-4 rounded-r-lg mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
                <Zap className="w-3.5 h-3.5" />
                Performance Note: Indexing
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                An index on the <code className="text-cyan-300 font-mono">created_at</code> column allows the database engine to perform an <strong className="text-gray-300 font-semibold">Index Range Scan</strong>. Instead of scanning every row in the table, it only retrieves pages corresponding to the last 30 days, keeping the <span className="text-cyan-400">Execution Time</span> near-constant even as the table grows to millions of rows.
              </p>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              Ensure that the <code className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-300 font-mono text-xs">region_id</code> column is also indexed if you plan to scale this query or join it with a <code className="text-cyan-400 font-mono">regions</code> table in the future.
            </p>
          </div>
        </div>

        {/* Right Column (Sidebar/Stats) */}
        <div className="w-full lg:w-80 space-y-6 shrink-0 mt-12 lg:mt-0">

          {/* Execution Stats */}
          <div className="border border-gray-800 rounded-xl p-6 bg-[#13151a]">
            <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">Execution Stats</h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Created</span>
                <span className="text-gray-200 font-mono text-xs">2023-10-27</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Latency</span>
                <span className="text-cyan-400 font-mono text-xs">1.24s</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Tokens used</span>
                <span className="text-gray-200 font-mono text-xs">1,024</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Model</span>
                <span className="text-gray-200 font-mono text-xs">Onyet v2.0-L</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Temperature</span>
                <span className="text-gray-200 font-mono text-xs">0.2 (Strict)</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-cyan-400 hover:bg-cyan-300 text-[#0f1115] font-bold text-xs tracking-widest uppercase py-3 rounded flex items-center justify-center gap-2 transition-colors">
              <Share2 className="w-4 h-4" />
              Share Report
            </button>
          </div>

          {/* Resource Visualization */}
          <div className="border border-gray-800 rounded-xl p-6 bg-[#13151a]">
            <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4 flex items-center justify-between">
              Resource Visualization
              <Activity className="w-4 h-4 text-gray-600" />
            </h4>
            <div className="h-32 bg-gray-900 rounded border border-gray-800 relative overflow-hidden flex items-end">
              {/* Fake Chart Lines */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-cyan-500 fill-cyan-500/20">
                  <path d="M0,100 L0,60 L10,50 L20,70 L30,40 L40,80 L50,30 L60,50 L70,20 L80,40 L90,10 L100,30 L100,100 Z"></path>
                </svg>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-purple-500 fill-purple-500/10">
                  <path d="M0,100 L0,80 L15,70 L25,90 L35,60 L45,85 L55,40 L65,70 L75,30 L85,60 L95,20 L100,40 L100,100 Z"></path>
                </svg>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-3 italic leading-relaxed">
              Memory usage peaked at 24.5MB during semantic parsing phase.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white bg-[#13151a] hover:bg-gray-800 text-xs tracking-widest uppercase font-semibold py-3 rounded flex items-center justify-center gap-2 transition-all">
              <Archive className="w-4 h-4" />
              Archive Thread
            </button>
            <button className="w-full border border-red-900/30 hover:border-red-900 text-red-500/70 hover:text-red-400 bg-[#13151a] hover:bg-red-950/20 text-xs tracking-widest uppercase font-semibold py-3 rounded flex items-center justify-center gap-2 transition-all">
              <Trash2 className="w-4 h-4" />
              Delete Record
            </button>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-800/50 p-4 text-[9px] uppercase tracking-[0.2em] text-gray-600 flex justify-between px-8 bg-[#0f1115]">
        <div>Onyet Engine Node-7721-B</div>
        <div className="flex gap-6">
          <span>System Status: Optimal</span>
          <span>Latency: 14ms</span>
        </div>
      </footer>
    </main>
  );
};

export default HistoryDetail;
