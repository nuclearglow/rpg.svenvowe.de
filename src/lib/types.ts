export type Categories = 'Zusammenfassung' | 'Erfahrung' | 'Chronik' | 'Lore';

export type Post = {
  title: string;
  slug: string;
  description: string;
  date: string;
  categories: Categories[];
  published: boolean;
};
