import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { CemLogo } from './CemLogo';
import { pinnedApps, getApp } from '../store/apps';
import { getAppIcon } from './Icons';

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
  const openApps = windows.filter(w => !pinnedApps.find(p => p.id === w.appId));

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[48px] flex items-center px-3 z-[900] glass-heavy"
      style={{ background: theme.taskbar, borderTop: `1px solid ${theme.glassBorder}` }}>
      
      <div className={`flex items-center ${isCenter ? 'mx-auto' : ''}`} style={{ gap: '4px' }}>
        {/* Start button */}
        <button onClick={toggleStartMenu} className="p-2.5 rounded-lg transition-all hover:bg-white/10"
          style={{ background: startMenuOpen ? `${theme.accent}20` : undefined }}>
          <CemLogo size={18} color={theme.accent} />
        </button>

        {/* Divider */}
        <div className="w-px h-5 mx-1.5" style={{ background: theme.border }} />

        {/* Pinned apps */}
        {pinnedApps.map(app => {
          const openWins = windows.filter(w => w.appId === app.id);
          const isActive = openWins.some(w => w.id === activeWindowId);
          const hasWindow = openWins.length > 0;
          return (
            <button key={app.id} onClick={() => {
              if (openWins.length > 0) handleTaskClick(openWins[0].id);
              else useStore.getState().openWindow(app.id, app.name);
            }} className="relative p-2 rounded-lg transition-all hover:bg-white/10"
              style={{ background: isActive ? `${theme.accent}18` : undefined }} title={app.name}>
              {getAppIcon(app.id, 18)}
              {hasWindow && (
                <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 rounded-full transition-all"
                  style={{ width: isActive ? 14 : 4, height: 2, background: theme.accent }} />
              )}
            </button>
          );
        })}

        {/* Open non-pinned apps */}
        {openApps.length > 0 && <>
          <div className="w-px h-5 mx-1" style={{ background: theme.border }} />
          {openApps.map(win => {
            const app = getApp(win.appId);
            const isActive = win.id === activeWindowId;
            return (
              <button key={win.id} onClick={() => handleTaskClick(win.id)}
                className="relative p-2 rounded-lg transition-all hover:bg-white/10"
                style={{ background: isActive ? `${theme.accent}18` : undefined }} title={win.title}>
                {getAppIcon(app?.id || 'explorer', 18)}
                <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 rounded-full transition-all"
                  style={{ width: isActive ? 14 : 4, height: 2, background: theme.accent }} />
              </button>
            );
          })}
        </>}
      </div>

      {/* System tray */}
      <div className="absolute right-0 flex items-center gap-1 pr-3">
        <button onClick={toggleQuickSettings} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 3h10M1 6h7M1 9h4" stroke={theme.textSecondary} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 9V7C1 4.5 3 2 6 2C9 2 11 4.5 11 7V9" stroke={theme.textSecondary} strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="6" cy="9" r="2" fill={theme.textSecondary}/>
          </svg>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="3" y="1" width="6" height="10" rx="1" stroke={theme.textSecondary} strokeWidth="1.5"/>
            <rect x="4" y="3" width="4" height="5" fill={theme.accent}/>
          </svg>
        </button>
        <button onClick={toggleNotifPanel} className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1C4.5 1 3 3 3 5V8L1 10V11H13V10L11 8V5C11 3 9.5 1 7 1Z" fill={theme.textSecondary}/>
            <circle cx="7" cy="13" r="1.5" fill={theme.textSecondary}/>
          </svg>
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
