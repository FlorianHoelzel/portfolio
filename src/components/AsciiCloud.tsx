import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { drawAsciiCloud } from '../lib/asciiCloud';

const STORAGE_KEY = 'portfolio-cloud-paused';

export function AsciiCloud() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const animationTime = useRef(0);
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const element = canvas.current;
    const wrapper = container.current;
    const context = element?.getContext('2d');
    if (!element || !wrapper || !context) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let lastFrame = 0;
    let lastTick = 0;
    const stopped = paused || reducedMotion;

    const paint = () => drawAsciiCloud(context, width, height, animationTime.current, width < 500);
    const tick = (now: number) => {
      if (lastTick) animationTime.current += Math.min(now - lastTick, 100) / 1000;
      lastTick = now;
      if (now - lastFrame >= 1000 / 20) {
        paint();
        lastFrame = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      lastTick = 0;
      paint();
      if (!stopped && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(entries => {
      width = entries[0].contentRect.width;
      height = entries[0].contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      sync();
    });
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    resize.observe(wrapper);
    observer.observe(wrapper);
    document.addEventListener('visibilitychange', sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [paused, reducedMotion]);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* Motion controls also work without browser storage. */ }
  };

  return <div className="ascii-cloud" ref={container}>
    <canvas ref={canvas} aria-hidden="true" className="ascii-cloud-canvas" />
    {!reducedMotion && <button className="cloud-motion-toggle" onClick={toggle} aria-pressed={paused} aria-label={paused ? 'Play cloud animation' : 'Pause cloud animation'}>{paused ? <Play size={12} /> : <Pause size={12} />}{paused ? 'Play cloud' : 'Pause cloud'}</button>}
  </div>;
}
