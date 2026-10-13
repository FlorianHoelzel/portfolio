export type Category = 'All projects' | 'Web & data' | 'Smart home' | 'Other';

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: Exclude<Category, 'All projects'>;
  tags: string[];
  repository: string;
  liveUrl?: string;
  featured?: boolean;
  fork?: boolean;
}
