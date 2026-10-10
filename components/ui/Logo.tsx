import React from 'react';

export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative flex h-12 w-12 items-center justify-center mx-auto">
        {/* Unclosed Orbit SVG */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full -rotate-45"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            strokeDasharray="200 40"
            strokeDashoffset="10"
            className="text-qen-muted opacity-40"
          />
          <line x1="50" y1="20" x2="50" y2="80" className="text-qen-bone opacity-30" />
        </svg>

        {/* Glowing Amber Dot */}
        <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-qen-amber shadow-[0_0_10px_2px_rgba(200,138,88,0.6)]" />
      </div>

      <h1 className="font-cormorant italic text-2xl tracking-wider text-qen-bone mt-2">
        Qen.
      </h1>
      <span className="font-jetbrains text-xs tracking-widest text-qen-amber/80 uppercase mt-1">
        ቀን
      </span>
    </div>
  );
}
