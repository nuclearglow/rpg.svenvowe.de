/** Content */

export type Categories = 'Abenteuerpunkte' | 'Chronik' | 'Lore';

export type MarkdownFile = {
  metadata: Record<string, unknown>;
  default: {
    render: () => {
      html: string;
    };
  };
};

export type Post = {
  title: string;
  slug: string;
  description: string;
  date: string;
  categories: Categories[];
  published: boolean;
  content: string;
};

/** Menu */

export type MenuItem = {
  url: string;
  icon: string;
  text: string;
  category: 'campaign' | 'lore';
};

export type Menu = Record<MenuItem['category'], MenuItem[]>;

/** Search */

export type SearchResultMatch = {
  /** A range of characters directly before the search match */
  before: string;
  /** The search result match */
  match: string;
  /** A range of characters directly behind the search match */
  after: string;
  /**
   * SHA-256 hash of the paragraph that contains the search match. Used to set the anchor link to
   * the page containing the search result
   */
  hash: string;
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

export type TimelineEvent = {
  title: string;
  slug: string;
  date: string;
  published: boolean;
  content: string[];
};
