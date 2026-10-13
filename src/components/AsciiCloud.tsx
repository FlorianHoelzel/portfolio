import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { createAsciiCloudRenderer, type CloudPointer } from '../lib/asciiCloud';

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
    const draw = createAsciiCloudRenderer(context);
    const pointer: CloudPointer = { x: -1000, y: -1000, strength: 0, tiltX: 0, tiltY: 0 };
    const target = { ...pointer };
    // Listen on the hero so pointer tracking never obstructs links or text selection.
    const hero = wrapper.closest('.hero')!;
    const move = (event: Event) => {
      const mouse = event as PointerEvent;
      if (stopped || mouse.pointerType === 'touch') return;
      const bounds = wrapper.getBoundingClientRect();
      target.x = mouse.clientX - bounds.left;
      target.y = mouse.clientY - bounds.top;
      target.strength = target.x >= 0 && target.x <= width && target.y >= 0 && target.y <= height ? 1 : 0;
      target.tiltX = Math.max(-1, Math.min(1, (target.x / width - .5) * 2));
      target.tiltY = Math.max(-1, Math.min(1, (target.y / height - .5) * 2));
    };
    const leave = () => { target.strength = 0; target.tiltX = 0; target.tiltY = 0; };
    const paint = (delta = 0) => draw(width, height, reducedMotion ? 0 : animationTime.current, pointer, delta, stopped);
    const tick = (now: number) => {
      const delta = lastTick ? Math.min(now - lastTick, 50) / 1000 : 0;
      animationTime.current += delta;
      lastTick = now;
      const ease = 1 - Math.exp(-8 * delta);
      pointer.x = target.x;
      pointer.y = target.y;
      pointer.strength += (target.strength - pointer.strength) * ease;
      pointer.tiltX += (target.tiltX - pointer.tiltX) * ease;
      pointer.tiltY += (target.tiltY - pointer.tiltY) * ease;
      if (now - lastFrame >= 1000 / 60 - 1) {
        paint((now - lastFrame) / 1000);
        lastFrame = now;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      lastTick = 0;
      lastFrame = 0;
      leave();
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
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
    };
  }, [paused, reducedMotion]);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* Motion controls also work without browser storage. */ }
  };

  return <div className="ascii-cloud" ref={container}>
    <canvas ref={canvas} aria-hidden="true" className="ascii-cloud-canvas" />
    {!reducedMotion && <span className="cloud-interaction-hint" aria-hidden="true">{paused ? 'Motion paused' : 'Move your cursor through the cloud'}</span>}
    {!reducedMotion && <button className="cloud-motion-toggle" onClick={toggle} aria-pressed={paused} aria-label={paused ? 'Play cloud animation' : 'Pause cloud animation'}>{paused ? <Play size={12} /> : <Pause size={12} />}{paused ? 'Play cloud' : 'Pause cloud'}</button>}
  </div>;
}
