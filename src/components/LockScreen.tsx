import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../store/themes';

export const LockScreen: React.FC = () => {
  const setPhase = useStore((s) => s.setPhase);
  const settings = useStore((s) => s.settings);
  const theme = themes[settings.theme];
  const [time, setTime] = useState(new Date());
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleUnlock = () => {
    setUnlocking(true);
    setTimeout(() => setPhase('desktop'), 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[9998] flex flex-col items-center justify-center cursor-pointer ${
        unlocking ? 'animate-lock-slide' : 'animate-fade-in'
      }`}
      style={{
        backgroundImage: `url(${theme.wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleUnlock}
    >
      <div className="absolute inset-0 bg-black/30 glass-light" />
      <div className="relative z-10 flex flex-col items-center">
        <p className="text-white text-8xl font-light tracking-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </p>
        <p className="text-white/80 text-xl mt-2 font-light" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <div className="mt-16 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/20 glass flex items-center justify-center text-3xl border border-white/20">
            👤
          </div>
          <p className="text-white text-lg mt-3 font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>User</p>
          <p className="text-white/50 text-sm mt-6 animate-boot-pulse">Click anywhere to unlock</p>
        </div>
      </div>
    </div>
  );
};
