import { create } from 'zustand';
import { WindowState, Settings, OSPhase, Notification } from './types';
import { themes } from './themes';

const defaultSettings: Settings = {
  theme: 'dark-blue',
  accentColor: '#3b82f6',
  transparency: true,
  taskbarStyle: 'center',
  iconSize: 'medium',
  uiScale: 1,
  font: 'Inter',
};

function loadSettings(): Settings {
  try {
    const s = localStorage.getItem('cemos-settings');
    if (s) return { ...defaultSettings, ...JSON.parse(s) };
  } catch {}
  return defaultSettings;
}

function saveSettings(s: Settings) {
  localStorage.setItem('cemos-settings', JSON.stringify(s));
}

let nextZ = 10;

interface OSStore {
  phase: OSPhase;
  setPhase: (p: OSPhase) => void;
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
  windows: WindowState[];
  openWindow: (appId: string, title: string) => void;
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
}

export const useStore = create<OSStore>((set, get) => ({
  phase: 'boot',
  setPhase: (p) => set({ phase: p }),

  settings: loadSettings(),
  updateSettings: (partial) => {
    const ns = { ...get().settings, ...partial };
    saveSettings(ns);
    set({ settings: ns });
  },

  windows: [],
  openWindow: (appId, title) => {
    const existing = get().windows.find((w) => w.appId === appId && !w.isMinimized);
    if (existing) {
      get().focusWindow(existing.id);
      return;
    }
    const minimized = get().windows.find((w) => w.appId === appId && w.isMinimized);
    if (minimized) {
      get().restoreWindow(minimized.id);
      return;
    }
    nextZ++;
    const id = `${appId}-${Date.now()}`;
    const offset = (get().windows.length % 6) * 30;
    const w: WindowState = {
      id,
      appId,
      title,
      x: 120 + offset,
      y: 60 + offset,
      width: appId === 'settings' ? 900 : 950,
      height: appId === 'settings' ? 620 : 580,
      minWidth: 500,
      minHeight: 380,
      isMaximized: false,
      isMinimized: false,
      zIndex: nextZ,
    };
    set({ windows: [...get().windows, w], activeWindowId: id, startMenuOpen: false });
  },
  closeWindow: (id) =>
    set((s) => ({
      windows: s.windows.filter((w) => w.id !== id),
      activeWindowId: s.activeWindowId === id ? null : s.activeWindowId,
    })),
  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
      activeWindowId: s.activeWindowId === id ? null : s.activeWindowId,
    })),
  maximizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: true, isMinimized: false } : w
      ),
    })),
  restoreWindow: (id) => {
    nextZ++;
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: false, isMinimized: false, zIndex: nextZ } : w
      ),
      activeWindowId: id,
    }));
  },
  focusWindow: (id) => {
    nextZ++;
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w
      ),
      activeWindowId: id,
    }));
  },
  updateWindow: (id, partial) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, ...partial } : w)),
    })),

  startMenuOpen: false,
  toggleStartMenu: () => set((s) => ({ startMenuOpen: !s.startMenuOpen, quickSettingsOpen: false, notifPanelOpen: false })),
  closeStartMenu: () => set({ startMenuOpen: false }),

  notifPanelOpen: false,
  toggleNotifPanel: () => set((s) => ({ notifPanelOpen: !s.notifPanelOpen, startMenuOpen: false, quickSettingsOpen: false })),

  quickSettingsOpen: false,
  toggleQuickSettings: () => set((s) => ({ quickSettingsOpen: !s.quickSettingsOpen, startMenuOpen: false, notifPanelOpen: false })),

  notifications: [
    { id: '1', title: 'Welcome to CemOS 11', message: 'Your system is ready. Explore the new features!', time: new Date(), icon: '🎉' },
    { id: '2', title: 'System Update', message: 'CemOS 11.2 is available for download.', time: new Date(), icon: '🔄' },
  ],
  addNotification: (n) =>
    set((s) => ({
      notifications: [{ ...n, id: Date.now().toString(), time: new Date() }, ...s.notifications],
    })),
  clearNotifications: () => set({ notifications: [] }),

  contextMenu: null,
  showContextMenu: (x, y, items) => set({ contextMenu: { x, y, items } }),
  hideContextMenu: () => set({ contextMenu: null }),

  activeWindowId: null,
}));

export function getTheme(): import('./types').Theme {
  const s = useStore.getState().settings;
  return themes[s.theme];
}
