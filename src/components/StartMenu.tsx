import React from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { allApps } from '../store/apps';
import { getAppIcon } from './Icons';

export const StartMenu: React.FC = () => {
  const { settings, startMenuOpen, closeStartMenu, openWindow, setPhase } = useStore();
  const theme = themes[settings.theme];
  const isCenter = settings.taskbarStyle === 'center';

  if (!startMenuOpen) return null;

  const posStyle: React.CSSProperties = isCenter
    ? { left: '50%', transform: 'translateX(-50%)' }
    : { left: '8px' };

  return (
    <>
      <div className="fixed inset-0 z-[950]" onClick={closeStartMenu} />
      <div className="fixed bottom-[56px] w-[480px] max-w-[calc(100vw-16px)] z-[951] animate-scale-in overflow-hidden"
        style={{
          ...posStyle,
          background: theme.bg,
          border: `1px solid ${theme.glassBorder}`,
          borderRadius: 8,
          boxShadow: '0 12px 48px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.25)',
        }}>
        <div className="glass-heavy">
          {/* Search */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: theme.bgTertiary }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={theme.textMuted} strokeWidth="1.5">
                <circle cx="6" cy="6" r="4" /><path d="M9 9l3 3" />
              </svg>
              <input type="text" placeholder="Search apps, files, settings..."
                className="bg-transparent outline-none text-[12px] flex-1" style={{ color: theme.text }} />
            </div>
          </div>

          {/* Pinned */}
          <div className="px-4 pb-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold" style={{ color: theme.text }}>Pinned</h3>
              <button className="text-[10px] px-2 py-0.5 rounded" style={{ color: theme.textMuted, background: theme.bgTertiary }}>All apps →</button>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {allApps.slice(0, 10).map(app => (
                <button key={app.id} onClick={() => { openWindow(app.id, app.name); closeStartMenu(); }}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-md hover:bg-white/7 transition-colors">
                  {getAppIcon(app.id, 24)}
                  <span className="text-[10px] leading-tight text-center truncate w-full" style={{ color: theme.textSecondary }}>{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="px-4 pb-3">
            <h3 className="text-xs font-semibold mb-2" style={{ color: theme.text }}>Recommended</h3>
            <div className="grid grid-cols-2 gap-1">
              {[
                { name: 'readme.txt', desc: 'Recently opened' },
                { name: 'project.md', desc: '2 hours ago' },
                { name: 'photo.png', desc: 'Yesterday' },
                { name: 'notes.txt', desc: '3 days ago' },
              ].map((item, i) => (
                <button key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="1" width="12" height="14" rx="2" fill={theme.textMuted} />
                    <line x1="5" y1="5" x2="11" y2="5" stroke="white" strokeWidth="1" opacity="0.5" />
                    <line x1="5" y1="8" x2="11" y2="8" stroke="white" strokeWidth="1" opacity="0.5" />
                  </svg>
                  <div className="text-left min-w-0">
                    <p className="text-[11px] truncate" style={{ color: theme.text }}>{item.name}</p>
                    <p className="text-[9px]" style={{ color: theme.textMuted }}>{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: theme.border }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                  <circle cx="7" cy="4" r="3" />
                  <path d="M2 13C2 10 4.5 8 7 8C9.5 8 12 10 12 13" />
                </svg>
              </div>
              <span className="text-xs font-medium" style={{ color: theme.text }}>User</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => { closeStartMenu(); setPhase('restart'); }}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors" title="Restart">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={theme.textSecondary} strokeWidth="1.5">
                  <path d="M1 7a6 6 0 1 1 1.5 4" />
                  <path d="M1 11V7h4" />
                </svg>
              </button>
              <button onClick={() => { closeStartMenu(); setPhase('shutdown'); }}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors" title="Shut down">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={theme.textSecondary} strokeWidth="1.5">
                  <circle cx="7" cy="8" r="5" />
                  <line x1="7" y1="3" x2="7" y2="8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
