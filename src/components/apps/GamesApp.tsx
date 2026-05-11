import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';

const categories = ['All', 'Action', 'Arcade', 'Puzzle', 'Racing', 'Sandbox', 'Idle'];

const games = [
  { id: 'g1', name: 'Voxel Builder', cat: 'Sandbox', color: '#10b981', icon: '🧱', desc: 'Build & explore worlds', url: 'https://sandspiel.club/' },
  { id: 'g2', name: 'HexGL Racer', cat: 'Racing', color: '#f43f5e', icon: '🏎️', desc: 'Futuristic racing', url: 'https://hexgl.bkcore.com/play/' },
  { id: 'g3', name: '2048', cat: 'Puzzle', color: '#eab308', icon: '🔢', desc: 'Number puzzle', url: 'https://play2048.co/' },
  { id: 'g4', name: 'Cookie Clicker', cat: 'Idle', color: '#d97706', icon: '🍪', desc: 'Cookie empire', url: 'https://orteil.dashnet.org/cookieclicker/' },
  { id: 'g5', name: 'Tetris', cat: 'Arcade', color: '#06b6d4', icon: '🎮', desc: 'Classic blocks', url: 'https://tetris.com/play-tetris' },
  { id: 'g6', name: 'Wordle', cat: 'Puzzle', color: '#22c55e', icon: '📝', desc: 'Word game', url: 'https://www.nytimes.com/games/wordle/index.html' },
  { id: 'g7', name: 'Slope', cat: 'Arcade', color: '#8b5cf6', icon: '⚡', desc: 'Ball rolling', url: 'https://slope-game.github.io/' },
  { id: 'g8', name: 'Chess', cat: 'Puzzle', color: '#64748b', icon: '♟️', desc: 'Classic chess', url: 'https://www.chess.com/play/computer' },
  { id: 'g9', name: 'Aetheria', cat: 'Action', color: '#a855f7', icon: '✨', desc: 'Fantasy adventure', url: 'https://aetheria-lemon.vercel.app' },
  { id: 'g10', name: 'DiddyShot V2', cat: 'Action', color: '#ef4444', icon: '🎯', desc: 'Shooter game', url: 'https://diddyshotv2.vercel.app' },
  { id: 'g11', name: 'CemAbyss', cat: 'Action', color: '#1e40af', icon: '🌊', desc: 'Deep sea horror', url: 'https://cemabyss.vercel.app' },
  { id: 'g12', name: 'DiddyShot', cat: 'Arcade', color: '#f97316', icon: '💥', desc: 'Arcade shooter', url: 'https://diddyshot.vercel.app' },
];

export const GamesApp: React.FC = () => {
  const { settings, openWindow } = useStore();
  const theme = themes[settings.theme];
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('cemos-fav-games') || '[]'); } catch { return []; }
  });

  const filtered = games.filter(g => {
    const matchCat = cat === 'All' || g.cat === cat;
    const matchSearch = !search || g.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const launchGame = (g: typeof games[0]) => {
    openWindow(`game-${g.id}`, g.name, { width: 1000, height: 700 });
  };

  const toggleFav = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newFavs = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem('cemos-fav-games', JSON.stringify(newFavs));
  };

  const featured = games[0];

  return (
    <div className="flex flex-col h-full" style={{ color: theme.text }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 border-b shrink-0" style={{ borderColor: theme.border }}>
        <span className="text-lg">🎮</span>
        <span className="font-bold text-sm" style={{ color: '#8b5cf6' }}>CemGames</span>
        <div className="flex-1 flex items-center px-3 py-1.5 rounded-lg mx-2" style={{ background: theme.bgTertiary }}>
          <input type="text" placeholder="Search games..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-[12px] w-full" style={{ color: theme.text }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Featured banner */}
        {cat === 'All' && !search && (
          <div className="mx-3 mt-3 rounded-lg overflow-hidden cursor-pointer group" onClick={() => launchGame(featured)}
            style={{ background: `linear-gradient(135deg, ${featured.color}50, ${featured.color}15)`, border: `1px solid ${featured.color}40` }}>
            <div className="flex items-center gap-4 p-4">
              <span className="text-5xl group-hover:scale-110 transition-transform">{featured.icon}</span>
              <div className="flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: featured.color }}>Featured Game</p>
                <h3 className="text-lg font-bold mt-0.5" style={{ color: theme.text }}>{featured.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>{featured.desc}</p>
                <button className="mt-2 px-4 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:brightness-110"
                  style={{ background: featured.color }}>Play Now</button>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} className="px-3 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors"
              style={{ background: cat === c ? theme.accent : theme.bgTertiary, color: cat === c ? '#fff' : theme.textSecondary }}>
              {c}
            </button>
          ))}
        </div>

        {/* Favorites */}
        {favorites.length > 0 && cat === 'All' && !search && (
          <div className="px-3 mb-2">
            <p className="text-xs font-semibold mb-1.5" style={{ color: theme.textSecondary }}>⭐ Favorites</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {games.filter(g => favorites.includes(g.id)).map(g => (
                <button key={g.id} onClick={() => launchGame(g)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg shrink-0 hover:brightness-110 transition-all"
                  style={{ background: `${g.color}25`, border: `1px solid ${g.color}30` }}>
                  <span className="text-lg">{g.icon}</span>
                  <span className="text-xs font-medium whitespace-nowrap" style={{ color: theme.text }}>{g.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Games grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 px-3 pb-4">
          {filtered.map(g => (
            <div key={g.id} onClick={() => launchGame(g)}
              className="rounded-lg overflow-hidden group cursor-pointer transition-all hover:ring-2"
              style={{ background: theme.bgTertiary, ['--tw-ring-color' as string]: g.color }}>
              <div className="h-20 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${g.color}35, ${g.color}10)` }}>
                <span className="text-4xl group-hover:scale-125 transition-transform duration-300">{g.icon}</span>
                <button onClick={e => toggleFav(e, g.id)}
                  className="absolute top-2 right-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
                  {favorites.includes(g.id) ? '⭐' : '☆'}
                </button>
              </div>
              <div className="p-2">
                <p className="text-xs font-medium" style={{ color: theme.text }}>{g.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: theme.textMuted }}>{g.cat} · {g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
