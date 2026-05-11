import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';

const categories = ['Trending', 'Music', 'Gaming', 'Tech', 'Nature'];

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', channel: 'Rick Astley', views: '1.5B', cat: 'Music' },
  { id: 'kJQP7kiw5Fk', title: 'Despacito', channel: 'Luis Fonsi', views: '8.2B', cat: 'Music' },
  { id: 'JGwWNGJdvx8', title: 'Shape of You', channel: 'Ed Sheeran', views: '6B', cat: 'Music' },
  { id: '9bZkp7q19f0', title: 'Gangnam Style', channel: 'PSY', views: '5B', cat: 'Trending' },
  { id: 'RgKAFK5djSk', title: 'See You Again', channel: 'Wiz Khalifa', views: '5.7B', cat: 'Music' },
  { id: 'CevxZvSJLk8', title: 'Roar', channel: 'Katy Perry', views: '3.8B', cat: 'Music' },
  { id: 'fRh_vgS2dFE', title: 'Sorry', channel: 'Justin Bieber', views: '3.5B', cat: 'Music' },
  { id: 'YQHsXMglC9A', title: 'Hello', channel: 'Adele', views: '3B', cat: 'Music' },
  { id: '60ItHLz5WEA', title: 'Alan Walker - Faded', channel: 'Alan Walker', views: '3.4B', cat: 'Music' },
  { id: 'kXYiU_JCYtU', title: 'Numb', channel: 'Linkin Park', views: '1.8B', cat: 'Music' },
  { id: 'hT_nvWreIhg', title: 'Counting Stars', channel: 'OneRepublic', views: '3.7B', cat: 'Music' },
  { id: 'OPf0YbXqDm0', title: 'Uptown Funk', channel: 'Bruno Mars', views: '4.8B', cat: 'Trending' },
];

export const VideoApp: React.FC = () => {
  const theme = themes[useStore(s => s.settings).theme];
  const [activeCat, setActiveCat] = useState('Trending');
  const [watching, setWatching] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = videos.filter(v => {
    const matchCat = activeCat === 'Trending' || v.cat === activeCat;
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (watching) {
    const video = videos.find(v => v.id === watching);
    return (
      <div className="flex flex-col h-full" style={{ color: theme.text, background: '#0f0f0f' }}>
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: theme.bgSecondary }}>
          <button onClick={() => setWatching(null)} className="p-1 rounded hover:bg-white/10" style={{ color: theme.textMuted }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 2L4 7l5 5" /></svg>
          </button>
          <span className="text-xs font-medium truncate" style={{ color: theme.textSecondary }}>{video?.title}</span>
        </div>
        <div className="flex-1 relative bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${watching}?autoplay=1&rel=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; encrypted-media"
            title="video"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ color: theme.text }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 border-b shrink-0" style={{ borderColor: theme.border }}>
        <span className="text-lg">▶️</span>
        <span className="font-bold text-sm" style={{ color: '#ff0000' }}>CemTube</span>
        <div className="flex-1 flex items-center px-3 py-1.5 rounded-lg mx-2" style={{ background: theme.bgTertiary }}>
          <input type="text" placeholder="Search videos..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-[12px] w-full" style={{ color: theme.text }} />
          <span className="text-xs ml-1" style={{ color: theme.textMuted }}>🔍</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar shrink-0">
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCat(c)} className="px-3 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors"
            style={{ background: activeCat === c ? theme.accent : theme.bgTertiary, color: activeCat === c ? '#fff' : theme.textSecondary }}>
            {c}
          </button>
        ))}
      </div>

      {/* Videos */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(v => (
            <button key={v.id} onClick={() => setWatching(v.id)}
              className="rounded-lg overflow-hidden hover:ring-2 transition-all text-left group"
              style={{ background: theme.bgTertiary, ['--tw-ring-color' as string]: theme.accent }}>
              <div className="relative aspect-video bg-black">
                <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm ml-0.5">▶</span>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs font-medium line-clamp-2 leading-tight" style={{ color: theme.text }}>{v.title}</p>
                <p className="text-[10px] mt-1" style={{ color: theme.textMuted }}>{v.channel} · {v.views} views</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
