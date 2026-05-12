import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';

const categories = ['For You', 'Trending', 'Music', 'Gaming', 'Sports', 'News'];

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Never Gonna Give You Up', channel: 'Rick Astley', views: '1.5B', duration: '3:32', cat: 'Music' },
  { id: 'kJQP7kiw5Fk', title: 'Despacito ft. Daddy Yankee', channel: 'Luis Fonsi', views: '8.2B', duration: '4:41', cat: 'Music' },
  { id: 'JGwWNGJdvx8', title: 'Shape of You', channel: 'Ed Sheeran', views: '6B', duration: '4:24', cat: 'Music' },
  { id: '9bZkp7q19f0', title: 'Gangnam Style', channel: 'PSY', views: '5B', duration: '4:12', cat: 'Trending' },
  { id: 'RgKAFK5djSk', title: 'See You Again ft. Charlie Puth', channel: 'Wiz Khalifa', views: '5.7B', duration: '3:57', cat: 'Music' },
  { id: 'OPf0YbXqDm0', title: 'Uptown Funk ft. Bruno Mars', channel: 'Mark Ronson', views: '4.8B', duration: '4:30', cat: 'Trending' },
  { id: '60ItHLz5WEA', title: 'Faded', channel: 'Alan Walker', views: '3.4B', duration: '3:32', cat: 'Music' },
  { id: 'kXYiU_JCYtU', title: 'Numb', channel: 'Linkin Park', views: '1.8B', duration: '3:07', cat: 'Music' },
  { id: 'hT_nvWreIhg', title: 'Counting Stars', channel: 'OneRepublic', views: '3.7B', duration: '4:44', cat: 'Music' },
  { id: 'YQHsXMglC9A', title: 'Hello', channel: 'Adele', views: '3B', duration: '6:07', cat: 'Music' },
  { id: 'fJ9rUzIMcZQ', title: 'Bohemian Rhapsody', channel: 'Queen', views: '1.8B', duration: '5:59', cat: 'Music' },
  { id: 'CevxZvSJLk8', title: 'Roar', channel: 'Katy Perry', views: '3.8B', duration: '4:30', cat: 'Trending' },
];

export const VideoApp: React.FC = () => {
  const theme = themes[useStore(s => s.settings).theme];
  const [activeCat, setActiveCat] = useState('For You');
  const [watching, setWatching] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [liked, setLiked] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  const filtered = videos.filter(v => {
    const matchCat = activeCat === 'For You' || activeCat === 'Trending' || v.cat === activeCat;
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.channel.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const currentVideo = videos.find(v => v.id === watching);

  // Watch mode
  if (watching && currentVideo) {
    return (
      <div className="flex flex-col h-full" style={{ background: '#0f0f0f', color: '#fff' }}>
        {/* Video player */}
        <div className="relative aspect-video bg-black shrink-0">
          <iframe
            src={`https://www.youtube.com/embed/${watching}?autoplay=1&rel=0&modestbranding=1`}
            className="w-full h-full"
            allow="autoplay; fullscreen; encrypted-media"
            title="video"
          />
        </div>
        
        {/* Video info */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h1 className="text-lg font-semibold">{currentVideo.title}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm" style={{ color: '#aaa' }}>
              <span>{currentVideo.views} views</span>
              <span>•</span>
              <span>2 days ago</span>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4 mt-4 pb-4 border-b" style={{ borderColor: '#333' }}>
              <button 
                onClick={() => setLiked(l => l.includes(watching) ? l.filter(x => x !== watching) : [...l, watching])}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: liked.includes(watching) ? '#3ea6ff' : '#272727', color: liked.includes(watching) ? '#000' : '#fff' }}
              >
                <span>{liked.includes(watching) ? '👍' : '👍'}</span>
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: '#272727' }}>
                <span>👎</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: '#272727' }}>
                <span>↗️</span>
                <span className="text-sm">Share</span>
              </button>
              <button 
                onClick={() => setSaved(s => s.includes(watching) ? s.filter(x => x !== watching) : [...s, watching])}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: saved.includes(watching) ? '#3ea6ff' : '#272727', color: saved.includes(watching) ? '#000' : '#fff' }}
              >
                <span>{saved.includes(watching) ? '✓' : '+'}</span>
                <span className="text-sm">Save</span>
              </button>
            </div>

            {/* Channel */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center font-bold">
                {currentVideo.channel[0]}
              </div>
              <div className="flex-1">
                <p className="font-medium">{currentVideo.channel}</p>
                <p className="text-xs" style={{ color: '#aaa' }}>1.2M subscribers</p>
              </div>
              <button className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: '#cc0000' }}>
                Subscribe
              </button>
            </div>

            {/* Back button */}
            <button 
              onClick={() => setWatching(null)}
              className="mt-6 flex items-center gap-2 text-sm"
              style={{ color: '#3ea6ff' }}
            >
              ← Back to browse
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full" style={{ color: theme.text }}>
      {/* Header with Zoro branding */}
      <div className="flex items-center gap-3 px-3 py-2 border-b shrink-0" style={{ borderColor: theme.border }}>
        <svg width="28" height="20" viewBox="0 0 28 20" fill="#FF0000">
          <path d="M27.5 3C27.5 1.3 26.2 0 24.5 0H3.5C1.8 0 0.5 1.3 0.5 3V17C0.5 18.7 1.8 20 3.5 20H24.5C26.2 20 27.5 18.7 27.5 17V3Z"/>
          <path d="M11 14.5V5.5L19 10L11 14.5Z" fill="white"/>
        </svg>
        <span className="font-bold text-base" style={{ color: theme.text }}>CemTube</span>
        <div className="flex-1 flex items-center px-3 py-1.5 rounded-full mx-2" style={{ background: theme.bgTertiary, border: `1px solid ${theme.border}` }}>
          <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full" style={{ color: theme.text }} />
          <button className="p-1 rounded-full" style={{ background: theme.bgSecondary }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={theme.textMuted} strokeWidth="1.5">
              <circle cx="7" cy="7" r="5" /><path d="M11 11l3 3" />
            </svg>
          </button>
        </div>
        <div className="text-[10px] font-bold opacity-30">by ZORO</div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-3 py-2 overflow-x-auto no-scrollbar shrink-0" style={{ background: theme.bgSecondary }}>
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCat(c)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors"
            style={{ 
              background: activeCat === c ? (theme.isDark ? '#fff' : '#0f0f0f') : theme.bgTertiary, 
              color: activeCat === c ? (theme.isDark ? '#0f0f0f' : '#fff') : theme.textSecondary 
            }}>
            {c}
          </button>
        ))}
      </div>

      {/* Videos grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map(v => (
            <button key={v.id} onClick={() => setWatching(v.id)}
              className="flex gap-3 rounded-xl overflow-hidden text-left group transition-all hover:bg-white/5 p-1">
              <div className="relative w-40 aspect-video rounded-lg overflow-hidden shrink-0 bg-black">
                <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-[10px] font-medium" style={{ background: 'rgba(0,0,0,0.8)' }}>
                  {v.duration}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-lg ml-0.5">▶</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0 py-1">
                <p className="text-sm font-medium line-clamp-2 leading-snug" style={{ color: theme.text }}>{v.title}</p>
                <p className="text-xs mt-1.5" style={{ color: theme.textMuted }}>{v.channel}</p>
                <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>{v.views} views • 2 days ago</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
