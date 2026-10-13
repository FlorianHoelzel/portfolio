import { useEffect, useRef, useState } from 'react';
import { createAsciiName, NAME_ENTRANCE_DURATION } from './nameScramble';

interface HeroEntranceProps { reducedMotion: boolean }

export function HeroEntrance({ reducedMotion }: HeroEntranceProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [finished, setFinished] = useState(reducedMotion);

  useEffect(() => {
    if (finished) return;
    const element = canvas.current;
    const hero = element?.parentElement;
    const heading = hero?.querySelector<HTMLElement>('#hero-heading');
    const context = element?.getContext('2d');
    if (!element || !hero || !heading || !context) return;
    let frame = 0;
    let last = 0;
    let elapsed = 0;
    let visible = true;
    let done = false;
    let render: ((time: number) => void) | undefined;
    const complete = () => {
      done = true;
      cancelAnimationFrame(frame);
      heading.style.removeProperty('opacity');
      setFinished(true);
    };
    if (reducedMotion) { complete(); return; }
    const tick = (now: number) => {
      if (last) elapsed += Math.min(now - last, 50) / 1000;
      last = now;
      render?.(elapsed);
      if (elapsed >= NAME_ENTRANCE_DURATION) { complete(); return; }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (!done && visible && !document.hidden && render) frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(() => {
      const bounds = hero.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(bounds.width * ratio);
      element.height = Math.round(bounds.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      render = createAsciiName(context, heading, hero);
      render(elapsed);
      sync();
    });
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    resize.observe(hero);
    observer.observe(hero);
    document.addEventListener('visibilitychange', sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      heading.style.removeProperty('opacity');
    };
  }, [finished, reducedMotion]);

  return finished ? null : <canvas className="hero-entrance" ref={canvas} aria-hidden="true" />;
}

