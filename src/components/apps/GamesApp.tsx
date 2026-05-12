import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';

const categories = ['All', 'Zoro Games', 'Action', 'Puzzle', 'Arcade'];

// Desktop games
const desktopGames = [
  { id: 'g1', name: 'CemGrid', cat: 'Zoro Games', color: '#10B981', desc: 'Grid puzzle by Zoro', url: 'https://cemgrid.vercel.app', zoro: true },
  { id: 'g2', name: 'Aetheria', cat: 'Zoro Games', color: '#A855F7', desc: 'Fantasy adventure', url: 'https://aetheria-lemon.vercel.app', zoro: true },
  { id: 'g3', name: 'DiddyShot V2', cat: 'Zoro Games', color: '#EF4444', desc: 'Target shooter v2', url: 'https://diddyshotv2.vercel.app', zoro: true },
  { id: 'g4', name: 'DiddyShot', cat: 'Zoro Games', color: '#F97316', desc: 'Original shooter', url: 'https://diddyshot.vercel.app', zoro: true },
  { id: 'g5', name: 'HexGL', cat: 'Action', color: '#F43F5E', desc: 'Futuristic racer', url: 'https://hexgl.bkcore.com/play/' },
  { id: 'g6', name: 'Hextris', cat: 'Puzzle', color: '#8B5CF6', desc: 'Hexagonal tetris', url: 'https://hextris.io/' },
  { id: 'g7', name: 'Wordle', cat: 'Puzzle', color: '#22C55E', desc: 'Daily word game', url: 'https://www.nytimes.com/games/wordle/index.html' },
  { id: 'g8', name: 'Tetris', cat: 'Arcade', color: '#06B6D4', desc: 'Classic blocks', url: 'https://tetris.com/play-tetris' },
];

// Mobile-friendly games
const mobileGames = [
  { id: 'gm1', name: 'CemGrid', cat: 'Zoro Games', color: '#10B981', desc: 'Grid puzzle by Zoro', url: 'https://cemgrid.vercel.app', zoro: true },
  { id: 'gm2', name: 'DiddyShot', cat: 'Zoro Games', color: '#F97316', desc: 'Touch shooter', url: 'https://diddyshot.vercel.app', zoro: true },
  { id: 'gm3', name: 'Flappy Bird', cat: 'Arcade', color: '#84CC16', desc: 'Tap to fly', url: 'https://flappybird.io/' },
  { id: 'gm4', name: '2048', cat: 'Puzzle', color: '#EAB308', desc: 'Swipe numbers', url: 'https://2048game.com/' },
  { id: 'gm5', name: 'Slither.io', cat: 'Arcade', color: '#22D3EE', desc: 'Snake multiplayer', url: 'https://slither.io/' },
  { id: 'gm6', name: 'Krunker', cat: 'Action', color: '#EF4444', desc: 'FPS shooter', url: 'https://krunker.io/' },
];

// Game icon based on category
const GameIcon: React.FC<{ color: string; cat: string; zoro?: boolean }> = ({ color, cat, zoro }) => {
  if (zoro) return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill={color} />
      <text x="18" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="system-ui">Z</text>
    </svg>
  );
  if (cat === 'Puzzle') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="4" width="12" height="12" rx="2" fill={color} />
      <rect x="20" y="4" width="12" height="12" rx="2" fill={color} opacity="0.7" />
      <rect x="4" y="20" width="12" height="12" rx="2" fill={color} opacity="0.5" />
      <rect x="20" y="20" width="12" height="12" rx="2" fill={color} opacity="0.8" />
    </svg>
  );
  if (cat === 'Action') return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <polygon points="18,4 32,32 4,32" fill={color} />
      <circle cx="18" cy="22" r="5" fill="white" opacity="0.4" />
    </svg>
  );
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="4" y="10" width="28" height="16" rx="4" fill={color} />
      <circle cx="12" cy="18" r="3" fill="white" />
      <circle cx="26" cy="16" r="2" fill="white" />
      <circle cx="26" cy="20" r="2" fill="white" opacity="0.7" />
    </svg>
  );
};

export const GamesApp: React.FC = () => {
  const { settings, openWindow, isMobile } = useStore();
  const theme = themes[settings.theme];
  const [cat, setCat] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('cemos-fav-games') || '[]'); } catch { return []; }
  });

  const games = isMobile ? mobileGames : desktopGames;
  
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

  const zoroGames = games.filter(g => g.zoro);
  const featured = zoroGames[0];

  return (
    <div className="flex flex-col h-full" style={{ color: theme.text }}>
      {/* Header with Zoro branding */}
      <div className="flex items-center gap-3 px-3 py-2 border-b shrink-0" style={{ borderColor: theme.border }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="6" width="20" height="12" rx="4" fill="#8B5CF6" />
          <circle cx="7" cy="12" r="2" fill="white" />
          <circle cx="17" cy="10" r="1.5" fill="white" />
          <circle cx="17" cy="14" r="1.5" fill="white" />
        </svg>
        <span className="font-bold text-sm" style={{ color: '#8B5CF6' }}>CemGames</span>
        <div className="flex-1 flex items-center px-3 py-1.5 rounded-lg mx-2" style={{ background: theme.bgTertiary }}>
          <input type="text" placeholder="Search games..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-[12px] w-full" style={{ color: theme.text }} />
        </div>
        {/* Zoro watermark */}
        <div className="text-[10px] font-bold opacity-30">by ZORO</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Featured Zoro Game */}
        {cat === 'All' && !search && featured && (
          <div className="mx-3 mt-3 rounded-xl overflow-hidden cursor-pointer group" onClick={() => launchGame(featured)}
            style={{ background: `linear-gradient(135deg, ${featured.color}60, ${featured.color}20)`, border: `1px solid ${featured.color}50` }}>
            <div className="flex items-center gap-4 p-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `${featured.color}40` }}>
                <GameIcon color={featured.color} cat={featured.cat} zoro={featured.zoro} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: featured.color, color: 'white' }}>ZORO GAME</span>
                </div>
                <h3 className="text-lg font-bold mt-1">{featured.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>{featured.desc}</p>
                <button className="mt-2 px-4 py-1.5 rounded-lg text-xs font-medium text-white hover:brightness-110 transition-all"
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
            <p className="text-xs font-semibold mb-1.5" style={{ color: theme.textSecondary }}>★ Favorites</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {games.filter(g => favorites.includes(g.id)).map(g => (
                <button key={g.id} onClick={() => launchGame(g)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl shrink-0 hover:brightness-110 transition-all"
                  style={{ background: `${g.color}25`, border: `1px solid ${g.color}35` }}>
                  <GameIcon color={g.color} cat={g.cat} zoro={g.zoro} />
                  <span className="text-xs font-medium whitespace-nowrap">{g.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile notice */}
        {isMobile && cat === 'All' && !search && (
          <div className="mx-3 mb-2 px-3 py-2 rounded-lg text-[11px]" style={{ background: theme.bgTertiary, color: theme.textMuted }}>
            📱 Showing touch-friendly games optimized for mobile
          </div>
        )}

        {/* Games grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 px-3 pb-4">
          {filtered.map(g => (
            <div key={g.id} onClick={() => launchGame(g)}
              className="rounded-xl overflow-hidden group cursor-pointer transition-all hover:ring-2"
              style={{ background: theme.bgTertiary, ['--tw-ring-color' as string]: g.color }}>
              <div className="h-24 flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${g.color}35, ${g.color}10)` }}>
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <GameIcon color={g.color} cat={g.cat} zoro={g.zoro} />
                </div>
                <button onClick={e => toggleFav(e, g.id)}
                  className="absolute top-2 right-2 text-base opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                  style={{ color: favorites.includes(g.id) ? '#fbbf24' : theme.textMuted }}>
                  {favorites.includes(g.id) ? '★' : '☆'}
                </button>
                {g.zoro && (
                  <div className="absolute top-2 left-2 text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>ZORO</div>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium">{g.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: theme.textMuted }}>{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
