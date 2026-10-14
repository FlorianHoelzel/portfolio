export interface ProjectStory {
  heading: string;
  purpose: string;
  implementation: string;
}

export const projectStories: Record<string, ProjectStory> = {
  transitradar: {
    heading: 'Live transport across four cities',
    purpose: 'Explore the network on a live map, find a station, and check the next departures. TransitRadar brings vehicle tracking and route information together for Berlin, Hamburg, Frankfurt, and Hannover.',
    implementation: 'A shared Leaflet frontend connects to city-specific Node.js services that normalize each transport API. When a station spans several stop IDs, the departure collector requests them concurrently and combines the responses into one ordered board.',
  },
  'MONOLITH-public': {
    heading: 'One dashboard for the connected home',
    purpose: 'Control lights and media devices, check appliance status, and keep calendars and shopping lists alongside the rest of the household. MONOLITH brings these tools into a local dashboard and connects supported devices to Apple Home.',
    implementation: 'Flask renders the interface, SQLite keeps application data local, and a separate HomeKit bridge exposes the devices. A shared device registry maps each device to its room and integration, keeping the dashboard and bridge aligned.',
  },
  'yoshi-leaderboards': {
    heading: 'From a leaderboard to the next run',
    purpose: 'Browse Yoshi’s Island runs across full-game, level, and world boards, explore runner profiles, and compare performances. Personal recommendations help a runner explore which attempt could improve their overall rating.',
    implementation: 'Native JavaScript separates the interface, browser storage, and domain calculations. Recommendations run in a Web Worker that sends progress and results back to the page. This prototype uses static imported records and local demo submissions, with no shared backend or authenticated accounts.',
  },
  'sumof.best': {
    heading: 'A runner’s history, beyond the latest record',
    purpose: 'Look up a public speedrun.com profile and explore how its personal bests developed over time. Interactive graphs, a chronological feed, and a speedrun passport turn older runs into a history that can be shared or embedded.',
    implementation: 'The archive pipeline paginates verified runs, separates leaderboard variants, and normalizes their timing before reconstructing each improvement history. React and TypeScript render those histories as linked graphs, run lists, and embeddable views.',
  },
};
