import { Cpu, Database, Network, PanelsTopLeft } from 'lucide-react';
import type { ProjectTopology, TopologyLayer } from '../data/project-topologies';

const icons = { interface: PanelsTopLeft, state: Database, integration: Network, compute: Cpu } satisfies Record<TopologyLayer['kind'], typeof Cpu>;

// Repository-backed architecture, not a simulated dashboard or screenshot.
export function ServiceTopology({ title, topology }: { title: string; topology: ProjectTopology }) {
  return (
    <section className="service-topology" aria-label={`${title} system topology`}>
      <h4>System topology</h4>
      <div className="topology-layers">{topology.layers.map(({ title, kind, entry, items }) => {
        const Icon = icons[kind];
        return (
        <div className="topology-layer" key={title}>
          <div className="topology-node"><Icon size={22} aria-hidden="true" /><h5>{title}</h5></div>
          <code>{entry}</code>
          <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      ); })}</div>
      <p>{topology.summary}</p>
    </section>
  );
}
