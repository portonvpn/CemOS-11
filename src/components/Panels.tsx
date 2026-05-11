import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';

export const NotificationPanel: React.FC = () => {
  const { settings, notifPanelOpen, toggleNotifPanel, notifications, clearNotifications } = useStore();
  const theme = themes[settings.theme];
  if (!notifPanelOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[940]" onClick={toggleNotifPanel} />
      <div className="fixed top-0 right-0 bottom-[48px] w-[320px] z-[941] flex flex-col animate-slide-down glass-heavy"
        style={{ background: theme.bg, borderLeft: `1px solid ${theme.glassBorder}`, boxShadow: '-4px 0 24px rgba(0,0,0,0.3)' }}>
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: theme.border }}>
          <h3 className="text-xs font-semibold" style={{ color: theme.text }}>Notifications</h3>
          <div className="flex gap-1">
            {notifications.length > 0 && (
              <button onClick={clearNotifications} className="text-[10px] px-2 py-0.5 rounded hover:bg-white/10" style={{ color: theme.textMuted }}>Clear</button>
            )}
            <button onClick={toggleNotifPanel} className="text-sm px-1 rounded hover:bg-white/10" style={{ color: theme.textMuted }}>✕</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 no-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-30">
              <p className="text-xs" style={{ color: theme.textMuted }}>No notifications</p>
            </div>
          ) : notifications.map(n => (
            <div key={n.id} className="p-3 rounded-md hover:bg-white/3 transition-colors" style={{ background: theme.bgTertiary }}>
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5">{n.icon || '💬'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium" style={{ color: theme.text }}>{n.title}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: theme.textMuted }}>{n.message}</p>
                  <p className="text-[9px] mt-1" style={{ color: theme.textMuted }}>Just now</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t" style={{ borderColor: theme.border }}>
          <p className="text-xs font-medium" style={{ color: theme.text }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </>
  );
};

const qToggles = [
  { icon: '📶', label: 'Wi-Fi', on: true }, { icon: '🔵', label: 'Bluetooth', on: true }, { icon: '✈️', label: 'Airplane', on: false },
  { icon: '🌙', label: 'Focus', on: false }, { icon: '🖥️', label: 'Project', on: false }, { icon: '🔋', label: 'Saver', on: false },
];

export const QuickSettingsPanel: React.FC = () => {
  const { settings, quickSettingsOpen, toggleQuickSettings } = useStore();
  const theme = themes[settings.theme];
  const [toggles, setToggles] = useState(qToggles);
  if (!quickSettingsOpen) return null;

  const toggle = (i: number) => setToggles(t => t.map((x, j) => j === i ? { ...x, on: !x.on } : x));

  return (
    <>
      <div className="fixed inset-0 z-[940]" onClick={toggleQuickSettings} />
      <div className="fixed bottom-[56px] right-2 w-[300px] z-[941] animate-scale-in glass-heavy overflow-hidden"
        style={{ background: theme.bg, border: `1px solid ${theme.glassBorder}`, borderRadius: 8, boxShadow: '0 12px 48px rgba(0,0,0,0.45)' }}>
        <div className="p-3">
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {toggles.map((t, i) => (
              <button key={t.label} onClick={() => toggle(i)} className="flex flex-col items-center gap-1 p-2 rounded-md transition-all"
                style={{ background: t.on ? `${theme.accent}20` : theme.bgTertiary, color: t.on ? theme.accent : theme.textMuted }}>
                <span className="text-sm">{t.icon}</span>
                <span className="text-[9px]">{t.label}</span>
              </button>
            ))}
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs">☀️</span>
              <input type="range" min="0" max="100" defaultValue="75" className="flex-1" style={{ accentColor: theme.accent }} />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs">🔊</span>
              <input type="range" min="0" max="100" defaultValue="60" className="flex-1" style={{ accentColor: theme.accent }} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t" style={{ borderColor: theme.border }}>
          <span className="text-[10px]" style={{ color: theme.textMuted }}>🔋 92% · Connected</span>
        </div>
      </div>
    </>
  );
};

export const ContextMenu: React.FC = () => {
  const { contextMenu, hideContextMenu, settings } = useStore();
  const theme = themes[settings.theme];
  if (!contextMenu) return null;

  const menuW = 180, menuH = contextMenu.items.length * 32 + 8;
  const x = Math.min(contextMenu.x, window.innerWidth - menuW - 8);
  const y = Math.min(contextMenu.y, window.innerHeight - menuH - 8);

  return (
    <>
      <div className="fixed inset-0 z-[960]" onClick={hideContextMenu} onContextMenu={e => { e.preventDefault(); hideContextMenu(); }} />
      <div className="fixed z-[961] min-w-[170px] py-1 overflow-hidden animate-scale-in glass"
        style={{ top: y, left: x, background: theme.bg, border: `1px solid ${theme.glassBorder}`, borderRadius: 6, boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
        {contextMenu.items.map((item, i) => (
          <button key={i} onClick={() => { item.action(); hideContextMenu(); }}
            className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-white/7 transition-colors" style={{ color: theme.text }}>{item.label}</button>
        ))}
      </div>
    </>
  );
};
