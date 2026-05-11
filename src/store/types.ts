export type ThemeName = 'dark-blue' | 'light' | 'cyberpunk' | 'retro' | 'rainy';

export interface Theme {
  name: ThemeName;
  label: string;
  wallpaper: string;
  accent: string;
  accentHover: string;
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  taskbar: string;
  glass: string;
  glassBorder: string;
  isDark: boolean;
}

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
}

export interface AppDef {
  id: string;
  name: string;
  icon: string;
  pinned?: boolean;
}

export type OSPhase = 'boot' | 'lock' | 'login' | 'desktop' | 'shutdown' | 'restart';

export interface Settings {
  theme: ThemeName;
  accentColor: string;
  transparency: boolean;
  taskbarStyle: 'center' | 'left';
  iconSize: 'small' | 'medium' | 'large';
  uiScale: number;
  font: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: Date;
  icon?: string;
}
