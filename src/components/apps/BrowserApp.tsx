import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';
import { addDownload } from './FileExplorer';

interface Tab { id: string; title: string; url: string; loading?: boolean; }

const defaultBookmarks = [
  { name: 'Google', url: 'https://www.google.com/webhp?igu=1', icon: '🔍' },
  { name: 'YouTube', url: 'https://www.youtube.com/embed/', icon: '▶️' },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org', icon: '📚' },
  { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
];

export const BrowserApp: React.FC<{ initialUrl?: string; initialTitle?: string }> = ({ initialUrl, initialTitle }) => {
  const theme = themes[useStore(s => s.settings).theme];
  const [tabs, setTabs] = useState<Tab[]>([{ id: '1', title: initialTitle || 'New Tab', url: initialUrl || '' }]);
  const [activeTab, setActiveTab] = useState('1');
  const [input, setInput] = useState(initialUrl || '');
  const [bookmarks, setBookmarks] = useState(defaultBookmarks);

  const active = tabs.find(t => t.id === activeTab) || tabs[0];

  const navigate = (url: string) => {
    if (!url.trim()) return;
    let finalUrl = url.trim();
    
    // Handle search vs URL
    if (!finalUrl.includes('.') && !finalUrl.startsWith('http')) {
      finalUrl = `https://www.google.com/search?igu=1&q=${encodeURIComponent(finalUrl)}`;
    } else if (!finalUrl.startsWith('http')) {
      finalUrl = 'https://' + finalUrl;
    }
    
    const title = url.replace(/https?:\/\//, '').replace(/www\./, '').split('/')[0];
    setTabs(ts => ts.map(t => t.id === activeTab ? { ...t, url: finalUrl, title, loading: true } : t));
    setInput(finalUrl);
  };

  const addTab = () => {
    const id = Date.now().toString();
    setTabs([...tabs, { id, title: 'New Tab', url: '' }]);
    setActiveTab(id);
    setInput('');
  };

  const closeTab = (id: string) => {
    if (tabs.length <= 1) return;
    const filtered = tabs.filter(t => t.id !== id);
    setTabs(filtered);
    if (activeTab === id) {
      setActiveTab(filtered[filtered.length - 1].id);
      setInput(filtered[filtered.length - 1].url);
    }
  };

  const goBack = () => {
    setTabs(ts => ts.map(t => t.id === activeTab ? { ...t, url: '', title: 'New Tab' } : t));
    setInput('');
  };

  const refresh = () => {
    if (active.url) {
      setTabs(ts => ts.map(t => t.id === activeTab ? { ...t, loading: true } : t));
      const iframe = document.querySelector(`iframe[data-tab="${activeTab}"]`) as HTMLIFrameElement;
      if (iframe) iframe.src = active.url;
    }
  };

  const addBookmark = () => {
    if (active.url && !bookmarks.find(b => b.url === active.url)) {
      setBookmarks([...bookmarks, { name: active.title, url: active.url, icon: '⭐' }]);
    }
  };

  const simulateDownload = () => {
    const filename = `download-${Date.now()}.html`;
    addDownload(filename, '125 KB');
    alert(`Downloaded: ${filename}\nCheck your Downloads folder!`);
  };

  return (
    <div className="flex flex-col h-full" style={{ color: theme.text }}>
      {/* Tab bar */}
      <div className="flex items-center gap-px px-1 pt-1 overflow-x-auto no-scrollbar shrink-0" style={{ background: theme.bgSecondary }}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => { setActiveTab(t.id); setInput(t.url); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg cursor-pointer min-w-[90px] max-w-[160px] group transition-colors"
            style={{ background: t.id === activeTab ? theme.bg : theme.bgTertiary }}>
            {t.loading && <span className="animate-spin text-[10px]">◌</span>}
            <span className="text-[11px] truncate flex-1" style={{ color: t.id === activeTab ? theme.text : theme.textMuted }}>{t.title || 'New Tab'}</span>
            <button onClick={e => { e.stopPropagation(); closeTab(t.id); }} className="opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded p-0.5 transition-opacity" style={{ color: theme.textMuted }}>
              <svg width="8" height="8" viewBox="0 0 8 8" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="1" x2="7" y2="7" /><line x1="7" y1="1" x2="1" y2="7" /></svg>
            </button>
          </div>
        ))}
        <button onClick={addTab} className="p-1.5 rounded hover:bg-white/10 shrink-0 ml-0.5" style={{ color: theme.textMuted }}>
          <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.5"><line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" /></svg>
        </button>
      </div>

      {/* URL bar */}
      <div className="flex items-center gap-2 px-2 py-1.5 border-b shrink-0" style={{ borderColor: theme.border }}>
        <button onClick={goBack} className="p-1.5 rounded hover:bg-white/5" style={{ color: theme.textMuted }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 2L4 7l5 5" /></svg>
        </button>
        <button onClick={refresh} className="p-1.5 rounded hover:bg-white/5" style={{ color: theme.textMuted }}>🔄</button>

        <form onSubmit={e => { e.preventDefault(); navigate(input); }} className="flex-1 flex items-center px-3 py-1.5 rounded-lg" style={{ background: theme.bgTertiary }}>
          <span className="mr-2 text-xs" style={{ color: theme.textMuted }}>{active.url ? '🔒' : '🔍'}</span>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Search Google or enter URL"
            className="bg-transparent outline-none text-[12px] w-full" style={{ color: theme.text }} />
        </form>

        <button onClick={addBookmark} className="p-1.5 rounded hover:bg-white/5" style={{ color: theme.textMuted }} title="Bookmark">⭐</button>
        <button onClick={simulateDownload} className="p-1.5 rounded hover:bg-white/5" style={{ color: theme.textMuted }} title="Download page">⬇️</button>
      </div>

      {/* Bookmarks bar */}
      <div className="flex items-center gap-1 px-2 py-1 border-b overflow-x-auto no-scrollbar shrink-0" style={{ borderColor: theme.border }}>
        {bookmarks.map((b, i) => (
          <button key={i} onClick={() => navigate(b.url)} className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] hover:bg-white/5 whitespace-nowrap" style={{ color: theme.textSecondary }}>
            <span className="text-xs">{b.icon}</span>{b.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 relative bg-white">
        {active.url ? (
          <iframe
            data-tab={activeTab}
            src={active.url}
            className="w-full h-full"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
            onLoad={() => setTabs(ts => ts.map(t => t.id === activeTab ? { ...t, loading: false } : t))}
            title="browser"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4" style={{ background: theme.bg }}>
            <span className="text-5xl">🌐</span>
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>CemBrowser</h2>
            <p className="text-xs" style={{ color: theme.textMuted }}>Search the web or enter a URL</p>
            
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[
                { n: 'Google', u: 'https://www.google.com/webhp?igu=1', i: '🔍', c: '#4285f4' },
                { n: 'YouTube', u: 'https://www.youtube.com', i: '▶️', c: '#ff0000' },
                { n: 'Reddit', u: 'https://www.reddit.com', i: '🟠', c: '#ff4500' },
                { n: 'Wikipedia', u: 'https://en.wikipedia.org', i: '📚', c: '#333' },
                { n: 'GitHub', u: 'https://github.com', i: '🐙', c: '#333' },
                { n: 'Twitter', u: 'https://twitter.com', i: '🐦', c: '#1da1f2' },
                { n: 'ZorFlix', u: 'https://zorflix.vercel.app', i: '🎬', c: '#e50914' },
                { n: 'Poki Games', u: 'https://poki.com', i: '🎮', c: '#8b5cf6' },
              ].map(s => (
                <button key={s.n} onClick={() => navigate(s.u)} className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/5 transition-all"
                  style={{ border: `1px solid ${theme.border}` }}>
                  <span className="text-xl">{s.i}</span>
                  <span className="text-[10px]" style={{ color: theme.textSecondary }}>{s.n}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
