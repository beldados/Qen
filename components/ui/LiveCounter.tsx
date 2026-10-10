'use client';

import { useEffect, useState } from 'react';
import { calculateDaysLived, calculateWeekdayOccurrences } from '@/lib/calendar/calculations';
import { SandValue } from './SandDigit';

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function formatNumber(num: number) {
  return new Intl.NumberFormat().format(num);
}

function pad(num: number) {
  return num.toString().padStart(2, '0');
}

export function LiveCounter({ birthDate }: { birthDate: Date }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const daysLived = calculateDaysLived(birthDate, now);
  const weekdayOccurrences = calculateWeekdayOccurrences(birthDate, now);
  const currentWeekday = WEEKDAYS[now.getDay()];

  // Calculate elapsed time of the current day lived since midnight UTC
  const msSinceMidnightUTC = now.getTime() - new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).getTime();
  const hours = Math.floor(msSinceMidnightUTC / 3600000);
  const minutes = Math.floor((msSinceMidnightUTC % 3600000) / 60000);
  const seconds = Math.floor((msSinceMidnightUTC % 60000) / 1000);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Giant Serif Italic */}
      <div className="font-cormorant italic text-8xl md:text-9xl text-qen-bone tracking-tight">
        {formatNumber(daysLived)}
      </div>
      
      {/* Sub-label */}
      <div className="font-jetbrains text-xs tracking-widest text-qen-muted/70 uppercase mt-2">
        days on earth
      </div>

      {/* Live Precision Timer - Animated Sand Roll */}
      <div className="mt-6 font-jetbrains tabular-nums text-sm text-qen-muted tracking-widest uppercase flex items-center gap-1">
        <span>[ + </span>
        <SandValue value={pad(hours)} />
        <span>h </span>
        <SandValue value={pad(minutes)} />
        <span>m </span>
        <SandValue value={pad(seconds)} />
        <span>s ]</span>
      </div>

      {/* Weekday Reflection */}
      <div className="font-cormorant italic text-lg text-qen-bone/80 mt-3">
        {currentWeekday} &middot; Your {formatNumber(weekdayOccurrences)}th {currentWeekday} on Earth
      </div>
    </div>
  );
}
