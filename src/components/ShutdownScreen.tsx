import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CemLogo } from './CemLogo';

export const ShutdownScreen: React.FC = () => {
  const { phase, setPhase } = useStore();
  const isRestart = phase === 'restart';

  useEffect(() => {
    if (isRestart) {
      const t = setTimeout(() => setPhase('boot'), 3000);
      return () => clearTimeout(t);
    }
  }, [isRestart, setPhase]);

  return (
    <div className="fixed inset-0 bg-[#060810] flex flex-col items-center justify-center z-[9999] animate-fade-in">
      <div className="animate-boot-pulse">
        <CemLogo size={60} color="#3b82f6" />
      </div>
      <p className="mt-6 text-white/40 text-sm">
        {isRestart ? 'Restarting...' : 'Shutting down...'}
      </p>
      {isRestart && (
        <div className="mt-4 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-500"
              style={{ animation: `bootPulse 1s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
