import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Code2, Maximize2, X } from 'lucide-react';
import type { Project } from '../types/project';
import type { Showcase } from '../data/showcases';
import { ExternalLink } from './ExternalLink';

interface ProjectShowcaseProps { project: Project; showcase: Showcase; priority?: boolean }

export function ProjectShowcase({ project, showcase, priority = false }: ProjectShowcaseProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [detail, setDetail] = useState<'overview' | 'technical'>('overview');
  const detailTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { image, source } = showcase;
  const tabs = [{ id: 'overview', label: 'What it does' }, { id: 'technical', label: 'How it works' }] as const;
  const tabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index;
    setDetail(tabs[next].id);
    detailTabs.current[next]?.focus();
  };

  return (
    <article id={`project-${project.slug}`} className="showcase">
      <header className="showcase-heading">
        <h3>{project.title}</h3>
        <div className="showcase-links">
          {project.liveUrl && <ExternalLink href={project.liveUrl}>{project.slug === 'yoshi-leaderboards' ? 'Open prototype' : 'Visit site'} <ArrowUpRight size={15} /></ExternalLink>}
          <ExternalLink href={project.repository}>Source code <ArrowUpRight size={15} /></ExternalLink>
        </div>
      </header>
      <div className="showcase-preview">
        {image ? (
          <figure className="showcase-figure">
            <button className="showcase-image-button" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge ${project.title} screenshot`}>
              <img src={image.src} alt={image.alt} width={1440} height={960} loading={priority ? 'eager' : 'lazy'} decoding="async" />
              <span className="image-expand"><Maximize2 size={15} /> View screenshot</span>
            </button>
            <figcaption>{image.caption}</figcaption>
          </figure>
        ) : source ? (
          <div className="showcase-source">
            <div className="source-heading"><span><Code2 size={16} />{source.file}</span><ExternalLink href={source.url}>View file <ArrowUpRight size={14} /></ExternalLink></div>
            <pre><code>{source.code.split('\n').map((line, index) => <span className="source-line" key={index}><span className="source-line-number" aria-hidden="true">{index + 1}</span>{line}{'\n'}</span>)}</code></pre>
            <p>Device configuration · excerpt from the public repository</p>
          </div>
        ) : null}
      </div>
      <div className="showcase-detail-tabs" role="tablist" aria-label={`${project.title} details`}>
        {tabs.map((tab, index) => <button key={tab.id} ref={element => { detailTabs.current[index] = element; }}
          role="tab" id={`${project.slug}-${tab.id}-tab`} aria-selected={detail === tab.id}
          aria-controls={`${project.slug}-details`} tabIndex={detail === tab.id ? 0 : -1}
          onClick={() => setDetail(tab.id)} onKeyDown={event => tabKey(event, index)}>{tab.label}</button>)}
      </div>
      <div className="showcase-details" id={`${project.slug}-details`} role="tabpanel" aria-labelledby={`${project.slug}-${detail}-tab`} tabIndex={0}>
        {detail === 'overview' ? <div className="showcase-story"><h4>{showcase.headline}</h4><p className="showcase-summary">{showcase.summary}</p></div>
          : <dl className="showcase-notes">{showcase.notes.map(note => <div key={note.title}><dt>{note.title}</dt><dd>{note.text}</dd></div>)}</dl>}
      </div>
      <div className="showcase-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      {image && (
        <dialog ref={dialog} className="screenshot-dialog" aria-label={`${project.title} screenshot`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
          <div className="screenshot-dialog-bar"><span>{project.title} — {image.caption}</span><button autoFocus onClick={() => dialog.current?.close()} aria-label="Close screenshot"><X size={21} /></button></div>
          <div className="screenshot-dialog-image"><img src={image.src} alt={image.alt} width={1440} height={960} /></div>
        </dialog>
      )}
    </article>
  );
}
