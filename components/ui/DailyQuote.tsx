'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function DailyQuote() {
  const [quote, setQuote] = useState<{ content: string; author: string } | null>(null);

  useEffect(() => {
    fetch('/api/quote')
      .then((res) => res.json())
      .then((data) => setQuote(data))
      .catch(() => {
        // Ultimate client-side fallback just in case network entirely fails
        setQuote({
          content: "You act like mortals in all that you fear, and like immortals in all that you desire.",
          author: "Seneca"
        });
      });
  }, []);

  return (
    <div className="flex justify-center pointer-events-none px-6 text-center z-10 w-full pb-8 h-24">
      {quote ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-cormorant italic text-sm text-[#7E828C]/80 max-w-md mx-auto"
        >
          "{quote.content}"
          <br />
          <span className="text-[10px] not-italic font-jetbrains uppercase tracking-widest text-[#7E828C]/50 mt-2 inline-block">
            — {quote.author}
          </span>
        </motion.p>
      ) : null}
    </div>
  );
}
