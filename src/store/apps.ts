import { AppDef } from './types';

// Apps for left side of desktop
export const leftApps: AppDef[] = [
  { id: 'explorer', name: 'Files', icon: 'files', category: 'system', pinned: true, color: '#F59E0B' },
  { id: 'browser', name: 'Browser', icon: 'browser', category: 'system', pinned: true, color: '#3B82F6' },
  { id: 'music', name: 'Spotify', icon: 'music', category: 'media', pinned: true, color: '#1DB954' },
  { id: 'video', name: 'CemTube', icon: 'video', category: 'media', pinned: true, color: '#FF0000' },
  { id: 'games', name: 'Games', icon: 'games', category: 'games', pinned: true, color: '#8B5CF6' },
  { id: 'photos', name: 'Photos', icon: 'photos', category: 'media', color: '#EC4899' },
  { id: 'settings', name: 'Settings', icon: 'settings', category: 'system', pinned: true, color: '#64748B' },
];

// Apps for right side of desktop
export const rightApps: AppDef[] = [
  { id: 'zorflix', name: 'ZorFlix', icon: 'movie', category: 'media', color: '#E50914', url: 'https://zorflix.vercel.app' },
  { id: 'glacier', name: 'Glacier AI', icon: 'ai', category: 'productivity', color: '#06B6D4', url: 'https://glacier-gamma.vercel.app/' },
  { id: 'cemabyss', name: 'CemAbyss', icon: 'wave', category: 'media', color: '#1E40AF', url: 'https://cemabyss.vercel.app' },
  { id: 'terminal', name: 'Terminal', icon: 'terminal', category: 'system', color: '#22C55E' },
  { id: 'calculator', name: 'Calculator', icon: 'calculator', category: 'utilities', color: '#64748B' },
  { id: 'notes', name: 'Notes', icon: 'notes', category: 'productivity', color: '#EAB308' },
];

export const allApps: AppDef[] = [...leftApps, ...rightApps,
  // Games by Zoro
  { id: 'cemgrid', name: 'CemGrid', icon: 'grid', category: 'games', color: '#10B981', url: 'https://cemgrid.vercel.app' },
  { id: 'aetheria', name: 'Aetheria', icon: 'star', category: 'games', color: '#A855F7', url: 'https://aetheria-lemon.vercel.app' },
  { id: 'diddyshot2', name: 'DiddyShot V2', icon: 'shooter', category: 'games', color: '#EF4444', url: 'https://diddyshotv2.vercel.app' },
  { id: 'diddyshot', name: 'DiddyShot', icon: 'explosion', category: 'games', color: '#F97316', url: 'https://diddyshot.vercel.app' },
  // Utilities
  { id: 'zoripas', name: 'ZorIPAs', icon: 'phone', category: 'utilities', color: '#6366F1', url: 'https://portonvpn.github.io/ZorIPAS/' },
  { id: 'zorapks', name: 'ZorApks', icon: 'package', category: 'utilities', color: '#14B8A6', url: 'https://portonvpn.github.io/ZorApks/' },
];

export const pinnedApps = allApps.filter(a => a.pinned);
export const getApp = (id: string) => allApps.find(a => a.id === id);

// URL mapping for web apps
export const appUrls: Record<string, string> = {
  zorflix: 'https://zorflix.vercel.app',
  glacier: 'https://glacier-gamma.vercel.app/',
  aetheria: 'https://aetheria-lemon.vercel.app',
  diddyshot2: 'https://diddyshotv2.vercel.app',
  cemabyss: 'https://cemabyss.vercel.app',
  cemgrid: 'https://cemgrid.vercel.app',
  diddyshot: 'https://diddyshot.vercel.app',
  zoripas: 'https://portonvpn.github.io/ZorIPAS/',
  zorapks: 'https://portonvpn.github.io/ZorApks/',
};

// Game URLs - verified working embeddable games
export const gameUrls: Record<string, string> = {
  // Zoro Games
  g1: 'https://cemgrid.vercel.app',
  g2: 'https://aetheria-lemon.vercel.app',
  g3: 'https://diddyshotv2.vercel.app',
  g4: 'https://diddyshot.vercel.app',
  // Browser games that work
  g5: 'https://hexgl.bkcore.com/play/',
  g6: 'https://hextris.io/',
  g7: 'https://www.nytimes.com/games/wordle/index.html',
  g8: 'https://tetris.com/play-tetris',
  // Mobile friendly
  gm1: 'https://flappybird.io/',
  gm2: 'https://2048game.com/',
  gm3: 'https://slither.io/',
  gm4: 'https://krunker.io/',
};
