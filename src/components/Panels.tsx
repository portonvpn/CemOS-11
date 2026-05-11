import React from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { Wifi, Bluetooth, Moon, Monitor, Plane, Battery, X, Trash2 } from 'lucide-react';

export const NotificationPanel: React.FC = () => {
  const { settings, notifPanelOpen, toggleNotifPanel, notifications, clearNotifications } = useStore();
  const theme = themes[settings.theme];

  if (!notifPanelOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[940]" onClick={toggleNotifPanel} />
      <div
        className="fixed top-0 right-0 bottom-[52px] w-[360px] z-[941] flex flex-col animate-slide-down glass-heavy"
        style={{
          background: theme.bg,
          borderLeft: `1px solid ${theme.glassBorder}`,
          boxShadow: '-4px 0 20px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: theme.border }}>
          <h3 className="text-sm font-semibold" style={{ color: theme.text }}>Notifications</h3>
          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <button onClick={clearNotifications} className="p-1.5 rounded-md hover:bg-white/10 transition-colors">
                <Trash2 size={14} style={{ color: theme.textMuted }} />
              </button>
            )}
            <button onClick={toggleNotifPanel} className="p-1.5 rounded-md hover:bg-white/10 transition-colors">
              <X size={14} style={{ color: theme.textMuted }} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
              <p className="text-sm" style={{ color: theme.textMuted }}>No notifications</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className="p-3.5 rounded-xl transition-colors hover:bg-white/5"
                style={{ background: theme.bgTertiary }}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-lg mt-0.5">{n.icon || '💬'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: theme.text }}>{n.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>{n.message}</p>
                    <p className="text-[10px] mt-1.5" style={{ color: theme.textMuted }}>Just now</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Calendar widget */}
        <div className="p-4 border-t" style={{ borderColor: theme.border }}>
          <p className="text-sm font-semibold mb-2" style={{ color: theme.text }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          <p className="text-xs" style={{ color: theme.textMuted }}>No upcoming events</p>
        </div>
      </div>
    </>
  );
};

const quickToggles = [
  { icon: <Wifi size={18} />, label: 'Wi-Fi', active: true },
  { icon: <Bluetooth size={18} />, label: 'Bluetooth', active: true },
  { icon: <Plane size={18} />, label: 'Airplane', active: false },
  { icon: <Moon size={18} />, label: 'Focus', active: false },
  { icon: <Monitor size={18} />, label: 'Project', active: false },
  { icon: <Battery size={18} />, label: 'Saver', active: false },
];

export const QuickSettingsPanel: React.FC = () => {
  const { settings, quickSettingsOpen, toggleQuickSettings } = useStore();
  const theme = themes[settings.theme];
  const [toggles, setToggles] = React.useState(quickToggles);

  if (!quickSettingsOpen) return null;

  const toggle = (idx: number) => {
    setToggles((prev) => prev.map((t, i) => (i === idx ? { ...t, active: !t.active } : t)));
  };

  return (
    <>
      <div className="fixed inset-0 z-[940]" onClick={toggleQuickSettings} />
      <div
        className="fixed bottom-[60px] right-3 w-[340px] rounded-2xl z-[941] animate-scale-in glass-heavy overflow-hidden"
        style={{
          background: theme.bg,
          border: `1px solid ${theme.glassBorder}`,
          boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
        }}
      >
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {toggles.map((t, i) => (
              <button
                key={t.label}
                onClick={() => toggle(i)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all"
                style={{
                  background: t.active ? `${theme.accent}25` : theme.bgTertiary,
                  color: t.active ? theme.accent : theme.textMuted,
                }}
              >
                {t.icon}
                <span className="text-[10px]">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: theme.textSecondary }}>☀️</span>
              <input type="range" min="0" max="100" defaultValue="75" className="flex-1 accent-blue-500" style={{ accentColor: theme.accent }} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm" style={{ color: theme.textSecondary }}>🔊</span>
              <input type="range" min="0" max="100" defaultValue="60" className="flex-1 accent-blue-500" style={{ accentColor: theme.accent }} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: theme.border }}>
          <span className="text-xs" style={{ color: theme.textMuted }}>🔋 92% • Connected</span>
          <button className="text-xs px-2.5 py-1 rounded-md hover:bg-white/10 transition-colors" style={{ color: theme.textSecondary }}>
            ⚙️ Edit
          </button>
        </div>
      </div>
    </>
  );
};

export const ContextMenu: React.FC = () => {
  const { contextMenu, hideContextMenu, settings } = useStore();
  const theme = themes[settings.theme];

  if (!contextMenu) return null;

  // Clamp position to viewport
  const menuW = 220;
  const menuH = contextMenu.items.length * 36 + 12;
  const x = Math.min(contextMenu.x, window.innerWidth - menuW - 8);
  const y = Math.min(contextMenu.y, window.innerHeight - menuH - 8);

  return (
    <>
      <div className="fixed inset-0 z-[960]" onClick={hideContextMenu} onContextMenu={(e) => { e.preventDefault(); hideContextMenu(); }} />
      <div
        className="fixed z-[961] min-w-[200px] py-1.5 rounded-xl overflow-hidden animate-scale-in glass"
        style={{
          top: y,
          left: x,
          background: theme.bg,
          border: `1px solid ${theme.glassBorder}`,
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        }}
      >
        {contextMenu.items.map((item, i) => (
          <button
            key={i}
            onClick={() => { item.action(); hideContextMenu(); }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-white/8 transition-colors"
            style={{ color: theme.text }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};
