import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';
import { Folder, File, HardDrive, Image, Music, Video, FileText, Download, Monitor, Cpu, ChevronRight, Search, Grid, List, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

interface FSItem {
  name: string;
  type: 'folder' | 'file';
  icon?: React.ReactNode;
  size?: string;
  modified?: string;
  ext?: string;
}

const fileSystem: Record<string, FSItem[]> = {
  'This PC': [
    { name: 'Desktop', type: 'folder' },
    { name: 'Documents', type: 'folder' },
    { name: 'Downloads', type: 'folder' },
    { name: 'Pictures', type: 'folder' },
    { name: 'Music', type: 'folder' },
    { name: 'Videos', type: 'folder' },
    { name: 'Local Disk (C:)', type: 'folder' },
    { name: 'Data Drive (D:)', type: 'folder' },
  ],
  Desktop: [
    { name: 'readme.txt', type: 'file', size: '2 KB', modified: '2025-12-15', ext: 'txt' },
    { name: 'project-notes.md', type: 'file', size: '8 KB', modified: '2025-12-20', ext: 'md' },
    { name: 'screenshot.png', type: 'file', size: '1.2 MB', modified: '2025-12-22', ext: 'png' },
    { name: 'Work', type: 'folder' },
  ],
  Documents: [
    { name: 'Resume.pdf', type: 'file', size: '245 KB', modified: '2025-11-10', ext: 'pdf' },
    { name: 'Budget_2025.xlsx', type: 'file', size: '156 KB', modified: '2025-10-05', ext: 'xlsx' },
    { name: 'Meeting Notes', type: 'folder' },
    { name: 'Projects', type: 'folder' },
    { name: 'report-final.docx', type: 'file', size: '89 KB', modified: '2025-12-01', ext: 'docx' },
    { name: 'taxes-2024.pdf', type: 'file', size: '1.1 MB', modified: '2025-04-14', ext: 'pdf' },
  ],
  Downloads: [
    { name: 'CemOS-wallpaper-pack.zip', type: 'file', size: '45 MB', modified: '2025-12-20', ext: 'zip' },
    { name: 'setup-v2.1.exe', type: 'file', size: '89 MB', modified: '2025-12-18', ext: 'exe' },
    { name: 'presentation.pptx', type: 'file', size: '12 MB', modified: '2025-12-15', ext: 'pptx' },
    { name: 'invoice_dec.pdf', type: 'file', size: '320 KB', modified: '2025-12-22', ext: 'pdf' },
    { name: 'font-pack.zip', type: 'file', size: '8.5 MB', modified: '2025-12-10', ext: 'zip' },
  ],
  Pictures: [
    { name: 'Vacation 2025', type: 'folder' },
    { name: 'Screenshots', type: 'folder' },
    { name: 'wallpaper-mountain.jpg', type: 'file', size: '3.4 MB', modified: '2025-08-15', ext: 'jpg' },
    { name: 'profile-photo.png', type: 'file', size: '890 KB', modified: '2025-06-20', ext: 'png' },
    { name: 'sunset.jpg', type: 'file', size: '2.1 MB', modified: '2025-09-03', ext: 'jpg' },
    { name: 'cat-meme.gif', type: 'file', size: '4.5 MB', modified: '2025-11-28', ext: 'gif' },
  ],
  Music: [
    { name: 'Favorites', type: 'folder' },
    { name: 'lo-fi-beats.mp3', type: 'file', size: '8.2 MB', modified: '2025-07-10', ext: 'mp3' },
    { name: 'ambient-rain.wav', type: 'file', size: '45 MB', modified: '2025-05-22', ext: 'wav' },
    { name: 'podcast-ep42.mp3', type: 'file', size: '62 MB', modified: '2025-12-01', ext: 'mp3' },
  ],
  Videos: [
    { name: 'Tutorials', type: 'folder' },
    { name: 'screen-recording.mp4', type: 'file', size: '234 MB', modified: '2025-11-15', ext: 'mp4' },
    { name: 'vacation-clip.mov', type: 'file', size: '890 MB', modified: '2025-08-20', ext: 'mov' },
  ],
  'Local Disk (C:)': [
    { name: 'CemOS', type: 'folder' },
    { name: 'Program Files', type: 'folder' },
    { name: 'Users', type: 'folder' },
    { name: 'System', type: 'folder' },
  ],
  'Data Drive (D:)': [
    { name: 'Backup', type: 'folder' },
    { name: 'Games', type: 'folder' },
    { name: 'Media', type: 'folder' },
  ],
  Work: [
    { name: 'client-brief.pdf', type: 'file', size: '450 KB', modified: '2025-12-18', ext: 'pdf' },
    { name: 'mockup-v3.fig', type: 'file', size: '12 MB', modified: '2025-12-20', ext: 'fig' },
  ],
  'Meeting Notes': [
    { name: 'standup-dec-20.md', type: 'file', size: '3 KB', modified: '2025-12-20', ext: 'md' },
    { name: 'quarterly-review.docx', type: 'file', size: '45 KB', modified: '2025-10-01', ext: 'docx' },
  ],
  Projects: [
    { name: 'CemOS-UI', type: 'folder' },
    { name: 'website-redesign', type: 'folder' },
  ],
};

const sidebarItems = [
  { name: 'Quick Access', icon: '⭐', isHeader: true },
  { name: 'Desktop', icon: <Monitor size={16} /> },
  { name: 'Downloads', icon: <Download size={16} /> },
  { name: 'Documents', icon: <FileText size={16} /> },
  { name: 'Pictures', icon: <Image size={16} /> },
  { name: 'This PC', icon: '💻', isHeader: true },
  { name: 'This PC', icon: <Cpu size={16} /> },
  { name: 'Local Disk (C:)', icon: <HardDrive size={16} /> },
  { name: 'Data Drive (D:)', icon: <HardDrive size={16} /> },
];

const getFileIcon = (item: FSItem, size: number = 18) => {
  if (item.type === 'folder') return <Folder size={size} className="text-yellow-400" />;
  const ext = item.ext || '';
  if (['jpg', 'png', 'gif', 'svg'].includes(ext)) return <Image size={size} className="text-green-400" />;
  if (['mp3', 'wav', 'flac'].includes(ext)) return <Music size={size} className="text-pink-400" />;
  if (['mp4', 'mov', 'avi'].includes(ext)) return <Video size={size} className="text-purple-400" />;
  if (['pdf'].includes(ext)) return <FileText size={size} className="text-red-400" />;
  if (['zip', 'rar'].includes(ext)) return <File size={size} className="text-orange-400" />;
  if (['exe'].includes(ext)) return <Cpu size={size} className="text-blue-400" />;
  return <File size={size} className="text-gray-400" />;
};

export const FileExplorer: React.FC = () => {
  const settings = useStore((s) => s.settings);
  const theme = themes[settings.theme];
  const [currentPath, setCurrentPath] = useState<string[]>(['This PC']);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');

  const currentFolder = currentPath[currentPath.length - 1];
  const items = (fileSystem[currentFolder] || []).filter(
    (i) => !search || i.name.toLowerCase().includes(search.toLowerCase())
  );

  const navigateTo = (folder: string) => {
    setCurrentPath([...currentPath, folder]);
    setSelectedItem(null);
    setSearch('');
  };

  const navigateBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const navigateUp = () => navigateBack();

  const navigateToIndex = (idx: number) => {
    setCurrentPath(currentPath.slice(0, idx + 1));
    setSelectedItem(null);
  };

  return (
    <div className="flex h-full" style={{ color: theme.text }}>
      {/* Sidebar */}
      <div
        className="w-52 shrink-0 flex flex-col py-2 overflow-y-auto border-r"
        style={{ background: theme.bgSecondary, borderColor: theme.border }}
      >
        {sidebarItems.map((item, i) =>
          item.isHeader ? (
            <p key={i} className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: theme.textMuted }}>
              {item.name}
            </p>
          ) : (
            <button
              key={i}
              onClick={() => {
                setCurrentPath([item.name]);
                setSelectedItem(null);
              }}
              className="flex items-center gap-2.5 px-4 py-1.5 text-sm hover:bg-white/5 transition-colors mx-1 rounded-md"
              style={{
                color: currentFolder === item.name ? theme.accent : theme.textSecondary,
                background: currentFolder === item.name ? `${theme.accent}15` : undefined,
              }}
            >
              <span className="opacity-70">{item.icon}</span>
              {item.name}
            </button>
          )
        )}
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: theme.border }}>
          <button onClick={navigateBack} className="p-1.5 rounded-md hover:bg-white/5" style={{ color: theme.textMuted }}>
            <ArrowLeft size={16} />
          </button>
          <button className="p-1.5 rounded-md hover:bg-white/5 opacity-40" style={{ color: theme.textMuted }}>
            <ArrowRight size={16} />
          </button>
          <button onClick={navigateUp} className="p-1.5 rounded-md hover:bg-white/5" style={{ color: theme.textMuted }}>
            <ArrowUp size={16} />
          </button>

          {/* Breadcrumb */}
          <div className="flex-1 flex items-center gap-1 px-3 py-1 rounded-md text-sm" style={{ background: theme.bgTertiary }}>
            {currentPath.map((p, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight size={12} style={{ color: theme.textMuted }} />}
                <button
                  onClick={() => navigateToIndex(i)}
                  className="hover:underline px-1"
                  style={{ color: i === currentPath.length - 1 ? theme.text : theme.textSecondary }}
                >
                  {p}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ background: theme.bgTertiary }}>
            <Search size={14} style={{ color: theme.textMuted }} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-28"
              style={{ color: theme.text }}
            />
          </div>

          {/* View toggle */}
          <div className="flex gap-0.5 p-0.5 rounded-md" style={{ background: theme.bgTertiary }}>
            <button
              onClick={() => setViewMode('grid')}
              className="p-1.5 rounded"
              style={{ background: viewMode === 'grid' ? theme.accent + '25' : 'transparent', color: viewMode === 'grid' ? theme.accent : theme.textMuted }}
            >
              <Grid size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="p-1.5 rounded"
              style={{ background: viewMode === 'list' ? theme.accent + '25' : 'transparent', color: viewMode === 'list' ? theme.accent : theme.textMuted }}
            >
              <List size={14} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
              <Folder size={48} />
              <p className="mt-2 text-sm">This folder is empty</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))' }}>
              {items.map((item) => (
                <button
                  key={item.name}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg transition-all hover:bg-white/5"
                  style={{
                    background: selectedItem === item.name ? `${theme.accent}18` : undefined,
                    border: selectedItem === item.name ? `1px solid ${theme.accent}40` : '1px solid transparent',
                  }}
                  onClick={() => setSelectedItem(item.name)}
                  onDoubleClick={() => item.type === 'folder' && fileSystem[item.name] && navigateTo(item.name)}
                >
                  {getFileIcon(item, 32)}
                  <span className="text-[11px] text-center leading-tight line-clamp-2 w-full" style={{ color: theme.textSecondary }}>
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="grid grid-cols-[1fr_80px_120px] gap-2 px-3 py-1.5 text-xs font-medium border-b" style={{ color: theme.textMuted, borderColor: theme.border }}>
                <span>Name</span>
                <span>Size</span>
                <span>Modified</span>
              </div>
              {items.map((item) => (
                <button
                  key={item.name}
                  className="grid grid-cols-[1fr_80px_120px] gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors items-center"
                  style={{
                    background: selectedItem === item.name ? `${theme.accent}18` : undefined,
                  }}
                  onClick={() => setSelectedItem(item.name)}
                  onDoubleClick={() => item.type === 'folder' && fileSystem[item.name] && navigateTo(item.name)}
                >
                  <span className="flex items-center gap-2.5 truncate" style={{ color: theme.text }}>
                    {getFileIcon(item, 16)}
                    {item.name}
                  </span>
                  <span style={{ color: theme.textMuted }}>{item.size || '--'}</span>
                  <span style={{ color: theme.textMuted }}>{item.modified || '--'}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-3 py-1.5 text-[11px] border-t" style={{ borderColor: theme.border, color: theme.textMuted }}>
          <span>{items.length} items</span>
          {selectedItem && <span>Selected: {selectedItem}</span>}
        </div>
      </div>
    </div>
  );
};
