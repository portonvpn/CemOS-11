import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { allApps } from '../store/apps';
import { getAppContent } from './Desktop';
import { QuickSettingsPanel, NotificationPanel, ContextMenu } from './Panels';

export const MobileOS: React.FC = () => {
  const { settings, mobileAppOpen, setMobileApp, toggleQuickSettings, toggleNotifPanel, showContextMenu } = useStore();
  const theme = themes[settings.theme];
  const [time, setTime] = useState(new Date());
  const longPressTimer = useRef<number | null>(null);
  const longPressPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  // Long press handler for mobile context menu
  const handleTouchStart = (e: React.TouchEvent, app: typeof allApps[0]) => {
    longPressPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    longPressTimer.current = window.setTimeout(() => {
      if (longPressPos.current) {
        showContextMenu(longPressPos.current.x, longPressPos.current.y, [
          { label: '📂 Open', action: () => setMobileApp(app.id) },
          { label: '📌 Add to Home', action: () => {} },
          { label: 'ℹ️ App Info', action: () => {} },
          { label: '🗑️ Uninstall', action: () => {} },
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

  // If app is open, show fullscreen app
  if (mobileAppOpen) {
    const app = allApps.find(a => a.id === mobileAppOpen);
    return (
      <div className="fixed inset-0 z-[100] flex flex-col animate-mobile-up" style={{ background: theme.bg }}>
        {/* Mobile status bar */}
        <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ background: theme.bgSecondary }}>
          <span className="text-[11px] font-medium" style={{ color: theme.textSecondary }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          <span className="text-[11px] font-medium truncate max-w-[50%]" style={{ color: theme.text }}>{app?.name}</span>
          <span className="text-[11px]" style={{ color: theme.textSecondary }}>🔋 92%</span>
        </div>
        {/* App content */}
        <div className="flex-1 overflow-hidden">{getAppContent(mobileAppOpen)}</div>
        {/* Bottom nav */}
        <div className="flex items-center justify-around py-2.5 px-4 shrink-0 border-t" style={{ background: theme.bgSecondary, borderColor: theme.border }}>
          <button onClick={() => setMobileApp(null)} className="p-2 rounded-lg active:bg-white/10">
            <span className="text-xl">🏠</span>
          </button>
          <button onClick={() => setMobileApp(null)} className="p-2 rounded-lg active:bg-white/10">
            <span className="text-xl">◀️</span>
          </button>
          <button onClick={() => setMobileApp(null)} className="p-2 rounded-lg active:bg-white/10">
            <span className="text-xl">⬜</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col" style={{ backgroundImage: `url(${theme.wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <span className="text-[11px] font-medium text-white">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
        <div className="flex items-center gap-2">
          <button onClick={toggleNotifPanel} className="text-[10px] text-white/70 active:text-white">🔔</button>
          <button onClick={toggleQuickSettings} className="text-[10px] text-white/70 active:text-white">📶 🔋</button>
        </div>
      </div>

      {/* Clock widget */}
      <div className="flex flex-col items-center pt-6 pb-4">
        <p className="text-5xl font-extralight text-white" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </p>
        <p className="text-sm text-white/60 mt-1" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </p>
      </div>

      {/* App grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="grid grid-cols-4 gap-3">
          {allApps.map(app => (
            <button
              key={app.id}
              onClick={() => setMobileApp(app.id)}
              onTouchStart={e => handleTouchStart(e, app)}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                style={{ background: app.color ? `${app.color}35` : theme.bgTertiary, border: `1px solid ${app.color || theme.border}20` }}>
                {app.icon}
              </div>
              <span className="text-[10px] text-white font-medium leading-tight text-center truncate w-full" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="flex items-center justify-center gap-4 px-4 py-2.5 mx-3 mb-3 rounded-2xl" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {['explorer', 'browser', 'music', 'settings'].map(id => {
          const app = allApps.find(a => a.id === id)!;
          return (
            <button key={id} onClick={() => setMobileApp(id)} className="active:scale-90 transition-transform">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl" style={{ background: `${app.color || theme.accent}30` }}>
                {app.icon}
              </div>
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <QuickSettingsPanel />
      <NotificationPanel />
      <ContextMenu />
    </div>
  );
};
