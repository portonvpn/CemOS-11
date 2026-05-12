import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { allApps } from '../store/apps';
import { getAppIcon } from './Icons';
import { getAppContent } from './Desktop';
import { QuickSettingsPanel, NotificationPanel, ContextMenu } from './Panels';

export const MobileOS: React.FC = () => {
  const { settings, mobileAppOpen, setMobileApp, toggleQuickSettings, toggleNotifPanel, showContextMenu } = useStore();
  const theme = themes[settings.theme];
  const [time, setTime] = useState(new Date());
  const [page, setPage] = useState(0);
  const longPressTimer = useRef<number | null>(null);
  const longPressPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  // 8 apps per page for bigger icons
  const appsPerPage = 8;
  const pages: typeof allApps[] = [];
  for (let i = 0; i < allApps.length; i += appsPerPage) {
    pages.push(allApps.slice(i, i + appsPerPage));
  }

  const handleTouchStart = (e: React.TouchEvent, app: typeof allApps[0]) => {
    longPressPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    longPressTimer.current = window.setTimeout(() => {
      if (longPressPos.current) {
        showContextMenu(longPressPos.current.x, longPressPos.current.y, [
          { label: 'Open', action: () => setMobileApp(app.id) },
          { label: 'Add to Home', action: () => {} },
          { label: 'App Info', action: () => {} },
          { label: 'Uninstall', action: () => {} },
        ]);
      }
    }, 600);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
    longPressPos.current = null;
  };

  // App open view
  if (mobileAppOpen) {
    const app = allApps.find(a => a.id === mobileAppOpen);
    return (
      <div className="fixed inset-0 z-[100] flex flex-col animate-mobile-up" style={{ background: theme.bg }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ background: theme.bgSecondary }}>
          <span className="text-[11px] font-medium" style={{ color: theme.textSecondary }}>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
          <span className="text-[11px] font-medium truncate max-w-[50%]" style={{ color: theme.text }}>{app?.name}</span>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 4h12M1 7h9M1 10h5" stroke={theme.textSecondary} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <rect x="1" y="1" width="12" height="8" rx="1" stroke={theme.textSecondary} strokeWidth="1"/>
              <rect x="2" y="2" width="8" height="6" rx="0.5" fill={theme.accent}/>
              <rect x="13" y="3" width="2" height="4" rx="0.5" fill={theme.textSecondary}/>
            </svg>
          </div>
        </div>
        
        {/* App content */}
        <div className="flex-1 overflow-hidden">{getAppContent(mobileAppOpen)}</div>
        
        {/* Navigation bar */}
        <div className="flex items-center justify-around py-3 px-6 shrink-0" style={{ background: theme.bgSecondary }}>
          <button onClick={() => setMobileApp(null)} className="p-2 rounded-xl active:bg-white/10">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 11L11 3L19 11M5 11V19H17V11" stroke={theme.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => setMobileApp(null)} className="p-2 rounded-xl active:bg-white/10">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 5L7 11L14 17" stroke={theme.textSecondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => setMobileApp(null)} className="p-2 rounded-xl active:bg-white/10">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="4" y="4" width="14" height="14" rx="2" stroke={theme.textSecondary} strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col" style={{ backgroundImage: `url(${theme.wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0" style={{ background: 'rgba(0,0,0,0.15)' }}>
        <span className="text-xs font-medium text-white">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
        <div className="flex items-center gap-2">
          <button onClick={toggleNotifPanel} className="active:opacity-50">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white" opacity="0.7">
              <path d="M7 1C4.5 1 2.5 3 2.5 5V8L1 10V11H13V10L11.5 8V5C11.5 3 9.5 1 7 1Z"/>
              <circle cx="7" cy="13" r="1.5"/>
            </svg>
          </button>
          <button onClick={toggleQuickSettings} className="flex items-center gap-1.5 active:opacity-50">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="white" opacity="0.7">
              <path d="M1 4h12M1 7h9M1 10h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <rect x="1" y="1" width="12" height="8" rx="1" stroke="white" strokeWidth="1" opacity="0.7"/>
              <rect x="2" y="2" width="8" height="6" rx="0.5" fill="white" opacity="0.7"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Zoro watermark */}
      <div className="absolute top-10 right-3 opacity-15 pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="white">
          <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="3" fill="none"/>
          <text x="50" y="58" textAnchor="middle" fontSize="24" fontWeight="bold" fontFamily="system-ui">Z</text>
        </svg>
      </div>

      {/* Clock widget */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <p className="text-6xl font-extralight text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </p>
        <p className="text-base text-white/70 mt-1 font-light" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </div>

      {/* App grid with horizontal swipe */}
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full transition-transform duration-300 ease-out" style={{ transform: `translateX(-${page * 100}%)`, width: `${pages.length * 100}%` }}>
          {pages.map((pageApps, pageIdx) => (
            <div key={pageIdx} className="flex-1 px-5" style={{ width: `${100 / pages.length}%` }}>
              <div className="grid grid-cols-4 gap-y-6 gap-x-4">
                {pageApps.map(app => (
                  <button
                    key={app.id}
                    onClick={() => setMobileApp(app.id)}
                    onTouchStart={e => handleTouchStart(e, app)}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    className="flex flex-col items-center gap-2 active:scale-90 transition-transform"
                  >
                    <div className="w-16 h-16 rounded-[18px] flex items-center justify-center shadow-xl"
                      style={{ background: app.color ? `${app.color}40` : theme.bgTertiary, border: `1px solid ${app.color || theme.border}20` }}>
                      {getAppIcon(app.id, 32)}
                    </div>
                    <span className="text-[11px] text-white font-medium leading-tight text-center w-full truncate"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page indicators */}
      {pages.length > 1 && (
        <div className="flex items-center justify-center gap-2 pb-3">
          {pages.map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: page === i ? '#fff' : 'rgba(255,255,255,0.35)', transform: page === i ? 'scale(1.3)' : 'scale(1)' }} />
          ))}
        </div>
      )}

      {/* Dock */}
      <div className="flex items-center justify-center gap-5 px-5 py-3 mx-4 mb-4 rounded-[20px]"
        style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}>
        {['explorer', 'browser', 'music', 'settings'].map(id => {
          const app = allApps.find(a => a.id === id)!;
          return (
            <button key={id} onClick={() => setMobileApp(id)} className="active:scale-90 transition-transform">
              <div className="w-14 h-14 rounded-[14px] flex items-center justify-center shadow-lg"
                style={{ background: `${app.color || theme.accent}35` }}>
                {getAppIcon(id, 28)}
              </div>
            </button>
          );
        })}
      </div>

      <QuickSettingsPanel />
      <NotificationPanel />
      <ContextMenu />
    </div>
  );
};
