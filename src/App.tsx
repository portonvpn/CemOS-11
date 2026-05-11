import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { BootScreen } from './components/BootScreen';
import { LockScreen } from './components/LockScreen';
import { Desktop } from './components/Desktop';
import { MobileOS } from './components/MobileOS';
import { ShutdownScreen } from './components/ShutdownScreen';

const App: React.FC = () => {
  const { phase, isMobile, setMobile } = useStore();

  // Check for mobile on mount and resize
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setMobile(mobile);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [setMobile]);

  return (
    <div className="w-full h-full bg-black overflow-hidden">
      {phase === 'boot' && <BootScreen />}
      {phase === 'lock' && <LockScreen />}
      {(phase === 'desktop' || phase === 'login') && (
        isMobile ? <MobileOS /> : <Desktop />
      )}
      {(phase === 'shutdown' || phase === 'restart') && <ShutdownScreen />}
    </div>
  );
};

export default App;
