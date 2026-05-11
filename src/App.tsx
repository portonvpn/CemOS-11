import React from 'react';
import { useStore } from './store/useStore';
import { BootScreen } from './components/BootScreen';
import { LockScreen } from './components/LockScreen';
import { Desktop } from './components/Desktop';
import { ShutdownScreen } from './components/ShutdownScreen';

const App: React.FC = () => {
  const phase = useStore((s) => s.phase);

  return (
    <div className="w-full h-full bg-black overflow-hidden">
      {phase === 'boot' && <BootScreen />}
      {phase === 'lock' && <LockScreen />}
      {(phase === 'desktop' || phase === 'login') && <Desktop />}
      {(phase === 'shutdown' || phase === 'restart') && <ShutdownScreen />}
    </div>
  );
};

export default App;
