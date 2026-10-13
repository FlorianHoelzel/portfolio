import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Code2, Monitor } from 'lucide-react';
import { projects } from '../../data/portfolio';
import { showcases } from '../../data/showcases';
import { ProjectShowcase } from '../../components/ProjectShowcase';

const entries = showcases.map(showcase => {
  const project = projects.find(item => item.slug === showcase.slug);
  if (!project) throw new Error(`Missing project for showcase: ${showcase.slug}`);
  return { project, showcase };
});
const indexFromHash = () => Math.max(0, entries.findIndex(({ project }) => location.hash === `#project-${project.slug}`));

export function ProjectWorkbench() {
  const [active, setActive] = useState(indexFromHash);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { project, showcase } = entries[active];

  useEffect(() => {
    const selectHash = () => {
      const index = entries.findIndex(({ project }) => location.hash === `#project-${project.slug}`);
      if (index >= 0) setActive(index);
    };
    window.addEventListener('hashchange', selectHash);
    return () => window.removeEventListener('hashchange', selectHash);
  }, []);

  const select = (index: number) => {
    setActive(index);
    history.replaceState(history.state, '', `#project-${entries[index].project.slug}`);
  };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % entries.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + entries.length) % entries.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = entries.length - 1;
    else return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="project-workbench">
      <div className="workbench-selector" role="tablist" aria-label="Selected projects" aria-orientation="vertical">
        {entries.map(({ project: item, showcase: details }, index) => (
          <button key={item.slug} ref={element => { tabs.current[index] = element; }}
            id={`project-tab-${item.slug}`} className="workbench-project" role="tab"
            aria-selected={active === index} aria-controls="workbench-panel"
            tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => navigate(event, index)}>
            <span className="workbench-project-type">{details.source ? <Code2 size={15} /> : <Monitor size={15} />}{item.category}</span>
            <span className="workbench-project-name">{item.title}<ArrowUpRight size={18} /></span>
            <span className="workbench-project-stack">{item.tags.slice(0, 2).join(' / ')}</span>
          </button>
        ))}
      </div>
      <div id="workbench-panel" className="workbench-panel" role="tabpanel" aria-labelledby={`project-tab-${project.slug}`} tabIndex={0}>
        <ProjectShowcase key={project.slug} project={project} showcase={showcase} priority />
      </div>
    </div>
  );
}
