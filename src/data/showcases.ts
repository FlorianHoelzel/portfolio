import about from './project-about.json';
import { projectTopologies, type ProjectTopology } from './project-topologies';
import { projectStories, type ProjectStory } from './project-stories';

export interface Showcase {
  slug: string;
  summary: string;
  story: ProjectStory;
  topology: ProjectTopology;
  image?: { src: string; alt: string; caption: string; width?: number; height?: number };
}

export const showcases: Showcase[] = [
  {
    slug: 'transitradar',
    story: projectStories['transitradar'],
    topology: projectTopologies.transitradar,
    summary: about.transitradar.description,
    image: { src: `${import.meta.env.BASE_URL}images/projects/transitradar-map.jpg`, alt: 'Actual TransitRadar Berlin interface showing vehicle markers across a street map.', caption: 'Berlin map · public-site capture, October 2026' },
  },
  {
    slug: 'MONOLITH-public',
    story: projectStories['MONOLITH-public'],
    topology: projectTopologies['MONOLITH-public'],
    summary: about['MONOLITH-public'].description,
    image: { src: `${import.meta.env.BASE_URL}images/projects/monolith-overview.png`, alt: 'MONOLITH main dashboard with room-grouped device controls, household presence, and an activity feed. Personal names in the presence panel are redacted.', caption: 'Main dashboard · local capture, October 2026 · names redacted', width: 1536, height: 1024 },
  },
  {
    slug: 'yoshi-leaderboards',
    story: projectStories['yoshi-leaderboards'],
    topology: projectTopologies['yoshi-leaderboards'],
    summary: about['yoshi-leaderboards'].description,
    image: { src: `${import.meta.env.BASE_URL}images/projects/yoshi-dark.jpg`, alt: 'Actual Yoshi Leaderboards dark-mode prototype showing Warpless rankings, runner times, and platform filters.', caption: 'Dark-mode leaderboard prototype · imported static records' },
  },
  {
    slug: 'sumof.best',
    story: projectStories['sumof.best'],
    topology: projectTopologies['sumof.best'],
    summary: about['sumof.best'].description,
    image: { src: `${import.meta.env.BASE_URL}images/projects/sumofbest-history.jpg`, alt: 'Actual Sum of Best demo showing a personal-best progression graph and dated run history.', caption: 'Public demo archive · illustrative runner data' },
  },
];
