import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '../../data/portfolio';
import { showcases } from '../../data/showcases';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ProjectShowcase } from '../../components/ProjectShowcase';
import { capturePreview } from './corruptPreview';
import { CarouselTransition, type CarouselTransitionState } from './CarouselTransition';

const entries = showcases.map(showcase => {
  const project = projects.find(item => item.slug === showcase.slug);
  if (!project) throw new Error(`Missing project for showcase: ${showcase.slug}`);
  return { project, showcase };
});
const indexFromHash = () => Math.max(0, entries.findIndex(({ project }) => location.hash === `#project-${project.slug}`));

export function ProjectCarousel() {
  const [active, setActive] = useState(indexFromHash);
  const [transition, setTransition] = useState<CarouselTransitionState | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const reducedMotion = useReducedMotion();
  const { project, showcase } = entries[active];
  const busy = transition !== null;

  const commit = (index: number) => {
    setActive(index);
    history.replaceState(history.state, '', `#project-${entries[index].project.slug}`);
  };
  useEffect(() => {
    const selectHash = () => {
      const index = entries.findIndex(({ project }) => location.hash === `#project-${project.slug}`);
      if (index >= 0) { setTransition(null); setActive(index); }
    };
    window.addEventListener('hashchange', selectHash);
    return () => window.removeEventListener('hashchange', selectHash);
  }, []);
  useEffect(() => {
    if (reducedMotion && transition) { commit(transition.next); setTransition(null); }
  }, [reducedMotion, transition]);
  // Preload just the small, local showcase captures so switching can repair promptly.
  useEffect(() => {
    for (const { showcase } of entries) if (showcase.image) { const image = new Image(); image.src = showcase.image.src; }
  }, []);

  const select = (index: number) => {
    if (busy || index === active) return;
    const target = stage.current?.querySelector<HTMLElement>('.showcase-image-button, .showcase-source pre');
    const bounds = target?.getBoundingClientRect();
    const visible = bounds && bounds.bottom > 0 && bounds.top < window.innerHeight;
    const capture = !reducedMotion && target && visible ? capturePreview(target) : null;
    if (!capture) { commit(index); return; }
    setTransition({ phase: 'out', next: index, seed: Math.random() * 100000, capture });
  };
  const complete = () => {
    if (!transition) return;
    if (transition.phase === 'out') { commit(transition.next); setTransition({ ...transition, phase: 'in' }); }
    else setTransition(null);
  };
  const step = (direction: number) => select((active + direction + entries.length) % entries.length);
  const navigate = (event: KeyboardEvent<HTMLElement>, index = active) => {
    if (busy) return;
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % entries.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + entries.length) % entries.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = entries.length - 1;
    else return;
    event.preventDefault(); select(next);
    if (event.currentTarget.getAttribute('role') === 'tab') tabs.current[next]?.focus();
  };
  const startSwipe = (event: TouchEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    if (!(event.target as HTMLElement).closest('.showcase-preview')) return;
    touch.current = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
  };
  const endSwipe = (event: TouchEvent<HTMLDivElement>) => {
    const start = touch.current; touch.current = null;
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) { suppressClick.current = true; step(dx < 0 ? 1 : -1); }
  };

  return (
    <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects">
      <div className="carousel-controls">
        <p className="carousel-status" role="status" aria-live="polite">{project.title}<span>{active + 1} / {entries.length}</span></p>
        <div className="carousel-arrows">
          <button onClick={() => step(-1)} onKeyDown={event => navigate(event)} aria-label="Previous project" aria-disabled={busy}><ArrowLeft size={21} /></button>
          <button onClick={() => step(1)} onKeyDown={event => navigate(event)} aria-label="Next project" aria-disabled={busy}><ArrowRight size={21} /></button>
        </div>
      </div>
      <div ref={stage} className="carousel-stage" id="carousel-panel" role="tabpanel" aria-labelledby={`project-tab-${project.slug}`} aria-busy={busy} tabIndex={0}
        onKeyDown={event => { if (event.target === event.currentTarget) navigate(event); }}
        onTouchStart={startSwipe} onTouchEnd={endSwipe} onTouchCancel={() => { touch.current = null; }}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        <ProjectShowcase key={project.slug} project={project} showcase={showcase} priority />
        {transition && !reducedMotion && <CarouselTransition transition={transition} stage={stage} onComplete={complete} />}
      </div>
      <div className="carousel-picker" role="tablist" aria-label="Choose a project">
        {entries.map(({ project: item }, index) => (
          <button key={item.slug} ref={element => { tabs.current[index] = element; }} role="tab" id={`project-tab-${item.slug}`}
            aria-selected={active === index} aria-controls="carousel-panel" aria-disabled={busy} tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)} onKeyDown={event => navigate(event, index)}>{item.title}</button>
        ))}
      </div>
    </div>
  );
}
