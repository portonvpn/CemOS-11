import React, { useRef, useCallback, useState } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { WindowState } from '../store/types';

interface Props { win: WindowState; children: React.ReactNode; }

export const Window: React.FC<Props> = ({ win, children }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, updateWindow, activeWindowId, settings } = useStore();
  const theme = themes[settings.theme];
  const dragRef = useRef<{sx:number;sy:number;ox:number;oy:number}|null>(null);
  const resRef = useRef<{sx:number;sy:number;ow:number;oh:number;ox:number;oy:number;dir:string}|null>(null);
  const [closing, setClosing] = useState(false);
  const isActive = activeWindowId === win.id;

  const handleMouseDown = useCallback((e: React.MouseEvent) => { e.stopPropagation(); focusWindow(win.id); }, [focusWindow, win.id]);

  const handleTitleDown = useCallback((e: React.MouseEvent) => {
    if (win.isMaximized) return;
    e.preventDefault();
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y };
    const onMove = (ev: MouseEvent) => { if (!dragRef.current) return; updateWindow(win.id, { x: dragRef.current.ox + ev.clientX - dragRef.current.sx, y: Math.max(0, dragRef.current.oy + ev.clientY - dragRef.current.sy) }); };
    const onUp = () => { dragRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
  }, [win.isMaximized, win.x, win.y, win.id, updateWindow]);

  const handleResize = useCallback((e: React.MouseEvent, dir: string) => {
    if (win.isMaximized) return;
    e.preventDefault(); e.stopPropagation();
    resRef.current = { sx: e.clientX, sy: e.clientY, ow: win.width, oh: win.height, ox: win.x, oy: win.y, dir };
    const onMove = (ev: MouseEvent) => {
      if (!resRef.current) return;
      const r = resRef.current, dx = ev.clientX - r.sx, dy = ev.clientY - r.sy;
      const u: Partial<WindowState> = {};
      if (r.dir.includes('e')) u.width = Math.max(win.minWidth, r.ow + dx);
      if (r.dir.includes('s')) u.height = Math.max(win.minHeight, r.oh + dy);
      if (r.dir.includes('w')) { const nw = Math.max(win.minWidth, r.ow - dx); u.width = nw; u.x = r.ox + r.ow - nw; }
      if (r.dir.includes('n')) { const nh = Math.max(win.minHeight, r.oh - dy); u.height = nh; u.y = Math.max(0, r.oy + r.oh - nh); }
      updateWindow(win.id, u);
    };
    const onUp = () => { resRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
  }, [win, updateWindow]);

  const handleClose = () => { setClosing(true); setTimeout(() => closeWindow(win.id), 180); };
  const toggleMax = () => { if (win.isMaximized) restoreWindow(win.id); else maximizeWindow(win.id); };

  if (win.isMinimized) return null;

  const style: React.CSSProperties = win.isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)', zIndex: win.zIndex }
    : { top: win.y, left: win.x, width: win.width, height: win.height, zIndex: win.zIndex };

  const edges = ['n','s','e','w','ne','nw','se','sw'];
  const eS: Record<string,React.CSSProperties> = {
    n:{top:-3,left:8,right:8,height:6,cursor:'n-resize'}, s:{bottom:-3,left:8,right:8,height:6,cursor:'s-resize'},
    e:{right:-3,top:8,bottom:8,width:6,cursor:'e-resize'}, w:{left:-3,top:8,bottom:8,width:6,cursor:'w-resize'},
    ne:{top:-3,right:-3,width:14,height:14,cursor:'ne-resize'}, nw:{top:-3,left:-3,width:14,height:14,cursor:'nw-resize'},
    se:{bottom:-3,right:-3,width:14,height:14,cursor:'se-resize'}, sw:{bottom:-3,left:-3,width:14,height:14,cursor:'sw-resize'},
  };

  return (
    <div
      className={`fixed flex flex-col ${closing ? 'opacity-0 scale-95' : 'animate-window-open'} transition-[opacity,transform] duration-180`}
      style={{ ...style, borderRadius: win.isMaximized ? 0 : 10, overflow: 'hidden', background: theme.bg,
        border: `1px solid ${isActive ? theme.glassBorder : 'rgba(128,128,128,0.06)'}`,
        boxShadow: isActive ? '0 8px 48px rgba(0,0,0,0.5), 0 1px 8px rgba(0,0,0,0.2)' : '0 4px 24px rgba(0,0,0,0.3)' }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center h-9 px-3 shrink-0 select-none" style={{ background: theme.bgSecondary, borderBottom: `1px solid ${theme.border}` }}
        onMouseDown={handleTitleDown} onDoubleClick={toggleMax}>
        <span className="text-[11px] font-medium truncate flex-1" style={{ color: theme.textSecondary }}>{win.title}</span>
        <div className="flex items-center gap-px ml-2">
          <button onClick={e=>{e.stopPropagation();minimizeWindow(win.id)}} className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 transition-colors" style={{color:theme.textMuted}}>
            <svg width="10" height="1"><rect width="10" height="1" fill="currentColor"/></svg>
          </button>
          <button onClick={e=>{e.stopPropagation();toggleMax()}} className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 transition-colors" style={{color:theme.textMuted}}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x=".5" y=".5" width="8" height="8" rx="1"/></svg>
          </button>
          <button onClick={e=>{e.stopPropagation();handleClose()}} className="w-7 h-7 rounded flex items-center justify-center hover:bg-red-500/90 hover:text-white transition-colors" style={{color:theme.textMuted}}>
            <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.3"><line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/></svg>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden glass">{children}</div>
      {!win.isMaximized && edges.map(d => <div key={d} className="absolute" style={{...eS[d],zIndex:2}} onMouseDown={e=>handleResize(e,d)}/>)}
    </div>
  );
};
