import { useRef } from 'react';
import { ArrowUpRight, Maximize2, X } from 'lucide-react';
import type { Project } from '../types/project';
import type { Showcase } from '../data/showcases';
import { ExternalLink } from './ExternalLink';

export function ProjectShowcase({ project, showcase, priority = false }: { project: Project; showcase: Showcase; priority?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { image, source } = showcase;
  const media = image ? (
    <figure className="showcase-figure">
      <button className="showcase-image-button" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge ${project.title} screenshot`}>
        <img src={image.src} alt={image.alt} width={1440} height={960} loading={priority ? 'eager' : 'lazy'} decoding="async" />
        <span className="image-expand"><Maximize2 size={15} /> View screenshot</span>
      </button>
      <figcaption>{image.caption}</figcaption>
    </figure>
  ) : source ? (
    <div className="showcase-source">
      <div className="source-heading"><span>Device configuration</span><ExternalLink href={source.url}>View file <ArrowUpRight size={14} /></ExternalLink></div>
      <pre><code>{source.code}</code></pre>
      <p>{source.file} · excerpt from the public repository</p>
    </div>
  ) : null;

  return (
    <article id={`project-${project.slug}`} className={`showcase showcase-${showcase.layout}`}>
      <div className="showcase-heading"><h3>{project.title}</h3><span>{project.category}{project.slug === 'yoshi-leaderboards' ? ' / Prototype' : ''}</span></div>
      <div className="showcase-layout">
        {media}
        <div className="showcase-story">
          <h4>{showcase.headline}</h4>
          <p className="showcase-summary">{showcase.summary}</p>
          <dl className="showcase-notes">{showcase.notes.map(note => <div key={note.title}><dt>{note.title}</dt><dd>{note.text}</dd></div>)}</dl>
          <div className="showcase-meta"><div className="showcase-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="showcase-links">{project.liveUrl && <ExternalLink href={project.liveUrl}>{project.slug === 'yoshi-leaderboards' ? 'Open prototype' : 'Visit site'} <ArrowUpRight size={15} /></ExternalLink>}<ExternalLink href={project.repository}>Source code <ArrowUpRight size={15} /></ExternalLink></div></div>
        </div>
      </div>
      {image && <dialog ref={dialog} className="screenshot-dialog" aria-label={`${project.title} screenshot`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><div className="screenshot-dialog-bar"><span>{project.title} — {image.caption}</span><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close screenshot"><X size={21} /></button></div><div className="screenshot-dialog-image"><img src={image.src} alt={image.alt} width={1440} height={960} /></div></dialog>}
    </article>
  );
}
