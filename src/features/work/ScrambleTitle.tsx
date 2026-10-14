import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const GLYPHS = '#%?!<>{}/*+_';
export function ScrambleTitle({ name }: { name: string }) {
  const wrapper = useRef<HTMLSpanElement>(null);
  const [scramble, setScramble] = useState<string | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { setScramble(null); return; }
    const element = wrapper.current;
    if (!element) return;
    let frame = 0, last = 0, time = 0, paint = 0, visible = false, done = false;
    const seed = Math.random() * 100;
    const tick = (now: number) => {
      if (last) time += Math.min(now - last, 50) / 1000; last = now;
      if (time >= .7) { done = true; setScramble(null); return; }
      if (now - paint > 50) {
        paint = now;
        setScramble(Array.from(name).map((letter, index) => {
          if (letter === ' ' || time > .15 + index / name.length * .5) return letter;
          return GLYPHS[Math.floor(Math.abs(Math.sin(seed + index * 17 + Math.floor(time * 18))) * GLYPHS.length) % GLYPHS.length];
        }).join(''));
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => { cancelAnimationFrame(frame); last = 0; if (visible && !document.hidden && !done) frame = requestAnimationFrame(tick); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    observer.observe(element); document.addEventListener('visibilitychange', sync);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, [name, reduced]);
  return <span className="scramble-title" ref={wrapper}>
    <span className={scramble ? 'scramble-original is-scrambling' : 'scramble-original'}>{name}</span>
    {scramble && <span className="scramble-overlay" aria-hidden="true">{scramble}</span>}
  </span>;
}
