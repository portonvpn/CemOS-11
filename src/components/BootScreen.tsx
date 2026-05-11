import React, { useEffect } from 'react';
import { CemLogo } from './CemLogo';
import { useStore } from '../store/useStore';

export const BootScreen: React.FC = () => {
  const setPhase = useStore((s) => s.setPhase);

  useEffect(() => {
    const t = setTimeout(() => setPhase('lock'), 3000);
    return () => clearTimeout(t);
  }, [setPhase]);

  return (
    <div className="fixed inset-0 bg-[#080c18] flex flex-col items-center justify-center z-[9999]">
      <div className="animate-boot-pulse">
        <CemLogo size={80} color="#3b82f6" />
      </div>
      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-500"
            style={{
              animation: `bootPulse 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
      <p className="mt-6 text-white/40 text-sm tracking-widest">CemOS 11</p>
    </div>
  );
};
