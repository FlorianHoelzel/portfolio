import { useEffect, useRef, useState, type ReactNode } from 'react';
import { RotateCcw, Shuffle } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { capturePreview, CORRUPTION_DURATION, drawCorruption } from './corruptPreview';

export function CorruptionPlayground({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState('');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const element = canvas.current;
    const host = wrapper.current;
    const target = host?.querySelector<HTMLElement>('.showcase-image-button, .showcase-source pre');
    const context = element?.getContext('2d');
    if (!element || !host || !target || !context) return;
    const capture = capturePreview(target);
    if (!capture) { setActive(false); setMessage('Preview is still loading. Try again.'); return; }
    const bounds = target.getBoundingClientRect();
    const hostBounds = host.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    element.width = Math.round(capture.bitmap.width * ratio);
    element.height = Math.round(capture.bitmap.height * ratio);
    element.style.left = `${bounds.left - hostBounds.left}px`;
    element.style.top = `${bounds.top - hostBounds.top}px`;
    element.style.width = `${bounds.width}px`;
    element.style.height = `${bounds.height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    let frame = 0, last = 0, time = 0, visible = true;
    const restore = () => { cancelAnimationFrame(frame); setActive(false); setMessage('Preview restored.'); };
    const tick = (now: number) => {
      if (last) time += Math.min(now - last, 50) / 1000;
      last = now;
      drawCorruption(context, capture, time, false);
      if (time >= CORRUPTION_DURATION) { restore(); return; }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); last = 0;
      if (!reducedMotion && visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    const resize = new ResizeObserver(() => {
      const next = target.getBoundingClientRect();
      if (Math.abs(next.width - bounds.width) > 1 || Math.abs(next.height - bounds.height) > 1) restore();
    });
    drawCorruption(context, capture, reducedMotion ? .55 : 0, reducedMotion);
    observer.observe(target);
    resize.observe(target);
    document.addEventListener('visibilitychange', sync);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [active, reducedMotion]);

  const trigger = () => {
    if (active) { setActive(false); setMessage('Preview restored.'); }
    else { setActive(true); setMessage(reducedMotion ? 'Static ASCII preview.' : 'Corrupting preview.'); }
  };

  return (
    <div className="corruption-playground">
      <div className="corruption-tools">
        <span className="corruption-status" role="status">{message}</span>
        <button className="corruption-trigger" onClick={trigger} disabled={active && !reducedMotion} aria-pressed={reducedMotion ? active : undefined}>
          {active ? <RotateCcw size={15} /> : <Shuffle size={15} />}
          {active ? reducedMotion ? 'Restore view' : 'Repairing…' : 'Corrupt view'}
        </button>
      </div>
      <div className="corruption-region" ref={wrapper}>
        {children}
        {active && <canvas className="corruption-canvas" ref={canvas} aria-hidden="true" />}
      </div>
    </div>
  );
}
