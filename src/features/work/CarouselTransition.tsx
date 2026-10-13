import { useEffect, useRef, type RefObject } from 'react';
import { capturePreview, CORRUPTION_DURATION, drawCorruption, type PreviewCapture } from './corruptPreview';

export interface CarouselTransitionState { phase: 'out' | 'in'; next: number; seed: number; capture: PreviewCapture }
interface Props { transition: CarouselTransitionState; stage: RefObject<HTMLDivElement | null>; onComplete: () => void }

export function CarouselTransition({ transition, stage, onComplete }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const complete = useRef(onComplete);
  useEffect(() => { complete.current = onComplete; }, [onComplete]);
  useEffect(() => {
    let cancelled = false, frame = 0, last = 0, time = 0, visible = true;
    let observer: IntersectionObserver | undefined;
    let resize: ResizeObserver | undefined;
    let sync = () => {};
    const finish = () => { cancelAnimationFrame(frame); if (!cancelled) complete.current(); };
    const start = async () => {
      const host = stage.current;
      const element = canvas.current;
      const target = host?.querySelector<HTMLElement>('.showcase-image-button, .showcase-source pre');
      const context = element?.getContext('2d');
      if (!host || !element || !target || !context) { finish(); return; }
      let capture = transition.capture;
      if (transition.phase === 'in') {
        const image = target.querySelector('img');
        if (image) {
          try { await image.decode(); } catch { finish(); return; }
        }
        if (cancelled) return;
        const incoming = capturePreview(target);
        if (!incoming) { finish(); return; }
        capture = incoming;
      }
      const bounds = target.getBoundingClientRect();
      const hostBounds = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(capture.bitmap.width * ratio);
      element.height = Math.round(capture.bitmap.height * ratio);
      Object.assign(element.style, { left: `${bounds.left - hostBounds.left}px`, top: `${bounds.top - hostBounds.top}px`, width: `${bounds.width}px`, height: `${bounds.height}px` });
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const render = () => {
        const progress = Math.min(1, time / .48);
        const corruptionTime = transition.phase === 'out' ? progress * CORRUPTION_DURATION * .45 : CORRUPTION_DURATION * (.45 + progress * .55);
        drawCorruption(context, capture, corruptionTime, false, transition.seed);
      };
      const tick = (now: number) => {
        if (last) time += Math.min(now - last, 50) / 1000;
        last = now; render();
        if (time >= .48) { finish(); return; }
        frame = requestAnimationFrame(tick);
      };
      sync = () => {
        cancelAnimationFrame(frame); last = 0;
        if (!cancelled && visible && !document.hidden) frame = requestAnimationFrame(tick);
      };
      observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
      resize = new ResizeObserver(() => {
        const next = target.getBoundingClientRect();
        if (Math.abs(next.width - bounds.width) > 1 || Math.abs(next.height - bounds.height) > 1) finish();
      });
      render(); observer.observe(target); resize.observe(target);
    };
    const visibility = () => sync();
    document.addEventListener('visibilitychange', visibility);
    void start();
    return () => {
      cancelled = true; cancelAnimationFrame(frame); observer?.disconnect(); resize?.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [transition, stage]);
  return <canvas ref={canvas} className="carousel-transition" aria-hidden="true" />;
}
