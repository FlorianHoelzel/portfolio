import { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { categories, profile, projects } from '../data/portfolio';
import type { Category } from '../types/project';
import { ProjectCard } from '../components/ProjectCard';
import { ExternalLink } from '../components/ExternalLink';

export function Work() {
  const [category, setCategory] = useState<Category>('All projects');
  const visibleProjects = projects.filter(p => category === 'All projects' || p.category === category);
  return <section id="work" className="work-section container" aria-labelledby="work-heading">
    <div className="section-heading"><div><span className="eyebrow">01 / SELECTED WORK</span><h2 id="work-heading">Things I’ve <span className="serif">put into the world.</span></h2></div><span className="section-aside">Small ideas.<br />Real-world possibilities.</span></div>
    <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter projects">{categories.map(item => <button key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={category === item ? 'filter active' : 'filter'}>{item}{item === 'All projects' && <span>{projects.length}</span>}</button>)}</div><span className="project-count" aria-live="polite">{visibleProjects.length} projects</span></div>
    <div className="projects-grid">{visibleProjects.map(project => <ProjectCard project={project} key={project.slug} index={projects.indexOf(project)} />)}</div>
    <div className="work-footer"><span>Built with curiosity. Shared on GitHub.</span><ExternalLink href={`${profile.github}?tab=repositories`}><Github size={16} /> All repositories <ArrowUpRight size={16} /></ExternalLink></div>
  </section>;
}
