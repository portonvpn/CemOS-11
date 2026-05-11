import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { themes } from '../../store/themes';
import { ThemeName } from '../../store/types';
import { CemLogo } from '../CemLogo';

const sections = [
  { id:'appearance', label:'Appearance', icon:'🎨' },
  { id:'themes', label:'Themes', icon:'✨' },
  { id:'taskbar', label:'Taskbar', icon:'📊' },
  { id:'display', label:'Display', icon:'🖥️' },
  { id:'fonts', label:'Fonts', icon:'🔤' },
  { id:'about', label:'About', icon:'ℹ️' },
];
const accents = ['#3b82f6','#8b5cf6','#ec4899','#f43f5e','#f59e0b','#10b981','#06b6d4','#6366f1','#f97316','#14b8a6'];
const fonts = ['Inter','system-ui','monospace','serif'];

export const SettingsApp: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const theme = themes[settings.theme];
  const [sec, setSec] = useState('appearance');

  const Toggle: React.FC<{on:boolean;toggle:()=>void}> = ({on,toggle}) => (
    <button onClick={toggle} className="relative w-10 h-5.5 rounded-full transition-colors" style={{background:on?theme.accent:theme.bgTertiary}}>
      <div className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow transition-all" style={{left:on?20:3}}/>
    </button>
  );

  const content = () => {
    switch(sec) {
      case 'appearance': return (<div className="space-y-5">
        <h2 className="text-lg font-semibold" style={{color:theme.text}}>Appearance</h2>
        <div><p className="text-xs font-medium mb-2" style={{color:theme.textSecondary}}>Mode</p>
          <div className="flex gap-2">{([{t:'light' as ThemeName,l:'Light',i:'☀️'},{t:'dark-blue' as ThemeName,l:'Dark',i:'🌙'}]).map(m=>(
            <button key={m.t} onClick={()=>updateSettings({theme:m.t})} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 w-24 transition-all"
              style={{borderColor:settings.theme===m.t?theme.accent:theme.border,background:settings.theme===m.t?`${theme.accent}10`:theme.bgTertiary,color:theme.text}}>
              <span className="text-xl">{m.i}</span><span className="text-xs">{m.l}</span></button>
          ))}</div></div>
        <div><p className="text-xs font-medium mb-2" style={{color:theme.textSecondary}}>Accent Color</p>
          <div className="flex gap-1.5 flex-wrap">{accents.map(c=>(
            <button key={c} onClick={()=>updateSettings({accentColor:c})} className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
              style={{background:c,borderColor:settings.accentColor===c?theme.text:'transparent'}}/>
          ))}</div></div>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium" style={{color:theme.text}}>Transparency</p><p className="text-[11px]" style={{color:theme.textMuted}}>Glass & blur effects</p></div>
          <Toggle on={settings.transparency} toggle={()=>updateSettings({transparency:!settings.transparency})}/>
        </div>
      </div>);
      case 'themes': return (<div className="space-y-5">
        <h2 className="text-lg font-semibold" style={{color:theme.text}}>Themes</h2>
        <div className="grid grid-cols-2 gap-2.5">{Object.values(themes).map(t=>(
          <button key={t.name} onClick={()=>updateSettings({theme:t.name})} className="relative overflow-hidden rounded-xl border-2 h-28 group transition-all"
            style={{borderColor:settings.theme===t.name?theme.accent:theme.border}}>
            <img src={t.wallpaper} alt={t.label} className="absolute inset-0 w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
            <div className="absolute bottom-0 left-0 right-0 p-2.5"><p className="text-white text-xs font-medium text-left">{t.label}</p>
              <div className="flex gap-1 mt-1">{[t.accent,t.text].map((c,i)=><div key={i} className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>)}</div>
            </div>
            {settings.theme===t.name && <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px]" style={{background:theme.accent}}>✓</div>}
          </button>
        ))}</div>
      </div>);
      case 'taskbar': return (<div className="space-y-5">
        <h2 className="text-lg font-semibold" style={{color:theme.text}}>Taskbar</h2>
        <div><p className="text-xs font-medium mb-2" style={{color:theme.textSecondary}}>Alignment</p>
          <div className="flex gap-2">{(['center','left'] as const).map(s=>(
            <button key={s} onClick={()=>updateSettings({taskbarStyle:s})} className="px-4 py-2 rounded-lg border text-sm capitalize transition-all"
              style={{borderColor:settings.taskbarStyle===s?theme.accent:theme.border,background:settings.taskbarStyle===s?`${theme.accent}10`:theme.bgTertiary,color:theme.text}}>{s}</button>
          ))}</div></div>
        <div><p className="text-xs font-medium mb-2" style={{color:theme.textSecondary}}>Icon Size</p>
          <div className="flex gap-2">{(['small','medium','large'] as const).map(s=>(
            <button key={s} onClick={()=>updateSettings({iconSize:s})} className="px-4 py-2 rounded-lg border text-sm capitalize transition-all"
              style={{borderColor:settings.iconSize===s?theme.accent:theme.border,background:settings.iconSize===s?`${theme.accent}10`:theme.bgTertiary,color:theme.text}}>{s}</button>
          ))}</div></div>
      </div>);
      case 'display': return (<div className="space-y-5">
        <h2 className="text-lg font-semibold" style={{color:theme.text}}>Display</h2>
        <div><div className="flex items-center justify-between mb-1"><p className="text-xs font-medium" style={{color:theme.textSecondary}}>UI Scale</p>
          <span className="text-xs font-mono" style={{color:theme.accent}}>{Math.round(settings.uiScale*100)}%</span></div>
          <input type="range" min="0.8" max="1.3" step="0.05" value={settings.uiScale} onChange={e=>updateSettings({uiScale:parseFloat(e.target.value)})}
            className="w-full" style={{accentColor:theme.accent}}/>
          <div className="flex justify-between text-[10px] mt-0.5" style={{color:theme.textMuted}}><span>80%</span><span>130%</span></div>
        </div>
      </div>);
      case 'fonts': return (<div className="space-y-4">
        <h2 className="text-lg font-semibold" style={{color:theme.text}}>Fonts</h2>
        {fonts.map(f=>(
          <button key={f} onClick={()=>updateSettings({font:f})} className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg border transition-all"
            style={{borderColor:settings.font===f?theme.accent:theme.border,background:settings.font===f?`${theme.accent}10`:theme.bgTertiary,fontFamily:f,color:theme.text}}>
            <span className="text-lg">🔤</span>
            <div className="text-left flex-1"><p className="text-sm font-medium">{f}</p><p className="text-[11px]" style={{color:theme.textMuted}}>The quick brown fox</p></div>
            {settings.font===f && <span className="text-[10px] px-2 py-0.5 rounded-full text-white" style={{background:theme.accent}}>Active</span>}
          </button>
        ))}
      </div>);
      case 'about': return (<div className="space-y-5">
        <h2 className="text-lg font-semibold" style={{color:theme.text}}>About CemOS</h2>
        <div className="flex items-center gap-3.5 p-4 rounded-xl" style={{background:theme.bgTertiary}}>
          <CemLogo size={48} color={theme.accent}/><div><h3 className="text-base font-bold" style={{color:theme.text}}>CemOS 11</h3>
          <p className="text-xs" style={{color:theme.textSecondary}}>Version 11.3.0 (Build 24201)</p>
          <p className="text-[10px] mt-0.5" style={{color:theme.textMuted}}>© 2025 CemOS Corporation</p></div>
        </div>
        {[{l:'Processor',v:'CemOS Virtual CPU @ 3.6GHz'},{l:'Memory',v:'16.0 GB RAM'},{l:'System',v:'64-bit OS'},{l:'Device',v:'CEMOS-DESKTOP'},{l:'Edition',v:'CemOS 11 Pro'}].map(x=>(
          <div key={x.l} className="flex justify-between py-2 px-3.5 rounded-lg" style={{background:theme.bgTertiary}}>
            <span className="text-xs" style={{color:theme.textSecondary}}>{x.l}</span>
            <span className="text-xs font-medium" style={{color:theme.text}}>{x.v}</span>
          </div>
        ))}
      </div>);
    }
  };

  return (
    <div className="flex h-full" style={{color:theme.text}}>
      <div className="w-48 shrink-0 flex flex-col py-2.5 border-r overflow-y-auto no-scrollbar" style={{background:theme.bgSecondary,borderColor:theme.border}}>
        <div className="flex items-center gap-2 px-3.5 pb-3 mb-1 border-b" style={{borderColor:theme.border}}>
          <span style={{color:theme.accent}}>⚙️</span><span className="font-semibold text-xs" style={{color:theme.text}}>Settings</span>
        </div>
        {sections.map(s=>(
          <button key={s.id} onClick={()=>setSec(s.id)} className="flex items-center gap-2 px-3.5 py-1.5 mx-1.5 rounded text-[13px] transition-colors"
            style={{color: sec===s.id?theme.accent:theme.textSecondary,background:sec===s.id?`${theme.accent}10`:'transparent'}}>
            <span className="text-sm">{s.icon}</span>{s.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-5">{content()}</div>
    </div>
  );
};
