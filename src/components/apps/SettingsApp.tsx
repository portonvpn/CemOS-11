import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';
import { ThemeName } from '../../store/types';
import { Palette, Monitor, Layout, Type, Sliders, Sun, Moon, Sparkles, Eye } from 'lucide-react';
import { CemLogo } from '../CemLogo';

const sections = [
  { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
  { id: 'themes', label: 'Themes', icon: <Sparkles size={18} /> },
  { id: 'taskbar', label: 'Taskbar', icon: <Layout size={18} /> },
  { id: 'display', label: 'Display', icon: <Monitor size={18} /> },
  { id: 'fonts', label: 'Fonts', icon: <Type size={18} /> },
  { id: 'about', label: 'About', icon: <Sliders size={18} /> },
];

const accentColors = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b',
  '#10b981', '#06b6d4', '#6366f1', '#f97316', '#14b8a6',
];

const fontOptions = ['Inter', 'system-ui', 'monospace', 'serif'];

export const SettingsApp: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const theme = themes[settings.theme];
  const [activeSection, setActiveSection] = useState('appearance');

  const renderContent = () => {
    switch (activeSection) {
      case 'appearance':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>Appearance</h2>

            {/* Mode */}
            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: theme.textSecondary }}>Mode</h3>
              <div className="flex gap-3">
                {[
                  { theme: 'light' as ThemeName, label: 'Light', icon: <Sun size={20} /> },
                  { theme: 'dark-blue' as ThemeName, label: 'Dark', icon: <Moon size={20} /> },
                ].map((m) => (
                  <button
                    key={m.theme}
                    onClick={() => updateSettings({ theme: m.theme })}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all w-28"
                    style={{
                      borderColor: settings.theme === m.theme ? theme.accent : theme.border,
                      background: settings.theme === m.theme ? `${theme.accent}12` : theme.bgTertiary,
                      color: theme.text,
                    }}
                  >
                    {m.icon}
                    <span className="text-sm">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accent color */}
            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: theme.textSecondary }}>Accent Color</h3>
              <div className="flex gap-2 flex-wrap">
                {accentColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => updateSettings({ accentColor: c })}
                    className="w-8 h-8 rounded-full transition-transform hover:scale-110 border-2"
                    style={{
                      background: c,
                      borderColor: settings.accentColor === c ? theme.text : 'transparent',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Transparency */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium" style={{ color: theme.text }}>Transparency Effects</h3>
                <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>Enable glass and blur effects</p>
              </div>
              <button
                onClick={() => updateSettings({ transparency: !settings.transparency })}
                className="relative w-11 h-6 rounded-full transition-colors"
                style={{ background: settings.transparency ? theme.accent : theme.bgTertiary }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                  style={{ left: settings.transparency ? 22 : 2 }}
                />
              </button>
            </div>
          </div>
        );

      case 'themes':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>Themes</h2>
            <div className="grid grid-cols-2 gap-3">
              {(Object.values(themes)).map((t) => (
                <button
                  key={t.name}
                  onClick={() => updateSettings({ theme: t.name })}
                  className="relative overflow-hidden rounded-xl border-2 transition-all h-32 group"
                  style={{
                    borderColor: settings.theme === t.name ? theme.accent : theme.border,
                  }}
                >
                  <img src={t.wallpaper} alt={t.label} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium text-left">{t.label}</p>
                    <div className="flex gap-1.5 mt-1.5">
                      <div className="w-3 h-3 rounded-full" style={{ background: t.accent }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: t.text }} />
                      <div className="w-3 h-3 rounded-full" style={{ background: t.bg }} />
                    </div>
                  </div>
                  {settings.theme === t.name && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs" style={{ background: theme.accent }}>
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 'taskbar':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>Taskbar</h2>

            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: theme.textSecondary }}>Alignment</h3>
              <div className="flex gap-3">
                {(['center', 'left'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateSettings({ taskbarStyle: s })}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all"
                    style={{
                      borderColor: settings.taskbarStyle === s ? theme.accent : theme.border,
                      background: settings.taskbarStyle === s ? `${theme.accent}12` : theme.bgTertiary,
                      color: theme.text,
                    }}
                  >
                    <Layout size={16} />
                    <span className="text-sm capitalize">{s}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3" style={{ color: theme.textSecondary }}>Icon Size</h3>
              <div className="flex gap-3">
                {(['small', 'medium', 'large'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateSettings({ iconSize: s })}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all"
                    style={{
                      borderColor: settings.iconSize === s ? theme.accent : theme.border,
                      background: settings.iconSize === s ? `${theme.accent}12` : theme.bgTertiary,
                      color: theme.text,
                    }}
                  >
                    <span className="text-sm capitalize">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'display':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>Display</h2>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium" style={{ color: theme.textSecondary }}>UI Scale</h3>
                <span className="text-sm font-mono" style={{ color: theme.accent }}>{Math.round(settings.uiScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.3"
                step="0.05"
                value={settings.uiScale}
                onChange={(e) => updateSettings({ uiScale: parseFloat(e.target.value) })}
                className="w-full accent-blue-500"
                style={{ accentColor: theme.accent }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: theme.textMuted }}>
                <span>80%</span>
                <span>130%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye size={18} style={{ color: theme.textSecondary }} />
                <div>
                  <h3 className="text-sm font-medium" style={{ color: theme.text }}>Transparency</h3>
                  <p className="text-xs" style={{ color: theme.textMuted }}>Window blur effects</p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ transparency: !settings.transparency })}
                className="relative w-11 h-6 rounded-full transition-colors"
                style={{ background: settings.transparency ? theme.accent : theme.bgTertiary }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                  style={{ left: settings.transparency ? 22 : 2 }}
                />
              </button>
            </div>
          </div>
        );

      case 'fonts':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>Fonts</h2>
            <div className="space-y-2">
              {fontOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => updateSettings({ font: f })}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border transition-all"
                  style={{
                    borderColor: settings.font === f ? theme.accent : theme.border,
                    background: settings.font === f ? `${theme.accent}12` : theme.bgTertiary,
                    fontFamily: f,
                    color: theme.text,
                  }}
                >
                  <Type size={16} style={{ color: theme.textSecondary }} />
                  <div className="text-left">
                    <p className="text-sm font-medium">{f}</p>
                    <p className="text-xs" style={{ color: theme.textMuted }}>The quick brown fox jumps over the lazy dog</p>
                  </div>
                  {settings.font === f && (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: theme.accent, color: 'white' }}>Active</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>About CemOS</h2>
            <div className="flex items-center gap-4 p-5 rounded-xl" style={{ background: theme.bgTertiary }}>
              <CemLogo size={56} color={theme.accent} />
              <div>
                <h3 className="text-lg font-bold" style={{ color: theme.text }}>CemOS 11</h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Version 11.2.0 (Build 24158)</p>
                <p className="text-xs mt-1" style={{ color: theme.textMuted }}>© 2025 CemOS Corporation. All rights reserved.</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Processor', value: 'CemOS Virtual CPU @ 3.6GHz' },
                { label: 'Memory', value: '16.0 GB RAM' },
                { label: 'System Type', value: '64-bit operating system' },
                { label: 'Device Name', value: 'CEMOS-DESKTOP' },
                { label: 'Edition', value: 'CemOS 11 Pro' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2.5 px-4 rounded-lg" style={{ background: theme.bgTertiary }}>
                  <span className="text-sm" style={{ color: theme.textSecondary }}>{item.label}</span>
                  <span className="text-sm font-medium" style={{ color: theme.text }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full" style={{ color: theme.text }}>
      {/* Sidebar */}
      <div
        className="w-56 shrink-0 flex flex-col py-3 border-r overflow-y-auto"
        style={{ background: theme.bgSecondary, borderColor: theme.border }}
      >
        <div className="flex items-center gap-2.5 px-4 pb-4 mb-2 border-b" style={{ borderColor: theme.border }}>
          <Sliders size={20} style={{ color: theme.accent }} />
          <span className="font-semibold text-sm" style={{ color: theme.text }}>Settings</span>
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors mx-2 rounded-lg"
            style={{
              color: activeSection === s.id ? theme.accent : theme.textSecondary,
              background: activeSection === s.id ? `${theme.accent}12` : 'transparent',
            }}
          >
            {s.icon}
            {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
};
