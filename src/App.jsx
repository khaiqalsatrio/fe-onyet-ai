import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ChatPage from './pages/ChatPage';
import HistoryDetailPage from './pages/HistoryDetailPage';

function App() {
  const [view, setView] = useState('chat'); // 'chat' | 'history' | 'history-detail' | 'settings'

  return (
    <div className="flex h-screen bg-[#111318] text-gray-200 font-sans selection:bg-[#99f6e4]/30">
      <Sidebar view={view} setView={setView} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        {(view === 'history-detail' || view === 'history') ? (
          <HistoryDetailPage onBack={(v) => setView(v)} />
        ) : view === 'chat' ? (
          <ChatPage />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">Coming Soon</div>
        )}
      </div>
    </div>
  );
}

export default App;
