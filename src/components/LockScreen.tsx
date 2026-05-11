import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';

export const LockScreen: React.FC = () => {
  const { setPhase, settings, isMobile } = useStore();
  const theme = themes[settings.theme];
  const [time, setTime] = useState(new Date());
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const unlock = () => {
    if (unlocking) return;
    setUnlocking(true);
    setTimeout(() => setPhase('desktop'), 700);
  };

  return (
    <div className="fixed inset-0 z-[9998] flex flex-col items-center justify-center" onClick={unlock} onTouchEnd={unlock}>
      {/* Wallpaper with zoom animation on unlock */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${unlocking ? 'animate-lock-zoom' : 'scale-100'}`}
        style={{ backgroundImage: `url(${theme.wallpaper})` }}
      />
      <div className={`absolute inset-0 ${unlocking ? 'opacity-0 transition-opacity duration-500' : ''}`} style={{ background: 'rgba(0,0,0,0.35)' }} />

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center ${unlocking ? 'animate-lock-clock' : 'animate-fade-in'}`}>
        <p className={`text-white font-extralight tracking-tight ${isMobile ? 'text-6xl' : 'text-[96px]'}`}
           style={{ textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </p>
        <p className={`text-white/75 font-light mt-1 ${isMobile ? 'text-base' : 'text-xl'}`}
           style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-14 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/15 glass flex items-center justify-center text-3xl border border-white/15 shadow-xl">👤</div>
          <p className="text-white text-base mt-3 font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>User</p>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center animate-boot-pulse">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <path d="M8 3v10M4 7l4-4 4 4" />
            </svg>
          </div>
          <p className="text-white/35 text-xs mt-3 font-light tracking-wide">
            {isMobile ? 'Tap to unlock' : 'Click anywhere to unlock'}
          </p>
        </div>
      </div>
    </div>
  );
};
