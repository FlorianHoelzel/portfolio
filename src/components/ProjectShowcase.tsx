import { useRef } from 'react';
import { ArrowUpRight, Maximize2, X } from 'lucide-react';
import type { Project } from '../types/project';
import type { Showcase } from '../data/showcases';
import { ExternalLink } from './ExternalLink';
import { CursorPreview } from '../features/work/CursorPreview';
import { ScrambleTitle } from '../features/work/ScrambleTitle';
import { StackTrace } from './StackTrace';
import { ServiceTopology } from './ServiceTopology';

interface ProjectShowcaseProps { project: Project; showcase: Showcase; priority?: boolean; direction?: 'next' | 'previous' }

export function ProjectShowcase({ project, showcase, priority = false, direction = 'next' }: ProjectShowcaseProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { image, story } = showcase;

  return (
    <article id={`project-${project.slug}`} className="showcase">
      <header className="showcase-heading">
        <h3><ScrambleTitle name={project.title} /></h3>
        <div className="showcase-links">
          {project.liveUrl && <ExternalLink href={project.liveUrl}>{project.slug === 'yoshi-leaderboards' ? 'Open prototype' : 'Visit site'} <ArrowUpRight size={15} /></ExternalLink>}
          <ExternalLink href={project.repository}>Source code <ArrowUpRight size={15} /></ExternalLink>
        </div>
      </header>
      <p className="showcase-summary showcase-introduction">{showcase.summary}</p>
      <div className="spotlight-layout">
      {image && <div className="showcase-preview"><CursorPreview direction={direction}>
          <figure className="showcase-figure">
            <button className="showcase-image-button" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge ${project.title} screenshot`}>
              <img src={image.src} alt={image.alt} width={image.width ?? 1440} height={image.height ?? 960} loading={priority ? 'eager' : 'lazy'} decoding="async" />
              <span className="image-expand"><Maximize2 size={15} /> View screenshot</span>
            </button>
          </figure>
      </CursorPreview></div>}
      <ServiceTopology title={project.title} topology={showcase.topology} />
      <div className="project-story-spread">
        <h4>{story.heading}</h4>
        <div className="story-spread-copy">
          <p className="story-purpose">{story.purpose}</p>
          <p className="story-implementation">{story.implementation}</p>
        </div>
      </div>
      <div className="showcase-stack"><StackTrace slug={project.slug} title={project.title} /></div>
      </div>
      {image && (
        <dialog ref={dialog} className="screenshot-dialog" aria-label={`${project.title} screenshot`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
          <button className="screenshot-dialog-close" autoFocus onClick={() => dialog.current?.close()} aria-label="Close screenshot"><X size={21} /></button>
          <div className="screenshot-dialog-image"><img src={image.src} alt={image.alt} width={image.width ?? 1440} height={image.height ?? 960} /></div>
        </dialog>
      )}
    </article>
  );
}
