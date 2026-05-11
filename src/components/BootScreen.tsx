import React, { useEffect, useState } from 'react';
import { CemLogo } from './CemLogo';
import { useStore } from '../store/useStore';

export const BootScreen: React.FC = () => {
  const setPhase = useStore(s => s.setPhase);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setProgress(p => Math.min(p + Math.random() * 18, 100)), 200);
    const timer = setTimeout(() => setPhase('lock'), 2800);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [setPhase]);

  return (
    <div className="fixed inset-0 bg-[#060a14] flex flex-col items-center justify-center z-[9999]">
      <div className="animate-boot-pulse"><CemLogo size={72} color="#3b82f6" /></div>
      <div className="mt-10 w-48 h-[3px] rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }} />
      </div>
      <p className="mt-4 text-white/25 text-[11px] tracking-[.3em] font-light">CemOS 11</p>
    </div>
  );
};
