import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { CemLogo } from './CemLogo';
import { pinnedApps, getApp } from '../store/apps';

const appIconMap: Record<string, string> = {
  explorer: '📁', settings: '⚙️', browser: '🌐', music: '🎵', video: '▶️', games: '🎮'
};

export const Taskbar: React.FC = () => {
  const { settings, windows, focusWindow, minimizeWindow, toggleStartMenu, startMenuOpen, toggleNotifPanel, toggleQuickSettings, activeWindowId, isMobile } = useStore();
  const theme = themes[settings.theme];
  const [time, setTime] = useState(new Date());

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const handleTaskClick = (winId: string) => {
    const win = windows.find(w => w.id === winId);
    if (!win) return;
    if (win.id === activeWindowId && !win.isMinimized) minimizeWindow(winId);
    else focusWindow(winId);
  };

  if (isMobile) return null;

  const isCenter = settings.taskbarStyle === 'center';

  // Get open windows that aren't pinned apps
  const openApps = windows.filter(w => !pinnedApps.find(p => p.id === w.appId));

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[48px] flex items-center px-3 z-[900] glass-heavy"
      style={{ background: theme.taskbar, borderTop: `1px solid ${theme.glassBorder}` }}>
      
      <div className={`flex items-center ${isCenter ? 'mx-auto' : ''}`} style={{ gap: '6px' }}>
        {/* Start button */}
        <button onClick={toggleStartMenu} className="p-2.5 rounded-lg transition-all hover:bg-white/10"
          style={{ background: startMenuOpen ? `${theme.accent}20` : undefined }}>
          <CemLogo size={20} color={theme.accent} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 mx-1" style={{ background: theme.border }} />

        {/* Pinned apps */}
        {pinnedApps.map(app => {
          const openWins = windows.filter(w => w.appId === app.id);
          const isActive = openWins.some(w => w.id === activeWindowId);
          const hasWindow = openWins.length > 0;
          return (
            <button key={app.id} onClick={() => {
              if (openWins.length > 0) handleTaskClick(openWins[0].id);
              else useStore.getState().openWindow(app.id, app.name);
            }} className="relative p-2.5 rounded-lg transition-all hover:bg-white/10"
              style={{ background: isActive ? `${theme.accent}18` : undefined }} title={app.name}>
              <span className="text-[18px]">{appIconMap[app.id] || app.icon}</span>
              {hasWindow && (
                <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 rounded-full transition-all"
                  style={{ width: isActive ? 16 : 5, height: 2.5, background: theme.accent }} />
              )}
            </button>
          );
        })}

        {/* Open non-pinned apps */}
        {openApps.map(win => {
          const app = getApp(win.appId);
          const isActive = win.id === activeWindowId;
          return (
            <button key={win.id} onClick={() => handleTaskClick(win.id)}
              className="relative p-2.5 rounded-lg transition-all hover:bg-white/10"
              style={{ background: isActive ? `${theme.accent}18` : undefined }} title={win.title}>
              <span className="text-[18px]">{app?.icon || '📄'}</span>
              <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 rounded-full transition-all"
                style={{ width: isActive ? 16 : 5, height: 2.5, background: theme.accent }} />
            </button>
          );
        })}
      </div>

      {/* System tray - always right aligned */}
      <div className="absolute right-0 flex items-center gap-1 pr-3">
        <button onClick={toggleQuickSettings} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <span className="text-[12px]" style={{ color: theme.textSecondary }}>📶</span>
          <span className="text-[12px]" style={{ color: theme.textSecondary }}>🔊</span>
          <span className="text-[12px]" style={{ color: theme.textSecondary }}>🔋</span>
        </button>
        <button onClick={toggleNotifPanel} className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
          <span className="text-[14px]" style={{ color: theme.textSecondary }}>🔔</span>
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: theme.accent }} />
        </button>
        <button onClick={toggleNotifPanel} className="flex flex-col items-end px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors min-w-[65px]">
          <span className="text-[11px] font-medium" style={{ color: theme.textSecondary }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          <span className="text-[9px]" style={{ color: theme.textMuted }}>
            {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </button>
      </div>
    </div>
  );
};
