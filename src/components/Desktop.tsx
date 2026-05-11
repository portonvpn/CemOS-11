import React, { useRef } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { allApps, appUrls } from '../store/apps';
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
import { CalculatorApp, NotesApp, TerminalApp } from './apps/MiniApps';
import { WebFrame } from './apps/WebFrame';

// Export getAppContent for mobile
export const getAppContent = (appId: string): React.ReactNode => {
  // Check if it's a game window
  if (appId.startsWith('game-')) {
    const gameId = appId.replace('game-', '');
    const gameUrls: Record<string, string> = {
      g1: 'https://sandspiel.club/', g2: 'https://hexgl.bkcore.com/play/',
      g3: 'https://poki.com/en/g/geometry-dash-lite', g4: 'https://poki.com/en/g/dungeon-crawler',
      g5: 'https://poki.com/en/g/geometry-dash-lite', g6: 'https://poki.com/en/g/block-puzzle',
      g7: 'https://poki.com/en/g/dark-room', g8: 'https://orteil.dashnet.org/cookieclicker/',
      g9: 'https://poki.com/en/g/shellshockers', g10: 'https://play2048.co/',
      g11: 'https://aetheria-lemon.vercel.app', g12: 'https://diddyshotv2.vercel.app',
      g13: 'https://cemabyss.vercel.app', g14: 'https://diddyshot.vercel.app',
    };
    const url = gameUrls[gameId];
    if (url) return <WebFrame url={url} />;
  }

  // Check if it has a URL (web app)
  if (appUrls[appId]) return <WebFrame url={appUrls[appId]} />;

  switch (appId) {
    case 'explorer': return <FileExplorer />;
    case 'settings': return <SettingsApp />;
    case 'browser': return <BrowserApp />;
    case 'music': return <MusicApp />;
    case 'video': return <VideoApp />;
    case 'games': return <GamesApp />;
    case 'calculator': return <CalculatorApp />;
    case 'notes': return <NotesApp />;
    case 'terminal': return <TerminalApp />;
    case 'photos': return <BrowserApp initialUrl="https://unsplash.com" initialTitle="Photos" />;
    case 'weather': return <WebFrame url="https://wttr.in" />;
    case 'clock': return <WebFrame url="https://time.is" />;
    default: return <WebFrame url={`https://www.google.com/search?igu=1&q=${appId}`} />;
  }
};

export const Desktop: React.FC = () => {
  const { settings, windows, openWindow, showContextMenu, hideContextMenu, closeStartMenu, isMobile } = useStore();
  const theme = themes[settings.theme];
  const longPressTimer = useRef<number | null>(null);
  const longPressPos = useRef<{ x: number; y: number } | null>(null);

  const iconSizeClass = settings.iconSize === 'small' ? 'w-16' : settings.iconSize === 'large' ? 'w-24' : 'w-20';
  const iconTextSize = settings.iconSize === 'small' ? 'text-xl' : settings.iconSize === 'large' ? 'text-4xl' : 'text-2xl';

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY, [
      { label: '🖥️ Display Settings', action: () => openWindow('settings', 'Settings') },
      { label: '🎨 Personalize', action: () => openWindow('settings', 'Settings') },
      { label: '📁 Open Files', action: () => openWindow('explorer', 'Files') },
      { label: '🔄 Refresh', action: () => window.location.reload() },
    ]);
  };

  const handleDesktopClick = () => { closeStartMenu(); hideContextMenu(); };

  // Long press for mobile context menu
  const handleTouchStart = (e: React.TouchEvent, icon: typeof allApps[0]) => {
    longPressPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    longPressTimer.current = window.setTimeout(() => {
      if (longPressPos.current) {
        showContextMenu(longPressPos.current.x, longPressPos.current.y, [
          { label: '📂 Open', action: () => openWindow(icon.id, icon.name) },
          { label: '📌 Pin to Dock', action: () => {} },
          { label: '✏️ Rename', action: () => {} },
          { label: '🗑️ Remove', action: () => {} },
        ]);
      }
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    longPressPos.current = null;
  };

  const handleIconContextMenu = (e: React.MouseEvent, icon: typeof allApps[0]) => {
    e.preventDefault();
    e.stopPropagation();
    showContextMenu(e.clientX, e.clientY, [
      { label: '📂 Open', action: () => openWindow(icon.id, icon.name) },
      { label: '📌 Pin to Taskbar', action: () => {} },
      { label: '✏️ Rename', action: () => {} },
      { label: '🗑️ Delete', action: () => {} },
    ]);
  };

  if (isMobile) return null; // Mobile uses MobileOS component

  return (
    <div className="fixed inset-0 animate-fade-in" style={{
      backgroundImage: `url(${theme.wallpaper})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      fontFamily: settings.font,
    }}>
      {/* Desktop area */}
      <div className="absolute inset-0 bottom-[48px]" onContextMenu={handleDesktopContextMenu} onClick={handleDesktopClick}>
        {/* Desktop icons - show ALL apps */}
        <div className="flex flex-col flex-wrap gap-0.5 p-2 h-full content-start">
          {allApps.map(icon => (
            <button
              key={icon.id}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 active:bg-white/15 transition-all group ${iconSizeClass}`}
              onDoubleClick={() => openWindow(icon.id, icon.name)}
              onClick={e => e.stopPropagation()}
              onContextMenu={e => handleIconContextMenu(e, icon)}
              onTouchStart={e => handleTouchStart(e, icon)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <span className={`${iconTextSize} drop-shadow-lg group-hover:scale-110 transition-transform`}>{icon.icon}</span>
              <span className="text-[10px] text-center leading-tight px-0.5 rounded line-clamp-2"
                style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,0.8)' }}>
                {icon.name}
              </span>
            </button>
          ))}
        </div>
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
