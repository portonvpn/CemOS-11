import { AppDef } from './types';

export const allApps: AppDef[] = [
  // System apps
  { id: 'explorer', name: 'Files', icon: '📁', category: 'system', pinned: true, color: '#f59e0b' },
  { id: 'settings', name: 'Settings', icon: '⚙️', category: 'system', pinned: true, color: '#64748b' },
  { id: 'browser', name: 'Browser', icon: '🌐', category: 'system', pinned: true, color: '#3b82f6' },
  { id: 'music', name: 'Spotify', icon: '🎵', category: 'media', pinned: true, color: '#1db954' },
  { id: 'video', name: 'CemTube', icon: '▶️', category: 'media', pinned: true, color: '#ff0000' },
  { id: 'games', name: 'Games', icon: '🎮', category: 'games', pinned: true, color: '#8b5cf6' },

  // Streaming
  { id: 'zorflix', name: 'ZorFlix', icon: '🎬', category: 'media', color: '#e50914', url: 'https://zorflix.vercel.app' },

  // Zoro ecosystem apps
  { id: 'glacier', name: 'Glacier.AI', icon: '🧊', category: 'productivity', color: '#06b6d4', url: 'https://glacier-gamma.vercel.app/' },
  { id: 'aetheria', name: 'Aetheria', icon: '✨', category: 'games', color: '#a855f7', url: 'https://aetheria-lemon.vercel.app' },
  { id: 'diddyshot2', name: 'DiddyShot V2', icon: '🎯', category: 'games', color: '#ef4444', url: 'https://diddyshotv2.vercel.app' },
  { id: 'cemabyss', name: 'CemAbyss', icon: '🌊', category: 'games', color: '#1e40af', url: 'https://cemabyss.vercel.app' },
  { id: 'cemgrid', name: 'CemGrid', icon: '📐', category: 'productivity', color: '#10b981', url: 'https://cemgrid.vercel.app' },
  { id: 'diddyshot', name: 'DiddyShot', icon: '💥', category: 'games', color: '#f97316', url: 'https://diddyshot.vercel.app' },
  { id: 'zoripas', name: 'ZorIPAs', icon: '📱', category: 'utilities', color: '#6366f1', url: 'https://portonvpn.github.io/ZorIPAS/' },
  { id: 'zorapks', name: 'ZorApks', icon: '📦', category: 'utilities', color: '#14b8a6', url: 'https://portonvpn.github.io/ZorApks/' },

  // Extra system
  { id: 'terminal', name: 'Terminal', icon: '💻', category: 'system', color: '#22c55e' },
  { id: 'calculator', name: 'Calculator', icon: '🔢', category: 'utilities', color: '#64748b' },
  { id: 'notes', name: 'Notes', icon: '📝', category: 'productivity', color: '#eab308' },
  { id: 'photos', name: 'Photos', icon: '🖼️', category: 'media', color: '#ec4899' },
  { id: 'weather', name: 'Weather', icon: '🌤️', category: 'utilities', color: '#0ea5e9' },
  { id: 'clock', name: 'Clock', icon: '⏰', category: 'utilities', color: '#8b5cf6' },
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
