import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';

// Sample photos using picsum.photos (reliable embeddable images)
const samplePhotos = [
  { id: 1, src: 'https://picsum.photos/seed/a1/400/300', title: 'Mountain Vista' },
  { id: 2, src: 'https://picsum.photos/seed/b2/400/300', title: 'Ocean Sunset' },
  { id: 3, src: 'https://picsum.photos/seed/c3/400/300', title: 'City Lights' },
  { id: 4, src: 'https://picsum.photos/seed/d4/400/300', title: 'Forest Path' },
  { id: 5, src: 'https://picsum.photos/seed/e5/400/300', title: 'Desert Dunes' },
  { id: 6, src: 'https://picsum.photos/seed/f6/400/300', title: 'Snow Peaks' },
  { id: 7, src: 'https://picsum.photos/seed/g7/400/300', title: 'Autumn Leaves' },
  { id: 8, src: 'https://picsum.photos/seed/h8/400/300', title: 'Beach Paradise' },
  { id: 9, src: 'https://picsum.photos/seed/i9/400/300', title: 'Urban Street' },
  { id: 10, src: 'https://picsum.photos/seed/j10/400/300', title: 'Starry Night' },
  { id: 11, src: 'https://picsum.photos/seed/k11/400/300', title: 'Waterfall' },
  { id: 12, src: 'https://picsum.photos/seed/l12/400/300', title: 'Flower Garden' },
  { id: 13, src: 'https://picsum.photos/seed/m13/400/300', title: 'Lake Reflection' },
  { id: 14, src: 'https://picsum.photos/seed/n14/400/300', title: 'Canyon View' },
  { id: 15, src: 'https://picsum.photos/seed/o15/400/300', title: 'Rainy Day' },
  { id: 16, src: 'https://picsum.photos/seed/p16/400/300', title: 'Sunrise' },
];

const albums = [
  { name: 'All Photos', count: 16, icon: '🖼️' },
  { name: 'Favorites', count: 4, icon: '❤️' },
  { name: 'Nature', count: 8, icon: '🌲' },
  { name: 'Cities', count: 4, icon: '🏙️' },
  { name: 'Recent', count: 6, icon: '🕐' },
];

export const PhotosApp: React.FC = () => {
  const theme = themes[useStore(s => s.settings).theme];
  const [viewing, setViewing] = useState<typeof samplePhotos[0] | null>(null);
  const [viewIdx, setViewIdx] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([1, 5, 8, 12]);

  const toggleFav = (id: number) => {
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  const nextPhoto = () => {
    const newIdx = (viewIdx + 1) % samplePhotos.length;
    setViewIdx(newIdx);
    setViewing(samplePhotos[newIdx]);
  };

  const prevPhoto = () => {
    const newIdx = (viewIdx - 1 + samplePhotos.length) % samplePhotos.length;
    setViewIdx(newIdx);
    setViewing(samplePhotos[newIdx]);
  };

  // Full screen viewer
  if (viewing) {
    return (
      <div className="flex flex-col h-full" style={{ background: '#0a0a0a' }}>
        <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ background: theme.bgSecondary }}>
          <button onClick={() => setViewing(null)} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10" style={{ color: theme.textSecondary }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 2L4 7l5 5" /></svg>
            <span className="text-xs">Back</span>
          </button>
          <span className="text-xs font-medium" style={{ color: theme.text }}>{viewing.title}</span>
          <button onClick={() => toggleFav(viewing.id)} className="p-2 rounded hover:bg-white/10">
            <span style={{ color: favorites.includes(viewing.id) ? '#ef4444' : theme.textMuted }}>
              {favorites.includes(viewing.id) ? '❤️' : '🤍'}
            </span>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center relative">
          <button onClick={prevPhoto} className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors" style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>
            ‹
          </button>
          <img src={viewing.src.replace('400/300', '800/600')} alt={viewing.title} className="max-w-full max-h-full object-contain" />
          <button onClick={nextPhoto} className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors" style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>
            ›
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto no-scrollbar px-4">
          {samplePhotos.map((p, i) => (
            <button key={p.id} onClick={() => { setViewing(p); setViewIdx(i); }}
              className="w-12 h-12 rounded shrink-0 overflow-hidden transition-all"
              style={{ border: viewing.id === p.id ? '2px solid #3b82f6' : '2px solid transparent', opacity: viewing.id === p.id ? 1 : 0.5 }}>
              <img src={p.src.replace('400/300', '100/100')} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full" style={{ color: theme.text }}>
      {/* Sidebar */}
      <div className="w-44 shrink-0 flex flex-col py-3 border-r overflow-y-auto no-scrollbar" style={{ background: theme.bgSecondary, borderColor: theme.border }}>
        <div className="flex items-center gap-2 px-4 pb-3 mb-2 border-b" style={{ borderColor: theme.border }}>
          <span className="text-lg">🖼️</span>
          <span className="font-semibold text-sm" style={{ color: theme.accent }}>Photos</span>
        </div>
        {albums.map(a => (
          <button key={a.name} className="flex items-center gap-2 px-4 py-1.5 text-[12px] hover:bg-white/5 transition-colors mx-1 rounded" style={{ color: theme.textSecondary }}>
            <span>{a.icon}</span>
            <span className="flex-1 text-left">{a.name}</span>
            <span className="text-[10px]" style={{ color: theme.textMuted }}>{a.count}</span>
          </button>
        ))}
      </div>

      {/* Main grid */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: theme.border }}>
          <h2 className="text-sm font-semibold">All Photos</h2>
          <span className="text-[11px]" style={{ color: theme.textMuted }}>{samplePhotos.length} items</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-4 gap-2">
            {samplePhotos.map((photo, idx) => (
              <button key={photo.id} onClick={() => { setViewing(photo); setViewIdx(idx); }}
                className="relative aspect-square rounded-lg overflow-hidden group hover:ring-2 transition-all"
                style={{ ['--tw-ring-color' as string]: theme.accent }}>
                <img src={photo.src} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-1 left-2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  {photo.title}
                </span>
                {favorites.includes(photo.id) && (
                  <span className="absolute top-1 right-1 text-xs">❤️</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
