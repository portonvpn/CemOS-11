import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { leftApps, rightApps, appUrls } from '../store/apps';
import { getAppIcon } from './Icons';
import { Window } from './Window';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { NotificationPanel, QuickSettingsPanel, ContextMenu } from './Panels';
import { FileExplorer } from './apps/FileExplorer';
import { SettingsApp } from './apps/SettingsApp';
import { BrowserApp } from './apps/BrowserApp';
import { MusicApp } from './apps/MusicApp';
import { VideoApp } from './apps/VideoApp';
import { GamesApp } from './apps/GamesApp';
import { PhotosApp } from './apps/PhotosApp';
import { CalculatorApp, NotesApp, TerminalApp } from './apps/MiniApps';
import { WebFrame } from './apps/WebFrame';

// Game URLs
const gameUrls: Record<string, string> = {
  g1: 'https://cemgrid.vercel.app',
  g2: 'https://aetheria-lemon.vercel.app',
  g3: 'https://diddyshotv2.vercel.app',
  g4: 'https://diddyshot.vercel.app',
  g5: 'https://hexgl.bkcore.com/play/',
  g6: 'https://hextris.io/',
  g7: 'https://www.nytimes.com/games/wordle/index.html',
  g8: 'https://tetris.com/play-tetris',
  gm1: 'https://cemgrid.vercel.app',
  gm2: 'https://diddyshot.vercel.app',
  gm3: 'https://flappybird.io/',
  gm4: 'https://2048game.com/',
  gm5: 'https://slither.io/',
  gm6: 'https://krunker.io/',
};

// Export getAppContent for mobile
export const getAppContent = (appId: string): React.ReactNode => {
  if (appId.startsWith('game-')) {
    const gameId = appId.replace('game-', '');
    const url = gameUrls[gameId];
    if (url) return <WebFrame url={url} />;
  }

  if (appUrls[appId]) return <WebFrame url={appUrls[appId]} />;

  switch (appId) {
    case 'explorer': return <FileExplorer />;
    case 'settings': return <SettingsApp />;
    case 'browser': return <BrowserApp />;
    case 'music': return <MusicApp />;
    case 'video': return <VideoApp />;
    case 'games': return <GamesApp />;
    case 'photos': return <PhotosApp />;
    case 'calculator': return <CalculatorApp />;
    case 'notes': return <NotesApp />;
    case 'terminal': return <TerminalApp />;
    default: return <BrowserApp initialUrl={`https://www.google.com/search?igu=1&q=${appId}`} initialTitle={appId} />;
  }
};

interface IconPosition {
  id: string;
  x: number;
  y: number;
}

export const Desktop: React.FC = () => {
  const { settings, windows, openWindow, showContextMenu, hideContextMenu, closeStartMenu, isMobile } = useStore();
  const theme = themes[settings.theme];
  
  // Draggable icons state
  const [iconPositions, setIconPositions] = useState<IconPosition[]>(() => {
    try {
      const saved = localStorage.getItem('cemos-icon-positions');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const longPressTimer = useRef<number | null>(null);
  const longPressPos = useRef<{ x: number; y: number } | null>(null);

  // Save positions
  useEffect(() => {
    if (iconPositions.length > 0) {
      localStorage.setItem('cemos-icon-positions', JSON.stringify(iconPositions));
    }
  }, [iconPositions]);

  const iconSize = settings.iconSize === 'small' ? 24 : settings.iconSize === 'large' ? 36 : 30;
  const iconBoxSize = settings.iconSize === 'small' ? 64 : settings.iconSize === 'large' ? 96 : 80;

  const allDesktopApps = [...leftApps, ...rightApps];

  const getIconPosition = (id: string, _index: number) => {
    const saved = iconPositions.find(p => p.id === id);
    if (saved) return { x: saved.x, y: saved.y };
    
    // Default grid layout
    const isRight = rightApps.some(a => a.id === id);
    const col = isRight ? Math.floor((window.innerWidth - iconBoxSize - 8) / 1) : 8;
    const itemIndex = isRight ? rightApps.findIndex(a => a.id === id) : leftApps.findIndex(a => a.id === id);
    const row = 8 + itemIndex * (iconBoxSize + 4);
    return { x: isRight ? window.innerWidth - iconBoxSize - 8 : col, y: row };
  };

  const handleIconMouseDown = (e: React.MouseEvent, id: string) => {
    if (e.button !== 0) return;
    e.preventDefault();
    const pos = getIconPosition(id, 0);
    setDragging(id);
    setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - iconBoxSize));
    const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 48 - iconBoxSize));
    
    setIconPositions(prev => {
      const existing = prev.filter(p => p.id !== dragging);
      return [...existing, { id: dragging, x: newX, y: newY }];
    });
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY, [
      { label: 'View → Large icons', action: () => useStore.getState().updateSettings({ iconSize: 'large' }) },
      { label: 'View → Medium icons', action: () => useStore.getState().updateSettings({ iconSize: 'medium' }) },
      { label: 'View → Small icons', action: () => useStore.getState().updateSettings({ iconSize: 'small' }) },
      { label: 'Sort by → Name', action: () => {} },
      { label: 'Refresh', action: () => window.location.reload() },
      { label: 'Display settings', action: () => openWindow('settings', 'Settings') },
      { label: 'Personalize', action: () => openWindow('settings', 'Settings') },
    ]);
  };

  const handleDesktopClick = () => { closeStartMenu(); hideContextMenu(); };

  const handleTouchStart = (e: React.TouchEvent, icon: typeof leftApps[0]) => {
    longPressPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    longPressTimer.current = window.setTimeout(() => {
      if (longPressPos.current) {
        showContextMenu(longPressPos.current.x, longPressPos.current.y, [
          { label: 'Open', action: () => openWindow(icon.id, icon.name) },
          { label: 'Pin to taskbar', action: () => {} },
          { label: 'Delete', action: () => {} },
        ]);
      }
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
    longPressPos.current = null;
  };

  const handleIconContextMenu = (e: React.MouseEvent, icon: typeof leftApps[0]) => {
    e.preventDefault();
    e.stopPropagation();
    showContextMenu(e.clientX, e.clientY, [
      { label: 'Open', action: () => openWindow(icon.id, icon.name) },
      { label: 'Pin to taskbar', action: () => {} },
      { label: 'Delete shortcut', action: () => {} },
      { label: 'Properties', action: () => {} },
    ]);
  };

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 animate-fade-in"
      style={{
        backgroundImage: `url(${theme.wallpaper})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        fontFamily: settings.font,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Zoro Watermark */}
      <div className="absolute top-3 right-3 opacity-10 pointer-events-none select-none z-[1]">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="white">
          <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="3" fill="none" />
          <text x="50" y="58" textAnchor="middle" fontSize="28" fontWeight="bold" fontFamily="system-ui">ZORO</text>
        </svg>
      </div>

      {/* Desktop area */}
      <div className="absolute inset-0 bottom-[48px]" onContextMenu={handleDesktopContextMenu} onClick={handleDesktopClick}>
        {/* Desktop icons - draggable */}
        {allDesktopApps.map((icon, index) => {
          const pos = getIconPosition(icon.id, index);
          return (
            <div
              key={icon.id}
              className={`absolute flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer select-none ${dragging === icon.id ? 'z-50 opacity-80' : ''}`}
              style={{
                left: pos.x,
                top: pos.y,
                width: iconBoxSize,
              }}
              onMouseDown={e => handleIconMouseDown(e, icon.id)}
              onDoubleClick={() => openWindow(icon.id, icon.name)}
              onContextMenu={e => handleIconContextMenu(e, icon)}
              onTouchStart={e => handleTouchStart(e, icon)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <div className="hover:scale-110 transition-transform drop-shadow-xl">
                {getAppIcon(icon.id, iconSize)}
              </div>
              <span
                className="text-[11px] text-center leading-tight px-1 line-clamp-2 font-medium drop-shadow-lg"
                style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.9)' }}
              >
                {icon.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Windows */}
      {windows.map(win => (
        <Window key={win.id} win={win}>
          {getAppContent(win.appId)}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar />

      {/* Overlays */}
      <StartMenu />
      <NotificationPanel />
      <QuickSettingsPanel />
      <ContextMenu />
    </div>
  );
};
