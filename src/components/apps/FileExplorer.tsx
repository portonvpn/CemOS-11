import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size?: string;
  ext?: string;
  date?: string;
  content?: string;
}

interface FileSystem {
  [key: string]: FileItem[];
}

const defaultFS: FileSystem = {
  'This PC': [
    { name: 'Desktop', type: 'folder' }, { name: 'Documents', type: 'folder' }, { name: 'Downloads', type: 'folder' },
    { name: 'Pictures', type: 'folder' }, { name: 'Music', type: 'folder' }, { name: 'Videos', type: 'folder' },
    { name: 'Local Disk (C:)', type: 'folder' },
  ],
  Desktop: [
    { name: 'readme.txt', type: 'file', size: '2 KB', ext: 'txt', date: '2025-01-15', content: 'Welcome to CemOS 11!\n\nThis is your desktop readme file.' },
    { name: 'notes.md', type: 'file', size: '1 KB', ext: 'md', date: '2025-01-18', content: '# My Notes\n\n- Todo item 1\n- Todo item 2' },
  ],
  Documents: [
    { name: 'Resume.pdf', type: 'file', size: '245 KB', ext: 'pdf', date: '2025-01-10' },
    { name: 'Budget.xlsx', type: 'file', size: '156 KB', ext: 'xlsx', date: '2025-01-05' },
    { name: 'Projects', type: 'folder' },
  ],
  Downloads: [],
  Pictures: [
    { name: 'Screenshots', type: 'folder' },
    { name: 'wallpaper.jpg', type: 'file', size: '3.4 MB', ext: 'jpg', date: '2024-12-20' },
  ],
  Music: [
    { name: 'playlist.m3u', type: 'file', size: '2 KB', ext: 'm3u', date: '2025-01-12' },
  ],
  Videos: [
    { name: 'tutorial.mp4', type: 'file', size: '234 MB', ext: 'mp4', date: '2025-01-08' },
  ],
  'Local Disk (C:)': [
    { name: 'CemOS', type: 'folder' }, { name: 'Program Files', type: 'folder' }, { name: 'Users', type: 'folder' },
  ],
  Projects: [{ name: 'project-notes.txt', type: 'file', size: '5 KB', ext: 'txt', date: '2025-01-17', content: 'Project planning notes...' }],
  Screenshots: [],
  CemOS: [{ name: 'system.dll', type: 'file', size: '2.4 MB', ext: 'dll', date: '2025-01-01' }],
  'Program Files': [{ name: 'CemBrowser', type: 'folder' }],
  Users: [{ name: 'User', type: 'folder' }],
  CemBrowser: [],
  User: [{ name: 'AppData', type: 'folder' }],
  AppData: [],
};

const loadFS = (): FileSystem => {
  try {
    const saved = localStorage.getItem('cemos-fs');
    if (saved) return JSON.parse(saved);
  } catch {}
  return defaultFS;
};

const saveFS = (fs: FileSystem) => {
  localStorage.setItem('cemos-fs', JSON.stringify(fs));
};

const iconFor = (t: string, ext?: string) => {
  if (t === 'folder') return '📁';
  if (!ext) return '📄';
  if (['jpg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return '🖼️';
  if (['mp3', 'wav', 'flac', 'm3u'].includes(ext)) return '🎵';
  if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) return '🎬';
  if (ext === 'pdf') return '📕';
  if (['zip', 'rar', '7z'].includes(ext)) return '📦';
  if (['exe', 'dll'].includes(ext)) return '⚡';
  if (['txt', 'md'].includes(ext)) return '📝';
  if (['xlsx', 'xls'].includes(ext)) return '📊';
  if (['doc', 'docx'].includes(ext)) return '📘';
  return '📄';
};

const sidebar = [
  { h: 'Quick Access' }, { name: 'Desktop', i: '🖥️' }, { name: 'Downloads', i: '⬇️' }, { name: 'Documents', i: '📄' }, { name: 'Pictures', i: '🖼️' },
  { h: 'Drives' }, { name: 'This PC', i: '💻' }, { name: 'Local Disk (C:)', i: '💾' },
];

export const FileExplorer: React.FC = () => {
  const theme = themes[useStore(s => s.settings).theme];
  const [fs, setFs] = useState<FileSystem>(loadFS);
  const [path, setPath] = useState<string[]>(['This PC']);
  const [sel, setSel] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState<'file' | 'folder' | null>(null);
  const [newName, setNewName] = useState('');
  const [preview, setPreview] = useState<FileItem | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => { saveFS(fs); }, [fs]);

  const cur = path[path.length - 1];
  const items = (fs[cur] || []).filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()));

  const nav = (f: string) => { setPath([...path, f]); setSel(null); setSearch(''); setPreview(null); };
  const back = () => { if (path.length > 1) { setPath(path.slice(0, -1)); setSel(null); setPreview(null); } };

  const createItem = () => {
    if (!newName.trim()) return;
    const newItem: FileItem = showNew === 'folder'
      ? { name: newName, type: 'folder' }
      : { name: newName, type: 'file', size: '0 KB', ext: newName.split('.').pop() || 'txt', date: new Date().toISOString().split('T')[0], content: '' };
    
    const newFs = { ...fs, [cur]: [...(fs[cur] || []), newItem] };
    if (showNew === 'folder') newFs[newName] = [];
    setFs(newFs);
    setShowNew(null);
    setNewName('');
  };

  const deleteItem = (name: string) => {
    const item = fs[cur]?.find(i => i.name === name);
    if (!item) return;
    const newFs = { ...fs, [cur]: fs[cur].filter(i => i.name !== name) };
    if (item.type === 'folder') delete newFs[name];
    setFs(newFs);
    setSel(null);
    setPreview(null);
  };

  const openFile = (item: FileItem) => {
    if (item.type === 'folder' && fs[item.name]) {
      nav(item.name);
    } else if (item.content !== undefined) {
      setPreview(item);
      setEditContent(item.content);
    }
  };

  const saveFile = () => {
    if (!preview) return;
    const newFs = {
      ...fs,
      [cur]: fs[cur].map(i => i.name === preview.name ? { ...i, content: editContent } : i)
    };
    setFs(newFs);
    setPreview(null);
  };

  // Preview modal
  if (preview) {
    return (
      <div className="flex flex-col h-full" style={{ color: theme.text }}>
        <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: theme.border, background: theme.bgSecondary }}>
          <span className="text-sm font-medium">{preview.name}</span>
          <div className="flex gap-2">
            <button onClick={saveFile} className="px-3 py-1 rounded text-xs" style={{ background: theme.accent, color: '#fff' }}>Save</button>
            <button onClick={() => setPreview(null)} className="px-3 py-1 rounded text-xs" style={{ background: theme.bgTertiary }}>Close</button>
          </div>
        </div>
        <textarea
          value={editContent}
          onChange={e => setEditContent(e.target.value)}
          className="flex-1 p-4 bg-transparent outline-none resize-none text-sm font-mono"
          style={{ color: theme.text }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full" style={{ color: theme.text }}>
      <div className="w-44 shrink-0 flex flex-col py-2 overflow-y-auto border-r no-scrollbar" style={{ background: theme.bgSecondary, borderColor: theme.border }}>
        {sidebar.map((s, i) => 'h' in s ? (
          <p key={i} className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: theme.textMuted }}>{s.h}</p>
        ) : (
          <button key={i} onClick={() => { setPath([s.name!]); setSel(null); }}
            className="flex items-center gap-2 px-3 py-1.5 mx-1 rounded text-[12px] hover:bg-white/5 transition-colors"
            style={{ color: cur === s.name ? theme.accent : theme.textSecondary, background: cur === s.name ? `${theme.accent}12` : undefined }}>
            <span className="text-sm">{s.i}</span>{s.name}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 border-b flex-wrap" style={{ borderColor: theme.border }}>
          <button onClick={back} className="p-1.5 rounded hover:bg-white/5" style={{ color: theme.textMuted }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 2L4 7l5 5" /></svg>
          </button>
          
          <div className="flex-1 flex items-center gap-1 px-2 py-1 rounded text-[11px] min-w-0" style={{ background: theme.bgTertiary }}>
            {path.map((p, i) => <React.Fragment key={i}>{i > 0 && <span style={{ color: theme.textMuted }}>/</span>}
              <button onClick={() => { setPath(path.slice(0, i + 1)); setSel(null); }} className="hover:underline truncate" style={{ color: i === path.length - 1 ? theme.text : theme.textSecondary }}>{p}</button>
            </React.Fragment>)}
          </div>

          <div className="flex items-center gap-1 px-2 py-1 rounded" style={{ background: theme.bgTertiary }}>
            <span style={{ color: theme.textMuted, fontSize: 11 }}>🔍</span>
            <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-[11px] w-16" style={{ color: theme.text }} />
          </div>

          <button onClick={() => setShowNew('folder')} className="px-2 py-1 rounded text-[10px] hover:bg-white/5" style={{ color: theme.textSecondary }}>+ Folder</button>
          <button onClick={() => setShowNew('file')} className="px-2 py-1 rounded text-[10px] hover:bg-white/5" style={{ color: theme.textSecondary }}>+ File</button>

          <div className="flex gap-px p-0.5 rounded" style={{ background: theme.bgTertiary }}>
            {(['grid', 'list'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className="px-1.5 py-0.5 rounded text-[10px]"
                style={{ background: view === v ? `${theme.accent}20` : 'transparent', color: view === v ? theme.accent : theme.textMuted }}>
                {v === 'grid' ? '⊞' : '☰'}
              </button>
            ))}
          </div>
        </div>

        {/* New item input */}
        {showNew && (
          <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: theme.border, background: theme.bgTertiary }}>
            <span className="text-sm">{showNew === 'folder' ? '📁' : '📄'}</span>
            <input
              type="text"
              placeholder={showNew === 'folder' ? 'Folder name' : 'filename.txt'}
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createItem()}
              className="flex-1 bg-transparent outline-none text-[12px]"
              style={{ color: theme.text }}
              autoFocus
            />
            <button onClick={createItem} className="px-2 py-0.5 rounded text-[10px]" style={{ background: theme.accent, color: '#fff' }}>Create</button>
            <button onClick={() => { setShowNew(null); setNewName(''); }} className="px-2 py-0.5 rounded text-[10px]" style={{ color: theme.textMuted }}>Cancel</button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-30">
              <span className="text-3xl mb-2">📂</span>
              <p className="text-xs">This folder is empty</p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
              {items.map(item => (
                <button
                  key={item.name}
                  onClick={() => setSel(item.name)}
                  onDoubleClick={() => openFile(item)}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-all relative group"
                  style={{ background: sel === item.name ? `${theme.accent}15` : undefined, border: sel === item.name ? `1px solid ${theme.accent}30` : '1px solid transparent' }}>
                  <span className="text-2xl">{iconFor(item.type, item.ext)}</span>
                  <span className="text-[10px] text-center leading-tight line-clamp-2 w-full" style={{ color: theme.textSecondary }}>{item.name}</span>
                  {sel === item.name && (
                    <button onClick={(e) => { e.stopPropagation(); deleteItem(item.name); }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: '#ef4444', color: '#fff' }}>✕</button>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="grid grid-cols-[1fr_60px_80px_30px] gap-2 px-2 py-1 text-[10px] font-medium border-b" style={{ color: theme.textMuted, borderColor: theme.border }}>
                <span>Name</span><span>Size</span><span>Date</span><span></span>
              </div>
              {items.map(item => (
                <div key={item.name}
                  onClick={() => setSel(item.name)}
                  onDoubleClick={() => openFile(item)}
                  className="grid grid-cols-[1fr_60px_80px_30px] gap-2 px-2 py-1.5 text-[11px] rounded hover:bg-white/5 items-center cursor-pointer"
                  style={{ background: sel === item.name ? `${theme.accent}15` : undefined }}>
                  <span className="flex items-center gap-2 truncate" style={{ color: theme.text }}>
                    <span className="text-sm">{iconFor(item.type, item.ext)}</span>{item.name}
                  </span>
                  <span style={{ color: theme.textMuted }}>{item.size || '—'}</span>
                  <span style={{ color: theme.textMuted }}>{item.date || '—'}</span>
                  <button onClick={(e) => { e.stopPropagation(); deleteItem(item.name); }} className="text-[10px] hover:text-red-400" style={{ color: theme.textMuted }}>🗑️</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-3 py-1 text-[10px] border-t" style={{ borderColor: theme.border, color: theme.textMuted }}>
          <span>{items.length} items</span>{sel && <span>{sel}</span>}
        </div>
      </div>
    </div>
  );
};

// Export for downloads integration
export const addDownload = (name: string, size: string) => {
  try {
    const fs = JSON.parse(localStorage.getItem('cemos-fs') || '{}');
    if (!fs.Downloads) fs.Downloads = [];
    fs.Downloads.push({ name, type: 'file', size, ext: name.split('.').pop() || '', date: new Date().toISOString().split('T')[0] });
    localStorage.setItem('cemos-fs', JSON.stringify(fs));
  } catch {}
};
