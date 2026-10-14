import { useEffect, useRef } from 'react';
import { createAsciiCloudRenderer, type CloudPointer } from './cloudRenderer';

interface AsciiCloudProps {
  reducedMotion: boolean;
}

export function AsciiCloud({ reducedMotion }: AsciiCloudProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const animationTime = useRef(0);

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
    const stopped = reducedMotion;
    const draw = createAsciiCloudRenderer(context);
    const pointer: CloudPointer = { strokes: [] };
    let previous: { x: number; y: number; time: number } | null = null;
    // Listen on the hero so pointer tracking never obstructs links or text selection.
    const hero = wrapper.closest('.hero')!;
    const move = (event: Event) => {
      const mouse = event as PointerEvent;
      if (stopped || mouse.pointerType === 'touch') return;
      const bounds = wrapper.getBoundingClientRect();
      const x = mouse.clientX - bounds.left;
      const y = mouse.clientY - bounds.top;
      if (previous && mouse.timeStamp - previous.time < 120 &&
        Math.hypot(x - previous.x, y - previous.y) > .5) {
        pointer.strokes.push({ x0: previous.x, y0: previous.y, x1: x, y1: y });
        if (pointer.strokes.length > 32) pointer.strokes.shift();
      }
      previous = { x, y, time: mouse.timeStamp };
    };
    const leave = () => { previous = null; pointer.strokes.length = 0; };
    const paint = (delta = 0) => draw(width, height, reducedMotion ? 0 : animationTime.current, pointer, delta, stopped);
    const tick = (now: number) => {
      const delta = lastTick ? Math.min(now - lastTick, 50) / 1000 : 0;
      animationTime.current += delta;
      lastTick = now;
      if (now - lastFrame >= 1000 / 60 - 1) {
        paint(lastFrame ? Math.min((now - lastFrame) / 1000, .05) : 0);
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
  }, [reducedMotion]);

  return <div className="ascii-cloud" ref={container}>
    <canvas ref={canvas} aria-hidden="true" className="ascii-cloud-canvas" />
  </div>;
}

