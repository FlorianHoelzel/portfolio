import { ArrowUpRight, Github } from 'lucide-react';
import { profile, projects } from '../data/portfolio';
import { ProjectCard } from '../components/ProjectCard';
import { ExternalLink } from '../components/ExternalLink';
import { ProjectWorkbench } from '../features/work/ProjectWorkbench';

const otherProjects = projects.filter(project => !project.featured);

export function Work() {
  return <section id="work" className="work-section container" aria-labelledby="work-heading">
    <div className="section-heading"><h2 id="work-heading">Selected projects</h2></div>
    <ProjectWorkbench />
    <div className="section-heading other-projects-heading"><h2>More projects</h2><span className="section-aside">Integrations and smaller experiments</span></div>
    <div className="projects-grid">{otherProjects.map(project => <ProjectCard project={project} key={project.slug} index={projects.indexOf(project)} />)}</div>
    <div className="work-footer"><ExternalLink href={`${profile.github}?tab=repositories`}><Github size={15} /> All repositories on GitHub <ArrowUpRight size={14} /></ExternalLink></div>
  </section>;
}
