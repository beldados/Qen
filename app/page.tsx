'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Logo } from '@/components/ui/Logo';
import { LiveCounter } from '@/components/ui/LiveCounter';
import { BirthDateModal } from '@/components/ui/BirthDateModal';

const VoidScene = dynamic(() => import('@/components/canvas/VoidScene'), {
  ssr: false,
});

export default function Home() {
  const [dob, setDob] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('qen_dob');
    if (stored) {
      setDob(new Date(stored));
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleSaveDob = (date: Date) => {
    localStorage.setItem('qen_dob', date.toISOString());
    setDob(date);
    setIsModalOpen(false);
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <main className="min-h-screen w-full flex flex-col justify-between items-center px-6 py-12 select-none relative overflow-hidden">
      
      {/* 3D Void Canvas Layer */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <VoidScene />
      </div>
      
      {/* Top Section: Centered Logo ONLY */}
      <div className="z-10 w-full flex flex-col items-center">
        <Logo />
      </div>

      {/* Center Section: Hero Day Counter & Ticker */}
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 pointer-events-none">
        {dob ? (
          <div className="pointer-events-auto">
            <LiveCounter birthDate={dob} />
          </div>
        ) : (
          <div className="font-cormorant italic text-2xl text-qen-muted text-center">
            Awaiting presence...
          </div>
        )}
      </div>

      {/* Bottom Section: Curated Quote & Clean Date Trigger */}
      <div className="z-10 w-full flex flex-col items-center gap-6">
        <div className="text-sm text-qen-muted/70 max-w-md mx-auto italic font-cormorant text-center pointer-events-none">
          "You act like mortals in all that you fear, and like immortals in all that you desire."
          <br />
          <span className="text-xs not-italic font-jetbrains uppercase tracking-widest opacity-50 mt-2 inline-block">— Seneca</span>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border border-white/10 px-4 py-1.5 rounded-full text-xs font-jetbrains uppercase tracking-widest text-qen-muted hover:text-qen-bone hover:border-white/30 transition-all cursor-pointer pointer-events-auto"
        >
          Change Beginning / ቀን ቀይር
        </button>
      </div>
      
      {/* Modal Dialog */}
      <div className="pointer-events-auto z-50">
        <BirthDateModal isOpen={isModalOpen} onSave={handleSaveDob} />
      </div>
    </main>
  );
}
