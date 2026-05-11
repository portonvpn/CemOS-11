import React from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { Window } from './Window';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { NotificationPanel, QuickSettingsPanel, ContextMenu } from './Panels';
import { FileExplorer } from './apps/FileExplorer';
import { SettingsApp } from './apps/SettingsApp';

const desktopIcons = [
  { id: 'explorer', name: 'File Explorer', icon: '📁' },
  { id: 'settings', name: 'Settings', icon: '⚙️' },
  { id: 'recycle', name: 'Recycle Bin', icon: '🗑️' },
  { id: 'terminal', name: 'Terminal', icon: '💻' },
  { id: 'browser', name: 'CemBrowser', icon: '🌐' },
  { id: 'store', name: 'CemStore', icon: '🛍️' },
];

const getAppContent = (appId: string) => {
  switch (appId) {
    case 'explorer':
      return <FileExplorer />;
    case 'settings':
      return <SettingsApp />;
    default:
      return (
        <div className="flex items-center justify-center h-full opacity-40 text-sm">
          App not yet available
        </div>
      );
  }
};

export const Desktop: React.FC = () => {
  const {
    settings,
    windows,
    openWindow,
    showContextMenu,
    hideContextMenu,
    closeStartMenu,
  } = useStore();
  const theme = themes[settings.theme];
  const iconSizeClass =
    settings.iconSize === 'small' ? 'w-16 text-xl' : settings.iconSize === 'large' ? 'w-24 text-4xl' : 'w-20 text-2xl';

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY, [
      { label: '🖥️  Display Settings', action: () => openWindow('settings', 'Settings') },
      { label: '🎨  Personalize', action: () => openWindow('settings', 'Settings') },
      { label: '📁  Open File Explorer', action: () => openWindow('explorer', 'File Explorer') },
      { label: '🔄  Refresh', action: () => window.location.reload() },
      { label: '📋  Paste', action: () => {} },
      { label: 'ℹ️  About CemOS', action: () => openWindow('settings', 'Settings') },
    ]);
  };

  const handleDesktopClick = () => {
    closeStartMenu();
    hideContextMenu();
  };

  return (
    <div
      className="fixed inset-0 animate-fade-in"
      style={{
        backgroundImage: `url(${theme.wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: settings.font,
        transform: `scale(${settings.uiScale})`,
        transformOrigin: 'top left',
        width: `${100 / settings.uiScale}%`,
        height: `${100 / settings.uiScale}%`,
      }}
    >
      {/* Desktop area */}
      <div
        className="absolute inset-0 bottom-[52px]"
        onContextMenu={handleDesktopContextMenu}
        onClick={handleDesktopClick}
      >
        {/* Desktop icons */}
        <div className="flex flex-col flex-wrap gap-1 p-3 h-full content-start">
          {desktopIcons.map((icon) => (
            <button
              key={icon.id}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all group ${iconSizeClass}`}
              onDoubleClick={() => openWindow(icon.id, icon.name)}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                showContextMenu(e.clientX, e.clientY, [
                  { label: '📂  Open', action: () => openWindow(icon.id, icon.name) },
                  { label: '📌  Pin to Taskbar', action: () => {} },
                  { label: '✏️  Rename', action: () => {} },
                  { label: '🗑️  Delete', action: () => {} },
                ]);
              }}
            >
              <span className="drop-shadow-lg group-hover:scale-110 transition-transform">{icon.icon}</span>
              <span
                className="text-[11px] text-center leading-tight px-1 rounded"
                style={{
                  color: '#fff',
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                }}
              >
                {icon.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Windows */}
      {windows.map((win) => (
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
