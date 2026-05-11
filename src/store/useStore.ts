import { create } from 'zustand';
import { WindowState, Settings, OSPhase, Notification } from './types';

const defaultSettings: Settings = {
  theme: 'dark-blue', accentColor: '#3b82f6', transparency: true,
  taskbarStyle: 'center', iconSize: 'medium', uiScale: 1, font: 'Inter',
};

function loadSettings(): Settings {
  try { const s = localStorage.getItem('cemos-settings'); if (s) return { ...defaultSettings, ...JSON.parse(s) }; } catch {}
  return defaultSettings;
}
function saveSettings(s: Settings) { localStorage.setItem('cemos-settings', JSON.stringify(s)); }

let nextZ = 10;

interface OSStore {
  phase: OSPhase;
  setPhase: (p: OSPhase) => void;
  isMobile: boolean;
  setMobile: (v: boolean) => void;
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
  windows: WindowState[];
  openWindow: (appId: string, title: string, opts?: Partial<WindowState>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindow: (id: string, partial: Partial<WindowState>) => void;
  startMenuOpen: boolean;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
  notifPanelOpen: boolean;
  toggleNotifPanel: () => void;
  quickSettingsOpen: boolean;
  toggleQuickSettings: () => void;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id' | 'time'>) => void;
  clearNotifications: () => void;
  contextMenu: { x: number; y: number; items: { label: string; action: () => void }[] } | null;
  showContextMenu: (x: number, y: number, items: { label: string; action: () => void }[]) => void;
  hideContextMenu: () => void;
  activeWindowId: string | null;
  mobileAppOpen: string | null;
  setMobileApp: (id: string | null) => void;
  closeAll: () => void;
}

export const useStore = create<OSStore>((set, get) => ({
  phase: 'boot',
  setPhase: (p) => set({ phase: p }),
  isMobile: typeof window !== 'undefined' && window.innerWidth < 768,
  setMobile: (v) => set({ isMobile: v }),
  settings: loadSettings(),
  updateSettings: (partial) => { const ns = { ...get().settings, ...partial }; saveSettings(ns); set({ settings: ns }); },

  windows: [],
  openWindow: (appId, title, opts) => {
    const existing = get().windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) { get().restoreWindow(existing.id); } else { get().focusWindow(existing.id); }
      return;
    }
    nextZ++;
    const id = `${appId}-${Date.now()}`;
    const offset = (get().windows.length % 5) * 32;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const dw = Math.min(960, vw - 100);
    const dh = Math.min(620, vh - 120);
    const w: WindowState = {
      id, appId, title,
      x: Math.max(40, (vw - dw) / 2 + offset),
      y: Math.max(20, (vh - dh) / 2 - 40 + offset),
      width: dw, height: dh, minWidth: 420, minHeight: 320,
      isMaximized: false, isMinimized: false, zIndex: nextZ,
      ...opts,
    };
    set({ windows: [...get().windows, w], activeWindowId: id, startMenuOpen: false });
  },
  closeWindow: (id) => set((s) => ({ windows: s.windows.filter((w) => w.id !== id), activeWindowId: s.activeWindowId === id ? null : s.activeWindowId })),
  minimizeWindow: (id) => set((s) => ({ windows: s.windows.map((w) => w.id === id ? { ...w, isMinimized: true } : w), activeWindowId: s.activeWindowId === id ? null : s.activeWindowId })),
  maximizeWindow: (id) => set((s) => ({ windows: s.windows.map((w) => w.id === id ? { ...w, isMaximized: true, isMinimized: false } : w) })),
  restoreWindow: (id) => { nextZ++; set((s) => ({ windows: s.windows.map((w) => w.id === id ? { ...w, isMaximized: false, isMinimized: false, zIndex: nextZ } : w), activeWindowId: id })); },
  focusWindow: (id) => { nextZ++; set((s) => ({ windows: s.windows.map((w) => w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w), activeWindowId: id })); },
  updateWindow: (id, partial) => set((s) => ({ windows: s.windows.map((w) => w.id === id ? { ...w, ...partial } : w) })),

  startMenuOpen: false,
  toggleStartMenu: () => set((s) => ({ startMenuOpen: !s.startMenuOpen, quickSettingsOpen: false, notifPanelOpen: false })),
  closeStartMenu: () => set({ startMenuOpen: false }),
  notifPanelOpen: false,
  toggleNotifPanel: () => set((s) => ({ notifPanelOpen: !s.notifPanelOpen, startMenuOpen: false, quickSettingsOpen: false })),
  quickSettingsOpen: false,
  toggleQuickSettings: () => set((s) => ({ quickSettingsOpen: !s.quickSettingsOpen, startMenuOpen: false, notifPanelOpen: false })),

  notifications: [
    { id: '1', title: 'Welcome to CemOS 11', message: 'Your next-gen OS is ready. Explore apps, games & more!', time: new Date(), icon: '🎉' },
    { id: '2', title: 'System Update', message: 'CemOS 11.3 brings new apps and performance boosts.', time: new Date(), icon: '🔄' },
  ],
  addNotification: (n) => set((s) => ({ notifications: [{ ...n, id: Date.now().toString(), time: new Date() }, ...s.notifications] })),
  clearNotifications: () => set({ notifications: [] }),

  contextMenu: null,
  showContextMenu: (x, y, items) => set({ contextMenu: { x, y, items } }),
  hideContextMenu: () => set({ contextMenu: null }),
  activeWindowId: null,

  mobileAppOpen: null,
  setMobileApp: (id) => set({ mobileAppOpen: id, startMenuOpen: false }),
  closeAll: () => set({ startMenuOpen: false, quickSettingsOpen: false, notifPanelOpen: false, contextMenu: null }),
}));
