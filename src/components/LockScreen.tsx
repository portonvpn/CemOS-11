import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';

export const LockScreen: React.FC = () => {
  const { setPhase, settings, isMobile } = useStore();
  const theme = themes[settings.theme];
  const [time, setTime] = useState(new Date());
  const [unlocking, setUnlocking] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const unlock = () => {
    if (unlocking) return;
    setUnlocking(true);
    setTimeout(() => setPhase('desktop'), 600);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const handleMove = (ev: MouseEvent | TouchEvent) => {
      const currentY = 'touches' in ev ? (ev as TouchEvent).touches[0].clientY : (ev as MouseEvent).clientY;
      const diff = startY - currentY;
      if (diff > 0) setDragY(Math.min(diff, 150));
    };

    const handleEnd = () => {
      setDragging(false);
      if (dragY > 100) unlock();
      else setDragY(0);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col cursor-pointer overflow-hidden"
      onClick={unlock}
      style={{ transform: unlocking ? 'translateY(-100%)' : `translateY(-${dragY}px)`, transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      {/* Wallpaper */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${unlocking ? 'scale-110' : 'scale-100'}`}
        style={{ backgroundImage: `url(${theme.wallpaper})` }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)' }} />

      {/* Zoro Watermark */}
      <div className="absolute top-4 right-4 opacity-20">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="white">
          <text x="50" y="60" textAnchor="middle" fontSize="24" fontWeight="bold" fontFamily="system-ui">ZORO</text>
          <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Time & Date - Windows 11 Style */}
      <div className={`relative z-10 flex flex-col ${isMobile ? 'items-center pt-24' : 'items-start pl-12 pt-16'}`}>
        <p className={`text-white font-light tracking-tight ${isMobile ? 'text-7xl' : 'text-[108px]'}`}
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)', fontWeight: 300 }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </p>
        <p className={`text-white/90 font-normal mt-1 ${isMobile ? 'text-lg' : 'text-2xl'}`}
          style={{ textShadow: '0 2px 15px rgba(0,0,0,0.3)' }}>
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User Profile & Unlock - Windows 11 Style */}
      <div className="relative z-10 flex flex-col items-center pb-16">
        {/* Profile Picture */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-2xl border-4 border-white/20">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="white">
            <circle cx="24" cy="16" r="10" />
            <path d="M8 44C8 32 16 26 24 26C32 26 40 32 40 44" />
          </svg>
        </div>
        <p className="text-white text-xl font-medium mt-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>User</p>

        {/* Swipe indicator */}
        <div
          className="mt-8 flex flex-col items-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onClick={e => e.stopPropagation()}
        >
          <div className="animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </div>
          <p className="text-white/50 text-xs mt-2 font-light tracking-wide">
            {isMobile ? 'Swipe up to unlock' : 'Click or swipe up'}
          </p>
        </div>
      </div>

      {/* Bottom status bar - Windows 11 style */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3">
          {/* Network */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="white" opacity="0.6">
            <path d="M1 14l4-4 4 4 4-8 4 8" stroke="white" strokeWidth="1.5" fill="none" />
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-1">
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <rect x="1" y="1" width="16" height="10" rx="2" stroke="white" strokeWidth="1.5" opacity="0.6" />
              <rect x="3" y="3" width="10" height="6" rx="1" fill="white" opacity="0.6" />
              <rect x="17" y="4" width="2" height="4" rx="0.5" fill="white" opacity="0.6" />
            </svg>
            <span className="text-white/60 text-xs">92%</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M8 4v5l3 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          <span className="text-xs">Accessibility</span>
        </div>
      </div>
    </div>
  );
};
