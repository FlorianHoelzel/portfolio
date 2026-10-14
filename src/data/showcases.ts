import about from './project-about.json';

export interface Showcase {
  slug: string;
  summary: string;
  narrative: { title: string; text: string; scope?: boolean }[];
  flow: [string, string, string];
  image?: { src: string; alt: string; caption: string };
}

export const showcases: Showcase[] = [
  {
    slug: 'transitradar',
    summary: about.transitradar.description,
    flow: ['Stop IDs', 'Departure collector', 'Ordered results'],
    narrative: [
      { title: 'City adapters', text: 'Berlin, Hamburg, Frankfurt, and Hannover share a map frontend. City-specific services adapt their transport APIs so station search, departures, routes, and vehicle tracking use a common interface despite different network schemas.' },
      { title: 'Departure aggregation', text: 'A station can resolve to several stop IDs. In `transitApi.js`, `createDepartureCollector()` requests them concurrently and allows the board to render on the first non-empty result. `prepareDepartureResults()` then turns the collected platform responses into one current, chronologically ordered departure list.' },
    ],
    image: { src: '/images/projects/transitradar-map.jpg', alt: 'Actual TransitRadar Berlin interface showing vehicle markers across a street map.', caption: 'Berlin map · public-site capture, October 2026' },
  },
  {
    slug: 'MONOLITH-public',
    summary: about['MONOLITH-public'].description,
    flow: ['devices.py', 'Integration state', 'Templates / PWA'],
    narrative: [
      { title: 'Household runtime', text: 'Flask serves the dashboard through server-rendered templates, SQLite persists application data, and a separate process runs the HomeKit bridge. Device state sits alongside calendars, shopping, and household tools. The interface also runs as a PWA, with an optional Electron wrapper; service tooling targets a Raspberry Pi.' },
      { title: 'Device wiring', text: '`monolith/devices.py` maps each device to its room, type, and integration source. Device IDs stay aligned between the backend and HomeKit bridge. Private configuration and databases live outside the source; the public repo provides neutral examples for configuring a household.' },
    ],
  },
  {
    slug: 'yoshi-leaderboards',
    summary: about['yoshi-leaderboards'].description,
    flow: ['Verified runs', 'Runner deduplication', 'Competition rank'],
    narrative: [
      { title: 'Ranking', text: 'Full-game, individual-level, and individual-world boards share a domain layer that accepts explicit run collections. `rankedRuns()` filters verified records by board and platform, sorts integer `timeMs` values with date and run-ID tiebreakers, and keeps each runner’s fastest result. SNES and emulator share boards; Virtual Console (VC) is ranked separately.' },
      { title: 'Record progression', text: 'Equal PB times receive equal places. Competition ranking uses the retained array index, producing `1, 1, 3` for a tie at first. Related history queries scan dated runs for strict improvements, connecting leaderboard results to runner profiles and record progression.' },
      { title: 'Prototype scope', text: 'Imported records are static. Demo submissions persist in `localStorage`; this dependency-free browser prototype has no shared backend or authenticated accounts.', scope: true },
    ],
    image: { src: '/images/projects/yoshi-dark.jpg', alt: 'Actual Yoshi Leaderboards dark-mode prototype showing Warpless rankings, runner times, and platform filters.', caption: 'Dark-mode leaderboard prototype · imported static records' },
  },
  {
    slug: 'sumof.best',
    summary: about['sumof.best'].description,
    flow: ['Leaderboard partition', 'Timing normalization', 'Strict PB filter'],
    narrative: [
      { title: 'Archive reconstruction', text: '`buildUserArchive()` resolves a public speedrun.com username and paginates its verified runs, including older submissions. Runs are partitioned by game, category, level, and subcategory values so each history represents one leaderboard variant, then ordered by date and normalized to a consistent timing method.' },
      { title: 'PB progression', text: 'Timing validation and date/time deduplication precede the improvement scan. Its final retained run is the current record; earlier PBs stay attached to their dates and videos. The reconstructed histories feed the React graphs, chronological PB feed, passport, and embeds.' },
    ],
    image: { src: '/images/projects/sumofbest-history.jpg', alt: 'Actual Sum of Best demo showing a personal-best progression graph and dated run history.', caption: 'Public demo archive · illustrative runner data' },
  },
];
