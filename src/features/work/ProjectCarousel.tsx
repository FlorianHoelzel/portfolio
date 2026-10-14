import { useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react';
import { ArrowLeft, ArrowRight, FolderGit2 } from 'lucide-react';
import { projects } from '../../data/portfolio';
import { showcases } from '../../data/showcases';
import { ProjectShowcase } from '../../components/ProjectShowcase';

const entries = showcases.map(showcase => {
  const project = projects.find(item => item.slug === showcase.slug);
  if (!project) throw new Error(`Missing project for showcase: ${showcase.slug}`);
  return { project, showcase };
});
const indexFromHash = () => Math.max(0, entries.findIndex(({ project }) => location.hash === `#project-${project.slug}`));

export function ProjectCarousel() {
  const [active, setActive] = useState(indexFromHash);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const previousActive = useRef(active);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const { project, showcase } = entries[active];

  useEffect(() => {
    if (previousActive.current === active) return;
    previousActive.current = active;
    const bounds = stage.current?.getBoundingClientRect();
    if (!bounds || bounds.top >= 16) return;
    const inset = matchMedia('(max-width: 900px)').matches ? (navigation.current?.offsetHeight ?? 0) + 16 : 24;
    window.scrollTo({ top: window.scrollY + bounds.top - inset, behavior: 'instant' });
  }, [active]);

  const commit = (index: number) => {
    setActive(index);
    history.replaceState(history.state, '', `#project-${entries[index].project.slug}`);
  };
  useEffect(() => {
    const selectHash = () => {
      const index = entries.findIndex(({ project }) => location.hash === `#project-${project.slug}`);
      if (index >= 0) { setDirection('next'); setActive(index); }
    };
    window.addEventListener('hashchange', selectHash);
    return () => window.removeEventListener('hashchange', selectHash);
  }, []);
  // Local captures are ready for the next directional reveal.
  useEffect(() => {
    for (const { showcase } of entries) if (showcase.image) { const image = new Image(); image.src = showcase.image.src; }
  }, []);

  const select = (index: number, movement = index > active ? 1 : -1) => {
    if (index === active) return;
    setDirection(movement > 0 ? 'next' : 'previous');
    commit(index);
  };
  const step = (movement: number) => select((active + movement + entries.length) % entries.length, movement);
  const navigate = (event: KeyboardEvent<HTMLElement>, index = active) => {
    let next: number;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % entries.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + entries.length) % entries.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = entries.length - 1;
    else return;
    event.preventDefault(); select(next, ['ArrowRight', 'ArrowDown', 'End'].includes(event.key) ? 1 : -1);
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
      <aside ref={navigation} className="explorer-navigation" aria-label="Repository explorer">
      <div className="explorer-nav-heading"><h3>Repositories</h3><FolderGit2 size={16} aria-hidden="true" /></div>
      <div className="carousel-controls">
        <p className="carousel-status" role="status" aria-live="polite"><span>{active + 1} / {entries.length}</span><span className="carousel-announcement">{project.title}</span></p>
        <div className="carousel-arrows">
          <button onClick={() => step(-1)} onKeyDown={event => navigate(event)} aria-label="Previous project"><ArrowLeft size={21} /></button>
          <button onClick={() => step(1)} onKeyDown={event => navigate(event)} aria-label="Next project"><ArrowRight size={21} /></button>
        </div>
      </div>
        <div className="carousel-picker" role="tablist" aria-label="Choose a project" aria-orientation="vertical">
          {entries.map(({ project: item }, index) => (
            <button key={item.slug} ref={element => { tabs.current[index] = element; }} role="tab" id={`project-tab-${item.slug}`} aria-label={item.title}
              aria-selected={active === index} aria-controls="carousel-panel" tabIndex={active === index ? 0 : -1}
              onClick={() => select(index)} onKeyDown={event => navigate(event, index)}><FolderGit2 size={16} aria-hidden="true" /><span className="repository-label"><span>{item.title}</span><span className="repository-language">{item.tags[0]}</span></span></button>
          ))}
        </div>
      </aside>
      <div ref={stage} className="carousel-stage" data-direction={direction} id="carousel-panel" role="tabpanel" aria-labelledby={`project-tab-${project.slug}`} tabIndex={0}
        onKeyDown={event => { if (event.target === event.currentTarget) navigate(event); }}
        onTouchStart={startSwipe} onTouchEnd={endSwipe} onTouchCancel={() => { touch.current = null; }}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        <ProjectShowcase key={project.slug} project={project} showcase={showcase} priority direction={direction} />
      </div>
    </div>
  );
}
