'use client';

import { useState } from 'react';
import { ethiopianToGregorian, MONTHS_ENGLISH, MONTHS_AMHARIC } from '@/lib/calendar/ethiopian';

interface Props {
  onSave: (date: Date) => void;
  isOpen: boolean;
}

export function BirthDateModal({ onSave, isOpen }: Props) {
  const [calendar, setCalendar] = useState<'gregorian' | 'ethiopian'>('gregorian');
  
  // Gregorian state
  const [gDate, setGDate] = useState('');
  
  // Ethiopian state
  const [eYear, setEYear] = useState('1990');
  const [eMonth, setEMonth] = useState('1');
  const [eDay, setEDay] = useState('1');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalDate: Date;
    
    if (calendar === 'gregorian') {
      finalDate = new Date(gDate);
    } else {
      finalDate = ethiopianToGregorian(Number(eYear), Number(eMonth), Number(eDay));
    }
    
    if (isNaN(finalDate.getTime())) return;
    onSave(finalDate);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-qen-void/80 backdrop-blur-md p-4">
      <div className="bg-qen-surface border border-qen-muted/20 p-8 w-full max-w-md relative shadow-2xl">
        <h2 className="font-cormorant text-3xl italic text-qen-bone mb-6 text-center">Your Beginning</h2>
        
        {/* Toggle */}
        <div className="flex border border-qen-muted/30 mb-8 rounded-sm overflow-hidden p-1 bg-qen-void/50">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-jetbrains tracking-widest uppercase transition-colors ${calendar === 'gregorian' ? 'bg-qen-muted/20 text-qen-bone' : 'text-qen-muted hover:text-qen-bone'}`}
            onClick={() => setCalendar('gregorian')}
          >
            Gregorian
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-jetbrains tracking-widest uppercase transition-colors ${calendar === 'ethiopian' ? 'bg-qen-amber/20 text-qen-amber' : 'text-qen-muted hover:text-qen-bone'}`}
            onClick={() => setCalendar('ethiopian')}
          >
            Ethiopian
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {calendar === 'gregorian' ? (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-jetbrains text-qen-muted uppercase tracking-widest">Date of Birth</label>
              <input
                type="date"
                required
                value={gDate}
                onChange={(e) => setGDate(e.target.value)}
                className="bg-qen-void border border-qen-muted/30 text-qen-bone p-3 font-jetbrains outline-none focus:border-qen-amber/50 transition-colors"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-xs font-jetbrains text-qen-muted uppercase tracking-widest">Year</label>
                  <input
                    type="number"
                    required
                    min="1900"
                    max="2100"
                    value={eYear}
                    onChange={(e) => setEYear(e.target.value)}
                    className="bg-qen-void border border-qen-muted/30 text-qen-bone p-3 font-jetbrains outline-none focus:border-qen-amber/50 transition-colors w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 w-24">
                  <label className="text-xs font-jetbrains text-qen-muted uppercase tracking-widest">Day</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="30"
                    value={eDay}
                    onChange={(e) => setEDay(e.target.value)}
                    className="bg-qen-void border border-qen-muted/30 text-qen-bone p-3 font-jetbrains outline-none focus:border-qen-amber/50 transition-colors w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-jetbrains text-qen-muted uppercase tracking-widest">Month</label>
                <select
                  value={eMonth}
                  onChange={(e) => setEMonth(e.target.value)}
                  className="bg-qen-void border border-qen-muted/30 text-qen-bone p-3 font-jetbrains outline-none focus:border-qen-amber/50 transition-colors appearance-none"
                >
                  {MONTHS_ENGLISH.map((en, i) => (
                    <option key={i} value={i + 1}>
                      {MONTHS_AMHARIC[i]} ({en})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 bg-qen-bone text-qen-void font-jetbrains uppercase tracking-[0.2em] py-4 text-sm hover:bg-qen-amber transition-colors"
          >
            Confirm Presence
          </button>
        </form>
      </div>
    </div>
  );
}
