export interface Showcase {
  slug: string;
  headline: string;
  summary: string;
  notes: { title: string; text: string }[];
  image?: { src: string; alt: string; caption: string };
  source?: { file: string; url: string; code: string };
  layout: 'wide' | 'source' | 'split';
}

export const showcases: Showcase[] = [
  {
    slug: 'transitradar',
    headline: 'Public transport, on the map.',
    summary: 'See where vehicles are, check the next departures, and follow a route. TransitRadar brings live transport data into an interactive map for Berlin, Hamburg, Frankfurt, and Hannover.',
    notes: [
      { title: 'One interface, multiple networks', text: 'City-specific API services connect the frontend to different transport networks.' },
      { title: 'A view of the journey', text: 'Vehicle positions, station search, departures, and route information meet in the same map interface.' },
    ],
    image: { src: '/images/projects/transitradar-map.jpg', alt: 'Actual TransitRadar Berlin interface showing vehicle markers across a street map.', caption: 'Berlin map · public-site capture, October 2026' },
    layout: 'wide',
  },
  {
    slug: 'MONOLITH-public',
    headline: 'A home dashboard that stays local.',
    summary: 'MONOLITH brings device monitoring, HomeKit, calendars, shopping, and household management into one dashboard, with deployment tooling for a Raspberry Pi.',
    notes: [
      { title: 'Python behind the dashboard', text: 'Flask and SQLite power the app. A separate HomeKit bridge connects the household devices.' },
      { title: 'Configuration stays separate', text: 'The public repository uses neutral example devices. Credentials and runtime data stay outside the project source.' },
    ],
    source: {
      file: 'monolith/devices.py',
      url: 'https://github.com/FlorianHoelzel/MONOLITH-public/blob/main/monolith/devices.py',
      code: '"device_washer_01": {\n    "name": "Waschstation",\n    "room": "Wäschekeller",\n    "type": "washer",\n    "read_only": True,\n    "status_source": "pi_homekit",\n    "value": False,\n    "remaining": 0,\n},',
    },
    layout: 'source',
  },
  {
    slug: 'yoshi-leaderboards',
    headline: 'The runs, the runners, the records.',
    summary: 'A browser-only Yoshi’s Island leaderboard prototype. Full-game, individual-level, and individual-world boards connect to runner profiles and record progression.',
    notes: [
      { title: 'Precise times and ranking', text: 'Run times are stored as integer milliseconds. Competition ranking handles ties as 1, 1, 3.' },
      { title: 'An honest prototype', text: 'Imported records are a static fixture; demo submissions live in the browser. There is no account system or shared backend yet.' },
    ],
    image: { src: '/images/projects/yoshi.jpg', alt: 'Actual Yoshi Leaderboards prototype showing Warpless rankings, runner times, and platform filters.', caption: 'Leaderboard prototype · imported static records' },
    layout: 'wide',
  },
  {
    slug: 'sumof.best',
    headline: 'A personal best has a history.',
    summary: 'Enter a public speedrun.com username to explore the runs behind each personal best. The archive keeps the older improvements, not just the current record.',
    notes: [
      { title: 'Reconstructing progression', text: 'Verified runs are organized by category and leaderboard variant to identify the runs that advanced a personal best.' },
      { title: 'More than the latest time', text: 'Interactive histories, PB feeds, passports, and embeds make a runner’s progression explorable and shareable.' },
    ],
    image: { src: '/images/projects/sumofbest-history.jpg', alt: 'Actual Sum of Best demo showing a personal-best progression graph and dated run history.', caption: 'Public demo archive · illustrative runner data' },
    layout: 'split',
  },
];
