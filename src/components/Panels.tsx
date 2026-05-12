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
      <div className="fixed top-0 right-0 bottom-[48px] w-[340px] z-[941] flex flex-col animate-slide-down glass-heavy"
        style={{ background: theme.bg, borderLeft: `1px solid ${theme.glassBorder}`, boxShadow: '-4px 0 30px rgba(0,0,0,0.3)' }}>
        
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: theme.border }}>
          <h3 className="text-sm font-semibold" style={{ color: theme.text }}>Notifications</h3>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button onClick={clearNotifications} className="text-xs px-2 py-0.5 rounded hover:bg-white/10" style={{ color: theme.textMuted }}>Clear all</button>
            )}
            <button onClick={toggleNotifPanel} className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10" style={{ color: theme.textMuted }}>✕</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={theme.textMuted} strokeWidth="1.5">
                <path d="M24 6C16 6 10 12 10 18V28L4 34V38H44V34L38 28V18C38 12 32 6 24 6Z"/>
                <circle cx="24" cy="44" r="4"/>
              </svg>
              <p className="text-xs mt-3" style={{ color: theme.textMuted }}>No new notifications</p>
            </div>
          ) : notifications.map(n => (
            <div key={n.id} className="p-3.5 rounded-lg hover:bg-white/3 transition-colors" style={{ background: theme.bgTertiary }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0" style={{ background: theme.accent + '20' }}>
                  {n.icon || '🔔'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: theme.text }}>{n.title}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: theme.textMuted }}>{n.message}</p>
                  <p className="text-[10px] mt-1.5" style={{ color: theme.textMuted }}>Just now</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar/Date section */}
        <div className="p-4 border-t" style={{ borderColor: theme.border }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: theme.text }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
              <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="text-[10px] font-bold opacity-20">ZORO</div>
          </div>
        </div>
      </div>
    </>
  );
};

const qToggles = [
  { icon: 'wifi', label: 'Wi-Fi', on: true },
  { icon: 'bluetooth', label: 'Bluetooth', on: true },
  { icon: 'plane', label: 'Airplane', on: false },
  { icon: 'moon', label: 'Focus', on: false },
  { icon: 'cast', label: 'Cast', on: false },
  { icon: 'battery', label: 'Saver', on: false },
];

const ToggleIcon: React.FC<{ type: string; active: boolean }> = ({ type, active }) => {
  const color = active ? '#fff' : 'currentColor';
  switch (type) {
    case 'wifi': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5"><path d="M1 6C4 3 12 3 15 6M3 9C5.5 6.5 10.5 6.5 13 9M5.5 12C7 10.5 9 10.5 10.5 12"/><circle cx="8" cy="14" r="1" fill={color}/></svg>;
    case 'bluetooth': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5"><path d="M4 4L12 12L8 16V0L12 4L4 12"/></svg>;
    case 'plane': return <svg width="16" height="16" viewBox="0 0 16 16" fill={color}><path d="M8 1L6 5H2L1 7H5L4 12L2 14V15H4L8 12L12 15H14V14L12 12L11 7H15L14 5H10L8 1Z"/></svg>;
    case 'moon': return <svg width="16" height="16" viewBox="0 0 16 16" fill={color}><path d="M14 10C12 12 8 12 6 10C4 8 4 4 6 2C3 3 1 6 1 9C1 13 4 16 8 16C11 16 14 14 15 11C15 11 14.5 10.5 14 10Z"/></svg>;
    case 'cast': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5"><path d="M2 11V13H4C4 12 3 11 2 11ZM2 8V9.5C4.5 9.5 6.5 11.5 6.5 14H8C8 10.5 5 8 2 8ZM2 5V6.5C6.5 6.5 10 10 10 14H12C12 8.5 7.5 5 2 5Z"/><rect x="2" y="2" width="12" height="9" rx="1"/></svg>;
    case 'battery': return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5"><rect x="1" y="4" width="12" height="8" rx="1"/><path d="M13 7V9H15V7H13Z" fill={color}/><rect x="2" y="5" width="4" height="6" fill={color}/></svg>;
    default: return null;
  }
};

export const QuickSettingsPanel: React.FC = () => {
  const { settings, quickSettingsOpen, toggleQuickSettings } = useStore();
  const theme = themes[settings.theme];
  const [toggles, setToggles] = useState(qToggles);
  if (!quickSettingsOpen) return null;

  const toggle = (i: number) => setToggles(t => t.map((x, j) => j === i ? { ...x, on: !x.on } : x));

  return (
    <>
      <div className="fixed inset-0 z-[940]" onClick={toggleQuickSettings} />
      <div className="fixed bottom-[56px] right-2 w-[320px] z-[941] animate-scale-in glass-heavy overflow-hidden"
        style={{ background: theme.bg, border: `1px solid ${theme.glassBorder}`, borderRadius: 12, boxShadow: '0 12px 48px rgba(0,0,0,0.5)' }}>
        
        <div className="p-4">
          {/* Toggles grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {toggles.map((t, i) => (
              <button key={t.label} onClick={() => toggle(i)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all"
                style={{ background: t.on ? theme.accent : theme.bgTertiary, color: t.on ? '#fff' : theme.textMuted }}>
                <ToggleIcon type={t.icon} active={t.on} />
                <span className="text-[10px] font-medium">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill={theme.textSecondary}><circle cx="8" cy="8" r="4"/><path d="M8 1V3M8 13V15M1 8H3M13 8H15M3 3L4.5 4.5M11.5 11.5L13 13M3 13L4.5 11.5M11.5 4.5L13 3" stroke={theme.textSecondary} strokeWidth="1.5"/></svg>
              <input type="range" min="0" max="100" defaultValue="75" className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, ${theme.accent} 75%, ${theme.bgTertiary} 75%)` }} />
            </div>
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill={theme.textSecondary}><path d="M1 5V11L4 11L8 15V1L4 5H1Z"/><path d="M11 4C12.5 5.5 12.5 10.5 11 12M13 2C16 5 16 11 13 14" stroke={theme.textSecondary} strokeWidth="1.5" fill="none"/></svg>
              <input type="range" min="0" max="100" defaultValue="60" className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, ${theme.accent} 60%, ${theme.bgTertiary} 60%)` }} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill={theme.accent}><rect x="2" y="2" width="10" height="10" rx="2"/></svg>
            <span className="text-[11px]" style={{ color: theme.textMuted }}>92% • Plugged in</span>
          </div>
          <span className="text-[10px] font-bold opacity-20">ZORO</span>
        </div>
      </div>
    </>
  );
};

export const ContextMenu: React.FC = () => {
  const { contextMenu, hideContextMenu, settings } = useStore();
  const theme = themes[settings.theme];
  if (!contextMenu) return null;

  const menuW = 200, menuH = contextMenu.items.length * 36 + 8;
  const x = Math.min(contextMenu.x, window.innerWidth - menuW - 8);
  const y = Math.min(contextMenu.y, window.innerHeight - menuH - 8);

  return (
    <>
      <div className="fixed inset-0 z-[960]" onClick={hideContextMenu} onContextMenu={e => { e.preventDefault(); hideContextMenu(); }} />
      <div className="fixed z-[961] min-w-[180px] py-1.5 overflow-hidden animate-scale-in glass"
        style={{ top: y, left: x, background: theme.bg, border: `1px solid ${theme.glassBorder}`, borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.45)' }}>
        {contextMenu.items.map((item, i) => (
          <button key={i} onClick={() => { item.action(); hideContextMenu(); }}
            className="w-full text-left px-4 py-2 text-[13px] hover:bg-white/8 transition-colors flex items-center gap-2" style={{ color: theme.text }}>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};
