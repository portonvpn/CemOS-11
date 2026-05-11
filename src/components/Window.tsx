import React, { useRef, useCallback, useState } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';
import { WindowState } from '../store/types';

interface Props {
  win: WindowState;
  children: React.ReactNode;
}

export const Window: React.FC<Props> = ({ win, children }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, updateWindow, activeWindowId, settings } = useStore();
  const theme = themes[settings.theme];
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; origW: number; origH: number; origX: number; origY: number; dir: string } | null>(null);
  const [closing, setClosing] = useState(false);

  const isActive = activeWindowId === win.id;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    focusWindow(win.id);
  }, [focusWindow, win.id]);

  const handleTitleMouseDown = useCallback((e: React.MouseEvent) => {
    if (win.isMaximized) return;
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: win.x, origY: win.y };

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      updateWindow(win.id, {
        x: dragRef.current.origX + dx,
        y: Math.max(0, dragRef.current.origY + dy),
      });
    };
    const onUp = () => {
      dragRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [win.isMaximized, win.x, win.y, win.id, updateWindow]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, dir: string) => {
    if (win.isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = {
      startX: e.clientX, startY: e.clientY,
      origW: win.width, origH: win.height,
      origX: win.x, origY: win.y, dir,
    };

    const onMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      const r = resizeRef.current;
      const dx = ev.clientX - r.startX;
      const dy = ev.clientY - r.startY;
      const updates: Partial<WindowState> = {};

      if (r.dir.includes('e')) updates.width = Math.max(win.minWidth, r.origW + dx);
      if (r.dir.includes('s')) updates.height = Math.max(win.minHeight, r.origH + dy);
      if (r.dir.includes('w')) {
        const newW = Math.max(win.minWidth, r.origW - dx);
        updates.width = newW;
        updates.x = r.origX + (r.origW - newW);
      }
      if (r.dir.includes('n')) {
        const newH = Math.max(win.minHeight, r.origH - dy);
        updates.height = newH;
        updates.y = Math.max(0, r.origY + (r.origH - newH));
      }
      updateWindow(win.id, updates);
    };
    const onUp = () => {
      resizeRef.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [win, updateWindow]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => closeWindow(win.id), 200);
  };

  const handleMaxToggle = () => {
    if (win.isMaximized) restoreWindow(win.id);
    else maximizeWindow(win.id);
  };

  if (win.isMinimized) return null;

  const style: React.CSSProperties = win.isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 52px)', zIndex: win.zIndex }
    : { top: win.y, left: win.x, width: win.width, height: win.height, zIndex: win.zIndex };

  const resizeEdges = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
  const edgeStyles: Record<string, React.CSSProperties> = {
    n: { top: -3, left: 8, right: 8, height: 6, cursor: 'n-resize' },
    s: { bottom: -3, left: 8, right: 8, height: 6, cursor: 's-resize' },
    e: { right: -3, top: 8, bottom: 8, width: 6, cursor: 'e-resize' },
    w: { left: -3, top: 8, bottom: 8, width: 6, cursor: 'w-resize' },
    ne: { top: -3, right: -3, width: 12, height: 12, cursor: 'ne-resize' },
    nw: { top: -3, left: -3, width: 12, height: 12, cursor: 'nw-resize' },
    se: { bottom: -3, right: -3, width: 12, height: 12, cursor: 'se-resize' },
    sw: { bottom: -3, left: -3, width: 12, height: 12, cursor: 'sw-resize' },
  };

  return (
    <div
      className={`fixed flex flex-col ${closing ? 'opacity-0 scale-95' : 'animate-window-open'} transition-[opacity,transform] duration-200`}
      style={{
        ...style,
        borderRadius: win.isMaximized ? 0 : 10,
        overflow: 'hidden',
        background: theme.bg,
        border: `1px solid ${isActive ? theme.glassBorder : 'rgba(128,128,128,0.08)'}`,
        boxShadow: isActive
          ? '0 8px 40px rgba(0,0,0,0.45), 0 2px 12px rgba(0,0,0,0.25)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Title bar */}
      <div
        className="flex items-center h-10 px-3 shrink-0 select-none"
        style={{ background: theme.bgSecondary, borderBottom: `1px solid ${theme.border}` }}
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={handleMaxToggle}
      >
        <span className="text-xs font-medium truncate flex-1" style={{ color: theme.textSecondary }}>
          {win.title}
        </span>
        <div className="flex items-center gap-0.5 ml-2">
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
            className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
            style={{ color: theme.textMuted }}
          >
            <svg width="10" height="1" viewBox="0 0 10 1"><rect width="10" height="1" fill="currentColor" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleMaxToggle(); }}
            className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
            style={{ color: theme.textMuted }}
          >
            {win.isMaximized ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="2" y="0" width="8" height="8" rx="1" />
                <rect x="0" y="2" width="8" height="8" rx="1" fill={theme.bgSecondary} />
                <rect x="0" y="2" width="8" height="8" rx="1" />
              </svg>
            ) : (
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.2">
                <rect x="0.5" y="0.5" width="8" height="8" rx="1" />
              </svg>
            )}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            style={{ color: theme.textMuted }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" stroke="currentColor" strokeWidth="1.3">
              <line x1="1" y1="1" x2="9" y2="9" />
              <line x1="9" y1="1" x2="1" y2="9" />
            </svg>
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden glass">
        {children}
      </div>
      {/* Resize handles */}
      {!win.isMaximized && resizeEdges.map((dir) => (
        <div
          key={dir}
          className="absolute"
          style={{ ...edgeStyles[dir], zIndex: 2 }}
          onMouseDown={(e) => handleResizeMouseDown(e, dir)}
        />
      ))}
    </div>
  );
};
