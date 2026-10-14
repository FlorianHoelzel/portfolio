import { Database, Network, PanelsTopLeft } from 'lucide-react';

const layers = [
  { title: 'Interface', icon: PanelsTopLeft, entry: 'app.py', items: ['Flask + Jinja templates', 'Browser / PWA', 'Optional Electron wrapper'] },
  { title: 'State', icon: Database, entry: 'monolith/', items: ['SQLite persistence', 'Device registry', 'Private runtime configuration'] },
  { title: 'Integrations', icon: Network, entry: 'homekit_bridge.py', items: ['Separate HomeKit service', 'Device status adapters', 'Calendar + household services'] },
];

// Repository-backed architecture, not a simulated dashboard or screenshot.
export function ServiceTopology() {
  return (
    <section className="service-topology" aria-label="MONOLITH service topology">
      <h4>Service topology</h4>
      <div className="topology-layers">{layers.map(({ title, icon: Icon, entry, items }) => (
        <div className="topology-layer" key={title}>
          <div className="topology-node"><Icon size={22} aria-hidden="true" /><h5>{title}</h5></div>
          <code>{entry}</code>
          <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      ))}</div>
      <p>Flask application, local persistence, and a separate HomeKit bridge.</p>
    </section>
  );
}
