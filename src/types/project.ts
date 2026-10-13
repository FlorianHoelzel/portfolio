export type Category = 'All projects' | 'Web & data' | 'Smart home' | 'Other';
export type ProjectVisual = 'home' | 'transit' | 'leaderboard' | 'records';

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: Exclude<Category, 'All projects'>;
  tags: string[];
  repository: string;
  liveUrl?: string;
  visual?: ProjectVisual;
  featured?: boolean;
  fork?: boolean;
}
