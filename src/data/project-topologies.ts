export interface TopologyLayer {
  title: string;
  kind: 'interface' | 'state' | 'integration' | 'compute';
  entry: string;
  items: string[];
}

export interface ProjectTopology {
  layers: [TopologyLayer, TopologyLayer, TopologyLayer];
  summary: string;
}

// Architecture summaries grounded in the repository inventory and showcase notes.
export const projectTopologies = {
  transitradar: {
    layers: [
      { title: 'Interface', kind: 'interface', entry: 'web/', items: ['Native browser modules', 'Leaflet map + route geometry', 'Station search + departures'] },
      { title: 'API services', kind: 'compute', entry: 'services/', items: ['City-specific Node.js adapters', 'JSON / TRIAS XML normalization', 'Concurrent departure collection'] },
      { title: 'Transport networks', kind: 'integration', entry: 'web/js/config.js', items: ['VBB + HVV / Geofox', 'RMV + GVH / TRIAS', 'CARTO / OpenStreetMap tiles'] },
    ],
    summary: 'One map frontend connects to city-specific services that adapt each transport network.',
  },
  'MONOLITH-public': {
    layers: [
      { title: 'Interface', kind: 'interface', entry: 'app.py', items: ['Flask + Jinja templates', 'Browser / PWA', 'Optional Electron wrapper'] },
      { title: 'State', kind: 'state', entry: 'monolith/', items: ['SQLite persistence', 'Device registry', 'Private runtime configuration'] },
      { title: 'Integrations', kind: 'integration', entry: 'homekit_bridge.py', items: ['Separate HomeKit service', 'Device status adapters', 'Calendar + household services'] },
    ],
    summary: 'Flask application, local persistence, and a separate HomeKit bridge.',
  },
  'yoshi-leaderboards': {
    layers: [
      { title: 'Interface', kind: 'interface', entry: 'public/assets/js/app.js', items: ['Native browser rendering', 'Hash routes + view state', 'SVG charts + run details'] },
      { title: 'Browser state', kind: 'state', entry: 'data/store.js', items: ['Imported static run records', 'Local demo submissions', 'localStorage persistence'] },
      { title: 'Domain + worker', kind: 'compute', entry: 'domain/', items: ['Run queries + rating calculations', 'Web Worker recommendations', 'Progress + result messages'] },
    ],
    summary: 'A static browser prototype with separate UI, storage, and computation layers; no shared backend.',
  },
  'sumof.best': {
    layers: [
      { title: 'Interface', kind: 'interface', entry: 'React + TypeScript', items: ['Interactive archive graphs', 'PB feed + speedrun passport', 'Shareable iframe views'] },
      { title: 'Archive pipeline', kind: 'compute', entry: 'buildUserArchive()', items: ['Leaderboard variant partitioning', 'Timing normalization', 'Dated improvement histories'] },
      { title: 'Source data', kind: 'integration', entry: 'speedrun.com API', items: ['Public runner profiles', 'Paginated verified runs', 'Category + level metadata'] },
    ],
    summary: 'Public run data is reconstructed into category histories and rendered as archives and embeds.',
  },
} satisfies Record<string, ProjectTopology>;
