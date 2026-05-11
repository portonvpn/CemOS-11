import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { CemLogo } from './CemLogo';
import { Wifi, Volume2, BatteryFull, ChevronUp, Bell } from 'lucide-react';

const appIcons: Record<string, string> = {
  explorer: '📁',
  settings: '⚙️',
};

export const Taskbar: React.FC = () => {
  const { settings, windows, focusWindow, minimizeWindow, toggleStartMenu, startMenuOpen, toggleNotifPanel, toggleQuickSettings, activeWindowId } = useStore();
  const theme = themes[settings.theme];
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleTaskbarClick = (winId: string) => {
    const win = windows.find((w) => w.id === winId);
    if (!win) return;
    if (win.id === activeWindowId && !win.isMinimized) {
      minimizeWindow(winId);
    } else {
      focusWindow(winId);
    }
  };

  const isCenter = settings.taskbarStyle === 'center';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-[52px] flex items-center px-2 z-[900] glass-heavy"
      style={{
        background: theme.taskbar,
        borderTop: `1px solid ${theme.glassBorder}`,
      }}
    >
      <div className={`flex items-center gap-0.5 w-full ${isCenter ? 'justify-center' : 'justify-start'}`}>
        {/* Start button */}
        <button
          onClick={toggleStartMenu}
          className="p-2.5 rounded-lg transition-all hover:bg-white/10"
          style={{
            background: startMenuOpen ? `${theme.accent}25` : undefined,
          }}
        >
          <CemLogo size={22} color={theme.accent} />
        </button>

        {/* Pinned + open windows */}
        <div className="flex items-center gap-0.5 mx-1">
          {/* Pinned apps */}
          {[
            { id: 'explorer', name: 'File Explorer' },
            { id: 'settings', name: 'Settings' },
          ].map((app) => {
            const openWins = windows.filter((w) => w.appId === app.id);
            const isActive = openWins.some((w) => w.id === activeWindowId);
            const hasWindow = openWins.length > 0;
            return (
              <button
                key={app.id}
                onClick={() => {
                  if (openWins.length > 0) {
                    handleTaskbarClick(openWins[0].id);
                  } else {
                    useStore.getState().openWindow(app.id, app.name);
                  }
                }}
                className="relative p-2.5 rounded-lg transition-all hover:bg-white/10 group"
                style={{
                  background: isActive ? `${theme.accent}20` : undefined,
                }}
                title={app.name}
              >
                <span className="text-lg">{appIcons[app.id]}</span>
                {hasWindow && (
                  <div
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all"
                    style={{
                      width: isActive ? 16 : 5,
                      height: 3,
                      background: theme.accent,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* System tray - always right aligned */}
      <div className="absolute right-0 flex items-center gap-1 pr-3">
        <button onClick={toggleQuickSettings} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <ChevronUp size={13} style={{ color: theme.textMuted }} />
          <Wifi size={14} style={{ color: theme.textSecondary }} />
          <Volume2 size={14} style={{ color: theme.textSecondary }} />
          <BatteryFull size={14} style={{ color: theme.textSecondary }} />
        </button>

        <button onClick={toggleNotifPanel} className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Bell size={15} style={{ color: theme.textSecondary }} />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.accent }} />
        </button>

        <button
          onClick={toggleNotifPanel}
          className="flex flex-col items-end px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors min-w-[70px]"
        >
          <span className="text-xs font-medium" style={{ color: theme.textSecondary }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          <span className="text-[10px]" style={{ color: theme.textMuted }}>
            {time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </button>
      </div>
    </div>
  );
};
