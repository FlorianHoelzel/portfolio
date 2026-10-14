import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Code2, RotateCcw } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { createCursorCorruption, type CorruptionPoint } from './cursorCorruption';

export function CursorPreview({ children, direction = 'next' }: { children: ReactNode; direction?: 'next' | 'previous' }) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const toggle = useRef(false);
  const refresh = useRef<() => void>(() => {});
  const [full, setFull] = useState(false);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => { toggle.current = full; refresh.current(); }, [full]);
  useEffect(() => {
    let cancelled = false, frame = 0, last = 0, time = 0, visible = true;
    let observer: IntersectionObserver | undefined, resize: ResizeObserver | undefined;
    let move = (_event: PointerEvent) => {};
    let scroll = () => {};
    let sync = () => {};
    const wrapper = host.current, element = canvas.current;
    const target = wrapper?.querySelector<HTMLElement>('.showcase-image-button, .showcase-source pre');
    const context = element?.getContext('2d');
    if (!wrapper || !element || !target || !context) return;
    const points: CorruptionPoint[] = [];
    const prepare = async () => {
      const image = target.querySelector('img');
      if (image) { try { await image.decode(); } catch { return; } }
      if (cancelled) return;
      let draw = createCursorCorruption(target, direction);
      const fit = () => {
        const bounds = target.getBoundingClientRect(), parent = wrapper.getBoundingClientRect();
        const ratio = Math.min(devicePixelRatio || 1, 1.5);
        element.width = Math.round(bounds.width * ratio); element.height = Math.round(bounds.height * ratio);
        Object.assign(element.style, { left: `${bounds.left - parent.left}px`, top: `${bounds.top - parent.top}px`, width: `${bounds.width}px`, height: `${bounds.height}px` });
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        draw = createCursorCorruption(target, direction);
      };
      const paint = () => draw(context, points, time, toggle.current, reducedMotion);
      const tick = (now: number) => {
        const delta = last ? Math.min(now - last, 50) / 1000 : 0; last = now; time += delta;
        for (const point of points) point.life -= delta * 1.6;
        while (points.length && points[0].life <= 0) points.shift();
        paint();
        if (time < .9 || points.length || toggle.current) frame = requestAnimationFrame(tick);
        else { frame = 0; last = 0; }
      };
      sync = () => {
        cancelAnimationFrame(frame); frame = 0; last = 0;
        if (reducedMotion) { points.length = 0; paint(); }
        else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
      };
      refresh.current = sync;
      move = event => {
        if (reducedMotion || event.pointerType === 'touch' || document.hidden || !visible) return;
        const bounds = target.getBoundingClientRect();
        const x = event.clientX - bounds.left, y = event.clientY - bounds.top;
        if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) return;
        points.push({ x, y, life: 1 }); if (points.length > 24) points.shift();
        if (!frame) { last = 0; frame = requestAnimationFrame(tick); }
      };
      fit(); setReady(true);
      wrapper.addEventListener('pointermove', move);
      observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
      resize = new ResizeObserver(() => { fit(); sync(); });
      scroll = () => { fit(); sync(); };
      target.addEventListener('scroll', scroll);
      observer.observe(target); resize.observe(target);
      sync();
    };
    const visibility = () => sync();
    document.addEventListener('visibilitychange', visibility);
    void prepare();
    return () => {
      cancelled = true; cancelAnimationFrame(frame); observer?.disconnect(); resize?.disconnect();
      wrapper.removeEventListener('pointermove', move); document.removeEventListener('visibilitychange', visibility);
      target.removeEventListener('scroll', scroll);
      refresh.current = () => {};
    };
  }, [reducedMotion, direction]);
  return (
    <div className="cursor-preview" ref={host}>
      {children}
      <canvas className="cursor-corruption" ref={canvas} aria-hidden="true" />
      <button className="ascii-preview-toggle" disabled={!ready} aria-pressed={full} onClick={() => setFull(value => !value)}>
        {full ? <RotateCcw size={14} /> : <Code2 size={14} />}{full ? 'Restore preview' : 'Play with ASCII'}
      </button>
    </div>
  );
}
