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

export type SearchResultMatch = {
  before: string;
  match: string;
  after: string;
};

export type SearchResult = {
  post: Post;
  matches: SearchResultMatch[];
};

export type SearchResponse = {
  success: boolean;
  searchTerm?: string;
  missing?: boolean;
  results: SearchResult[];
};
