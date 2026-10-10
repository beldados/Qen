'use client';

import { AnimatePresence, motion } from 'framer-motion';

export function SandDigit({ value }: { value: string | number }) {
  return (
    <span className="relative inline-flex overflow-hidden h-[1.2em] w-[1ch] justify-center items-center align-middle">
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          initial={{ y: '-100%', opacity: 0, filter: 'blur(2px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '100%', opacity: 0, filter: 'blur(2px)' }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
          className="absolute flex items-center justify-center font-jetbrains tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function SandValue({ value }: { value: string }) {
  return (
    <span className="inline-flex">
      {value.split('').map((char, i) => (
        <SandDigit key={i} value={char} />
      ))}
    </span>
  );
}
