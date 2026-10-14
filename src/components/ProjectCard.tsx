import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types/project';
import { ExternalLink } from './ExternalLink';
import { StackTrace } from './StackTrace';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card compact-card">
      <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
      <div className="project-content">
        <h3><ExternalLink href={project.repository}>{project.title}<ArrowUpRight size={19} /></ExternalLink></h3>
        <p>{project.description}</p>
        <StackTrace slug={project.slug} title={project.title} compact />
      </div>
      <div className="project-links">
        {project.liveUrl && <ExternalLink href={project.liveUrl}>Visit site <ArrowUpRight size={14} /></ExternalLink>}
        <ExternalLink href={project.repository}>Repository <ArrowUpRight size={14} /></ExternalLink>
      </div>
    </article>
  );
}
