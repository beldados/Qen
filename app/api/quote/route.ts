import { NextResponse } from 'next/server';

const FALLBACK_QUOTES = [
  { content: "You act like mortals in all that you fear, and like immortals in all that you desire.", author: "Seneca" },
  { content: "It is not that we have a short time to live, but that we waste a lot of it.", author: "Seneca" },
  { content: "You could leave life right now. Let that determine what you do and say and think.", author: "Marcus Aurelius" },
  { content: "The future is an abstract concept. Realize that the present moment is all you ever have.", author: "Alan Watts" },
  { content: "Let everything happen to you: beauty and terror. Just keep going. No feeling is final.", author: "Rainer Maria Rilke" },
  { content: "Life is not a problem to be solved, but a reality to be experienced.", author: "Søren Kierkegaard" },
  { content: "Don't explain your philosophy. Embody it.", author: "Epictetus" }
];

export async function GET() {
  try {
    const res = await fetch('https://api.quotable.io/quotes/random?tags=time|wisdom|philosophy', {
      cache: 'no-store', // Always fetch fresh
      headers: { 'Accept': 'application/json' }
    });
    
    if (!res.ok) {
      throw new Error('Quotable API unavailable or rate limited');
    }
    
    const data = await res.json();
    if (data && data.length > 0) {
      return NextResponse.json({ content: data[0].content, author: data[0].author });
    } else {
      throw new Error('Empty response from Quotable API');
    }
  } catch (error) {
    // Elegant fallback to curated timeless quotes
    const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
    return NextResponse.json(randomQuote);
  }
}
