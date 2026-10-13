import type { Category, Project } from '../types/project';

export const profile = {
  name: 'Florian Hölzel',
  github: 'https://github.com/FlorianHoelzel',
  intro: 'Software for connected homes, public transport, and speedrunning. A selection of things I’ve built and shared on GitHub.',
};

export const categories: Category[] = ['All projects', 'Web & data', 'Smart home', 'Other'];
const repository = (name: string) => `${profile.github}/${name}`;

// Curated from public GitHub repositories. Update content here, without touching the UI.
export const projects: Project[] = [
  {
    slug: 'MONOLITH-public', title: 'MONOLITH', category: 'Smart home',
    description: 'A local-first smart home dashboard. Connected devices, calendars, shopping, and household management in one place.',
    tags: ['Python', 'Flask', 'SQLite', 'HomeKit'], repository: repository('MONOLITH-public'),
    featured: true,
  },
  {
    slug: 'transitradar', title: 'TransitRadar', category: 'Web & data',
    description: 'A public transport platform with live departures, vehicle tracking, and interactive maps, powered by official transport APIs.',
    tags: ['JavaScript', 'Transport APIs', 'Maps'], repository: repository('transitradar'),
    liveUrl: 'https://transitradar.de/', featured: true,
  },
  {
    slug: 'yoshi-leaderboards', title: 'Yoshi Leaderboards', category: 'Web & data',
    description: 'A browser-only Yoshi’s Island leaderboard prototype with static imported records, runner profiles, and record progression.',
    tags: ['JavaScript', 'Speedrunning', 'Data'], repository: repository('yoshi-leaderboards'),
    liveUrl: 'https://yoshi.sumof.best/', featured: true,
  },
  {
    slug: 'sumof.best', title: 'sumof.best', category: 'Web & data',
    description: 'A visual archive of a speedrunner’s personal best history, with progression graphs, past records, and videos.',
    tags: ['TypeScript', 'React', 'Vinext', 'speedrun.com API'], repository: repository('sumof.best'),
    liveUrl: 'https://sumof.best', featured: true,
  },
  {
    slug: 'lg-thinq-homekit', title: 'LG ThinQ → HomeKit', category: 'Smart home',
    description: 'LG ThinQ washing machine status and remaining time in Apple Home using HAP-python.',
    tags: ['Python', 'HomeKit'], repository: repository('lg-thinq-homekit'),
  },
  {
    slug: 'windows-pc-homekit', title: 'Windows PC → HomeKit', category: 'Smart home',
    description: 'Windows PC power control in Apple Home with Wake-on-LAN and a Python Windows agent.',
    tags: ['Python', 'Wake-on-LAN'], repository: repository('windows-pc-homekit'),
  },
  {
    slug: 'philips-homekit', title: 'Philips → HomeKit', category: 'Smart home',
    description: 'A lightweight Python bridge connecting the Philips AC0951/13 air purifier to Apple HomeKit.',
    tags: ['Python', 'HomeKit'], repository: repository('philips-homekit'),
  },
  {
    slug: 'robovac-g30', title: 'robovac-g30', category: 'Smart home',
    description: 'Explore the source and documentation for this Python repository on GitHub.',
    tags: ['Python'], repository: repository('robovac-g30'),
  },
];
