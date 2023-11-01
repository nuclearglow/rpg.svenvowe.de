export type Categories = 'Abenteuerpunkte' | 'Chronik' | 'Lore';

export type Post = {
  title: string;
  slug: string;
  description: string;
  date: string;
  categories: Categories[];
  published: boolean;
  content: string;
};
