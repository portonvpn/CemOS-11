import React from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { allApps } from '../store/apps';

const recommended = [
  { name: 'readme.txt', icon: '📄', desc: 'Recently opened' },
  { name: 'project-notes.md', icon: '📝', desc: '2 hours ago' },
  { name: 'screenshot.png', icon: '🖼️', desc: 'Yesterday' },
  { name: 'Budget_2025.xlsx', icon: '📊', desc: '3 days ago' },
];

export const StartMenu: React.FC = () => {
  const { settings, startMenuOpen, closeStartMenu, openWindow, setPhase } = useStore();
  const theme = themes[settings.theme];
  const isCenter = settings.taskbarStyle === 'center';

  if (!startMenuOpen) return null;

  // Position: aligned with taskbar icons
  // Center = centered, Left = left aligned
  const posStyle: React.CSSProperties = isCenter
    ? { left: '50%', transform: 'translateX(-50%)' }
    : { left: '8px' };

  return (
    <>
      <div className="fixed inset-0 z-[950]" onClick={closeStartMenu} />
      <div className="fixed bottom-[56px] w-[500px] max-w-[calc(100vw-16px)] z-[951] animate-scale-in overflow-hidden"
        style={{
          ...posStyle,
          background: theme.bg,
          border: `1px solid ${theme.glassBorder}`,
          borderRadius: 8, // Squircle - less rounded
          boxShadow: '0 12px 48px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.25)',
        }}>
        <div className="glass-heavy">
          {/* Search */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: theme.bgTertiary }}>
              <span className="text-xs" style={{ color: theme.textMuted }}>🔍</span>
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
                  className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-white/7 transition-colors">
                  <span className="text-xl">{app.icon}</span>
                  <span className="text-[10px] leading-tight text-center truncate w-full" style={{ color: theme.textSecondary }}>{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="px-4 pb-3">
            <h3 className="text-xs font-semibold mb-2" style={{ color: theme.text }}>Recommended</h3>
            <div className="grid grid-cols-2 gap-1">
              {recommended.map((item, i) => (
                <button key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors">
                  <span className="text-base">{item.icon}</span>
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
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm">👤</div>
              <span className="text-xs font-medium" style={{ color: theme.text }}>User</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => { closeStartMenu(); setPhase('restart'); }}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors" title="Restart">
                <span className="text-sm" style={{ color: theme.textSecondary }}>🔄</span>
              </button>
              <button onClick={() => { closeStartMenu(); setPhase('shutdown'); }}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors" title="Shut down">
                <span className="text-sm" style={{ color: theme.textSecondary }}>⏻</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
