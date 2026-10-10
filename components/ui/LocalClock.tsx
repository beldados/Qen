'use client';

import { useEffect, useState } from 'react';

export function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    };
    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="absolute top-8 right-8 z-50 font-jetbrains tabular-nums text-xs text-qen-muted/50 uppercase tracking-widest pointer-events-none">
      Local Time: {time}
    </div>
  );
}
