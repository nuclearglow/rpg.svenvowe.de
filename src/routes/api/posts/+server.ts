import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

async function getPosts() {
  // get from local fs
  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  return Object.entries(paths)
    .flatMap(([path, file]) => {
      const slug = path.split('/').at(-1)?.replace('.md', '');

      if (file && typeof file === 'object' && 'metadata' in file && slug) {
        const metadata = file.metadata as Omit<Post, 'slug'>;
        const post = { ...metadata, slug } satisfies Post;
        return post;
      }

      return [];
    })
    .filter((post) => post && post?.published)
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
}

// provides /api/posts with all posts as JSON
export async function GET() {
  const posts = await getPosts();
  return json(posts);
}
