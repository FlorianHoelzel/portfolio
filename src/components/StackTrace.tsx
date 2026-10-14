import { useState } from 'react';
import { ArrowUpRight, ChevronDown, GitBranch } from 'lucide-react';
import { projectStacks, type StackLayer } from '../data/project-stacks';
import { ExternalLink } from './ExternalLink';

interface Selection { name: string; role: string; source: string }
const supportingLabels = new Set(['Python deps', 'Desktop', 'Deploy / test', 'Build', 'Types / test', 'Deploy', 'Build / deploy']);

export function StackTrace({ slug, title, compact = false }: { slug: string; title: string; compact?: boolean }) {
  const layers = projectStacks[slug];
  const [hovered, setHovered] = useState<Selection | null>(null);
  const [focused, setFocused] = useState<Selection | null>(null);
  const [pinned, setPinned] = useState<Selection | null>(null);
  if (!layers) return null;
  const selected = focused ?? hovered ?? pinned;
  const count = layers.reduce((total, layer) => total + layer.items.length, 0);
  const primary = layers.filter(layer => compact || !supportingLabels.has(layer.label));
  const supporting = layers.filter(layer => !compact && supportingLabels.has(layer.label));
  const supportingNames = new Set(supporting.flatMap(layer => layer.items.map(item => item.name)));
  const renderLayer = (layer: StackLayer) => (
    <div className="stack-layer" key={layer.label}>
      <span className="stack-layer-label">{layer.label}</span>
      <ul aria-label={layer.label}>
        {layer.items.map(technology => {
          const entry = { ...technology, source: technology.source ?? layer.source };
          return (
            <li key={technology.name}>
              <button type="button" className="stack-node" data-active={selected?.name === technology.name || undefined}
                aria-label={`${technology.name}: ${technology.role}`} aria-pressed={pinned?.name === technology.name}
                onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(entry); }}
                onPointerMove={event => { if (event.pointerType === 'mouse' && focused) setFocused(null); }}
                onFocus={() => { setHovered(null); setFocused(entry); }}
                onClick={() => setPinned(current => current?.name === technology.name ? null : entry)}>
                {technology.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <section className={`stack-trace${compact ? ' stack-trace-compact' : ''}`} aria-label={`${title} technology stack`}
      onPointerLeave={() => setHovered(null)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(null); }}>
      <div className="stack-trace-heading"><h4><GitBranch size={15} aria-hidden="true" />Stack trace</h4><span>{count} technologies</span></div>
      <div className="stack-trace-layers">
        {primary.map(renderLayer)}
      </div>
      {supporting.length > 0 && <details className="stack-support" onToggle={event => {
        if (!event.currentTarget.open) {
          const clearHidden = (current: Selection | null) => current && supportingNames.has(current.name) ? null : current;
          setHovered(clearHidden); setFocused(clearHidden); setPinned(clearHidden);
        }
      }}>
        <summary><span>More dependencies &amp; tooling</span><span className="stack-support-count">{supportingNames.size}</span><ChevronDown size={14} aria-hidden="true" /></summary>
        <div className="stack-trace-layers">{supporting.map(renderLayer)}</div>
      </details>}
      <div className="stack-inspector" data-selected={Boolean(selected)}>
        {selected ? <><p><strong>{selected.name}</strong><span>{selected.role}</span></p><ExternalLink href={selected.source} aria-label={`View ${selected.name} in the repository`}><ArrowUpRight size={16} aria-hidden="true" /></ExternalLink></>
          : <p className="stack-inspector-hint">Hover, focus, or tap a technology to inspect its role.</p>}
      </div>
    </section>
  );
}
