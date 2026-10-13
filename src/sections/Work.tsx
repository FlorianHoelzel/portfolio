import { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { categories, profile, projects } from '../data/portfolio';
import type { Category } from '../types/project';
import { ProjectCard } from '../components/ProjectCard';
import { ExternalLink } from '../components/ExternalLink';
import { showcases } from '../data/showcases';
import { ProjectShowcase } from '../components/ProjectShowcase';

export function Work() {
  const [category, setCategory] = useState<Category>('All projects');
  const otherProjects = projects.filter(p => !p.featured);
  const visibleProjects = otherProjects.filter(p => category === 'All projects' || p.category === category);
  return <section id="work" className="work-section container" aria-labelledby="work-heading">
    <div className="section-heading"><h2 id="work-heading">Selected projects</h2><span className="section-aside">Web apps, connected devices, and speedruns</span></div>
    <nav className="showcase-navigation" aria-label="Selected projects">{showcases.map(showcase => <a key={showcase.slug} href={`#project-${showcase.slug}`}>{projects.find(project => project.slug === showcase.slug)!.title}</a>)}</nav>
    <div className="showcases">{showcases.map((showcase, index) => <ProjectShowcase key={showcase.slug} showcase={showcase} project={projects.find(project => project.slug === showcase.slug)!} priority={index === 0} />)}</div>
    <div className="section-heading other-projects-heading"><h2>More projects</h2><span className="section-aside">Integrations and smaller experiments</span></div>
    <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter additional projects">{categories.map(item => <button key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={category === item ? 'filter active' : 'filter'}>{item}{item === 'All projects' && <span>{otherProjects.length}</span>}</button>)}</div><span className="project-count" aria-live="polite">{visibleProjects.length} additional projects</span></div>
    <div className="projects-grid">{visibleProjects.map(project => <ProjectCard project={project} key={project.slug} index={projects.indexOf(project)} />)}</div>
    <div className="work-footer"><ExternalLink href={`${profile.github}?tab=repositories`}><Github size={15} /> All repositories on GitHub <ArrowUpRight size={14} /></ExternalLink></div>
  </section>;
}
