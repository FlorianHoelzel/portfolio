export type Category = 'Web & data' | 'Smart home' | 'Other';

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  repository: string;
  liveUrl?: string;
  featured?: boolean;
  fork?: boolean;
}
