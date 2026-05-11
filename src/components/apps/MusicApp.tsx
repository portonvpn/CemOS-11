import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

// Spotify-inspired music app using embedded Spotify playlists
const playlists = [
  { id: '37i9dQZF1DXcBWIGoYBM5M', name: "Today's Top Hits", color: '#e8115b' },
  { id: '37i9dQZF1DX4sWSpwq3LiO', name: 'Peaceful Piano', color: '#8c67ac' },
  { id: '37i9dQZF1DX0XUsuxWHRQd', name: 'RapCaviar', color: '#dc148c' },
  { id: '37i9dQZF1DWXRqgorJj26U', name: 'Rock Classics', color: '#e61e32' },
  { id: '37i9dQZF1DX4o1oenSJRJd', name: 'Lofi Beats', color: '#7358ff' },
  { id: '37i9dQZF1DX1lVhptIYRda', name: 'Hot Country', color: '#ffc864' },
];

const SpotifyLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#1db954">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

export const MusicApp: React.FC = () => {
  useStore(s => s.settings);
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);

  return (
    <div className="flex h-full" style={{ background: '#121212', color: '#fff' }}>
      {/* Sidebar */}
      <div className="w-52 shrink-0 flex flex-col py-3 border-r overflow-y-auto no-scrollbar" style={{ background: '#000', borderColor: '#282828' }}>
        <div className="flex items-center gap-2 px-4 pb-4">
          <SpotifyLogo />
          <span className="font-bold text-sm" style={{ color: '#1db954' }}>Spotify</span>
        </div>
        
        <div className="px-3 mb-2">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left">
            <span className="text-lg">🏠</span>
            <span className="text-sm font-medium">Home</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left">
            <span className="text-lg">🔍</span>
            <span className="text-sm font-medium">Search</span>
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left">
            <span className="text-lg">📚</span>
            <span className="text-sm font-medium">Your Library</span>
          </button>
        </div>

        <div className="px-3 mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider px-3 mb-2" style={{ color: '#a7a7a7' }}>Playlists</p>
          {playlists.map(p => (
            <button key={p.id} onClick={() => setActivePlaylist(p.id)}
              className="flex items-center gap-2.5 w-full px-3 py-1.5 text-[12px] hover:bg-white/10 transition-colors rounded"
              style={{ color: activePlaylist === p.id ? '#1db954' : '#b3b3b3' }}>
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: p.color }}>
                <span className="text-xs">🎵</span>
              </div>
              <span className="truncate">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: 'linear-gradient(180deg, #1e1e1e 0%, #121212 100%)' }}>
        {activePlaylist ? (
          <iframe
            src={`https://open.spotify.com/embed/playlist/${activePlaylist}?theme=0`}
            className="w-full h-full"
            allow="encrypted-media; autoplay; clipboard-write"
            title="Spotify Player"
            style={{ border: 'none' }}
          />
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-1">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}</h2>
            <p className="text-sm mb-6" style={{ color: '#a7a7a7' }}>Jump back in with your favorite playlists</p>
            
            <div className="grid grid-cols-2 gap-3">
              {playlists.map(p => (
                <button key={p.id} onClick={() => setActivePlaylist(p.id)}
                  className="flex items-center gap-3 rounded-lg overflow-hidden hover:bg-white/10 transition-all group"
                  style={{ background: '#282828' }}>
                  <div className="w-16 h-16 flex items-center justify-center shrink-0" style={{ background: p.color }}>
                    <span className="text-2xl">🎵</span>
                  </div>
                  <span className="font-medium text-sm pr-3 truncate">{p.name}</span>
                  <div className="ml-auto mr-3 w-10 h-10 rounded-full bg-[#1db954] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                    <span className="text-black text-lg">▶</span>
                  </div>
                </button>
              ))}
            </div>

            <h3 className="text-lg font-bold mt-8 mb-4">Made for you</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {playlists.map(p => (
                <button key={p.id} onClick={() => setActivePlaylist(p.id)}
                  className="flex flex-col shrink-0 w-36 p-3 rounded-lg hover:bg-white/10 transition-all"
                  style={{ background: '#181818' }}>
                  <div className="w-full aspect-square rounded-lg mb-3 flex items-center justify-center shadow-lg" style={{ background: p.color }}>
                    <span className="text-4xl">🎵</span>
                  </div>
                  <p className="font-medium text-sm truncate">{p.name}</p>
                  <p className="text-[11px] mt-1 line-clamp-2" style={{ color: '#a7a7a7' }}>Top tracks right now</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
