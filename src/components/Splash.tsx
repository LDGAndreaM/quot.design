import { useEffect, useState } from 'react';
import { LogoIcon, Wordmark } from './Logo';

const SESSION_KEY = 'quotdesign:splash-shown';

export function Splash() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SESSION_KEY));

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem(SESSION_KEY, '1');
    const timer = setTimeout(() => setVisible(false), 2150);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="no-print qd-splash-out absolute inset-0 z-60 bg-bg flex flex-col items-center justify-center gap-4">
      <div className="qd-splash-logo flex items-center gap-3">
        <LogoIcon size={56} />
        <Wordmark size={30} />
      </div>
      <div className="qd-splash-text text-xs tracking-[0.3px] text-ink/45 font-medium">
        Made by Black and White Studio
      </div>
    </div>
  );
}
