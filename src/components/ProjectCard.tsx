import { ArrowUpRight, Code2, ExternalLink as ExternalLinkIcon, House, Terminal } from 'lucide-react';
import type { Project } from '../types/project';
import { ExternalLink } from './ExternalLink';
import { ProjectVisual } from './ProjectVisual';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.category === 'Smart home' ? House : project.category === 'Other' ? Terminal : Code2;
  return (
    <article className={project.featured ? 'project-card featured-card' : 'project-card compact-card'}>
      {project.visual ? <ProjectVisual type={project.visual} /> : <div className="compact-icon"><Icon size={22} /></div>}
      <div className="project-content">
        <div className="project-kicker"><span>{project.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
        <h3><ExternalLink href={project.repository}>{project.title}<ArrowUpRight size={22} /></ExternalLink></h3>
        <p>{project.description}</p>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links"><ExternalLink href={project.repository}><Code2 size={14} /> Source code <ArrowUpRight size={13} /></ExternalLink>{project.liveUrl && <ExternalLink href={project.liveUrl}><ExternalLinkIcon size={13} /> Live site</ExternalLink>}</div>
      </div>
    </article>
  );
}
