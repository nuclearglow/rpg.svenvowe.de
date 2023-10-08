export type Categories = 'summary' | 'experience' | 'kilas' | 'lore';

export type Post = {
  title: string;
  slug: string;
  description: string;
  date: string;
  categories: Categories[];
  published: boolean;
};
