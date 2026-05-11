import React from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { Power, RotateCcw, Search } from 'lucide-react';

const pinnedApps = [
  { id: 'explorer', name: 'File Explorer', icon: '📁' },
  { id: 'settings', name: 'Settings', icon: '⚙️' },
];

const recommendedItems = [
  { name: 'readme.txt', icon: '📄', desc: 'Recently opened' },
  { name: 'project-notes.md', icon: '📝', desc: '2 hours ago' },
  { name: 'screenshot.png', icon: '🖼️', desc: 'Yesterday' },
  { name: 'Budget_2025.xlsx', icon: '📊', desc: '3 days ago' },
];

export const StartMenu: React.FC = () => {
  const { settings, startMenuOpen, closeStartMenu, openWindow, setPhase } = useStore();
  const theme = themes[settings.theme];

  if (!startMenuOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[950]" onClick={closeStartMenu} />
      <div
        className="fixed bottom-[60px] left-1/2 -translate-x-1/2 w-[580px] rounded-2xl overflow-hidden z-[951] animate-scale-in"
        style={{
          background: theme.bg,
          border: `1px solid ${theme.glassBorder}`,
          boxShadow: '0 16px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
        }}
      >
        <div className="glass-heavy">
          {/* Search */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full" style={{ background: theme.bgTertiary }}>
              <Search size={16} style={{ color: theme.textMuted }} />
              <input
                type="text"
                placeholder="Search apps, files, settings..."
                className="bg-transparent outline-none text-sm flex-1"
                style={{ color: theme.text }}
              />
            </div>
          </div>

          {/* Pinned */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold" style={{ color: theme.text }}>Pinned</h3>
              <button className="text-xs px-2.5 py-1 rounded-md" style={{ color: theme.textMuted, background: theme.bgTertiary }}>
                All apps →
              </button>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {pinnedApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    openWindow(app.id, app.name);
                    closeStartMenu();
                  }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-white/8 transition-colors"
                >
                  <span className="text-2xl">{app.icon}</span>
                  <span className="text-[11px]" style={{ color: theme.textSecondary }}>{app.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold" style={{ color: theme.text }}>Recommended</h3>
              <button className="text-xs px-2.5 py-1 rounded-md" style={{ color: theme.textMuted, background: theme.bgTertiary }}>
                More →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {recommendedItems.map((item, i) => (
                <button
                  key={i}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="text-left min-w-0">
                    <p className="text-sm truncate" style={{ color: theme.text }}>{item.name}</p>
                    <p className="text-[10px]" style={{ color: theme.textMuted }}>{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-6 py-3 border-t"
            style={{ borderColor: theme.border }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">👤</div>
              <span className="text-sm font-medium" style={{ color: theme.text }}>User</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => { closeStartMenu(); setPhase('restart'); }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Restart"
              >
                <RotateCcw size={16} style={{ color: theme.textSecondary }} />
              </button>
              <button
                onClick={() => { closeStartMenu(); setPhase('shutdown'); }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Shut down"
              >
                <Power size={16} style={{ color: theme.textSecondary }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
